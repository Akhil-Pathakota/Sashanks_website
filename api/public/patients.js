/**
 * Vercel Serverless Function — GET /api/public/patients?mobile=...
 * Read-only lookup used to auto-fill Full Name / Date of Birth once the
 * visitor has typed a full 10-digit mobile number. Does NOT create a
 * patient — that still only happens at actual booking time.
 */

import { applyCors, isRateLimited, getPatientLookup } from '../../server/hospitalApi.js';

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

  const result = await getPatientLookup({ mobile: req.query.mobile });
  return res.status(result.status).json(result.body);
}
