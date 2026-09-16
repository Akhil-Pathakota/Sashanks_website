import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ShieldCheck, ChevronLeft, ChevronRight, MessageSquare, Sparkles, HeartHandshake } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: string;
  category: 'Asthma & Allergy' | 'Cough & Bronchitis' | 'Sleep Studies' | 'General Chest Care';
  rating: number;
  reviewDate: string;
  text: string;
  initials: string;
}

export default function TestimonialsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSlide, setActiveSlide] = useState(0);

  const categories = ['All', 'Asthma & Allergy', 'Cough & Bronchitis', 'Sleep Studies', 'General Chest Care'];

  const testimonials: Testimonial[] = [
    {
      id: 't1',
      name: 'Rajesh Kumar',
      location: 'Uppal, Hyderabad',
      treatment: 'Chronic Asthma & Dust Allergy',
      category: 'Asthma & Allergy',
      rating: 5,
      reviewDate: 'Reviewed 2 weeks ago',
      text: 'Dr. M. Sai Sashank is an excellent pulmonologist. I visited his clinic in Uppal for my chronic cough and severe dust allergy. He listened to my symptoms very patiently and explained the root cause of my issue. His treatment and inhaler advice was highly effective, and my breathing improved within days!',
      initials: 'RK',
    },
    {
      id: 't2',
      name: 'Priya R.',
      location: 'Habsiguda, Hyderabad',
      treatment: 'Severe Asthma & Wheezing',
      category: 'Asthma & Allergy',
      rating: 5,
      reviewDate: 'Reviewed 1 month ago',
      text: 'Highly recommended chest specialist in the Uppal region! I took my father to Dr. Sashank for his persistent asthma and breathing difficulty. The doctor was extremely professional, gentle, and suggested simple but effective inhaler inhalation techniques. My father\'s chronic wheezing has decreased significantly.',
      initials: 'PR',
    },
    {
      id: 't3',
      name: 'Anand Rao',
      location: 'Nacharam, Hyderabad',
      treatment: 'Severe Snoring & Obstructive Sleep Apnea',
      category: 'Sleep Studies',
      rating: 5,
      reviewDate: 'Reviewed 3 weeks ago',
      text: 'We consulted Dr. Sai Sashank for my heavy snoring and daytime exhaustion. He advised a Sleep Study (Polysomnography) and set up the BIPAP therapeutic configurations. Now I sleep peacefully, wake up refreshed, and feel fully energized throughout the day. A life-changing experience!',
      initials: 'AR',
    },
    {
      id: 't4',
      name: 'S. Kiran',
      location: 'Uppal Cross Roads, Hyderabad',
      treatment: 'Acute Bronchitis & Wheezing',
      category: 'Cough & Bronchitis',
      rating: 5,
      reviewDate: 'Reviewed 2 months ago',
      text: 'The best chest and allergy clinic in Uppal. Dr. Merugu Sai Sashank is highly skilled and very caring. He properly diagnosed my acute bronchitis and avoided prescribing unnecessary high-dose antibiotics. Extremely satisfied with his patient-centric ethics and recovery results.',
      initials: 'SK',
    },
    {
      id: 't5',
      name: 'Mohammad Ghouse',
      location: 'Ramanthapur, Hyderabad',
      treatment: 'Post-COVID Pulmonary Fibrosis',
      category: 'General Chest Care',
      rating: 5,
      reviewDate: 'Reviewed 3 weeks ago',
      text: 'Superb treatment! Dr. Sashank helped me recover from long-standing breathlessness post-COVID. He performed spirometry (PFT) right in the clinic and monitored my lung volumes. His medication schedule is very accurate and easy to follow. May God bless him!',
      initials: 'MG',
    },
    {
      id: 't6',
      name: 'N. Sravanthi',
      location: 'Boduppal, Hyderabad',
      treatment: 'Persistent Allergic Rhinitis & Sinusitis',
      category: 'Asthma & Allergy',
      rating: 5,
      reviewDate: 'Reviewed 1 month ago',
      text: 'I was suffering from sneezing and a runny nose every single morning. Dr. Sai Sashank did a comprehensive allergy screening and prescribed specific nasal sprays and preventive measures. He is highly knowledgeable and extremely down-to-earth.',
      initials: 'NS',
    }
  ];

  // Filtered testimonials list
  const filteredTestimonials = selectedCategory === 'All' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  // Adjust active slide if list shrinks
  React.useEffect(() => {
    if (activeSlide >= filteredTestimonials.length) {
      setActiveSlide(0);
    }
  }, [selectedCategory, filteredTestimonials.length, activeSlide]);

  return (
    <section id="experiences" className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-0 translate-x-1/3 w-96 h-96 bg-brand-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 -translate-x-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Title */}
        <div className="max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-100/60 rounded-full text-xs font-extrabold text-brand-700 uppercase tracking-widest mb-4 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-brand-500" />
            <span>Patient Experiences</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight italic">
            Success Stories & True Reviews
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 font-semibold mt-4 text-sm sm:text-base">
            Read authentic feedback from patients who recovered from allergy, asthma, snoring, and severe chest illnesses at Sashank’s Chest & Allergy Clinic.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveSlide(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 border ${
                selectedCategory === category
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-100 scale-102'
                  : 'bg-white text-slate-600 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Interactive Carousel Showcase */}
        {filteredTestimonials.length > 0 ? (
          <div className="relative max-w-4xl mx-auto px-4 sm:px-8 mb-16">
            
            {/* Carousel navigation arrows */}
            <div className="hidden sm:block">
              <button 
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2.5 bg-white border border-slate-200/80 rounded-full shadow-lg text-slate-600 hover:text-brand-600 hover:border-brand-500 transition-all duration-200 z-20"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2.5 bg-white border border-slate-200/80 rounded-full shadow-lg text-slate-600 hover:text-brand-600 hover:border-brand-500 transition-all duration-200 z-20"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Testimonial Active Slide with Animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredTestimonials[activeSlide].id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden text-left"
              >
                {/* Visual quote accent icon */}
                <div className="absolute top-6 right-8 text-slate-100 group-hover:text-brand-50 transition-colors duration-300">
                  <Quote className="w-20 h-20 rotate-180" />
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Star Rating & Verified Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(filteredTestimonials[activeSlide].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 border border-emerald-100/60 px-2.5 py-1 rounded-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Google / Practo Review</span>
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="font-serif italic text-base sm:text-lg lg:text-xl text-slate-800 leading-relaxed font-medium">
                    "{filteredTestimonials[activeSlide].text}"
                  </p>

                  <div className="h-[1px] bg-slate-100" />

                  {/* Patient Info Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Initials Badge with gradient background mapped to category */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-brand-100 shrink-0">
                        {filteredTestimonials[activeSlide].initials}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-950 text-base">{filteredTestimonials[activeSlide].name}</h4>
                        <p className="text-xs font-bold text-slate-500">{filteredTestimonials[activeSlide].location}</p>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      {/* Treatment Type Accent Tag */}
                      <span className="inline-block text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 bg-slate-50 hover:bg-brand-50 text-brand-700 border border-slate-100 hover:border-brand-200 rounded-lg transition-colors">
                        Treated for: {filteredTestimonials[activeSlide].treatment}
                      </span>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5 font-mono">{filteredTestimonials[activeSlide].reviewDate}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Touch Indicators */}
            <div className="flex sm:hidden items-center justify-center gap-4 mt-6">
              <button 
                onClick={handlePrev}
                className="p-2 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-xs font-extrabold text-slate-500 font-mono">
                {activeSlide + 1} / {filteredTestimonials.length}
              </div>
              <button 
                onClick={handleNext}
                className="p-2 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="hidden sm:flex justify-center items-center gap-2 mt-6">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'w-6 bg-brand-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-md">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h4 className="text-base font-extrabold text-slate-900">No matching reviews found</h4>
            <p className="text-xs text-slate-500 mt-1">Try selecting a different review category from above.</p>
          </div>
        )}

        {/* Highlight Stats Block */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-4 bg-brand-50/20 rounded-2xl border border-brand-100/30">
            <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-brand-600" />
            </div>
            <div className="text-left">
              <p className="text-lg font-black text-slate-900 leading-none">4.9 / 5.0</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Average Google Rating</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-emerald-50/20 rounded-2xl border border-emerald-100/30">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-lg font-black text-slate-900 leading-none">100% Verified</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Genuine Patient Feedback</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-indigo-50/20 rounded-2xl border border-indigo-100/30 sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-lg font-black text-slate-900 leading-none">Top-Rated Clinic</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Best Pulmonologist in Uppal</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
