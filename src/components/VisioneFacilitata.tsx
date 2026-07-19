import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, Eye, Volume2, Type, Move, X, Check, HelpCircle, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface VisioneFacilitataProps {
  lang: Language;
}

type TextSize = 'normal' | 'large' | 'extra';

// Safe localStorage access wrappers to prevent crashes in sandboxed iframes or restricted cookie environments
const safeGetItem = (key: string, defaultValue: string): string => {
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch (e) {
    console.warn(`localStorage is not available for reading key "${key}":`, e);
    return defaultValue;
  }
};

const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`localStorage is not available for writing key "${key}":`, e);
  }
};

export default function VisioneFacilitata({ lang }: VisioneFacilitataProps) {
  const [isOpen, setIsOpen] = useState(false);

  // States initialized from localStorage if available
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return safeGetItem('acc-high-contrast', 'false') === 'true';
  });
  
  const [textSize, setTextSize] = useState<TextSize>(() => {
    return (safeGetItem('acc-text-size', 'normal') as TextSize);
  });

  const [readableFont, setReadableFont] = useState<boolean>(() => {
    return safeGetItem('acc-readable-font', 'false') === 'true';
  });

  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    return safeGetItem('acc-reduce-motion', 'false') === 'true';
  });

  const [ttsActive, setTtsActive] = useState<boolean>(() => {
    return safeGetItem('acc-tts-active', 'false') === 'true';
  });

  // Localized dictionary for the accessibility system
  const t = {
    it: {
      btnTitle: "Visione Facilitata",
      title: "Strumenti di Accessibilità",
      subtitle: "Personalizza la visualizzazione e la navigazione del sito per renderlo più leggibile.",
      highContrast: "Contrasto Elevato",
      highContrastDesc: "Sfondo nero solido, testo bianco e giallo ad alta leggibilità.",
      textSize: "Dimensione dei Caratteri",
      textSizeDesc: "Ingrandisci tutti gli elementi testuali del sito web.",
      textSizeNormal: "Normale (100%)",
      textSizeLarge: "Grande (120%)",
      textSizeExtra: "Molto Grande (140%)",
      readableFont: "Carattere Leggibile",
      readableFontDesc: "Usa un carattere standard ad alta leggibilità con spaziatura aumentata.",
      reduceMotion: "Riduci Animazioni",
      reduceMotionDesc: "Disattiva le transizioni, i video di sfondo e le animazioni complesse.",
      tts: "Sintesi Vocale (Lettore)",
      ttsDesc: "Passa il mouse sul testo e clicca per ascoltare la lettura vocale.",
      active: "Attivo",
      inactive: "Non attivo",
      reset: "Ripristina Impostazioni",
      close: "Chiudi"
    },
    en: {
      btnTitle: "Facilitated View",
      title: "Accessibility Tools",
      subtitle: "Customize site visualization and navigation to make it highly readable.",
      highContrast: "High Contrast",
      highContrastDesc: "Solid black background, white and yellow high-visibility text.",
      textSize: "Text Size",
      textSizeDesc: "Scale up all text elements across the entire website.",
      textSizeNormal: "Normal (100%)",
      textSizeLarge: "Large (120%)",
      textSizeExtra: "Extra Large (140%)",
      readableFont: "Readable Font",
      readableFontDesc: "Use a clean standard font with increased letter and line spacing.",
      reduceMotion: "Reduce Motion",
      reduceMotionDesc: "Deactivate transitions, background effects, and animations.",
      tts: "Speech Synthesis (Reader)",
      ttsDesc: "Hover over any text and click to listen to speech output.",
      active: "Active",
      inactive: "Inactive",
      reset: "Reset Settings",
      close: "Close"
    }
  };

  const currentT = t[lang === 'it' ? 'it' : 'en'];

  // Apply High Contrast class to document body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('accessibility-high-contrast');
      safeSetItem('acc-high-contrast', 'true');
    } else {
      document.body.classList.remove('accessibility-high-contrast');
      safeSetItem('acc-high-contrast', 'false');
    }
  }, [highContrast]);

  // Apply Font Size to HTML root element
  useEffect(() => {
    const html = document.documentElement;
    if (textSize === 'large') {
      html.style.fontSize = '120%';
    } else if (textSize === 'extra') {
      html.style.fontSize = '140%';
    } else {
      html.style.fontSize = '100%';
    }
    safeSetItem('acc-text-size', textSize);
  }, [textSize]);

  // Apply Readable Font class to document body
  useEffect(() => {
    if (readableFont) {
      document.body.classList.add('accessibility-readable-font');
      safeSetItem('acc-readable-font', 'true');
    } else {
      document.body.classList.remove('accessibility-readable-font');
      safeSetItem('acc-readable-font', 'false');
    }
  }, [readableFont]);

  // Apply Reduce Motion class to document body
  useEffect(() => {
    if (reduceMotion) {
      document.body.classList.add('accessibility-reduce-motion');
      safeSetItem('acc-reduce-motion', 'true');
    } else {
      document.body.classList.remove('accessibility-reduce-motion');
      safeSetItem('acc-reduce-motion', 'false');
    }
  }, [reduceMotion]);

  // Save TTS state to localStorage
  useEffect(() => {
    safeSetItem('acc-tts-active', String(ttsActive));
  }, [ttsActive]);

  // TTS Event listeners to read text on click
  useEffect(() => {
    if (!ttsActive) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'A', 'BUTTON'].includes(target.tagName) &&
        !target.closest('.accessibility-panel-content')
      ) {
        target.style.outline = '2px dashed #0ea5e9';
        target.style.cursor = 'help';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        target.style.outline = '';
        target.style.cursor = '';
      }
    };

    const handleElementClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'A', 'BUTTON'].includes(target.tagName) &&
        !target.closest('.accessibility-panel-content')
      ) {
        e.preventDefault();
        e.stopPropagation();

        const text = target.innerText || target.textContent || '';
        if (text.trim()) {
          // Cancel active speech
          window.speechSynthesis.cancel();
          
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang === 'it' ? 'it-IT' : 'en-US';
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleElementClick, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleElementClick, true);
      window.speechSynthesis.cancel();
    };
  }, [ttsActive, lang]);

  const handleReset = () => {
    setHighContrast(false);
    setTextSize('normal');
    setReadableFont(false);
    setReduceMotion(false);
    setTtsActive(false);
    window.speechSynthesis.cancel();
  };

  return (
    <>
      {/* Floating Widget Button */}
      <div className="fixed bottom-6 left-6 z-[9990] select-none">
        <button
          id="accessibility-widget-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-cold-500 hover:from-cyan-500 hover:to-cold-400 text-white font-mono text-xs uppercase tracking-wider font-bold p-3 sm:px-4 sm:py-3 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] border border-cyan-400/20 active:scale-95 transition-all duration-150 cursor-pointer"
          title={currentT.btnTitle}
        >
          <Accessibility className="h-5 w-5 animate-pulse shrink-0" />
          <span className="hidden sm:inline">{currentT.btnTitle}</span>
        </button>
      </div>

      {/* Side drawer / modal for Accessibility Options */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9995] cursor-pointer"
            />

            {/* Modal Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, x: -100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-4 bottom-4 left-4 right-4 sm:right-auto sm:max-w-md w-auto bg-cold-950/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl z-[9999] shadow-2xl flex flex-col overflow-hidden accessibility-panel-content text-slate-100"
            >
              {/* Header */}
              <div className="p-5 border-b border-cyan-950/60 bg-cold-950/80 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <Accessibility className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">
                      {currentT.title}
                    </h2>
                    <p className="text-[10px] text-slate-400 mt-0.5 uppercase font-mono">
                      ACCESSIBILITY_HUB // V1.0
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-900/60 rounded-lg text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Options Scroll Container */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <p className="text-[11px] text-slate-400 leading-relaxed bg-cold-500/5 border border-cold-500/10 p-3 rounded-lg">
                  {currentT.subtitle}
                </p>

                {/* 1. High Contrast */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Eye className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">
                        {currentT.highContrast}
                      </span>
                    </div>
                    <button
                      onClick={() => setHighContrast(!highContrast)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        highContrast ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          highContrast ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed ml-7">
                    {currentT.highContrastDesc}
                  </p>
                </div>

                {/* 2. Font Size Scaling */}
                <div className="space-y-2 pt-2 border-t border-cyan-950/40">
                  <div className="flex items-center space-x-2.5">
                    <Type className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                      {currentT.textSize}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed ml-7 mb-3">
                    {currentT.textSizeDesc}
                  </p>
                  <div className="grid grid-cols-3 gap-2 ml-7">
                    {(['normal', 'large', 'extra'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setTextSize(size)}
                        className={`py-2 px-1 text-[10px] uppercase font-mono tracking-wider font-bold rounded-lg border transition-all text-center cursor-pointer ${
                          textSize === size
                            ? 'bg-cyan-500/15 border-cyan-400 text-cyan-400 shadow-sm'
                            : 'bg-transparent border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {size === 'normal' && currentT.textSizeNormal.split(' ')[0]}
                        {size === 'large' && currentT.textSizeLarge.split(' ')[0]}
                        {size === 'extra' && "X-LARGE"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. High Legibility Font */}
                <div className="space-y-2 pt-2 border-t border-cyan-950/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <HelpCircle className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">
                        {currentT.readableFont}
                      </span>
                    </div>
                    <button
                      onClick={() => setReadableFont(!readableFont)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        readableFont ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          readableFont ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed ml-7">
                    {currentT.readableFontDesc}
                  </p>
                </div>

                {/* 4. Reduce Motion */}
                <div className="space-y-2 pt-2 border-t border-cyan-950/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Move className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">
                        {currentT.reduceMotion}
                      </span>
                    </div>
                    <button
                      onClick={() => setReduceMotion(!reduceMotion)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        reduceMotion ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          reduceMotion ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed ml-7">
                    {currentT.reduceMotionDesc}
                  </p>
                </div>

                {/* 5. Speech Synthesis / TTS Reader */}
                <div className="space-y-2 pt-2 border-t border-cyan-950/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <Volume2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">
                        {currentT.tts}
                      </span>
                    </div>
                    <button
                      onClick={() => setTtsActive(!ttsActive)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        ttsActive ? 'bg-cyan-500' : 'bg-slate-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          ttsActive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed ml-7">
                    {currentT.ttsDesc}
                  </p>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-cyan-950/60 bg-cold-950/80 flex items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1 px-3 py-2 text-[10px] uppercase font-mono tracking-wider text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-900/60 border border-slate-800 hover:border-cyan-500/20 transition-all cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>{currentT.reset}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-[10px] bg-cyan-600 hover:bg-cyan-500 text-white uppercase font-mono tracking-wider font-bold rounded-lg border border-cyan-400/20 active:scale-95 transition-all cursor-pointer"
                >
                  {currentT.close}
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
