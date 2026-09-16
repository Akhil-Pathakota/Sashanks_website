import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Phone, Compass, ChevronLeft, ChevronRight, HeartPulse, Wind, Sparkles } from 'lucide-react';
import doctorAvatar from '../assets/images/operation.jpg';
import lungs from '../assets/images/lungs.jpg';

interface HeroSectionProps {
  onBookAppointment: () => void;
  onExploreServices: () => void;
}

interface Slide {
  id: number;
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  highlight: string;
  description: string;
  image: string;
  colorTheme: string;
  bgGradient: string;
  bannerBgImage: string;
  accentBadgeStyle: string;
  highlightColor: string;
}

export default function HeroSection({ onBookAppointment, onExploreServices }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      badge: "Chest & Respiratory Medicine",
      badgeIcon: <HeartPulse className="w-3.5 h-3.5 text-sky-600" />,
      title: "Healthy Lungs with",
      highlight: "Expert Pulmonology Care.",
      description: "Experience world-class chest, respiratory, and advanced interventional sleep diagnostics led by Dr. M. Sai Sashank, utilizing cutting-edge non-invasive technologies.",
      image: doctorAvatar,
      colorTheme: "from-sky-500/10 via-transparent to-sky-500/5",
      bgGradient: "rgba(203, 213, 225, 0.95), rgba(186, 230, 253, 0.93)", // Sky Slate / light blue theme
      bannerBgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
      accentBadgeStyle: "border-sky-300 text-sky-900 bg-sky-100/90 shadow-sm",
      highlightColor: "bg-gradient-to-r from-orange-500 via-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
    },
    {
      id: 2,
      badge: "Allergy & Asthma Care",
      badgeIcon: <Wind className="w-3.5 h-3.5 text-emerald-600" />,
      title: "Breathe Free from",
      highlight: "Chronic Asthma & Allergies.",
      description: "Get comprehensive clinical screening, pulmonary function testing (PFT), and advanced personalized therapies to control wheezing, persistent cough, and chest tightness.",
      image: lungs,
      colorTheme: "from-emerald-500/10 via-transparent to-emerald-500/5",
      bgGradient: "rgba(203, 213, 225, 0.95), rgba(167, 243, 208, 0.93)", // Emerald Slate / light mint theme
      bannerBgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
      accentBadgeStyle: "border-emerald-300 text-emerald-900 bg-emerald-100/90 shadow-sm",
      highlightColor: "bg-gradient-to-r from-emerald-500 via-teal-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent"
    },
    {
      id: 3,
      badge: "Sleep Study & Apnea",
      badgeIcon: <Sparkles className="w-3.5 h-3.5 text-indigo-600" />,
      title: "Restore Your Rest with",
      highlight: "Sleep Diagnostics.",
      description: "Don't ignore heavy choking snoring or daytime exhaustion. Benefit from high-precision sleep studies (Polysomnography) and custom therapeutic CPAP/BiPAP configurations.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800", // Peaceful restorative sleep / cozy clean look
      colorTheme: "from-indigo-500/10 via-transparent to-indigo-500/5",
      bgGradient: "rgba(203, 213, 225, 0.95), rgba(199, 210, 254, 0.93)", // Violet Slate / light lavender theme
      bannerBgImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200",
      accentBadgeStyle: "border-indigo-300 text-indigo-900 bg-indigo-100/90 shadow-sm",
      highlightColor: "bg-gradient-to-r from-purple-600 via-pink-500 via-rose-500 to-orange-500 bg-clip-text text-transparent"
    },
  ];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay rotation logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Rotate slide every 6 seconds
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  // Animation variants for smooth sliding/fading transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  const current = slides[currentSlide];

  return (
    <section 
      id="home" 
      className="relative overflow-hidden py-14 md:py-20 min-h-[620px] lg:min-h-[680px] flex items-center transition-all duration-1000 ease-in-out bg-slate-100"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${current.bgGradient}), url('${current.bannerBgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic ambient highlights orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Slide Selector Arrows (Left & Right Side on Desktop) */}
        <div className="hidden md:block">
          <button 
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-500 rounded-full shadow-lg text-slate-600 hover:text-brand-600 transition-all duration-200 z-30"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-500 rounded-full shadow-lg text-slate-600 hover:text-brand-600 transition-all duration-200 z-30"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[460px]">
          
          {/* Left Hero Text Panel - Dynamic with AnimatePresence */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 text-center lg:text-left animate-none"
              >
                {/* Micro Category Badge */}
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 border rounded-full text-xs font-black shadow-xs tracking-wider uppercase transition-all duration-300 ${current.accentBadgeStyle}`}>
                  {current.badgeIcon}
                  <span>{current.badge}</span>
                </span>

                <div className="space-y-4">
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight italic">
                    {current.title}
                    <span className={`${current.highlightColor} not-italic font-sans block mt-1 sm:mt-2`}>
                      {current.highlight}
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-xl mx-auto lg:mx-0 leading-relaxed min-h-[60px]">
                    {current.description}
                  </p>
                </div>
 
                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <button
                    onClick={onBookAppointment}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 active:scale-98"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Appointment</span>
                  </button>
                  <button
                    onClick={onExploreServices}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full border border-slate-200 shadow-xs hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Compass className="w-5 h-5 text-slate-500" />
                    <span>Explore Services</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Hero Image Panel - Dynamic with AnimatePresence */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10 w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[16/9] lg:aspect-square"
              >
                <img
                  src={current.image}
                  alt={current.badge}
                  className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                
                {/* Glowing subtle color overlay mapped to active slide theme */}
                <div className={`absolute inset-0 bg-gradient-to-t ${current.colorTheme}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Behind the image decorative elements */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl opacity-40 -z-0"></div>
            <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl opacity-30 -z-0"></div>
          </div>

        </div>

        {/* Carousel Slide Indicators and Controls Row (Mobile friendly) */}
        <div className="flex items-center justify-center gap-4 mt-12">
          {/* Mobile Arrow Controls */}
          <button 
            onClick={handlePrev}
            className="md:hidden p-2 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm active:bg-slate-100"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Glowing Indicators with slide progress visual representation */}
          <div className="flex items-center gap-2.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-2 bg-brand-600 shadow-xs' 
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Arrow Controls */}
          <button 
            onClick={handleNext}
            className="md:hidden p-2 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm active:bg-slate-100"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
