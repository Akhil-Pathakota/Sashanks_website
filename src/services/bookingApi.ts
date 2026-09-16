/**
 * Booking API service
 * -----------------------------------------------------------------------
 * Talks to a small PROXY endpoint you control — never directly to the
 * hospital app's authenticated API. No login credentials or API keys live
 * in this file or anywhere in the browser bundle.
 *
 * Two calls:
 *   fetchAvailableSlots(date)  → GET  VITE_SLOTS_API_URL
 *   submitAppointment(payload) → POST VITE_BOOKING_API_URL
 *
 * Both are optional to configure right away: if VITE_SLOTS_API_URL isn't
 * set yet, slots are generated locally from the clinic's published hours
 * (src/data.ts DOCTOR_INFO.timings) so the page still works end-to-end
 * during development — swap in the real endpoint whenever the proxy is
 * ready (see BOOKING_SETUP.md).
 */

import { DOCTOR_INFO } from '../data';

export interface Slot {
  id: string; // token_number as a string, used as the React key / selection id
  tokenNumber: number;
  start: string; // display label, e.g. "10:40 AM"
  end: string; // display label, e.g. "11:00 AM"
  rawStart: string; // ISO, no timezone suffix — clinic-local wall-clock time, e.g. "2026-09-16T10:40:00"
  rawEnd: string;
  period: 'morning' | 'evening';
  status: 'available' | 'booked';
}

export interface BookingPayload {
  patientName: string;
  patientPhone: string;
  patientDOB?: string; // YYYY-MM-DD
  slotStart: string; // ISO, from Slot.rawStart
  slotEnd: string; // ISO, from Slot.rawEnd
  tokenNumber: number;
  paymentType: string;
  amountPaid: boolean;
}

export interface BookingResult {
  success: true;
  appointmentId?: string;
  tokenNumber?: number;
  message?: string;
}

export class BookingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookingError';
  }
}

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL as string | undefined;
const SLOTS_API_URL = import.meta.env.VITE_SLOTS_API_URL as string | undefined;
const DOCTOR_ID = import.meta.env.VITE_DOCTOR_ID as string | undefined;

// ---------------------------------------------------------------------
// Slot fetching
// ---------------------------------------------------------------------

export async function fetchAvailableSlots(date: string): Promise<{ slots: Slot[]; usingFallback: boolean }> {
  if (SLOTS_API_URL) {
    try {
      const url = new URL(SLOTS_API_URL);
      if (DOCTOR_ID) url.searchParams.set('doctorId', DOCTOR_ID);
      url.searchParams.set('date', date);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();

      const slots: Slot[] = data.slots ?? [];
      return { slots, usingFallback: false };
    } catch {
      // Fall through to the local generator so the page keeps working.
    }
  }

  return { slots: generateFallbackSlots(date), usingFallback: true };
}

/** Generates 20-minute slots from the clinic's published hours. All shown as
 *  available — this is a placeholder until real availability is wired in. */
function generateFallbackSlots(date: string): Slot[] {
  const day = new Date(`${date}T00:00:00`).getDay(); // 0 = Sunday
  if (day === 0) return []; // Sunday Closed, per DOCTOR_INFO.timings.days

  const morning = generateRange(date, DOCTOR_INFO.timings.morning, 'morning', 0);
  const evening = generateRange(date, DOCTOR_INFO.timings.evening, 'evening', morning.length);
  return [...morning, ...evening];
}

function generateRange(date: string, rangeLabel: string, period: 'morning' | 'evening', startIndex: number, stepMinutes = 20): Slot[] {
  const [startLabel, endLabel] = rangeLabel.split(' to ').map((s) => s.trim());
  const startMin = parseClockTime(startLabel);
  const endMin = parseClockTime(endLabel);
  const slots: Slot[] = [];
  let tokenNumber = startIndex;
  for (let t = startMin; t + stepMinutes <= endMin; t += stepMinutes) {
    tokenNumber += 1;
    const rawStart = `${date}T${toISOTime(t)}`;
    const rawEnd = `${date}T${toISOTime(t + stepMinutes)}`;
    slots.push({
      id: String(tokenNumber),
      tokenNumber,
      start: formatMinutes(t),
      end: formatMinutes(t + stepMinutes),
      rawStart,
      rawEnd,
      period,
      status: 'available',
    });
  }
  return slots;
}

function parseClockTime(label: string): number {
  const m = label.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return 0;
  let hours = parseInt(m[1], 10);
  const minutes = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();
  if (ap === 'PM' && hours !== 12) hours += 12;
  if (ap === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function formatMinutes(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ap = h24 >= 12 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${ap}`;
}

function toISOTime(mins: number): string {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`;
}

// ---------------------------------------------------------------------
// Booking submission
// ---------------------------------------------------------------------

export async function submitAppointment(payload: BookingPayload): Promise<BookingResult> {
  if (!BOOKING_API_URL) {
    throw new BookingError(
      'Booking is not configured yet. Set VITE_BOOKING_API_URL in your .env to your proxy endpoint.'
    );
  }

  let response: Response;
  try {
    response = await fetch(BOOKING_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId: DOCTOR_ID,
        source: 'doctor_website',
        ...payload,
      }),
    });
  } catch {
    throw new BookingError('Could not reach the booking service. Please check your connection and try again.');
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    // Non-JSON response; fall through to status-based handling below.
  }

  if (!response.ok) {
    const serverMessage = data?.message || data?.error;
    if (response.status === 409) {
      throw new BookingError(serverMessage || 'That slot was just taken. Please pick another.');
    }
    if (response.status === 429) {
      throw new BookingError('Too many booking attempts. Please wait a moment and try again.');
    }
    throw new BookingError(serverMessage || 'Something went wrong while booking. Please try again or call the clinic.');
  }

  return {
    success: true,
    appointmentId: data?.appointmentId,
    tokenNumber: data?.tokenNumber,
    message: data?.message,
  };
}
