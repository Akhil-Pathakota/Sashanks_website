import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Heart, 
  ArrowUp, 
  Stethoscope, 
  Award,
  Calendar
} from 'lucide-react';
import { DOCTOR_INFO } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <button onClick={handleScrollToTop} className="flex items-center gap-2 text-left group">
              <div className="p-2.5 bg-brand-900/50 text-brand-400 rounded-xl border border-brand-800 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <Stethoscope className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="block font-display font-extrabold text-lg text-white tracking-tight leading-none">
                  SASHANK’S
                </span>
                <span className="block text-[10px] font-bold text-brand-400 tracking-widest uppercase mt-1 leading-none">
                  CHEST & ALLERGY CLINIC
                </span>
              </div>
            </button>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Expert diagnosis, clinical excellence, and personalized therapies for asthma, respiratory disease, COPD, chronic bronchitis, and sleep apnea. Led by chief specialist <strong>{DOCTOR_INFO.fullName}</strong>.
            </p>

            {/* Timings summary */}
            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 space-y-2 text-xs">
              <p className="font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400" />
                <span>OPD Operational Hours</span>
              </p>
              <div className="text-slate-400 font-medium space-y-1 pl-6 leading-relaxed">
                <p>Morning: <span className="text-white font-semibold">{DOCTOR_INFO.timings.morning}</span></p>
                <p>Evening: <span className="text-white font-semibold">{DOCTOR_INFO.timings.evening}</span></p>
                <p className="text-[11px] text-brand-400 mt-1">{DOCTOR_INFO.timings.days}</p>
              </div>
            </div>
          </div>

          {/* Quicklinks Col */}
          <div className="lg:col-span-3 text-left space-y-5">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Clinic Quicklinks
            </h4>
            <div className="flex flex-col gap-3 text-xs font-semibold text-slate-400">
              <button onClick={() => onNavigate('home')} className="hover:text-brand-400 transition-colors text-left flex items-center gap-1.5">
                <span>•</span> <span>Main Dashboard</span>
              </button>
              <button onClick={() => onNavigate('about')} className="hover:text-brand-400 transition-colors text-left flex items-center gap-1.5">
                <span>•</span> <span>About Dr. Merugu Sai Sashank</span>
              </button>
              <button onClick={() => onNavigate('diseases')} className="hover:text-brand-400 transition-colors text-left flex items-center gap-1.5">
                <span>•</span> <span>Diseases We Treat</span>
              </button>
              <button onClick={() => onNavigate('services')} className="hover:text-brand-400 transition-colors text-left flex items-center gap-1.5">
                <span>•</span> <span>Pulmonary Specialties</span>
              </button>
              <button onClick={() => onNavigate('experiences')} className="hover:text-brand-400 transition-colors text-left flex items-center gap-1.5">
                <span>•</span> <span>Patient Experiences</span>
              </button>
              <button onClick={() => onNavigate('research')} className="hover:text-brand-400 transition-colors text-left flex items-center gap-1.5">
                <span>•</span> <span>Publications & Academics</span>
              </button>
              <button onClick={() => onNavigate('faqs')} className="hover:text-brand-400 transition-colors text-left flex items-center gap-1.5">
                <span>•</span> <span>Patient Help & FAQ</span>
              </button>
            </div>
          </div>

          {/* Business Card replica (Col 3) */}
          <div className="lg:col-span-4 text-left space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest">
              Digital Visiting Card
            </h4>
            
            {/* Visiting card box */}
            <div className="bg-slate-950 p-5 rounded-xl border border-brand-900/40 relative overflow-hidden shadow-md flex flex-col justify-between min-h-[170px] group hover:border-brand-500/50 transition-colors duration-300">
              {/* Card Watermark */}
              <div className="absolute right-0 bottom-0 text-slate-900/60 font-black text-7xl select-none translate-x-4 translate-y-4 font-display pointer-events-none">
                Rx
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-brand-400 tracking-wider text-xs">Sashank’s</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Chest & Allergy Clinic</span>
                </div>
                <div className="pt-2">
                  <h5 className="font-extrabold text-white text-sm">{DOCTOR_INFO.fullName}</h5>
                  <p className="text-[10px] text-brand-300 font-extrabold mt-0.5">{DOCTOR_INFO.degreeShort}</p>
                  <p className="text-[9px] text-slate-400 leading-none mt-1">Consultant Pulmonologist</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 space-y-1 text-[10px] text-slate-400 font-semibold relative z-10">
                <a href={`tel:${DOCTOR_INFO.contact.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span>Call: {DOCTOR_INFO.contact.phone}</span>
                </a>
                <span className="flex items-center gap-1.5 leading-tight">
                  <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span>Peerzadiguda, Near Srikara Hospital</span>
                </span>
                <a href={`mailto:${DOCTOR_INFO.contact.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span className="break-all">Email: {DOCTOR_INFO.contact.email}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Copyright section */}
      <div className="bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 border-t border-slate-850 text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 {DOCTOR_INFO.clinicName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Uppal & Peerzadiguda, Hyderabad</span>
            <span className="text-slate-700">|</span>
            <button onClick={handleScrollToTop} className="flex items-center gap-1 hover:text-white transition-colors group">
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
