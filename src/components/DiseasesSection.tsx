import React from 'react';
import { motion } from 'motion/react';
import { Wind, Moon, Activity, Eye, ShieldAlert, Heart, CalendarCheck, Sparkles, HelpCircle } from 'lucide-react';
import { DOCTOR_INFO } from '../data';

interface Disease {
  id: string;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  imageUrl: string;
  icon: React.ReactNode;
}

export default function DiseasesSection() {
  const diseases: Disease[] = [
    {
      id: 'd1',
      name: 'Severe Asthma & Respiratory Allergies',
      category: 'Chronic Airway Care',
      description: 'Expert diagnostics and targeted therapy for bronchial asthma, allergic bronchitis, and environmental respiratory sensitivity.',
      symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Dry cough'],
      imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
      icon: <Wind className="w-5 h-5 text-sky-400" />
    },
    {
      id: 'd2',
      name: 'COPD & Chronic Bronchitis',
      category: 'Progressive Lung Care',
      description: 'Comprehensive evaluation and personalized inhaler/rehabilitation therapies for Chronic Obstructive Pulmonary Disease.',
      symptoms: ['Chronic smoker cough', 'Excessive mucus', 'Fatigue on walking', 'Squeezing chest'],
      imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
      icon: <Activity className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 'd3',
      name: 'Obstructive Sleep Apnea & Snoring',
      category: 'Sleep-Disordered Breathing',
      description: 'State-of-the-art Polysomnography (sleep study) diagnostics and tailored CPAP/BiPAP therapeutic titrations.',
      symptoms: ['Heavy choking snore', 'Morning headaches', 'Daytime sleepiness', 'Gasping at night'],
      imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      icon: <Moon className="w-5 h-5 text-indigo-400" />
    },
    {
      id: 'd4',
      name: 'Interstitial Lung Disease (ILD) & Fibrosis',
      category: 'Advanced Diagnostics',
      description: 'High-precision monitoring and treatment protocols to arrest or slow down progressive pulmonary parenchymal scarring.',
      symptoms: ['Dry hacking cough', 'Progressive dyspnea', 'Rapid shallow breathing', 'Joint/muscle pain'],
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />
    },
    {
      id: 'd5',
      name: 'Pleural Effusion & Fluid Accumulation',
      category: 'Interventional Pulmonology',
      description: 'Safe ultrasound-guided pleural taps and chest tube (intercostal catheter) insertions for instant breathing relief.',
      symptoms: ['Pleuritic chest pain', 'Inability to lie flat', 'Dry cough', 'Fever with chills'],
      imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      icon: <Heart className="w-5 h-5 text-rose-400" />
    },
    {
      id: 'd6',
      name: 'Lung Infections, TB & Pneumonia',
      category: 'Infectious Pulmonary Diseases',
      description: 'Accurate clinical workup, culture testing, and guideline-based management for pulmonary tuberculosis, pneumonia, and bronchiectasis.',
      symptoms: ['Persistent high fever', 'Yellow/green sputum', 'Weight loss / Night sweats', 'Generalized weakness'],
      imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800',
      icon: <Sparkles className="w-5 h-5 text-violet-400" />
    }
  ];

  return (
    <section id="diseases" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 overflow-hidden relative">
      {/* Visual background decorative details */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-100/60 rounded-full text-xs font-extrabold text-brand-700 uppercase tracking-widest block mb-4 w-fit mx-auto shadow-xs">
            Specialist Clinical Focus
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight italic">
            Respiratory & Chest Diseases We Treat
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 font-semibold mt-4 text-sm sm:text-base leading-relaxed">
            Get professional, evidence-based care from our consulting pulmonologist. We diagnose, treat, and monitor chronic or acute lung conditions with advanced interventional protocols.
          </p>
        </div>

        {/* Diseases Grid with Split Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diseases.map((disease, idx) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group flex flex-col bg-white border border-slate-100 hover:border-brand-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left"
            >
              {/* Card Image Area */}
              <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${disease.imageUrl}')` }}
                  role="img"
                  aria-label={disease.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                
                {/* Category tag on image */}
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-sm">
                  <span className="text-[10px] font-black tracking-wider uppercase text-brand-700">
                    {disease.category}
                  </span>
                </div>

                {/* Category Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-brand-600 shadow-sm border border-white/20">
                  {disease.icon}
                </div>
              </div>

              {/* Card Content container */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Disease Title */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors duration-250 leading-tight">
                    {disease.name}
                  </h3>

                  {/* Disease Description */}
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-2.5">
                    {disease.description}
                  </p>
                </div>

                {/* Key Symptoms / Diagnostic indicators */}
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Common Warning Symptoms:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {disease.symptoms.map((symptom, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-full group-hover:bg-brand-50/50 group-hover:text-brand-700 group-hover:border-brand-100 transition-all duration-200"
                      >
                        • {symptom}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Consultation CTA Block */}
        <div className="mt-16 p-8 sm:p-10 bg-gradient-to-br from-brand-600 via-blue-600 to-teal-500 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6 text-left text-white shadow-xl relative overflow-hidden">
          {/* Subtle overlay gradients for extra depth */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-300/10 rounded-full blur-2xl -z-10"></div>

          <div className="space-y-2 max-w-2xl relative z-10">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-teal-200 shrink-0" />
              <span>Experiencing persistent chest or lung symptoms?</span>
            </h3>
            <p className="text-xs sm:text-sm text-teal-50/90 font-semibold leading-relaxed">
              Do not ignore a chronic cough, breathlessness, or loud snoring. Dr. Merugu Sai Sashank offers advanced clinical screening and interventional bronchoscopy diagnostics.
            </p>
          </div>
          <button
            onClick={() => { window.location.href = `tel:${DOCTOR_INFO.contact.phone.replace(/\s+/g, '')}`; }}
            className="w-full lg:w-auto px-6 py-4 bg-white hover:bg-teal-50 text-brand-700 hover:text-brand-800 text-xs font-black uppercase tracking-widest rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 shrink-0 flex items-center justify-center gap-2.5 relative z-10"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Consult Dr. Sashank Now</span>
          </button>
        </div>

      </div>
    </section>
  );
}
