import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Briefcase, Stethoscope, Mail, Phone, Calendar, ArrowRight, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { DOCTOR_INFO, QUALIFICATIONS, EXPERIENCES, INTERVENTIONAL_SKILLS } from '../data';
import unnamed from '../assets/images/unnamed.webp';

export default function DoctorProfile() {
  const [activeTab, setActiveTab] = useState<'qualifications' | 'experience' | 'expertise'>('qualifications');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Dynamic Ambient Background Highlight Orbs */}
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-80 bg-brand-400/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-brand-600 uppercase tracking-widest block mb-2">Meet Your Specialist</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight italic">
            About Dr. Merugu Sai Sashank
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-500 to-emerald-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 font-semibold mt-4 text-sm sm:text-base leading-relaxed">
            Assistant Professor & Consultant Pulmonologist with an exceptional record in interventional pulmonary medicine, sleep diagnostics, and acute airway therapeutics.
          </p>
        </div>

        {/* Statistical Metrics Grid with Premium Background Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-br from-white to-blue-50/40 border border-blue-100/60 rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-brand-300 transition-all duration-300 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-xl -z-10 transition-transform duration-500 group-hover:scale-125"></div>
            <p className="text-3xl sm:text-4xl font-black text-brand-600 tracking-tight mb-1 sm:mb-2 font-mono">2000+</p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-wide">Happy Patients</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1">Trusted respiratory recovery</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-emerald-50/40 border border-emerald-100/60 rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl -z-10 transition-transform duration-500 group-hover:scale-125"></div>
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight mb-1 sm:mb-2 font-mono">8+</p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-wide">Years Experience</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1">Advanced clinical workup</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gradient-to-br from-white to-indigo-50/40 border border-indigo-100/60 rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-indigo-300 transition-all duration-300 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl -z-10 transition-transform duration-500 group-hover:scale-125"></div>
            <p className="text-3xl sm:text-4xl font-black text-indigo-600 tracking-tight mb-1 sm:mb-2 font-mono">8</p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-wide">Specializations</p>
            <p className="text-[10px] text-slate-500 font-bold mt-1">Comprehensive chest therapeutics</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-gradient-to-br from-white to-amber-50/40 border border-amber-100/60 rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:border-amber-300 transition-all duration-300 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl -z-10 transition-transform duration-500 group-hover:scale-125"></div>
            <p className="text-3xl sm:text-4xl font-black text-amber-500 tracking-tight mb-1 sm:mb-2 font-mono">4.9</p>
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-wide flex items-center justify-center gap-1">
              <span>Patient Rating</span>
              <span className="text-amber-400 text-xs">★</span>
            </p>
            <p className="text-[10px] text-slate-500 font-bold mt-1">Outstanding care reviews</p>
          </motion.div>
        </div>

        {/* Doctor Summary Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Summary Card with Ultra Premium Clinical Blue & Teal Gradient */}
          <div className="lg:col-span-4 bg-gradient-to-br from-brand-600 via-blue-600 to-teal-500 border border-brand-500/30 shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-left text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-300/10 rounded-full blur-3xl -z-10"></div>
            
            <div>
              <div className="flex items-center gap-1 bg-white/15 border border-white/20 text-white px-3 py-1 rounded-full w-fit mb-6 text-[10px] font-extrabold tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-teal-200" />
                <span>Pulmonology Specialist</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Dr. Merugu Sai Sashank
              </h3>
              <p className="text-xs font-bold text-teal-100 tracking-wider uppercase mt-1">
                {DOCTOR_INFO.degreeShort}
              </p>

              <div className="h-[1px] bg-white/10 my-6"></div>

              {/* Patient Confidence Metrics */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 border border-white/10 rounded-xl text-teal-200 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white/90 tracking-tight">Academic Rank</h4>
                    <p className="text-xs text-teal-50/90 font-semibold mt-0.5">Assistant Professor</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 border border-white/10 rounded-xl text-teal-200 shrink-0">
                    <Heart className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white/90 tracking-tight">Clinical Care Focus</h4>
                    <p className="text-xs text-teal-50/90 font-semibold mt-0.5">Patient-Centric Respiratory Diagnostics</p>
                  </div>
                </div>
              </div>

              {/* Doctor Portrait Image */}
              <div className="mt-8 relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/20 shadow-lg group/photo bg-brand-700/50">
                <img 
                  src={unnamed} 
                  alt={DOCTOR_INFO.fullName}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/photo:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300" />
                {/* Subtle light reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover/photo:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs font-bold">
              <a 
                href={`tel:${DOCTOR_INFO.contact.phone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 hover:text-white rounded-2xl transition-all duration-200 border border-white/10 text-white"
              >
                <Phone className="w-4 h-4 text-teal-200" />
                <div className="text-left">
                  <p className="text-[9px] text-teal-100 uppercase tracking-wider font-extrabold">Emergency & Booking Call</p>
                  <p className="text-white font-extrabold">{DOCTOR_INFO.contact.phone}</p>
                </div>
              </a>

              <a 
                href={`mailto:${DOCTOR_INFO.contact.email}`} 
                className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 hover:text-white rounded-2xl transition-all duration-200 border border-white/10 text-white"
              >
                <Mail className="w-4 h-4 text-teal-200" />
                <div className="text-left">
                  <p className="text-[9px] text-teal-100 uppercase tracking-wider font-extrabold">Official Email Address</p>
                  <p className="text-white break-all font-extrabold">{DOCTOR_INFO.contact.email}</p>
                </div>
              </a>
            </div>

          </div>

          {/* Right Detailed Tab Panel */}
          <div className="lg:col-span-8 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col text-left">
            
            {/* Interactive Tab Headers */}
            <div className="flex flex-wrap p-1 bg-slate-100 rounded-2xl mb-8 gap-1">
              <button
                onClick={() => setActiveTab('qualifications')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'qualifications'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Qualifications</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'experience'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Working Experience</span>
              </button>

              <button
                onClick={() => setActiveTab('expertise')}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === 'expertise'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Interventional Skills</span>
              </button>
            </div>

            {/* Tab Body with Custom Colored Highlighting */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {activeTab === 'qualifications' && (
                  <motion.div
                    key="qualifications"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-6"
                  >
                    {QUALIFICATIONS.map((qual, idx) => {
                      // Custom premium medical color coding based on degree
                      let cardStyle = "bg-gradient-to-br from-brand-50/30 via-white to-brand-50/10 border-brand-100 hover:border-brand-400 hover:bg-brand-50/20";
                      let badgeStyle = "text-brand-700 bg-brand-50 border-brand-100";
                      
                      if (qual.id === "q3") { // Fellowship
                        cardStyle = "bg-gradient-to-br from-indigo-50/40 via-white to-indigo-50/15 border border-indigo-100/80 hover:border-indigo-400 hover:bg-indigo-50/20 hover:shadow-indigo-500/5";
                        badgeStyle = "text-indigo-700 bg-indigo-50 border-indigo-100";
                      } else if (qual.id === "q2") { // MD Pulmonology
                        cardStyle = "bg-gradient-to-br from-blue-50/40 via-white to-blue-50/15 border border-blue-100/80 hover:border-blue-400 hover:bg-blue-50/20 hover:shadow-blue-500/5";
                        badgeStyle = "text-blue-700 bg-blue-50 border-blue-100";
                      } else if (qual.id === "q1") { // MBBS
                        cardStyle = "bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/15 border border-emerald-100/80 hover:border-emerald-400 hover:bg-emerald-50/20 hover:shadow-emerald-500/5";
                        badgeStyle = "text-emerald-700 bg-emerald-50 border-emerald-100";
                      }

                      return (
                        <motion.div
                          key={qual.id}
                          variants={itemVariants}
                          className={`p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start gap-4 transition-all duration-300 shadow-sm relative overflow-hidden group ${cardStyle}`}
                        >
                          {/* Left colored accent bar */}
                          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-brand-500/0 via-brand-500/50 to-brand-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="space-y-2 relative">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${badgeStyle}`}>
                              {qual.degree}
                            </span>
                            <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">{qual.field}</h4>
                            <p className="text-xs font-bold text-slate-600">{qual.institute}</p>
                            {qual.university && (
                              <p className="text-[11px] font-bold text-slate-400">Affiliated with {qual.university}</p>
                            )}
                            {qual.details && (
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold pt-2 border-t border-slate-100 mt-2">
                                {qual.details}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0 flex items-center gap-1.5 text-xs font-extrabold text-slate-500 bg-white/80 border border-slate-100 px-3 py-1.5 rounded-xl shadow-xs">
                            <Calendar className="w-4 h-4 text-brand-400" />
                            <span>{qual.year}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {activeTab === 'experience' && (
                  <motion.div
                    key="experience"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="relative pl-8 border-l-2 border-slate-200/80 space-y-8 ml-3"
                  >
                    {EXPERIENCES.map((exp, idx) => {
                      const isCurrent = idx === 0 || exp.period.includes("2025") || exp.period.includes("Present");
                      return (
                        <motion.div
                          key={exp.id}
                          variants={itemVariants}
                          className="relative group"
                        >
                          {/* Timeline point indicator with glowing backdrop */}
                          <div className={`absolute -left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-white shadow-md transition-all duration-300 group-hover:scale-110 ${
                            isCurrent 
                              ? 'bg-emerald-500 ring-4 ring-emerald-100/80 animate-pulse' 
                              : 'bg-brand-500 ring-4 ring-brand-100/60'
                          }`}></div>

                          <div className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col gap-2 shadow-sm ${
                            isCurrent
                              ? 'bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/10 border-emerald-100/80 hover:border-emerald-300 hover:bg-emerald-50/20'
                              : 'bg-gradient-to-br from-slate-50/60 via-white to-slate-50/30 border-slate-100 hover:border-brand-200 hover:bg-brand-50/10'
                          }`}>
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className={`text-[10px] font-black tracking-wider px-2.5 py-1 rounded-md border uppercase ${
                                isCurrent
                                  ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                                  : 'text-brand-700 bg-brand-50 border-brand-100'
                              }`}>
                                {exp.period}
                              </span>
                              {isCurrent && (
                                <span className="flex items-center gap-1 text-[9px] font-extrabold text-emerald-600 tracking-wider uppercase bg-emerald-100/50 px-2 py-0.5 rounded">
                                  ● Active / Chief Role
                                </span>
                              )}
                            </div>
                            
                            <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight pt-1">
                              {exp.role}
                            </h4>
                            
                            <p className="text-xs sm:text-sm font-extrabold text-slate-700 flex items-center gap-1.5">
                              <span className="text-brand-600">{exp.place}</span>
                              {exp.location && (
                                <span className="text-slate-400 font-bold">• {exp.location}</span>
                              )}
                            </p>
                            
                            {exp.details && (
                              <p className="text-xs text-slate-500 font-semibold leading-relaxed pt-2 border-t border-slate-100/80 mt-1 max-w-2xl">
                                {exp.details}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {activeTab === 'expertise' && (
                  <motion.div
                    key="expertise"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {INTERVENTIONAL_SKILLS.map((skill, idx) => {
                      // Custom theme color highlights per category
                      let themeStyle = "from-brand-50/40 via-white to-brand-50/10 border-brand-100/60 hover:border-brand-300 hover:shadow-brand-500/5";
                      let badgeStyle = "bg-brand-50 text-brand-700 border-brand-100";
                      
                      if (skill.category === 'Advanced') {
                        themeStyle = "from-amber-50/40 via-white to-amber-50/10 border-amber-100/60 hover:border-amber-300 hover:shadow-amber-500/5";
                        badgeStyle = "bg-amber-50 text-amber-700 border-amber-100";
                      } else if (skill.category === 'Therapeutic') {
                        themeStyle = "from-indigo-50/40 via-white to-indigo-50/10 border-indigo-100/60 hover:border-indigo-300 hover:shadow-indigo-500/5";
                        badgeStyle = "bg-indigo-50 text-indigo-700 border-indigo-100";
                      } else if (skill.category === 'Diagnostic') {
                        themeStyle = "from-emerald-50/40 via-white to-emerald-50/10 border-emerald-100/60 hover:border-emerald-300 hover:shadow-emerald-500/5";
                        badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-100";
                      }

                      return (
                        <motion.div
                          key={skill.id}
                          variants={itemVariants}
                          className={`p-5 bg-gradient-to-br border rounded-2xl hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between group ${themeStyle}`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded border ${badgeStyle}`}>
                                {skill.category}
                              </span>
                              <div className="w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-xs">
                                <Stethoscope className="w-4 h-4 transition-colors duration-200" />
                              </div>
                            </div>
                            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight tracking-tight">
                              {skill.name}
                            </h4>
                            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                              {skill.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
