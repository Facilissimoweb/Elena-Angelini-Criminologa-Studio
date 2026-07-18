import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language, PageId, translations, languagesList } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const languageFlags: Record<Language, string> = {
  it: '🇮🇹',
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇵🇹',
  ro: '🇷🇴',
  nl: '🇳🇱',
  pl: '🇵🇱',
  tr: '🇹🇷',
  sq: '🇦🇱',
  ru: '🇷🇺',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ar: '🇸🇦',
  hi: '🇮🇳'
};

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  openBooking: () => void;
}

export default function Header({
  lang,
  setLang,
  currentPage,
  setCurrentPage,
  openBooking,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    // Sync Google Translate with active language
    const syncTranslate = () => {
      try {
        const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectEl) {
          selectEl.value = lang;
          selectEl.dispatchEvent(new Event('change'));
        }
      } catch (e) {
        console.warn('Google Translate sync pending...', e);
      }
    };

    syncTranslate();
    const timer1 = setTimeout(syncTranslate, 400);
    const timer2 = setTimeout(syncTranslate, 1200);
    const timer3 = setTimeout(syncTranslate, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [lang]);

  const menuItems: { id: PageId; labelKey: keyof typeof translations.it }[] = [
    { id: 'home', labelKey: 'nav-home' },
    { id: 'chi-siamo', labelKey: 'nav-about' },
    { id: 'servizi', labelKey: 'nav-services' },
    { id: 'punti-forza', labelKey: 'nav-why' },
    { id: 'testimonianze', labelKey: 'nav-testimonials' },
    { id: 'contatti', labelKey: 'nav-contacts' },
    { id: 'faq', labelKey: 'nav-faq' },
  ];

  const handleNav = (pageId: PageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-cold-950/90 backdrop-blur-md border-b border-slate-900/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO & RECONSTRUCTION TITLE */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center space-x-3 group text-left focus:outline-none"
          id="btn-header-logo"
        >
          <div className="relative">
            <svg
              className="w-10 h-10 text-cold-400 group-hover:text-cyan-300 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" className="stroke-cyan-500/10"></circle>
              <circle cx="12" cy="12" r="7" strokeDasharray="4 2"></circle>
              <circle cx="12" cy="12" r="2.5" className="animate-pulse fill-cold-400/20"></circle>
              <line x1="12" y1="0" x2="12" y2="24" className="stroke-cyan-500/20"></line>
              <line x1="0" y1="12" x2="24" y2="12" className="stroke-cyan-500/20"></line>
            </svg>
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wider uppercase font-serif text-slate-100 group-hover:text-cold-200 transition-colors">
              Elena Angelini
            </h1>
            <p className="text-[9px] font-mono text-cold-400 tracking-widest uppercase">
              {t['studio-sub']}
            </p>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center space-x-7 text-[11px] font-bold uppercase tracking-wider">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`transition-all duration-200 py-1.5 border-b-2 font-mono ${
                  isActive
                    ? 'text-cold-400 border-cold-400'
                    : 'text-slate-400 border-transparent hover:text-cold-200 hover:border-slate-800'
                }`}
              >
                {t[item.labelKey]}
              </button>
            );
          })}
        </nav>

        {/* CONTROLS */}
        <div className="flex items-center space-x-3">
          {/* Drastically reduced Flag-Only Language Selector */}
          <div className="relative">
            {langDropdownOpen && (
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setLangDropdownOpen(false)}
              />
            )}
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              id="flag-language-picker-trigger"
              className="relative z-50 flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 border border-slate-800 hover:border-cold-500/80 hover:bg-slate-800/50 transition-all text-sm shadow-md active:scale-95 focus:outline-none cursor-pointer"
              title="Change Language // Cambia Lingua"
            >
              <span>{languageFlags[lang] || '🇮🇹'}</span>
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 z-50 bg-slate-950/95 backdrop-blur-md border border-slate-900/60 p-2 rounded-lg shadow-2xl w-44"
                  id="flag-dropdown-panel"
                >
                  <div className="grid grid-cols-4 gap-1.5 justify-items-center">
                    {languagesList.map((l) => {
                      const isSelected = lang === l.code;
                      return (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`flex items-center justify-center w-8 h-8 text-base rounded transition-all hover:bg-cold-500/20 hover:scale-115 active:scale-90 cursor-pointer ${
                            isSelected ? 'bg-cyan-500/15 border border-cyan-500/40' : 'border border-transparent'
                          }`}
                          title={l.name}
                        >
                          <span>{languageFlags[l.code] || '🇮🇹'}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop CTA */}
          <button
            onClick={openBooking}
            id="header-booking-cta"
            className="hidden lg:inline-flex bg-cold-500 hover:bg-cold-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all shadow-md shadow-cold-500/10 active:scale-95 cursor-pointer"
          >
            {t['cta-header']}
          </button>

          {/* Mobile Hamburger menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-hamburger-trigger"
            className="lg:hidden p-2 text-slate-400 hover:text-cold-400 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-cold-950/98 border-t border-slate-900 overflow-hidden"
            id="mobile-drawer-container"
          >
            <div className="px-6 py-6 space-y-5 flex flex-col">
              <nav className="flex flex-col space-y-4 text-xs font-mono font-bold uppercase tracking-widest text-slate-300">
                {menuItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => handleNav(item.id)}
                      className={`text-left py-2.5 border-b border-slate-900/60 ${
                        isActive ? 'text-cold-400 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {t[item.labelKey]}
                    </button>
                  );
                })}
              </nav>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
                }}
                id="mobile-drawer-booking-cta"
                className="w-full bg-cold-500 hover:bg-cold-600 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded transition-all text-center focus:outline-none"
              >
                {t['cta-header']}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
