# Appointment Booking — Setup Guide

The "Book Appointment" button (header + hero section) opens a full booking
form wired to your real backend at `project-yabvj.vercel.app` — the same one
the `trilok-ui` reception dashboard uses. No hospital-system credentials
ever live in the website's own code; they only live in the proxy's own
environment variables.

## Two ways to run the proxy — pick one

**A) Vercel Serverless Functions — recommended, since the site is already on Vercel**

`api/public/slots.js` and `api/public/appointments.js` deploy automatically
alongside the website, from the same repo, on the same `git push`. No
separate hosting, no separate CORS setup (same domain = no CORS needed at
all). This is what you should use in production.

**B) The standalone proxy (`server/booking-proxy.js`) — for local dev, or if you ever host elsewhere**

A plain Express server. Useful for testing locally with `npm run dev`
(since a bare Vite dev server doesn't run the `api/` folder — only
`vercel dev` does that). Also an option if you ever move off Vercel.

Both share the exact same logic — it lives in `server/hospitalApi.js` so
there's only one place to maintain it.

```
Doctor's website (browser)
        │  GET  /api/public/slots?date=...
        │  POST /api/public/appointments
        ▼
 (A) api/public/*.js on Vercel   —or—   (B) server/booking-proxy.js locally
        │  both use server/hospitalApi.js, holding HOSPITAL_API_USERNAME/PASSWORD
        ▼
https://project-yabvj.vercel.app → same database the reception
        dashboard (trilok-ui) already reads and writes
```

## Local development (option B)

1. Create `server/.env` (this file is gitignored — never commit it):
   ```
   HOSPITAL_API_USERNAME=<the receptionist/service account username>
   HOSPITAL_API_PASSWORD=<the matching password>
   ALLOWED_ORIGIN=http://localhost:3000
   ```
   (`HOSPITAL_API_BASE_URL` already defaults to the confirmed real URL —
   only override it if that ever changes.)
2. In the project **root** `.env` (separate file, for the website itself):
   ```
   VITE_BOOKING_API_URL=http://localhost:4000/api/public/appointments
   VITE_SLOTS_API_URL=http://localhost:4000/api/public/slots
   VITE_DOCTOR_ID=3
   ```
3. In one terminal: `npm run start:booking-proxy` (listens on port 4000).
4. In another terminal: `npm run dev`.
5. Open the site, click "Book Appointment", pick a slot, submit — then
   check the reception dashboard to confirm the booking landed there.

## Production on Vercel (option A) — what you still need to do

1. In your Vercel project → **Settings → Environment Variables**, add:
   ```
   HOSPITAL_API_USERNAME=<the receptionist/service account username>
   HOSPITAL_API_PASSWORD=<the matching password>
   ```
   `HOSPITAL_API_BASE_URL` and `ALLOWED_ORIGIN` don't need to be set here —
   the base URL already defaults correctly, and same-origin requests (the
   website calling `/api/...` on its own domain) don't need CORS at all.
2. Also in Vercel's Environment Variables, set the two frontend ones as
   **relative paths** (not `localhost`, and not a full URL — just the path,
   since the API now lives on the same domain as the site):
   ```
   VITE_BOOKING_API_URL=/api/public/appointments
   VITE_SLOTS_API_URL=/api/public/slots
   VITE_DOCTOR_ID=3
   ```
3. Push to your connected repo (or trigger a redeploy) — Vercel will build
   the site **and** deploy `api/public/slots.js` /
   `api/public/appointments.js` as serverless functions automatically, no
   extra configuration needed.
4. Open the live site, test a real booking, and confirm it shows up on the
   reception dashboard.

If you ever see a 500 error from the functions in Vercel, check
**Deployments → [latest] → Functions** in the Vercel dashboard for logs —
that's where `console.error` output from `hospitalApi.js` shows up.

## The one thing still worth double-checking

`payment_type` is confirmed working with `"cash"`. The form also offers
Card / UPI / Insurance, but those haven't been tested against your backend
yet. Before relying on them: try booking with each payment type in the
reception dashboard and watch the Network tab for the `appointments`
request. If any get rejected (4xx response), either trim `PAYMENT_TYPES` in
`BookingModal.tsx` to just the working values, or match the exact enum your
backend expects there and in `server/hospitalApi.js`'s `payment_type` line.

## Later, once this is stable

- Swap the shared receptionist-app login for a separate, more narrowly
  scoped service credential, so the two channels can be rotated
  independently — a one-line env var change, not a rewrite.
- Confirm the full `payment_type` enum (see above) rather than assuming.
- Add a CAPTCHA or honeypot field if the public form starts attracting spam
  bookings — the built-in rate limiting is a basic first line of defense,
  not a full solution, and on Vercel it resets on cold starts.
- Have the reception dashboard refresh or poll so new bookings from the
  website show up without a manual reload.
