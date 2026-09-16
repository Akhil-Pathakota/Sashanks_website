/**
 * Shared hospital-API logic
 * -----------------------------------------------------------------------
 * Framework-agnostic: no Express, no Vercel-specific types. Used by both
 * server/booking-proxy.js (a plain Node/Express server, for local dev and
 * for hosting on Render/Railway/etc.) and api/public/*.js (Vercel
 * Serverless Functions, for deploying alongside the site on Vercel).
 *
 * Reads credentials from process.env — populated from server/.env locally
 * (via dotenv, see booking-proxy.js) and from Vercel's own Project ->
 * Settings -> Environment Variables in production. Same variable names
 * either way: HOSPITAL_API_BASE_URL, HOSPITAL_API_USERNAME,
 * HOSPITAL_API_PASSWORD, ALLOWED_ORIGIN.
 */

const HOSPITAL_API_BASE_URL = process.env.HOSPITAL_API_BASE_URL || 'https://project-yabvj.vercel.app';
const HOSPITAL_API_USERNAME = process.env.HOSPITAL_API_USERNAME;
const HOSPITAL_API_PASSWORD = process.env.HOSPITAL_API_PASSWORD;

// ALLOWED_ORIGIN can be a single URL or a comma-separated list, e.g.
// "http://localhost:3000,https://dr-sashanks-chest-and-allergy-clini.vercel.app"
export const allowedOrigins = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

/** Sets CORS headers on a (req, res) pair from either runtime. Returns true
 *  if the caller should stop and return immediately (an OPTIONS preflight). */
export function applyCors(req, res) {
  const origin = req.headers.origin;
  // Same-origin requests (frontend and API on the same Vercel domain) don't
  // send an Origin header that needs checking, but we still allow explicitly
  // configured origins for local dev / preview deployments / other hosts.
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (allowedOrigins.length === 0) {
    // No ALLOWED_ORIGIN configured at all — permissive default so it isn't
    // silently broken; tighten this once you know your real domain(s).
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
}

// --- Very simple in-memory rate limiting (best-effort on serverless, since
// each cold instance starts a fresh Map — fine for low traffic / early
// stage; swap for a shared store like Upstash Redis once you scale). ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const hits = new Map();

export function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// --- Token cache: log in once, reuse the token, refresh on expiry/401 ---
// On Vercel this persists only for the life of a warm serverless instance —
// worst case it re-logs-in on a cold start, which is cheap and fine.
let cachedToken = null;
let tokenExpiresAt = 0;

async function getAuthToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const loginRes = await fetch(`${HOSPITAL_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: HOSPITAL_API_USERNAME,
      password: HOSPITAL_API_PASSWORD,
    }),
  });

  if (!loginRes.ok) {
    throw new Error(`Hospital API login failed: ${loginRes.status}`);
  }

  const loginData = await loginRes.json();
  cachedToken = loginData.access_token;
  tokenExpiresAt = Date.now() + 50 * 60 * 1000;
  return cachedToken;
}

/** Authenticated fetch against the hospital API, with one automatic retry
 *  after a fresh login if the cached token turns out to be expired. */
export async function authFetch(path, options = {}) {
  const call = async (token) =>
    fetch(`${HOSPITAL_API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

  let res = await call(await getAuthToken());
  if (res.status === 401) {
    cachedToken = null;
    res = await call(await getAuthToken());
  }
  return res;
}

/** Reshapes the real API's slot objects ({ starts_at, ends_at, status,
 *  token_number, booking, patient_name }, ISO datetimes with no timezone
 *  suffix — treated as clinic-local wall-clock time) into what the
 *  frontend's Slot type expects. */
export function toFrontendSlots(apiSlots) {
  return apiSlots.map((s) => {
    const startHM = s.starts_at.slice(11, 16); // "HH:MM", avoids timezone drift
    const endHM = s.ends_at.slice(11, 16);
    const startHour = Number(startHM.slice(0, 2));
    return {
      id: String(s.token_number),
      tokenNumber: s.token_number,
      start: to12Hour(startHM),
      end: to12Hour(endHM),
      rawStart: s.starts_at,
      rawEnd: s.ends_at,
      period: startHour < 12 ? 'morning' : 'evening',
      status: s.status === 'available' && !s.booking ? 'available' : 'booked',
    };
  });
}

function to12Hour(hm) {
  const [hStr, m] = hm.split(':');
  let h = parseInt(hStr, 10);
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ap}`;
}

// --- Find an existing patient by mobile number, or create one ---
export async function findOrCreatePatientId({ fullName, mobile, dob }) {
  const searchRes = await authFetch(`/patients?mobile=${encodeURIComponent(mobile)}`);
  if (searchRes.ok) {
    const data = await searchRes.json();
    const exact = (data.patients || []).find((p) => p.mobile_number === mobile);
    if (exact) return exact.id;
  }

  const createRes = await authFetch('/patients', {
    method: 'POST',
    body: JSON.stringify({
      full_name: fullName,
      mobile_number: mobile,
      date_of_birth: dob || null,
    }),
  });

  if (!createRes.ok) {
    const err = new Error('Could not create patient record.');
    err.status = createRes.status;
    throw err;
  }

  const created = await createRes.json();
  return created.patient.id;
}

/** Shared implementation of GET /slots — returns a plain result object;
 *  callers (Express route or Vercel function) translate it to their own
 *  response API. */
export async function getSlotsForDoctorDate({ doctorId, date }) {
  if (!doctorId || !date) {
    return { status: 400, body: { message: 'doctorId and date are required.' } };
  }

  const slotsRes = await authFetch(
    `/slots?date=${encodeURIComponent(date)}&doctor_id=${encodeURIComponent(doctorId)}`
  );

  if (!slotsRes.ok) {
    return { status: slotsRes.status, body: { message: 'Could not load slots for this date.' } };
  }

  const data = await slotsRes.json();
  return { status: 200, body: { slots: toFrontendSlots(data.slots ?? []) } };
}

/** Shared implementation of POST /appointments. */
export async function createAppointment(payload) {
  const {
    doctorId,
    patientName,
    patientPhone,
    patientDOB,
    slotStart,
    slotEnd,
    tokenNumber,
    paymentType,
    amountPaid,
  } = payload || {};

  if (!doctorId || !patientName || !patientPhone || !slotStart || !slotEnd || !tokenNumber) {
    return { status: 400, body: { message: 'Missing required booking fields.' } };
  }

  const mobileDigits = String(patientPhone).replace(/\D/g, '');
  if (mobileDigits.length < 10) {
    return { status: 400, body: { message: 'Please provide a valid mobile number.' } };
  }

  try {
    const patientId = await findOrCreatePatientId({
      fullName: patientName,
      mobile: mobileDigits,
      dob: patientDOB,
    });

    const bookingRes = await authFetch('/appointments', {
      method: 'POST',
      body: JSON.stringify({
        doctor_id: Number(doctorId),
        patient_id: patientId,
        starts_at: slotStart,
        ends_at: slotEnd,
        // TODO: confirm the full set of payment_type values your backend
        // accepts (confirmed working: "cash"). Adjust PAYMENT_TYPES in
        // BookingModal.tsx to match if others turn out to be rejected.
        payment_type: String(paymentType || 'cash').toLowerCase(),
        amount_paid: Boolean(amountPaid),
        token_number: Number(tokenNumber),
      }),
    });

    let data = null;
    try {
      data = await bookingRes.json();
    } catch {
      // no JSON body
    }

    if (!bookingRes.ok) {
      if (bookingRes.status === 409) {
        return { status: 409, body: { message: data?.message || 'That slot was just taken. Please pick another.' } };
      }
      return { status: bookingRes.status, body: { message: data?.message || 'The clinic system rejected this booking.' } };
    }

    return {
      status: 200,
      body: {
        message: data?.message || 'Appointment booked successfully.',
        appointmentId: data?.appointment?.id ? String(data.appointment.id) : undefined,
        tokenNumber: data?.appointment?.token_number,
      },
    };
  } catch (err) {
    console.error('Booking error:', err);
    if (err.status === 409) {
      return { status: 409, body: { message: 'That slot was just taken. Please pick another.' } };
    }
    return { status: 502, body: { message: 'Could not reach the booking system. Please try again shortly.' } };
  }
}
