import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ShieldCheck, Wind, Activity, Sparkles, HeartPulse, ChevronRight } from 'lucide-react';
import { FAQS, DOCTOR_INFO } from '../data';

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState(0);

  const icons = [
    <Wind className="w-4 h-4" />,
    <Sparkles className="w-4 h-4" />,
    <Activity className="w-4 h-4" />,
    <HeartPulse className="w-4 h-4" />
  ];

  const currentFaq = FAQS[activeTab] || FAQS[0];

  return (
    <section id="faqs" className="py-14 md:py-18 bg-slate-50 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-100/60 rounded-full text-xs font-extrabold text-brand-700 uppercase tracking-widest mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-brand-500" />
            <span>Patient Help & FAQs</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight italic">
            Common Respiratory & Lung Health Questions
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 font-semibold mt-3.5 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Find immediate, medical-grade answers on asthma triggers, bronchitis care, COPD management, and sleep apnea treatment.
          </p>
        </div>

        {/* Space-Saving Tabbed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-4xl mx-auto">
          
          {/* Left / Top Side: Tabs column */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none justify-start lg:justify-center">
            {FAQS.map((faq, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider text-left transition-all duration-200 border whitespace-nowrap lg:whitespace-normal w-full shrink-0 ${
                    isActive
                      ? 'bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-100 scale-102 z-10'
                      : 'bg-white border-slate-150 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-600'}`}>
                    {icons[index] || <HelpCircle className="w-4 h-4" />}
                  </div>
                  <span className="flex-1 text-left truncate lg:whitespace-normal">{faq.category}</span>
                  <ChevronRight className={`w-3.5 h-3.5 hidden lg:block transition-transform ${isActive ? 'translate-x-0.5 text-white' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Right / Bottom Side: Display Active FAQ Answer */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between h-full text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center text-[9px] font-black tracking-widest uppercase text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-md">
                      Selected Topic: {currentFaq.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {currentFaq.question}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                    {currentFaq.answer}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Medically verified response by {DOCTOR_INFO.fullName}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Informational Disclaimer */}
        <div className="mt-10 text-center max-w-xl mx-auto text-[10px] font-bold text-slate-400">
          <p className="leading-relaxed">
            Disclaimer: The medical information provided above is purely for educational purposes and should not substitute professional clinical diagnosis, custom second opinions, or emergency hospital treatment.
          </p>
        </div>

      </div>
    </section>
  );
}
