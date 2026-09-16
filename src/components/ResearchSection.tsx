import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, BookOpen, Award, ExternalLink, GraduationCap, Calendar, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DOCTOR_INFO, ACADEMICS, PUBLICATIONS } from '../data';

export default function ResearchSection() {
  const [activeTab, setActiveTab] = useState<'publications' | 'academics'>('publications');
  const [selectedPubIdx, setSelectedPubIdx] = useState(0);
  const [selectedAcadIdx, setSelectedAcadIdx] = useState(0);

  // Reset indices on tab switch to keep active view clean
  useEffect(() => {
    setSelectedPubIdx(0);
    setSelectedAcadIdx(0);
  }, [activeTab]);

  const selectedPub = PUBLICATIONS[selectedPubIdx] || PUBLICATIONS[0];
  const selectedAcad = ACADEMICS[selectedAcadIdx] || ACADEMICS[0];

  return (
    <section id="research" className="py-14 md:py-18 bg-white overflow-hidden relative">
      {/* Background soft gradients */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-100/60 rounded-full text-xs font-extrabold text-brand-700 uppercase tracking-widest mb-3 shadow-xs">
            <GraduationCap className="w-3.5 h-3.5 text-brand-500" />
            <span>Research & Academics</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight italic">
            Medical Literature & Publications
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-500 to-teal-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 font-semibold mt-3.5 text-xs sm:text-sm leading-relaxed">
            Dr. M. Sai Sashank actively participates in clinical studies, publishing research papers in prominent international and national peer-reviewed medical journals.
          </p>
        </div>

        {/* Space-Saving Tab Selection Switcher */}
        <div className="flex p-1 bg-slate-100/80 border border-slate-200/50 rounded-full max-w-sm mx-auto mb-10">
          <button
            onClick={() => setActiveTab('publications')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-250 ${
              activeTab === 'publications'
                ? 'bg-white text-brand-700 shadow-sm border border-slate-200/20'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Publications</span>
          </button>
          <button
            onClick={() => setActiveTab('academics')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-250 ${
              activeTab === 'academics'
                ? 'bg-white text-brand-700 shadow-sm border border-slate-200/20'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Presentations</span>
          </button>
        </div>

        {/* Dual Responsive Presentation Layout */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'publications' ? (
            <div>
              {/* DESKTOP SPLIT VIEW (lg:grid) */}
              <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch min-h-[340px]">
                {/* Left panel: Compact row titles */}
                <div className="col-span-5 flex flex-col gap-3.5 justify-center">
                  {PUBLICATIONS.map((pub, idx) => {
                    const isSelected = selectedPubIdx === idx;
                    return (
                      <button
                        key={pub.id}
                        onClick={() => setSelectedPubIdx(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-250 flex items-start gap-3 group relative overflow-hidden ${
                          isSelected
                            ? 'bg-gradient-to-r from-brand-50 to-white border-brand-500/80 shadow-md scale-102 z-10'
                            : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {/* Glow indicator line */}
                        {isSelected && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-600 rounded-l-full" />
                        )}
                        <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isSelected ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-50 text-slate-400 group-hover:text-brand-500 group-hover:bg-brand-50'}`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="space-y-1 pr-2">
                          <span className="text-[9px] font-black tracking-widest uppercase text-slate-400">Published {pub.year}</span>
                          <h4 className={`text-xs font-extrabold leading-tight line-clamp-2 transition-colors ${isSelected ? 'text-slate-950' : 'text-slate-700 group-hover:text-slate-950'}`}>
                            {pub.title}
                          </h4>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 self-center transition-transform ${isSelected ? 'translate-x-0.5 text-brand-600' : 'text-slate-300 group-hover:text-slate-500'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Right panel: Expanded beautiful detail card */}
                <div className="col-span-7 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedPubIdx}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white border border-slate-100 shadow-xl rounded-3xl p-8 text-left flex flex-col justify-between h-full relative"
                    >
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest uppercase text-brand-700 bg-brand-50/70 border border-brand-100 px-3 py-1 rounded-md">
                            <Calendar className="w-3.5 h-3.5 text-brand-500" />
                            <span>Published {selectedPub.year}</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 border border-emerald-100/60 px-2.5 py-1 rounded-md">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Peer Reviewed Research</span>
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                          {selectedPub.title}
                        </h3>

                        <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100/50">
                          <p className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-brand-500 shrink-0" />
                            <span>Journal: <span className="text-slate-800 font-black">{selectedPub.journal}</span></span>
                          </p>
                        </div>

                        {selectedPub.details && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Abstract Summary & Impact:</p>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                              {selectedPub.details}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Index Status: Active / Indexed</span>
                        </span>
                        <span className="text-brand-600 font-extrabold hover:underline cursor-pointer flex items-center gap-1">
                          <span>Read Article</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* MOBILE COMPACT INLINE ACCORDION (hidden lg:) */}
              <div className="lg:hidden space-y-4">
                {PUBLICATIONS.map((pub, idx) => {
                  const isExpanded = selectedPubIdx === idx;
                  return (
                    <div 
                      key={pub.id} 
                      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs transition-shadow duration-300 text-left"
                    >
                      <button
                        onClick={() => setSelectedPubIdx(isExpanded ? -1 : idx)}
                        className="w-full p-4 flex items-center justify-between gap-3 text-left focus:outline-hidden"
                      >
                        <div className="space-y-1.5 flex-1 pr-2">
                          <span className="inline-flex items-center text-[9px] font-black tracking-widest uppercase text-brand-700 bg-brand-50/70 border border-brand-100 px-2 py-0.5 rounded-sm">
                            Published {pub.year}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                            {pub.title}
                          </h4>
                        </div>
                        <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${isExpanded ? 'bg-brand-50 text-brand-600' : 'bg-slate-50 text-slate-400'}`}>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="px-4 pb-5 pt-3 border-t border-slate-50 bg-slate-50/40 space-y-4">
                              <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                                <span>Journal: <span className="text-slate-800 font-extrabold">{pub.journal}</span></span>
                              </p>
                              {pub.details && (
                                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                  {pub.details}
                                </p>
                              )}
                              <div className="flex items-center justify-between text-[10px] pt-3 border-t border-slate-100/60 font-bold text-slate-400">
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Peer Reviewed</span>
                                </span>
                                <span className="text-brand-600 font-extrabold flex items-center gap-1">
                                  <span>Full Article</span>
                                  <ExternalLink className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {/* DESKTOP SPLIT VIEW (lg:grid) */}
              <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch min-h-[340px]">
                {/* Left panel: Compact row titles */}
                <div className="col-span-5 flex flex-col gap-3.5 justify-center">
                  {ACADEMICS.map((acad, idx) => {
                    const isSelected = selectedAcadIdx === idx;
                    return (
                      <button
                        key={acad.id}
                        onClick={() => setSelectedAcadIdx(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-250 flex items-start gap-3 group relative overflow-hidden ${
                          isSelected
                            ? 'bg-gradient-to-r from-brand-50 to-white border-brand-500/80 shadow-md scale-102 z-10'
                            : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {/* Glow indicator line */}
                        {isSelected && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-600 rounded-l-full" />
                        )}
                        <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isSelected ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-50 text-slate-400 group-hover:text-brand-500 group-hover:bg-brand-50'}`}>
                          {acad.type === 'Award' ? <Award className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div className="space-y-1 pr-2">
                          <span className="text-[9px] font-black tracking-widest uppercase text-slate-400">{acad.type} • {acad.year}</span>
                          <h4 className={`text-xs font-extrabold leading-tight line-clamp-2 transition-colors ${isSelected ? 'text-slate-950' : 'text-slate-700 group-hover:text-slate-950'}`}>
                            {acad.title}
                          </h4>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 self-center transition-transform ${isSelected ? 'translate-x-0.5 text-brand-600' : 'text-slate-300 group-hover:text-slate-500'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Right panel: Expanded beautiful detail card */}
                <div className="col-span-7 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedAcadIdx}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="bg-white border border-slate-100 shadow-xl rounded-3xl p-8 text-left flex flex-col justify-between h-full relative"
                    >
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border ${
                            selectedAcad.type === 'Poster Presentation' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                            selectedAcad.type === 'Paper Presentation' ? 'bg-sky-50 text-sky-700 border-sky-100' :
                            selectedAcad.type === 'Dissertation' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                            'bg-emerald-50 text-emerald-700 border-emerald-100'
                          }`}>
                            {selectedAcad.type}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Presented {selectedAcad.year}</span>
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                          {selectedAcad.title}
                        </h3>

                        <div className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100/50">
                          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                            Presented & Shared in: <span className="text-slate-800 font-bold block mt-1">{selectedAcad.forum}</span>
                          </p>
                        </div>

                        {selectedAcad.details && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presentation Context & Focus:</p>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                              {selectedAcad.details}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Presented Academic Literature</span>
                        </span>
                        <span className="text-brand-600 font-extrabold flex items-center gap-1">
                          <span>View Forum</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* MOBILE COMPACT INLINE ACCORDION (hidden lg:) */}
              <div className="lg:hidden space-y-4">
                {ACADEMICS.map((acad, idx) => {
                  const isExpanded = selectedAcadIdx === idx;
                  return (
                    <div 
                      key={acad.id} 
                      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs transition-shadow duration-300 text-left"
                    >
                      <button
                        onClick={() => setSelectedAcadIdx(isExpanded ? -1 : idx)}
                        className="w-full p-4 flex items-center justify-between gap-3 text-left focus:outline-hidden"
                      >
                        <div className="space-y-1.5 flex-1 pr-2">
                          <span className="inline-flex items-center text-[9px] font-black tracking-widest uppercase text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-sm">
                            {acad.type} • {acad.year}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                            {acad.title}
                          </h4>
                        </div>
                        <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${isExpanded ? 'bg-brand-50 text-brand-600' : 'bg-slate-50 text-slate-400'}`}>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="px-4 pb-5 pt-3 border-t border-slate-50 bg-slate-50/40 space-y-3.5">
                              <p className="text-xs font-semibold text-slate-500">
                                Forum: <span className="text-slate-800 font-bold">{acad.forum}</span>
                              </p>
                              {acad.details && (
                                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                  {acad.details}
                                </p>
                              )}
                              <div className="flex items-center justify-between text-[10px] pt-3 border-t border-slate-100/60 font-bold text-slate-400">
                                <span className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Academic Presentation</span>
                                </span>
                                <span className="text-brand-600 font-extrabold flex items-center gap-1">
                                  <span>Forum Site</span>
                                  <ExternalLink className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
