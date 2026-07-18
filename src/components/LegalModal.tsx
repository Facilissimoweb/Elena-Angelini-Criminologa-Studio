import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Eye, FileText, Check, X, CheckSquare, Square } from 'lucide-react';
import { Language } from '../types';
import { legalTranslations } from '../data/legalContent';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialTab?: 'privacy' | 'cookie' | 'terms';
}

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  timestamp: number;
}

const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  functional: false,
  timestamp: 0,
};

// Global Google Analytics 4 configuration
const GA_MEASUREMENT_ID = "G-E4D8RL2S9M"; // Professional default measurement ID

export function loadGA4() {
  if (document.getElementById('ga4-script')) return;

  // 1. Inject gtag.js script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script1.id = 'ga4-script';
  document.head.appendChild(script1);

  // 2. Inject configuration
  const script2 = document.createElement('script');
  script2.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { 'anonymize_ip': true });
  `;
  script2.id = 'ga4-config-script';
  document.head.appendChild(script2);

  console.log(`[GA4] Initialized Google Analytics 4 with Measurement ID: ${GA_MEASUREMENT_ID}`);
}

export function disableGA4() {
  const s1 = document.getElementById('ga4-script');
  const s2 = document.getElementById('ga4-config-script');
  if (s1) s1.remove();
  if (s2) s2.remove();

  // Clear GA cookies
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    if (name.startsWith("_ga") || name.startsWith("_gid") || name.startsWith("_gat")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    }
  }
  console.log('[GA4] Google Analytics disabled and tracking cookies purged.');
}

export function getStoredConsent(): CookieConsent {
  try {
    const saved = localStorage.getItem('studio_angelini_cookie_consent');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to read cookie consent from localStorage", e);
  }
  return DEFAULT_CONSENT;
}

export function setStoredConsent(consent: CookieConsent) {
  try {
    localStorage.setItem('studio_angelini_cookie_consent', JSON.stringify(consent));
    
    // Trigger custom window event to notify other components (e.g. cookie banner)
    window.dispatchEvent(new Event('cookieConsentUpdated'));

    // Handle GA4 based on consent
    if (consent.analytics) {
      loadGA4();
    } else {
      disableGA4();
    }
  } catch (e) {
    console.error("Failed to write cookie consent to localStorage", e);
  }
}

export default function LegalModal({ isOpen, onClose, lang, initialTab = 'privacy' }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'cookie' | 'terms'>(initialTab);
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);

  const t = legalTranslations[lang] || legalTranslations['it'];

  useEffect(() => {
    if (isOpen) {
      setConsent(getStoredConsent());
      setActiveTab(initialTab);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab]);

  const handleSave = () => {
    const updatedConsent = {
      ...consent,
      timestamp: Date.now()
    };
    setStoredConsent(updatedConsent);
    onClose();
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functional: true,
      timestamp: Date.now()
    };
    setConsent(allAccepted);
    setStoredConsent(allAccepted);
    onClose();
  };

  const handleRejectAll = () => {
    const rejected = {
      essential: true,
      analytics: false,
      functional: false,
      timestamp: Date.now()
    };
    setConsent(rejected);
    setStoredConsent(rejected);
    onClose();
  };

  const toggleAnalytics = () => {
    setConsent(prev => ({ ...prev, analytics: !prev.analytics }));
  };

  const toggleFunctional = () => {
    setConsent(prev => ({ ...prev, functional: !prev.functional }));
  };

  // Helper parser to render Markdown with precise professional styling
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h3 
            key={idx} 
            className="text-base font-bold text-cyan-400 mt-6 mb-3 font-serif uppercase tracking-wider border-l-2 border-cyan-500/50 pl-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {parseBold(trimmed.substring(4))}
          </h3>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h4 
            key={idx} 
            className="text-xs font-bold text-slate-200 mt-5 mb-2 font-mono uppercase tracking-wider"
          >
            {parseBold(trimmed.substring(5))}
          </h4>
        );
      }
      if (trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="ml-5 list-disc text-slate-400 text-xs mb-1.5 leading-relaxed">
            {parseBold(trimmed.substring(2))}
          </li>
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p key={idx} className="text-xs text-slate-400 mb-3 leading-relaxed text-justify">
          {parseBold(trimmed)}
        </p>
      );
    });
  };

  const parseBold = (text: string) => {
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-cyan-400/90 font-bold">{part}</strong>;
      }
      
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      const hasLinks = linkRegex.test(part);
      if (hasLinks) {
        linkRegex.lastIndex = 0;
        const subParts = [];
        let lastIdx = 0;
        let match;
        while ((match = linkRegex.exec(part)) !== null) {
          if (match.index > lastIdx) {
            subParts.push(part.substring(lastIdx, match.index));
          }
          subParts.push(
            <a 
              key={match.index} 
              href={match[2]} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline hover:text-cyan-300 font-semibold"
            >
              {match[1]}
            </a>
          );
          lastIdx = linkRegex.lastIndex;
        }
        if (lastIdx < part.length) {
          subParts.push(part.substring(lastIdx));
        }
        return <span key={i}>{subParts}</span>;
      }
      return part;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Card - Full Page */}
          <motion.div
            initial={{ opacity: 0, scale: 1, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-screen h-screen bg-slate-950 flex flex-col z-10 scanlines overflow-hidden"
          >
            {/* HUD / Header bar (Centered content wrapper) */}
            <div className="bg-slate-950 border-b border-slate-900 shrink-0">
              <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center select-none">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-cyan-500 animate-pulse" />
                  <span 
                    className="text-xs font-bold text-slate-300 tracking-widest font-serif uppercase"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t.title}
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  className="text-slate-500 hover:text-white transition-colors cursor-pointer p-1.5 rounded-full hover:bg-slate-900 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TAB SELECTORS - Centered content wrapper */}
            <div className="bg-slate-950 border-b border-slate-900 shrink-0 select-none">
              <div className="max-w-4xl mx-auto px-6 flex space-x-2 overflow-x-auto select-none">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`py-3 px-4 text-xs font-bold tracking-wider border-b-2 transition-all cursor-pointer font-serif whitespace-nowrap ${
                    activeTab === 'privacy' 
                      ? 'border-cyan-500 text-cyan-400 font-extrabold' 
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <div className="flex items-center space-x-2">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.tabs.privacy}</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('cookie')}
                  className={`py-3 px-4 text-xs font-bold tracking-wider border-b-2 transition-all cursor-pointer font-serif whitespace-nowrap ${
                    activeTab === 'cookie' 
                      ? 'border-cyan-500 text-cyan-400 font-extrabold' 
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <div className="flex items-center space-x-2">
                    <Shield className="w-3.5 h-3.5" />
                    <span>{t.tabs.cookie}</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`py-3 px-4 text-xs font-bold tracking-wider border-b-2 transition-all cursor-pointer font-serif whitespace-nowrap ${
                    activeTab === 'terms' 
                      ? 'border-cyan-500 text-cyan-400 font-extrabold' 
                      : 'border-transparent text-slate-500 hover:text-slate-300'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.tabs.terms}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* SCROLLABLE CONTENT BODY - Centered content wrapper */}
            <div className="flex-grow overflow-y-auto bg-slate-950/60 custom-scrollbar py-8 px-6 md:px-8">
              <div className="max-w-4xl mx-auto w-full">
                
                {/* Tab 1: Privacy Policy */}
                {activeTab === 'privacy' && (
                  <div className="space-y-4 max-w-none">
                    {renderMarkdown(t.privacyContent)}
                  </div>
                )}

                {/* Tab 2: Cookie Policy & Consent Manager */}
                {activeTab === 'cookie' && (
                  <div className="space-y-6">
                    {/* Explanation Policy header */}
                    <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-900/50">
                      <h3 
                        className="text-xs font-bold text-slate-300 mb-1.5 font-serif uppercase tracking-wider"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {t.cookieSettings.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed text-justify">
                        {t.cookieSettings.desc}
                      </p>
                    </div>

                    {/* GRANULAR COOKIE CONTROLS */}
                    <div className="space-y-4">
                      
                      {/* Necessary Cookies */}
                      <div className="p-4 rounded-xl border border-slate-900 bg-slate-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-cyan-500" />
                            <h4 
                              className="text-xs font-bold text-slate-200 font-serif tracking-wide uppercase"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                              {t.cookieSettings.essentialTitle}
                            </h4>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            {t.cookieSettings.essentialDesc}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center md:justify-end">
                          <span className="text-[9px] font-mono font-bold text-cyan-400/90 bg-cyan-950/30 border border-cyan-900/40 px-2 py-1 rounded">
                            {t.cookieSettings.statusAlwaysActive}
                          </span>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="p-4 rounded-xl border border-slate-900 bg-slate-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-xl">
                          <button 
                            onClick={toggleAnalytics}
                            className="flex items-center space-x-2 text-left hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
                          >
                            {consent.analytics ? (
                              <CheckSquare className="w-4 h-4 text-cyan-500" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500" />
                            )}
                            <h4 
                              className="text-xs font-bold text-slate-200 font-serif tracking-wide uppercase hover:text-cyan-400 transition-colors"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                              {t.cookieSettings.analyticsTitle}
                            </h4>
                          </button>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            {t.cookieSettings.analyticsDesc}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center md:justify-end space-x-2.5">
                          <button
                            onClick={toggleAnalytics}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none ${
                              consent.analytics ? 'bg-cyan-500' : 'bg-slate-800'
                            }`}
                          >
                            <div
                              className={`bg-slate-950 w-5 h-5 rounded-full shadow-md transform duration-200 ease-out flex items-center justify-center ${
                                consent.analytics ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            >
                              {consent.analytics && <Check className="w-3 h-3 text-cyan-400" />}
                            </div>
                          </button>
                          <span className={`text-[9px] font-mono font-bold w-40 text-left ${consent.analytics ? 'text-cyan-400/90' : 'text-slate-500'}`}>
                            {consent.analytics ? t.cookieSettings.statusActive : t.cookieSettings.statusInactive}
                          </span>
                        </div>
                      </div>

                      {/* Functional Cookies */}
                      <div className="p-4 rounded-xl border border-slate-900 bg-slate-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-xl">
                          <button 
                            onClick={toggleFunctional}
                            className="flex items-center space-x-2 text-left hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
                          >
                            {consent.functional ? (
                              <CheckSquare className="w-4 h-4 text-cyan-500" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500" />
                            )}
                            <h4 
                              className="text-xs font-bold text-slate-200 font-serif tracking-wide uppercase hover:text-cyan-400 transition-colors"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                              {t.cookieSettings.functionalTitle}
                            </h4>
                          </button>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            {t.cookieSettings.functionalDesc}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center md:justify-end space-x-2.5">
                          <button
                            onClick={toggleFunctional}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none ${
                              consent.functional ? 'bg-cyan-500' : 'bg-slate-800'
                            }`}
                          >
                            <div
                              className={`bg-slate-950 w-5 h-5 rounded-full shadow-md transform duration-200 ease-out flex items-center justify-center ${
                                consent.functional ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            >
                              {consent.functional && <Check className="w-3 h-3 text-cyan-400" />}
                            </div>
                          </button>
                          <span className={`text-[9px] font-mono font-bold w-40 text-left ${consent.functional ? 'text-cyan-400/90' : 'text-slate-500'}`}>
                            {consent.functional ? t.cookieSettings.statusActive : t.cookieSettings.statusInactive}
                          </span>
                        </div>
                      </div>

                    </div>

                    <hr className="border-slate-900 my-2" />

                    {/* Standard Detailed Text */}
                    <div className="space-y-4 max-w-none">
                      {renderMarkdown(t.cookieContent)}
                    </div>
                  </div>
                )}

                {/* Tab 3: Terms of Service */}
                {activeTab === 'terms' && (
                  <div className="space-y-4 max-w-none">
                    {renderMarkdown(t.termsContent)}
                  </div>
                )}

              </div>
            </div>

            {/* FOOTER ACTIONS - Centered content wrapper */}
            <div className="bg-slate-950 border-t border-slate-900 select-none shrink-0 py-5 px-6">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-white rounded hover:bg-slate-900/50 transition-all cursor-pointer font-serif uppercase tracking-wider"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {t.buttons.close}
                </button>

                <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleRejectAll}
                    className="w-full sm:w-auto px-4 py-2.5 border border-cyan-900/40 bg-slate-900/30 text-slate-400 hover:text-slate-300 text-[10px] font-bold rounded hover:bg-slate-900/80 transition-all cursor-pointer font-serif uppercase tracking-wider"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t.buttons.rejectAll}
                  </button>
                  <button
                    onClick={handleSave}
                    className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 text-[10px] font-bold rounded hover:bg-slate-900/80 transition-all cursor-pointer font-serif uppercase tracking-wider"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t.buttons.savePreferences}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 font-bold text-[10px] rounded hover:from-cyan-500 hover:to-cyan-400 shadow-lg shadow-cyan-950/20 active:scale-95 transition-all cursor-pointer font-serif uppercase tracking-wider"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t.buttons.acceptAll}
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
