import React, { useState } from 'react';
import { Menu, X, Phone, Clock, MapPin, Calendar } from 'lucide-react';
import { DOCTOR_INFO } from '../data';
import LungLogo from './LungLogo';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onBookAppointment: () => void;
}

export default function Header({ onNavigate, activeSection, onBookAppointment }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-slate-100">
      {/* Top Notification Bar */}
      <div className="w-full bg-brand-900 text-brand-50 py-2 px-4 sm:px-6 lg:px-8 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-300" />
              <span>Timings: {DOCTOR_INFO.timings.morning} | {DOCTOR_INFO.timings.evening}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${DOCTOR_INFO.contact.phone}`} className="flex items-center gap-1 hover:text-brand-200 transition-colors">
              <Calendar className="w-3.5 h-3.5 text-brand-300" />
              <span>Book Appointment: {DOCTOR_INFO.contact.phone}</span>
            </a>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-300" />
              <span>Peerzadiguda, Near Srikara Hospital</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="p-1.5 bg-brand-50 rounded-2xl group-hover:bg-brand-100 transition-all duration-300">
              <LungLogo className="w-12 h-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic text-xl sm:text-2xl font-black text-blue-600 tracking-wide leading-none select-none">
                Sashank’s
              </span>
              <span className="font-sans font-black text-[10px] sm:text-[11px] text-slate-800 tracking-widest uppercase mt-1 leading-none select-none">
                CHEST & ALLERGY CLINIC
              </span>
            </div>
          </button>

          {/* Action Button (Visible on both Mobile and Desktop) */}
          <div className="flex items-center">
            <button
              onClick={onBookAppointment}
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:shadow-pink-500/35 transition-all duration-300 hover:-translate-y-0.5 uppercase tracking-wider flex items-center gap-1.5 active:scale-98"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>BOOK APPOINTMENT</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
