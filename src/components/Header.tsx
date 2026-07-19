import { useState, useEffect } from 'react';
import { Menu, X, Globe, BookOpen } from 'lucide-react';
import { Language, PageId, translations, languagesList } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import LanguageSwitcher from './LanguageSwitcher';

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

const languageGroups = [
  {
    title: {
      it: "EUROPA OCCIDENTALE",
      en: "WESTERN EUROPE"
    },
    codes: ['it', 'en', 'fr', 'de', 'es', 'pt', 'nl'] as Language[]
  },
  {
    title: {
      it: "EUROPA ORIENTALE & BALCANI",
      en: "EASTERN EUROPE & BALKANS"
    },
    codes: ['ro', 'pl', 'tr', 'sq', 'ru'] as Language[]
  },
  {
    title: {
      it: "ASIA & MEDIO ORIENTE",
      en: "ASIA & MIDDLE EAST"
    },
    codes: ['zh', 'ja', 'ar', 'hi'] as Language[]
  }
];

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  openBooking: () => void;
  openLexicon: () => void;
}

export default function Header({
  lang,
  setLang,
  currentPage,
  setCurrentPage,
  openBooking,
  openLexicon,
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
    { id: 'tariffe', labelKey: 'nav-tariffe' },
    { id: 'blog', labelKey: 'nav-blog' },
    { id: 'faq', labelKey: 'nav-faq' },
    { id: 'contatti', labelKey: 'nav-contacts' },
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

        {/* DESKTOP NAV - Unified under the elegant dropdown menu containing page titles and translations */}
        <nav className="hidden items-center space-x-7 text-[11px] font-bold uppercase tracking-wider">
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
          {/* Forensic Lexicon Button */}
          <button
            onClick={openLexicon}
            id="header-lexicon-trigger"
            className="inline-flex items-center space-x-1.5 bg-slate-950/80 hover:bg-cyan-950/20 text-cyan-400 hover:text-cyan-300 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2.5 rounded border border-cyan-500/20 hover:border-cyan-500/40 transition-all active:scale-95 cursor-pointer font-mono shadow-md shadow-cyan-500/5"
            title={lang === 'it' ? 'Lessico Forense' : 'Forensic Lexicon'}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{lang === 'it' ? 'Lessico' : 'Lexicon'}</span>
          </button>

          {/* Desktop CTA */}
          <button
            onClick={openBooking}
            id="header-booking-cta"
            className="hidden lg:inline-flex bg-cold-500 hover:bg-cold-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all shadow-md shadow-cold-500/10 active:scale-95 cursor-pointer"
          >
            {t['cta-header']}
          </button>

          {/* Hamburger menu trigger (visible on all screens to house page titles and translations) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-hamburger-trigger"
            className="p-2 text-slate-400 hover:text-cold-400 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU / DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="bg-cold-950/98 border-t border-slate-900 overflow-hidden"
            id="mobile-drawer-container"
          >
            <div className="max-w-6xl mx-auto w-full px-6 py-5 space-y-4 flex flex-col">
              <nav className="flex flex-col space-y-1.5 text-sm font-poppins font-medium uppercase tracking-wider text-slate-300">
                {menuItems.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => handleNav(item.id)}
                      className={`text-left px-4 py-2.5 rounded-xl transition-all duration-150 uppercase tracking-wide text-xs flex items-center justify-between border-l-4 ${
                        isActive
                          ? 'bg-cold-500/10 border-cold-400 text-cold-400 font-bold shadow-sm shadow-cold-500/5'
                          : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-900/30 hover:text-slate-200'
                      }`}
                    >
                      <span>{t[item.labelKey]?.toUpperCase()}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cold-400 animate-pulse shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* TRANSLATION SWITCHER INSERTED EXCLUSIVELY HERE */}
              <div className="py-2.5 border-b border-slate-900/40 flex items-center justify-between">
                <span className="text-xs font-poppins font-medium uppercase tracking-wider text-slate-400">
                  {(lang === 'it' ? 'Seleziona Lingua' : 'Select Language').toUpperCase()}
                </span>
                <LanguageSwitcher onLanguageChangeExternal={(langCode) => {
                  const appCode = langCode === 'zh-CN' ? 'zh' : langCode;
                  setLang(appCode as Language);
                }} />
              </div>

              {/* Forensic Lexicon Mobile Trigger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLexicon();
                }}
                id="mobile-drawer-lexicon-cta"
                className="w-full bg-slate-900 hover:bg-cyan-950/20 text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/40 text-xs font-bold uppercase tracking-wider py-3.5 rounded transition-all text-center focus:outline-none flex items-center justify-center space-x-2 cursor-pointer font-mono"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'it' ? 'LESSICO FORENSE' : 'FORENSIC LEXICON'}</span>
              </button>

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
