import { useState, useEffect } from 'react';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import PageProgressBar from './components/PageProgressBar';
import VisioneFacilitata from './components/VisioneFacilitata';
import Hero from './components/Hero';
import Fora3D from './components/Fora3D';
import Services from './components/Services';
import Strengths from './components/Strengths';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import BookingModal from './components/BookingModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import ForensicChat from './components/ForensicChat';
import AboutUs from './components/AboutUs';
import TariffeRimini from './components/TariffeRimini';
import ForensicLexicon from './components/ForensicLexicon';
import CookieBanner from './components/CookieBanner';
import LegalModal, { getStoredConsent, loadGA4 } from './components/LegalModal';
import { Language, PageId, translations } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('it');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [lexiconOpen, setLexiconOpen] = useState(false);

  // Legal and cookie settings modal state
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'cookie' | 'terms'>('privacy');
  
  // Toast state
  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (title: string, message: string) => {
    setToastTitle(title);
    setToastMessage(message);
    setToastOpen(true);
  };

  // Synchronize browser URL hash with current active page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'chi-siamo', 'servizi', 'punti-forza', 'testimonianze', 'contatti', 'faq', 'blog'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    // Check hash on load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to the top of the page when switching between views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  // Initialize Google Analytics 4 if consent is already recorded and allowed
  useEffect(() => {
    const consent = getStoredConsent();
    if (consent.analytics) {
      loadGA4();
    }
  }, []);

  const handlePageChange = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
  };

  const t = translations[lang];

  return (
    <div className="bg-cold-950 text-slate-300 font-sans antialiased forensic-grid min-h-screen flex flex-col justify-between selection:bg-cold-500/30 selection:text-white transition-colors duration-300">
      
      {/* HUD System Header (Only shown on Desktop) */}
      <div className="bg-cold-950 border-b border-cyan-950/30 text-[9px] font-mono py-2 px-4 hidden lg:block select-none">
        <div className="max-w-6xl mx-auto flex justify-between text-cyan-500/50">
          <div className="tracking-widest">{t['sys-id']}</div>
          <div className="tracking-widest">{t['station-rimini']}</div>
          <div className="tracking-widest">{t['fora-reconstruction-active']}</div>
        </div>
      </div>

      {/* Primary Navigation & Logo */}
      <Header
        lang={lang}
        setLang={setLang}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        openBooking={() => setBookingOpen(true)}
        openLexicon={() => setLexiconOpen(true)}
      />

      {/* Main Single Page App Content Area with Page Router Transitions */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 relative">
        {/* Subtle page transition progress bar */}
        <PageProgressBar currentPage={currentPage} />

        {/* Dynamic Breadcrumbs above main page contents */}
        <Breadcrumbs
          lang={lang}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {currentPage === 'home' && (
              <div className="space-y-12 py-4">
                <Hero
                  lang={lang}
                  onExploreServices={() => handlePageChange('servizi')}
                  openBooking={() => setBookingOpen(true)}
                />
                
                {/* Embedded High Fidelity FORA widget on the home page */}
                <Fora3D lang={lang} />

                {/* Embedded FAQ section directly on the homepage */}
                <div className="pt-6 border-t border-slate-900/40">
                  <FAQ
                    lang={lang}
                    onNavigateToContact={() => handlePageChange('contatti')}
                  />
                </div>
              </div>
            )}

            {currentPage === 'chi-siamo' && (
              <AboutUs
                lang={lang}
                onNavigateToContact={() => handlePageChange('contatti')}
              />
            )}

            {currentPage === 'servizi' && (
              <Services
                lang={lang}
                onNavigateToContact={() => handlePageChange('contatti')}
              />
            )}

            {currentPage === 'punti-forza' && (
              <Strengths
                lang={lang}
                onNavigateToContact={() => handlePageChange('contatti')}
              />
            )}

            {currentPage === 'testimonianze' && (
              <Testimonials
                lang={lang}
                openBooking={() => setBookingOpen(true)}
              />
            )}

            {currentPage === 'contatti' && (
              <ContactForm
                lang={lang}
                triggerToast={triggerToast}
              />
            )}

            {currentPage === 'faq' && (
              <FAQ
                lang={lang}
                onNavigateToContact={() => handlePageChange('contatti')}
                isGenericOnly={true}
              />
            )}

            {currentPage === 'blog' && (
              <Blog
                lang={lang}
                onNavigateToContact={() => handlePageChange('contatti')}
              />
            )}

            {currentPage === 'tariffe' && (
              <TariffeRimini
                lang={lang}
                onNavigateToContact={() => handlePageChange('contatti')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer 
        lang={lang} 
        onOpenLegal={(tab) => {
          setLegalModalTab(tab);
          setLegalModalOpen(true);
        }}
        onNavigate={handlePageChange}
      />

      {/* Booking Dialogue Popup */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        lang={lang}
        triggerToast={triggerToast}
      />

      {/* Forensic Lexicon Technical Glossary Popup */}
      <ForensicLexicon
        isOpen={lexiconOpen}
        onClose={() => setLexiconOpen(false)}
        lang={lang}
      />

      {/* Toast Alert feedback popup */}
      <Toast
        isOpen={toastOpen}
        title={toastTitle}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />

      {/* Floating Forensic Chatbot Assistant (Adaptive full-screen on mobile) */}
      <ForensicChat lang={lang} />

      {/* Persistent floating Visione Facilitata Accessibility Widget */}
      <VisioneFacilitata lang={lang} />

      {/* Cookie Consent Floating Bottom Banner */}
      <CookieBanner
        lang={lang}
        onOpenPreferences={() => {
          setLegalModalTab('cookie');
          setLegalModalOpen(true);
        }}
      />

      {/* Granular GDPR Cookie Consent, Privacy Policy & Terms of Service Reader Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        lang={lang}
        initialTab={legalModalTab}
      />

    </div>
  );
}
