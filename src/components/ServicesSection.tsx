import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Moon, 
  Wind, 
  Stethoscope,
  HeartPulse,
  PlusCircle
} from 'lucide-react';
import { INTERVENTIONAL_SKILLS } from '../data';

// Helper to match skill names to custom clean icons
const getSkillIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('asthma') || n.includes('airway') || n.includes('bronchitis')) return <Wind className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors duration-200" />;
  if (n.includes('copd') || n.includes('bronchitis')) return <Activity className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors duration-200" />;
  if (n.includes('sleep') || n.includes('apnea')) return <Moon className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors duration-200" />;
  if (n.includes('pft') || n.includes('testing') || n.includes('function') || n.includes('diagnostics')) return <HeartPulse className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors duration-200" />;
  return <Stethoscope className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors duration-200" />;
};

const SKILL_IMAGES: Record<string, string> = {
  s1: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600', // Bronchoscopy & BAL
  s2: 'https://images.unsplash.com/photo-1582718153767-91500045582b?auto=format&fit=crop&q=80&w=600', // Biopsy & Brushing
  s3: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600', // Pleural Tapping
  s4: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600', // Drainage Tube Placement
  s5: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600', // Sleep Study / Polysomnography
  s6: 'https://images.unsplash.com/photo-1611556492449-614740f98e7b?auto=format&fit=crop&q=80&w=600', // PFT testing
  s7: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600', // ICU Ventilation / BIPAP
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-100/60 rounded-full text-xs font-extrabold text-brand-700 uppercase tracking-widest mb-3 shadow-xs">
            <PlusCircle className="w-3.5 h-3.5 text-brand-500" />
            <span>Pulmonary Specializations</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight italic">
            Patient-Centered Chest & Sleep Diagnostics
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 font-semibold mt-3.5 text-xs sm:text-sm leading-relaxed">
            Utilizing state-of-the-art diagnostic and therapeutic technologies to deliver personalized clinical solutions for every patient.
          </p>
        </div>

        {/* Grid of Clean Services with Medical Background Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {INTERVENTIONAL_SKILLS.map((skill, index) => (
            <motion.div
              layout
              key={skill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 overflow-hidden min-h-[380px]"
            >
              {/* Card Header Image Area */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100 shrink-0">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${SKILL_IMAGES[skill.id] || SKILL_IMAGES.s1}')` }}
                  role="img"
                  aria-label={skill.name}
                />
                {/* Soft gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                
                {/* Floating Icon Circle badge */}
                <div className="absolute bottom-3 left-4 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all duration-300">
                  {getSkillIcon(skill.name)}
                </div>
              </div>

              {/* Card Body Area */}
              <div className="p-5 flex flex-col flex-1 justify-between text-left">
                <div>
                  {/* Name / Title */}
                  <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors duration-200 mb-2 leading-snug">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                    {skill.description}
                  </p>
                </div>

                {/* Skill category badge at bottom */}
                <div className="mt-4 pt-3 border-t border-slate-100 w-full flex justify-between items-center">
                  <span className="text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors duration-200">
                    {skill.category}
                  </span>
                  
                  <span className="text-[10px] font-extrabold text-brand-600 group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-0.5">
                    <span>Clinical Care</span>
                    <span className="text-xs">→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
