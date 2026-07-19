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
import Portfolio from './components/Portfolio';
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

  // Contact prefill state for linear service-to-contact routing
  const [contactPrefill, setContactPrefill] = useState<{ subject?: string; message?: string } | null>(null);

  const triggerToast = (title: string, message: string) => {
    setToastTitle(title);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleNavigateToContact = (prefill?: { subject?: string; message?: string }) => {
    if (prefill) {
      setContactPrefill(prefill);
    } else {
      setContactPrefill(null);
    }
    handlePageChange('contatti');
  };

  // Synchronize browser URL hash with current active page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'chi-siamo', 'servizi', 'punti-forza', 'testimonianze', 'contatti', 'faq', 'blog', 'tariffe', 'portfolio'];
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

  // Dynamic page description and OpenGraph metadata updates based on current page & language
  useEffect(() => {
    const metaDescriptions: Record<PageId, { it: string; en: string }> = {
      home: {
        it: "Studio di Criminalistica Elena Angelini a Rimini. Consulenza criminologica avanzata, analisi della scena del crimine, ricostruzione 3D e investigazioni forensi.",
        en: "Elena Angelini Criminalistics Studio in Rimini. Advanced criminological advice, crime scene analysis, 3D reconstruction, and forensic investigations."
      },
      'chi-siamo': {
        it: "Chi Siamo - Studio Criminalistica Elena Angelini. Criminologi professionisti ed esperti forensi specializzati in ricostruzione 3D ed indagini investigative a Rimini.",
        en: "About Us - Elena Angelini Criminalistics Studio. Professional criminologists and forensic experts specializing in 3D crime reconstruction in Rimini."
      },
      servizi: {
        it: "I Nostri Servizi Forensi - Studio Angelini. Analisi scena del crimine, genetica e DNA, perizie calligrafiche, ricostruzioni balistiche 3D e informatica forense.",
        en: "Our Forensic Services - Studio Angelini. Crime scene analysis, genetics & DNA, handwriting analysis, 3D ballistics tracking, and digital forensics."
      },
      'punti-forza': {
        it: "Punti di Forza - Studio Angelini. Rigore scientifico, conformità procedurale, tecnologie 3D d'avanguardia e supporto legale strategico a Rimini.",
        en: "Key Strengths - Studio Angelini. Scientific rigor, procedural compliance, cutting-edge 3D tech, and strategic legal support in Rimini."
      },
      testimonianze: {
        it: "Testimonianze e Casi di Successo - Studio Angelini. Esperienze di studi legali, difensori e privati che hanno collaborato con Elena Angelini.",
        en: "Testimonials and Case Studies - Studio Angelini. Feedback from law firms, defense lawyers, and private clients who collaborated with Elena Angelini."
      },
      contatti: {
        it: "Contatti e Richieste - Studio Criminalistica Elena Angelini. Contatta il nostro studio di Rimini per una valutazione preliminare gratuita del tuo caso.",
        en: "Contact & Inquiries - Elena Angelini Criminalistics Studio. Contact our office in Rimini for a free initial review of your forensic case."
      },
      faq: {
        it: "Domande Frequenti (FAQ) - Studio Angelini. Risposte chiare su perizie calligrafiche, indagini difensive, costi della criminalistica e consulenze a Rimini.",
        en: "Frequently Asked Questions (FAQ) - Studio Angelini. Clear answers about graphology, defense trials, forensic fees, and consulting in Rimini."
      },
      blog: {
        it: "Forensic Insights Blog - Studio Angelini. Articoli divulgativi e approfondimenti scientifici su analisi di casi irrisolti e metodologie di laboratorio.",
        en: "Forensic Insights Blog - Studio Angelini. Informational articles and scientific highlights on cold cases and laboratory forensic methodologies."
      },
      tariffe: {
        it: "Tariffe e Costi Studio Angelini Rimini. Prezzi trasparenti e preventivi dettagliati in linea con le tabelle provinciali approvate dalla Prefettura.",
        en: "Rates and Tariffs of Studio Angelini Rimini. Transparent pricing models and custom estimates fully compliant with local Prefettura limits."
      },
      portfolio: {
        it: "Portfolio Professionale Elena Angelini - Criminologia, Criminalistica e Scienze Forensi. Attività di consulenza, formazione, ricerca e pubblicazioni.",
        en: "Elena Angelini Professional Portfolio - Criminology, Criminalistics and Forensic Sciences. Consulting, training, research and publications."
      }
    };

    const titles: Record<PageId, { it: string; en: string }> = {
      home: {
        it: "Studio Criminalistica Elena Angelini - Rimini",
        en: "Elena Angelini Criminalistics Studio - Rimini"
      },
      'chi-siamo': {
        it: "Chi Siamo | Studio Criminalistica Elena Angelini",
        en: "About Us | Elena Angelini Criminalistics Studio"
      },
      servizi: {
        it: "Servizi Forensi | Studio Criminalistica Elena Angelini",
        en: "Forensic Services | Elena Angelini Criminalistics Studio"
      },
      'punti-forza': {
        it: "Punti di Forza | Studio Criminalistica Elena Angelini",
        en: "Key Strengths | Elena Angelini Criminalistics Studio"
      },
      testimonianze: {
        it: "Testimonianze | Studio Criminalistica Elena Angelini",
        en: "Testimonials | Elena Angelini Criminalistics Studio"
      },
      contatti: {
        it: "Contatti | Studio Criminalistica Elena Angelini",
        en: "Contact Us | Elena Angelini Criminalistics Studio"
      },
      faq: {
        it: "Domande Frequenti (FAQ) | Studio Criminalistica Elena Angelini",
        en: "FAQ | Elena Angelini Criminalistics Studio"
      },
      blog: {
        it: "Blog & Approfondimenti | Studio Criminalistica Elena Angelini",
        en: "Blog & Insights | Elena Angelini Criminalistics Studio"
      },
      tariffe: {
        it: "Tariffe e Trasparenza | Studio Criminalistica Elena Angelini",
        en: "Rates & Pricing | Elena Angelini Criminalistics Studio"
      },
      portfolio: {
        it: "Portfolio | Studio Criminalistica Elena Angelini",
        en: "Portfolio | Elena Angelini Criminalistics Studio"
      }
    };

    const activeLang = lang || 'it';
    const pageKey = currentPage in metaDescriptions ? currentPage : 'home';
    const descriptionText = metaDescriptions[pageKey][activeLang];
    const titleText = titles[pageKey][activeLang];

    // Update document title
    document.title = titleText;

    // Helper function to update or create meta tags
    const updateMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Standard description
    updateMetaTag('name', 'description', descriptionText);

    // OpenGraph dynamic tags
    updateMetaTag('property', 'og:title', titleText);
    updateMetaTag('property', 'og:description', descriptionText);
    updateMetaTag('property', 'og:url', window.location.href);

    // Twitter Card dynamic tags
    updateMetaTag('name', 'twitter:title', titleText);
    updateMetaTag('name', 'twitter:description', descriptionText);

  }, [currentPage, lang]);

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
                onNavigateToContact={handleNavigateToContact}
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
                prefill={contactPrefill}
                clearPrefill={() => setContactPrefill(null)}
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

            {currentPage === 'portfolio' && (
              <Portfolio
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
