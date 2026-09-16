/**
 * Booking proxy — EXAMPLE / TEMPLATE
 * -----------------------------------------------------------------------
 * This is the small server that sits between the doctor's public website
 * and your real hospital booking API. It is the ONLY place that holds
 * real credentials (a service login or API key). The browser never sees
 * them.
 *
 *            Doctor's website (browser)
 *                    │  POST /api/public/appointments
 *                    │  { doctorId, patientName, patientPhone, date, ... }
 *                    ▼
 *            THIS PROXY  (holds HOSPITAL_API_USERNAME / HOSPITAL_API_PASSWORD
 *                          or HOSPITAL_API_KEY as server-side env vars)
 *                    │  POST <your real booking endpoint>
 *                    │  Authorization: Bearer <token or key>
 *                    ▼
 *            Your existing hospital backend → same database the
 *            receptionist app and doctor web app already use
 *
 * Rename this file to booking-proxy.js, fill in the TODOs below with your
 * real endpoint URLs and field names, then deploy it (as its own small
 * Node service, or as a serverless function on Vercel/Netlify/Cloud
 * Functions — the logic is the same either way).
 *
 * Run: node server/booking-proxy.js
 * Requires env vars (put these in the PROXY's .env — never in the
 * website's frontend .env, since anything prefixed VITE_ ends up in the
 * browser bundle):
 *   HOSPITAL_API_BASE_URL   e.g. https://your-hospital-app.example.com
 *   HOSPITAL_API_USERNAME   the service/receptionist login (if using login+token)
 *   HOSPITAL_API_PASSWORD
 *   HOSPITAL_API_KEY        (alternative to username/password, if your API supports a key)
 *   ALLOWED_ORIGIN           e.g. https://drsashank.example.com  (the doctor site's real domain)
 *   PORT                     defaults to 4000
 */

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const {
  HOSPITAL_API_BASE_URL,
  HOSPITAL_API_USERNAME,
  HOSPITAL_API_PASSWORD,
  HOSPITAL_API_KEY,
  ALLOWED_ORIGIN,
  PORT = 4000,
} = process.env;

// --- CORS: only allow requests from the doctor's actual website domain ---
app.use((req, res, next) => {
  if (ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// --- Very simple in-memory rate limiting (fine for low traffic / early stage) ---
// Swap for `express-rate-limit` + a shared store (Redis) once you scale past one instance.
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
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
    return res.status(429).json({ message: 'Too many booking attempts. Please wait a minute and try again.' });
  }
  next();
}

// --- Token cache: log in once, reuse the token, refresh on expiry ---
// TODO: if your backend uses a static API key instead of login+token, delete
// this whole section and just send `Authorization: Bearer ${HOSPITAL_API_KEY}` below.
let cachedToken = null;
let tokenExpiresAt = 0;

async function getAuthToken() {
  if (HOSPITAL_API_KEY) return HOSPITAL_API_KEY;

  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  // TODO: replace with your real login endpoint + field names.
  const loginRes = await fetch(`${HOSPITAL_API_BASE_URL}/api/login`, {
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
  // TODO: adjust field names to match your login response, e.g. loginData.token / loginData.access_token
  cachedToken = loginData.token;
  // Refresh a bit before actual expiry; adjust to your token's real lifetime.
  tokenExpiresAt = Date.now() + 50 * 60 * 1000; // e.g. refresh every 50 min for a 1hr token
  return cachedToken;
}

// --- Slot availability for a given doctor + date ---
// TODO: replace with your real "get available slots" endpoint. This example
// assumes something like GET /api/doctors/:id/slots?date=YYYY-MM-DD that
// returns the same slot list the receptionist dashboard (trilok-ui) shows.
app.get('/api/public/slots', rateLimit, async (req, res) => {
  const { doctorId, date } = req.query;

  if (!doctorId || !date) {
    return res.status(400).json({ message: 'doctorId and date are required.' });
  }

  try {
    const token = await getAuthToken();

    const slotsRes = await fetch(
      `${HOSPITAL_API_BASE_URL}/api/doctors/${doctorId}/slots?date=${encodeURIComponent(date)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!slotsRes.ok) {
      return res.status(slotsRes.status).json({ message: 'Could not load slots for this date.' });
    }

    const data = await slotsRes.json();
    // TODO: reshape to { slots: [{ id, start, end, period, status }] } if your
    // API's field names differ (e.g. rename "startTime"/"endTime", derive
    // "period" from the time, map your status values to 'available'/'booked').
    return res.status(200).json(data);
  } catch (err) {
    console.error('Slots proxy error:', err);
    return res.status(502).json({ message: 'Could not reach the booking system. Please try again shortly.' });
  }
});

// --- The public endpoint the doctor's website calls ---
app.post('/api/public/appointments', rateLimit, async (req, res) => {
  const {
    doctorId,
    patientName,
    patientPhone,
    patientDOB,
    date,
    slotId,
    slotLabel,
    period,
    paymentType,
    amountPaid,
  } = req.body || {};

  // Basic server-side validation — never trust the client.
  if (!doctorId || !patientName || !patientPhone || !date || !slotId) {
    return res.status(400).json({ message: 'Missing required booking fields.' });
  }

  try {
    const token = await getAuthToken();

    // TODO: replace with your real booking endpoint + the field names your
    // API actually expects. This example assumes it looks similar to what
    // the receptionist Android app / trilok-ui dashboard already sends.
    const bookingRes = await fetch(`${HOSPITAL_API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        doctor_id: doctorId,
        patient_name: patientName,
        patient_phone: patientPhone,
        patient_dob: patientDOB,
        date,
        slot_id: slotId,
        slot_label: slotLabel,
        period,
        payment_type: paymentType,
        amount_paid: amountPaid,
        source: 'doctor_website', // lets staff see where the booking came from
      }),
    });

    if (bookingRes.status === 401) {
      // Token expired mid-flight — force a fresh login and retry once.
      cachedToken = null;
      const freshToken = await getAuthToken();
      const retryRes = await fetch(`${HOSPITAL_API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${freshToken}`,
        },
        body: JSON.stringify({
          doctor_id: doctorId,
          patient_name: patientName,
          patient_phone: patientPhone,
          patient_dob: patientDOB,
          date,
          slot_id: slotId,
          slot_label: slotLabel,
          period,
          payment_type: paymentType,
          amount_paid: amountPaid,
          source: 'doctor_website',
        }),
      });
      return forwardResult(retryRes, res);
    }

    return forwardResult(bookingRes, res);
  } catch (err) {
    console.error('Booking proxy error:', err);
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
    return res.status(hospitalRes.status).json({
      message: data?.message || 'The clinic system rejected this booking.',
    });
  }

  // TODO: adjust to whatever field your real API returns as the booking's id.
  return res.status(200).json({
    message: 'Appointment requested successfully.',
    appointmentId: data?.id || data?.appointment_id,
  });
}

app.listen(PORT, () => {
  console.log(`Booking proxy listening on port ${PORT}`);
});
