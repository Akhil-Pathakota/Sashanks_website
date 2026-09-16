# Appointment Booking — Setup Guide

The "Book Appointment" button (header + hero section) now opens a full
booking form wired to your real backend at `project-yabvj.vercel.app` — the
same one the `trilok-ui` reception dashboard uses. No hospital-system
credentials live in this website's code; they only ever live in the proxy
server's own `.env`.

## How it fits together

```
Doctor's website (this repo, public, no secrets)
        │  fills out BookingModal form
        │  GET  /api/public/slots?date=...
        │  POST /api/public/appointments
        ▼
server/booking-proxy.js  (holds HOSPITAL_API_USERNAME / HOSPITAL_API_PASSWORD)
        │  logs in once, attaches Bearer token server-side
        ▼
https://project-yabvj.vercel.app → same database the reception
        dashboard (trilok-ui) already reads and writes
```

## What's already built and working

- **`src/components/BookingModal.tsx`** — two-column form: date, mobile
  number, full name, DOB, payment type, "Amount paid" checkbox on the left;
  a live, flat numbered slot list on the right (Available/Booked), matching
  your dashboard's layout exactly.
- **`src/services/bookingApi.ts`** — `fetchAvailableSlots(date)` and
  `submitAppointment(payload)`, talking only to your proxy. No secrets here.
- **`server/booking-proxy.js`** — fully wired to your real endpoints:
  - `POST /auth/login` → caches the `access_token`, auto-refreshes on 401
  - `GET /slots?date=...&doctor_id=...` → reshaped into what the frontend expects
  - `GET /patients?mobile=...` → looks for an existing patient by exact mobile match
  - `POST /patients` → creates a new patient if none was found
  - `POST /appointments` → books the slot against that patient

This covers the whole flow end-to-end, including new patients who've never
been in the system before (the common case for a public website visitor).

## The one thing still worth double-checking

`payment_type` is confirmed working with `"cash"`. The form also offers
Card / UPI / Insurance as options, but those haven't been tested against
your backend yet — it's possible it only accepts a fixed enum. Before
relying on them:
1. In the reception dashboard, try booking with each payment type and watch
   the Network tab for the `appointments` request.
2. If any get rejected (4xx response), either trim `PAYMENT_TYPES` in
   `BookingModal.tsx` to just the working values, or find the exact enum
   your backend expects and match it there and in the proxy's
   `payment_type` line.

## Steps to go live

1. In `server/`, create a `.env` file (this one is **not** committed —
   it's the proxy's own, separate from the website's `.env`) with:
   ```
   HOSPITAL_API_USERNAME=<the receptionist/service account username>
   HOSPITAL_API_PASSWORD=<the matching password>
   ALLOWED_ORIGIN=https://<your-doctor-website-domain>
   ```
   (`HOSPITAL_API_BASE_URL` already defaults to the confirmed real URL —
   only override it if that ever changes.)
2. Run the proxy locally to test: `npm run start:booking-proxy` (listens on
   port 4000 by default).
3. In the **website's** `.env`, point at it:
   ```
   VITE_BOOKING_API_URL=http://localhost:4000/api/public/appointments
   VITE_SLOTS_API_URL=http://localhost:4000/api/public/slots
   VITE_DOCTOR_ID=3
   ```
4. `npm run dev`, open the site, click "Book Appointment", pick a slot, and
   submit — then check the reception dashboard to confirm the booking landed
   there for real.
5. When ready to deploy for real:
   - Host the proxy somewhere with a stable URL (Render, Railway, a small
     VM, or convert it to a serverless function — ask if you'd like that
     version).
   - Set its real env vars on that platform (never commit them).
   - Update the website's `VITE_BOOKING_API_URL` / `VITE_SLOTS_API_URL` to
     the proxy's real deployed URL, rebuild (`npm run build`), and redeploy
     the site.

## Later, once this is live and stable

- Swap the shared receptionist-app login for a separate, more narrowly
  scoped service credential, so the two channels can be rotated/rate-limited
  independently — you flagged wanting to do this after initial launch. It's
  a one-line env var change on the proxy, not a rewrite.
- Confirm the full `payment_type` enum (see above) rather than assuming.
- Add a CAPTCHA or honeypot field if the public form starts attracting spam
  bookings, since `RATE_LIMIT_MAX` in the proxy is a basic first line of
  defense, not a full solution.
- Have the doctor's/reception dashboard refresh or poll so new bookings from
  the website show up without a manual reload.
