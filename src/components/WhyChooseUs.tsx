import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Moon, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Coins, 
  CalendarCheck, 
  MapPin 
} from 'lucide-react';
import { DOCTOR_INFO } from '../data';

export default function WhyChooseUs() {
  const benefits = [
    {
      id: 1,
      title: "Advanced Pulmonary Diagnostics (PFT)",
      description: "Equipped with high-precision spirometry, airway resistance analysis, and chest diagnostic tech.",
      icon: <Activity className="w-5 h-5 text-amber-500" />,
      bgIcon: "bg-amber-50"
    },
    {
      id: 2,
      title: "Specialized Severe Asthma Care",
      description: "Expert therapeutic plans, precise peak flow monitoring, and long-term pulmonary rehabilitation.",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      bgIcon: "bg-amber-50"
    },
    {
      id: 3,
      title: "Home Sleep Study & Apnea Care",
      description: "Advanced polysomnography diagnostic screening and customized CPAP therapy guidance.",
      icon: <Moon className="w-5 h-5 text-amber-500" />,
      bgIcon: "bg-amber-50"
    },
    {
      id: 4,
      title: "Safe & Sterile Clinical Environment",
      description: "Adherence to strict airborne infection control and high-efficiency HEPA air filtration standards.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      bgIcon: "bg-amber-50"
    },
    {
      id: 5,
      title: "Highly Trained MD Pulmonologist",
      description: `Expert respiratory care by ${DOCTOR_INFO.fullName}, an MD qualified clinical specialist.`,
      icon: <Award className="w-5 h-5 text-amber-500" />,
      bgIcon: "bg-amber-50"
    },
    {
      id: 6,
      title: "Affordable Chest Care Packages",
      description: "Comprehensive medical assessments made accessible with transparent, fair pricing structures.",
      icon: <span className="font-extrabold text-amber-600 text-sm font-sans">Rs</span>,
      bgIcon: "bg-amber-50"
    },
    {
      id: 7,
      title: "Easy Appointment Booking",
      description: "Hassle-free scheduling with minimal wait times to suit your busy lifestyle.",
      icon: <CalendarCheck className="w-5 h-5 text-amber-500" />,
      bgIcon: "bg-amber-50"
    },
    {
      id: 8,
      title: "Convenient Location in Boduppal",
      description: "Easily accessible clinic located in Peerzadiguda / Boduppal (Near Srikara Hospital).",
      icon: <MapPin className="w-5 h-5 text-amber-500" />,
      bgIcon: "bg-amber-50"
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-sans text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose Us
          </h2>
          <span className="text-xs font-extrabold text-amber-500 uppercase tracking-widest block mt-3">
            EXCELLENCE IN RESPIRATORY CARE
          </span>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-5 text-left"
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-full ${benefit.bgIcon} flex items-center justify-center shrink-0 shadow-2xs`}>
                {benefit.icon}
              </div>

              {/* Text content */}
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-800 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
