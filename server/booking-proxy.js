/**
 * Booking proxy
 * -----------------------------------------------------------------------
 * This is the small server that sits between the doctor's public website
 * and your real hospital booking API (https://project-yabvj.vercel.app).
 * It is the ONLY place that holds real credentials. The browser never
 * sees them.
 *
 *            Doctor's website (browser)
 *                    │  GET  /api/public/slots?date=...
 *                    │  POST /api/public/appointments
 *                    ▼
 *            THIS PROXY  (holds HOSPITAL_API_USERNAME / HOSPITAL_API_PASSWORD
 *                          as server-side env vars — never in the browser)
 *                    │  Authorization: Bearer <token>
 *                    ▼
 *            https://project-yabvj.vercel.app → same database the
 *            trilok-ui reception dashboard reads and writes
 *
 * Confirmed from DevTools (2026-09-16):
 *   Login:      POST /auth/login          { username, password }
 *               → { access_token, token_type: "bearer", user }
 *   Doctors:    GET  /doctors              → { doctors: [{ id, full_name, specialty, ... }], total }
 *   Slots:      GET  /slots?date=YYYY-MM-DD&doctor_id={id}
 *               → { slots: [{ starts_at, ends_at, status, token_number, booking, patient_name }], ... }
 *   Patients:   GET  /patients?mobile={digits}          (prefix search)
 *               → { patients: [{ id, full_name, mobile_number, date_of_birth, ... }], total }
 *               POST /patients            { full_name, mobile_number, date_of_birth }
 *               → { message, patient: { id, ... } }
 *   Appointments: POST /appointments       { doctor_id, patient_id, starts_at, ends_at,
 *                                            payment_type, amount_paid (boolean), token_number }
 *               → { message, appointment: { id, token_number, ... } }
 *
 * Run: node server/booking-proxy.js
 * Requires env vars (put these in the PROXY's own .env — never in the
 * website's frontend .env, since anything prefixed VITE_ ends up in the
 * browser bundle):
 *   HOSPITAL_API_BASE_URL   defaults to https://project-yabvj.vercel.app (not a secret)
 *   HOSPITAL_API_USERNAME   the receptionist/service login username
 *   HOSPITAL_API_PASSWORD   the matching password
 *   ALLOWED_ORIGIN          e.g. https://drsashank.example.com (the doctor site's real domain)
 *   PORT                    defaults to 4000
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Always load the .env sitting next to THIS file (server/.env), regardless
// of which directory the command was actually run from.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(express.json());

const {
  HOSPITAL_API_BASE_URL = 'https://project-yabvj.vercel.app',
  HOSPITAL_API_USERNAME,
  HOSPITAL_API_PASSWORD,
  ALLOWED_ORIGIN,
  PORT = 4000,
} = process.env;

// --- CORS: only allow requests from the doctor's actual website domain ---
app.use((req, res, next) => {
  if (ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// --- Very simple in-memory rate limiting (fine for low traffic / early stage) ---
// Swap for `express-rate-limit` + a shared store (Redis) once you scale past one instance.
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const hits = new Map(); // ip -> { count, windowStart }

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return next();
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ message: 'Too many requests. Please wait a minute and try again.' });
  }
  next();
}

// --- Token cache: log in once, reuse the token, refresh on expiry/401 ---
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
  // The JWT's own `exp` claim is the real expiry; refreshing every 50 min is a
  // safe default unless you decode the token to read the exact lifetime.
  tokenExpiresAt = Date.now() + 50 * 60 * 1000;
  return cachedToken;
}

/** Authenticated fetch against the hospital API, with one automatic retry
 *  after a fresh login if the cached token turns out to be expired. */
async function authFetch(path, options = {}) {
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

// --- Slot availability for a given doctor + date ---
app.get('/api/public/slots', rateLimit, async (req, res) => {
  const { doctorId, date } = req.query;

  if (!doctorId || !date) {
    return res.status(400).json({ message: 'doctorId and date are required.' });
  }

  try {
    const slotsRes = await authFetch(
      `/slots?date=${encodeURIComponent(date)}&doctor_id=${encodeURIComponent(doctorId)}`
    );

    if (!slotsRes.ok) {
      return res.status(slotsRes.status).json({ message: 'Could not load slots for this date.' });
    }

    const data = await slotsRes.json();
    return res.status(200).json({ slots: toFrontendSlots(data.slots ?? []) });
  } catch (err) {
    console.error('Slots proxy error:', err);
    return res.status(502).json({ message: 'Could not reach the booking system. Please try again shortly.' });
  }
});

/** Reshapes the real API's slot objects ({ starts_at, ends_at, status,
 *  token_number, booking, patient_name }, ISO datetimes with no timezone
 *  suffix — treated as clinic-local wall-clock time) into what the
 *  frontend's Slot type expects. */
function toFrontendSlots(apiSlots) {
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
async function findOrCreatePatientId({ fullName, mobile, dob }) {
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

// --- The public endpoint the doctor's website calls to book a slot ---
app.post('/api/public/appointments', rateLimit, async (req, res) => {
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
  } = req.body || {};

  // Basic server-side validation — never trust the client.
  if (!doctorId || !patientName || !patientPhone || !slotStart || !slotEnd || !tokenNumber) {
    return res.status(400).json({ message: 'Missing required booking fields.' });
  }

  const mobileDigits = String(patientPhone).replace(/\D/g, '');
  if (mobileDigits.length < 10) {
    return res.status(400).json({ message: 'Please provide a valid mobile number.' });
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

    return forwardResult(bookingRes, res);
  } catch (err) {
    console.error('Booking proxy error:', err);
    if (err.status === 409) {
      return res.status(409).json({ message: 'That slot was just taken. Please pick another.' });
    }
    return res.status(502).json({ message: 'Could not reach the booking system. Please try again shortly.' });
  }
});

async function forwardResult(hospitalRes, res) {
  let data = null;
  try {
    data = await hospitalRes.json();
  } catch {
    // no JSON body
  }

  if (!hospitalRes.ok) {
    if (hospitalRes.status === 409) {
      return res.status(409).json({ message: data?.message || 'That slot was just taken. Please pick another.' });
    }
    return res.status(hospitalRes.status).json({
      message: data?.message || 'The clinic system rejected this booking.',
    });
  }

  return res.status(200).json({
    message: data?.message || 'Appointment booked successfully.',
    appointmentId: data?.appointment?.id ? String(data.appointment.id) : undefined,
    tokenNumber: data?.appointment?.token_number,
  });
}

app.listen(PORT, () => {
  console.log(`Booking proxy listening on port ${PORT}`);
});
