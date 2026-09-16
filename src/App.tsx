import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DoctorProfile from './components/DoctorProfile';
import DiseasesSection from './components/DiseasesSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsSection from './components/TestimonialsSection';
import ResearchSection from './components/ResearchSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Smooth scroll navigate helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky navigation bar (approx 120px)
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scrollspy to update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'diseases', 'services', 'experiences', 'research', 'faqs'];
      const scrollPosition = window.scrollY + 200; // threshold offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800 selection:bg-brand-500 selection:text-white" id="main-app">
      {/* Clinic Header Sticky Navigation */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} onBookAppointment={() => setIsBookingOpen(true)} />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* Hero Banner Section */}
        <HeroSection 
          onBookAppointment={() => setIsBookingOpen(true)} 
          onExploreServices={() => handleNavigate('services')} 
        />

        {/* Doctor Biography, Qualifications, Timeline and Skills */}
        <DoctorProfile />

        {/* Respiratory & Chest Diseases treated with background images */}
        <DiseasesSection />

        {/* Pulmonary Services & Specializations */}
        <ServicesSection />

        {/* Why Choose Us value proposition card grid */}
        <WhyChooseUs />

        {/* Patient Success Stories & Google/Practo Reviews */}
        <TestimonialsSection />

        {/* Academic Presentations, Publications, Thesis & Awards */}
        <ResearchSection />

        {/* Frequently Asked Patient Questions */}
        <FAQSection />

      </main>

      {/* Footer Credentials & Business Card replica */}
      <Footer onNavigate={handleNavigate} />

      {/* Appointment Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
