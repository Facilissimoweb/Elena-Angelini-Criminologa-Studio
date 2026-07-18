import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Eye, Settings, X, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { getStoredConsent, setStoredConsent, CookieConsent } from './LegalModal';

interface CookieBannerProps {
  lang: Language;
  onOpenPreferences: () => void;
}

export default function CookieBanner({ lang, onOpenPreferences }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const stored = getStoredConsent();
      // If timestamp is 0, it means no choice has been saved yet
      if (stored.timestamp === 0) {
        // Show after a tiny delay for elegance
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
      }
    };

    checkConsent();

    // Listen to consent changes from the modal to instantly close the banner
    const handleUpdate = () => {
      const stored = getStoredConsent();
      if (stored.timestamp > 0) {
        setIsVisible(false);
      }
    };

    window.addEventListener('cookieConsentUpdated', handleUpdate);
    return () => {
      window.removeEventListener('cookieConsentUpdated', handleUpdate);
    };
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookieConsent = {
      essential: true,
      analytics: true,
      functional: true,
      timestamp: Date.now()
    };
    setStoredConsent(allAccepted);
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const rejected: CookieConsent = {
      essential: true,
      analytics: false,
      functional: false,
      timestamp: Date.now()
    };
    setStoredConsent(rejected);
    setIsVisible(false);
  };

  // Inline labels to avoid bloating translation files
  const labels = {
    it: {
      text: "Questo portale scientifico utilizza cookie tecnici necessari alla sicurezza e, previo consenso, cookie di prestazione (Google Analytics 4) e funzionali (Assistente Chatbot) per ottimizzare l'esperienza di consulenza forense.",
      acceptAll: "ACCETTA TUTTI",
      rejectAll: "RIFIUTA I NON NECESSARI",
      customize: "PERSONALIZZA SCELTE",
      readMore: "Leggi Informativa Estesa"
    },
    en: {
      text: "This scientific portal uses necessary technical cookies for security and, subject to your consent, performance analytics (Google Analytics 4) and functional cookies (Virtual Chatbot) to optimize forensic research.",
      acceptAll: "ACCEPT ALL",
      rejectAll: "REJECT NON-ESSENTIAL",
      customize: "CUSTOMIZE CHOICES",
      readMore: "Read Full Policy"
    }
  };

  const currentLabels = labels[lang] || labels['it'];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-40 max-w-5xl mx-auto p-4 md:p-5 bg-slate-950/98 backdrop-blur-md border border-slate-900/90 rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 select-none scanlines"
          id="cookie-consent-banner"
        >
          {/* Logo & Info description */}
          <div className="flex items-start space-x-3.5 max-w-3xl">
            <div className="p-2 bg-cyan-950/40 rounded-lg border border-cyan-900/30 shrink-0 text-cyan-500 animate-pulse hidden sm:block">
              <Shield className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span 
                  className="text-[10px] font-bold text-cyan-400 tracking-widest font-serif uppercase"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  COOKIE POLICY & GENERAL DATA PROTECTION // GDPR
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed text-justify pr-2">
                {currentLabels.text}
              </p>
              <button
                onClick={onOpenPreferences}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold tracking-wider font-serif uppercase flex items-center space-x-1.5 cursor-pointer mt-1 focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <span>{currentLabels.readMore}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Action buttons - Poppins Uppercase */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0 justify-end">
            <button
              onClick={onOpenPreferences}
              className="w-full sm:w-auto px-4 py-2 border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-white rounded hover:bg-slate-900/60 transition-all cursor-pointer font-serif whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <div className="flex items-center justify-center space-x-1.5">
                <Settings className="w-3 h-3" />
                <span>{currentLabels.customize}</span>
              </div>
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="w-full sm:w-auto px-4 py-2 border border-cyan-900/40 bg-slate-900/20 text-slate-400 hover:text-slate-300 hover:bg-slate-900/50 text-[10px] font-bold rounded transition-all cursor-pointer font-serif whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {currentLabels.rejectAll}
            </button>
            <button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 font-bold text-[10px] rounded hover:from-cyan-500 hover:to-cyan-400 shadow-md transition-all cursor-pointer font-serif whitespace-nowrap active:scale-95"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {currentLabels.acceptAll}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
