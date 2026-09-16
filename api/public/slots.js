/**
 * Vercel Serverless Function — GET /api/public/slots?doctorId=...&date=...
 * Deploys automatically with the rest of the site (same repo, same
 * `git push`). Reads HOSPITAL_API_USERNAME / HOSPITAL_API_PASSWORD /
 * ALLOWED_ORIGIN from this Vercel project's own Environment Variables
 * (Project → Settings → Environment Variables) — set there, not in a
 * committed file.
 */

import { applyCors, isRateLimited, getSlotsForDoctorDate } from '../../server/hospitalApi.js';

export default async function handler(req, res) {
  const handled = applyCors(req, res);
  if (handled) return; // OPTIONS preflight already responded to

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many requests. Please wait a minute and try again.' });
  }

  const { doctorId, date } = req.query;

  try {
    const result = await getSlotsForDoctorDate({ doctorId, date });
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error('Slots function error:', err);
    return res.status(502).json({ message: 'Could not reach the booking system. Please try again shortly.' });
  }
}
