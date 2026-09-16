/**
 * Vercel Serverless Function — POST /api/public/appointments
 * Deploys automatically with the rest of the site (same repo, same
 * `git push`). Reads HOSPITAL_API_USERNAME / HOSPITAL_API_PASSWORD /
 * ALLOWED_ORIGIN from this Vercel project's own Environment Variables
 * (Project → Settings → Environment Variables) — set there, not in a
 * committed file.
 */

import { applyCors, isRateLimited, createAppointment } from '../../server/hospitalApi.js';

export default async function handler(req, res) {
  const handled = applyCors(req, res);
  if (handled) return; // OPTIONS preflight already responded to

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many requests. Please wait a minute and try again.' });
  }

  // Vercel parses a JSON request body into req.body automatically for
  // Node serverless functions when Content-Type: application/json is sent.
  const result = await createAppointment(req.body);
  return res.status(result.status).json(result.body);
}
