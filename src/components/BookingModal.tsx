import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Phone } from 'lucide-react';
import { DOCTOR_INFO } from '../data';
import {
  fetchAvailableSlots,
  fetchPatientByMobile,
  submitAppointment,
  BookingError,
  type Slot,
  type BookingPayload,
} from '../services/bookingApi';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Payment happens in person at the clinic — not collected on the public
// booking form. "cash" is sent as a placeholder default; confirmed working
// against the real backend (see BOOKING_SETUP.md for the full note).

function todayISO(): string {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().split('T')[0];
}

function formatDateHeading(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Patient & appointment fields
  const [date, setDate] = useState(todayISO());
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  // Auto-fill: looks up existing patient once a full 10-digit mobile number is entered
  const [patientLookupStatus, setPatientLookupStatus] = useState<'idle' | 'loading' | 'found' | 'not-found'>('idle');

  // Slots
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [usingFallbackSlots, setUsingFallbackSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Submission
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [appointmentId, setAppointmentId] = useState<string | undefined>(undefined);
  const [tokenNumber, setTokenNumber] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!isOpen || !date) return;
    let cancelled = false;
    setSlotsLoading(true);
    setSelectedSlot(null);
    fetchAvailableSlots(date)
      .then(({ slots, usingFallback }) => {
        if (cancelled) return;
        setSlots(slots);
        setUsingFallbackSlots(usingFallback);
      })
      .catch(() => {
        if (cancelled) return;
        setSlots([]);
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, date]);

  useEffect(() => {
    const digits = mobile.replace(/\D/g, '');
    if (digits.length !== 10) {
      setPatientLookupStatus('idle');
      return;
    }

    let cancelled = false;
    setPatientLookupStatus('loading');
    const timer = setTimeout(() => {
      fetchPatientByMobile(digits).then((result) => {
        if (cancelled) return;
        if (result?.found) {
          setPatientLookupStatus('found');
          // Only fill in fields the visitor hasn't already typed something into.
          setFullName((prev) => (prev.trim() ? prev : result.fullName || ''));
          setDob((prev) => (prev ? prev : result.dateOfBirth || ''));
        } else {
          setPatientLookupStatus('not-found');
        }
      });
    }, 400); // debounce so it doesn't fire on every keystroke

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mobile]);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setStatus('idle');
    setErrorMessage('');
    setAppointmentId(undefined);
    setTokenNumber(undefined);
    setDate(todayISO());
    setMobile('');
    setFullName('');
    setDob('');
    setSelectedSlot(null);
    setPatientLookupStatus('idle');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !mobile.trim() || !date || !selectedSlot) {
      setStatus('error');
      setErrorMessage('Please fill in your name and mobile number, then pick a slot on the right.');
      return;
    }

    const mobileDigits = mobile.replace(/[^0-9]/g, '');
    if (mobileDigits.length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a valid mobile number.');
      return;
    }

    const payload: BookingPayload = {
      patientName: fullName.trim(),
      patientPhone: mobile.trim(),
      patientDOB: dob || undefined,
      slotStart: selectedSlot.rawStart,
      slotEnd: selectedSlot.rawEnd,
      tokenNumber: selectedSlot.tokenNumber,
      // Payment isn't collected on the public form — always sent as "cash"
      // as a placeholder; the clinic settles the real method in person.
      paymentType: 'cash',
    };

    setStatus('submitting');
    setErrorMessage('');

    try {
      const result = await submitAppointment(payload);
      setAppointmentId(result.appointmentId);
      setTokenNumber(result.tokenNumber);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof BookingError ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const isClosedDay = !slotsLoading && slots.length === 0 && date;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-slate-50 rounded-3xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetAndClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="m-6 sm:m-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center py-16 px-8 gap-4">
            <div className="p-3 bg-emerald-50 rounded-full">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Appointment Confirmed</h2>
            <p className="text-sm text-slate-600 max-w-sm">
              Thanks, {fullName.split(' ')[0]}. {tokenNumber ? `Token #${tokenNumber} — ` : ''}your slot on{' '}
              {formatDateHeading(date)} at {selectedSlot?.start} is booked. See you then!
            </p>
            {appointmentId && <p className="text-xs text-slate-400">Reference: {appointmentId}</p>}
            <button
              onClick={resetAndClose}
              className="mt-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-full transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <h2 id="booking-modal-title" className="font-serif text-2xl font-bold text-slate-900">
              Book with {DOCTOR_INFO.shortName}
            </h2>
            <p className="text-sm text-slate-500 mb-6">Pulmonology</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">
              {/* Left: Patient & appointment fields — its own card. On mobile this
                  comes AFTER the slots card (order-2); on desktop it's back on
                  the left (lg:order-1) and stays pinned in place while the
                  slots card scrolls internally (lg:sticky). */}
              <div className="order-2 lg:order-1 lg:sticky lg:top-6 lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Patient &amp; appointment</h3>

                <div>
                  <label htmlFor="bm-date" className="block text-xs font-bold text-slate-600 mb-1.5">
                    Date
                  </label>
                  <input
                    id="bm-date"
                    type="date"
                    value={date}
                    min={todayISO()}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="bm-mobile" className="block text-xs font-bold text-slate-600 mb-1.5">
                    Mobile number
                  </label>
                  <input
                    id="bm-mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                  {patientLookupStatus === 'loading' && (
                    <p className="mt-1 text-[11px] text-slate-400">Checking existing records…</p>
                  )}
                  {patientLookupStatus === 'found' && (
                    <p className="mt-1 text-[11px] text-emerald-600 font-semibold">
                      Existing patient found — details filled in below.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="bm-name" className="block text-xs font-bold text-slate-600 mb-1.5">
                    Full name
                  </label>
                  <input
                    id="bm-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Patient full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="bm-dob" className="block text-xs font-bold text-slate-600 mb-1.5">
                    Date of birth
                  </label>
                  <input
                    id="bm-dob"
                    type="date"
                    value={dob}
                    max={todayISO()}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-600 mb-1.5">Selected slot</p>
                  {selectedSlot ? (
                    <div className="px-4 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-sm font-bold text-brand-700">
                      {selectedSlot.start} – {selectedSlot.end}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">Pick a slot on the right → (available to book)</p>
                  )}
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-lg shadow-pink-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <span>Confirm Booking</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-xs text-slate-400">Prefer to talk?</span>
                  <a
                    href={`tel:${DOCTOR_INFO.contact.phone}`}
                    className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call {DOCTOR_INFO.contact.phone}
                  </a>
                </div>
              </div>

              {/* Right: Slot grid — its own card. Appears FIRST on mobile
                  (order-1) so visitors pick a slot before scrolling down to
                  the form/Confirm button; back on the right on desktop. */}
              <div className="order-1 lg:order-2 lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col min-h-[420px]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-black text-slate-800">
                    Slots for {formatDateHeading(date)}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-bold">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Available
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <span className="w-2 h-2 rounded-full bg-red-400" /> Booked
                    </span>
                  </div>
                </div>

                {usingFallbackSlots && !slotsLoading && slots.length > 0 && (
                  <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">
                    Showing standard clinic hours. Live slot availability will appear here once connected to the
                    clinic system.
                  </p>
                )}

                <div className="flex-1 overflow-y-auto pr-1 space-y-5">
                  {slotsLoading ? (
                    <div className="flex items-center justify-center h-full py-16 text-slate-400 gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm">Loading slots...</span>
                    </div>
                  ) : isClosedDay ? (
                    <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-1">
                      <p className="text-sm font-bold text-slate-600">No slots on this date</p>
                      <p className="text-xs text-slate-400">
                        {DOCTOR_INFO.clinicName} is closed Sundays. Please pick another date.
                      </p>
                    </div>
                  ) : (
                    <SlotList items={slots} selectedId={selectedSlot?.id} onSelect={setSelectedSlot} />
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function SlotList({
  items,
  selectedId,
  onSelect,
}: {
  items: Slot[];
  selectedId?: string;
  onSelect: (slot: Slot) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((slot, i) => {
        const isBooked = slot.status === 'booked';
        const isSelected = slot.id === selectedId;
        return (
          <button
            type="button"
            key={slot.id}
            disabled={isBooked}
            onClick={() => onSelect(slot)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-colors ${
              isBooked
                ? 'bg-red-50/60 border-red-100 text-red-300 cursor-not-allowed'
                : isSelected
                  ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50'
            }`}
          >
            <span className="font-bold">
              #{i + 1} &nbsp; {slot.start} – {slot.end}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isBooked
                  ? 'bg-red-100 text-red-500'
                  : isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-50 text-emerald-600'
              }`}
            >
              {isBooked ? 'Booked' : 'Available'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
