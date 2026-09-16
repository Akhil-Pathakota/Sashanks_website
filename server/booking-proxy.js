/**
 * Booking proxy — for LOCAL DEV, or hosting on Render/Railway/a VM/etc.
 * -----------------------------------------------------------------------
 * If you're deploying on Vercel (same place as the website), you don't
 * need to run this separately — use api/public/slots.js and
 * api/public/appointments.js instead, which deploy automatically with
 * `git push` alongside the site. This file exists for local testing and
 * as an option if you ever host the proxy somewhere other than Vercel.
 *
 * All the actual hospital-API logic lives in server/hospitalApi.js, shared
 * with the Vercel functions — this file is just the Express wiring.
 *
 * Run: node server/booking-proxy.js
 * Requires server/.env with:
 *   HOSPITAL_API_USERNAME   the receptionist/service login username
 *   HOSPITAL_API_PASSWORD   the matching password
 *   ALLOWED_ORIGIN          e.g. http://localhost:3000 (comma-separate for more than one)
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

const { applyCors, isRateLimited, getSlotsForDoctorDate, getPatientLookup, createAppointment } = await import('./hospitalApi.js');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const handled = applyCors(req, res);
  if (handled) return; // OPTIONS preflight already responded to
  next();
});

function rateLimit(req, res, next) {
  if (isRateLimited(req.ip)) {
    return res.status(429).json({ message: 'Too many requests. Please wait a minute and try again.' });
  }
  next();
}

app.get('/api/public/slots', rateLimit, async (req, res) => {
  const { doctorId, date } = req.query;
  try {
    const result = await getSlotsForDoctorDate({ doctorId, date });
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error('Slots proxy error:', err);
    return res.status(502).json({ message: 'Could not reach the booking system. Please try again shortly.' });
  }
});

app.get('/api/public/patients', rateLimit, async (req, res) => {
  const result = await getPatientLookup({ mobile: req.query.mobile });
  return res.status(result.status).json(result.body);
});

app.post('/api/public/appointments', rateLimit, async (req, res) => {
  const result = await createAppointment(req.body);
  return res.status(result.status).json(result.body);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Booking proxy listening on port ${PORT}`);
});
