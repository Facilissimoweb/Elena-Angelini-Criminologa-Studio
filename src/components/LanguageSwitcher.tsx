import { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown, X } from "lucide-react";

// 1. Configurazione delle Lingue supportate (Bandiera, Nome, Codice ISO)
const GOOGLE_LANGUAGES = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'zh-CN', name: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

interface LanguageSwitcherProps {
  onLanguageChangeExternal?: (langCode: string) => void;
}

export default function LanguageSwitcher({ onLanguageChangeExternal }: LanguageSwitcherProps) {
  const [selectedGoogleLang, setSelectedGoogleLang] = useState<string>('it');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Chiude il menu se si clicca fuori (utile se l'utente clicca fuori, anche se ora è a pieno schermo)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Blocca lo scroll del body quando il widget a pagina intera è aperto
  useEffect(() => {
    if (dropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [dropdownOpen]);

  // 2. Inizializzazione dinamica di Google Translate
  useEffect(() => {
    // Definisce la callback globale richiamata dallo script di Google
    const initTranslate = () => {
      try {
        if ((window as any).google && (window as any).google.translate) {
          // Verifica se è presente l'elemento prima di inizializzare
          const container = document.getElementById('google_translate_element');
          if (container && container.innerHTML === '') {
            new (window as any).google.translate.TranslateElement({
              pageLanguage: 'it', // La lingua nativa del codice HTML del tuo sito
              layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google_translate_element');
          }
        }
      } catch (err) {
        console.warn("Failed to initialize Google Translate element:", err);
      }
    };

    (window as any).googleTranslateElementInit = initTranslate;

    // Se l'oggetto google è già disponibile, inizializziamo direttamente
    if ((window as any).google?.translate) {
      initTranslate();
    } else {
      // Carica dinamicamente lo script di Google Translate se non è già presente
      const id = 'google-translate-script';
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.id = id;
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.onerror = (err) => {
          console.warn("Google Translate script failed to load. Ad-blockers or sandbox restrictions might be active.", err);
        };
        document.body.appendChild(script);
      }
    }

    // Sincronizza lo stato React leggendo il cookie "googtrans" impostato in precedenza
    const getCookie = (name: string) => {
      try {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      } catch (e) {
        console.warn("Cookies are not accessible:", e);
      }
      return null;
    };
    
    const googtransVal = getCookie('googtrans');
    if (googtransVal) {
      // Estrae la lingua selezionata dal formato del cookie (es: /it/en -> en)
      const match = googtransVal.match(/\/it\/([a-zA-Z\-]+)/);
      if (match && match[1]) {
        setSelectedGoogleLang(match[1]);
        if (onLanguageChangeExternal) {
          onLanguageChangeExternal(match[1]);
        }
      }
    }
  }, [onLanguageChangeExternal]);

  // 3. Gestione del cambio lingua e simulazione del widget
  const handleLanguageChange = (langCode: string) => {
    setSelectedGoogleLang(langCode);
    setDropdownOpen(false);

    // Salva la scelta nei cookie (necessario sia per il dominio corrente che globale)
    try {
      document.cookie = `googtrans=/it/${langCode}; path=/;`;
      document.cookie = `googtrans=/it/${langCode}; path=/; domain=${window.location.hostname};`;
    } catch (e) {
      console.warn("Failed to set cookies due to sandbox constraints:", e);
    }

    if (onLanguageChangeExternal) {
      onLanguageChangeExternal(langCode);
    }

    // Interagisce programmaticamente con la select nascosta generata da Google Translate
    const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event('change'));
    }

    // Forza il ricaricamento della pagina per sincronizzare stabilmente Google Translate con il Virtual DOM di React
    window.location.reload();
  };

  const currentLang = GOOGLE_LANGUAGES.find(l => l.code === selectedGoogleLang) || GOOGLE_LANGUAGES[0];

  return (
    <div className="inline-block text-left" ref={dropdownRef}>
      {/* Bottone principale del Selettore */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer transition-all hover:border-cyan-500/30 shadow-md focus:outline-none"
      >
        <Globe className="h-4 w-4 text-cyan-400 shrink-0 animate-pulse" />
        <span className="text-slate-300">
          {currentLang.flag} {currentLang.name}
        </span>
        <ChevronDown className="h-3 w-3 text-slate-500" />
      </button>

      {/* Elemento contenitore di Google Translate Nascosto (OBBLIGATORIO) */}
      <div id="google_translate_element" className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" />

      {/* WIDGET DI TRADUZIONI A PAGINA INTERA (FULL-PAGE TRANSLATION MODAL) */}
      {dropdownOpen && (
        <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-2xl z-[99999] flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
          {/* Pulsante di chiusura in alto a destra */}
          <button
            onClick={() => setDropdownOpen(false)}
            className="absolute top-6 right-6 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 p-3 rounded-full border border-slate-800 transition-all hover:border-slate-700 hover:scale-105 cursor-pointer flex items-center justify-center"
            title="Chiudi / Close"
          >
            <X className="h-6 w-6 text-slate-300" />
          </button>

          {/* Intestazione del selettore */}
          <div className="text-center mb-8 max-w-xl">
            <Globe className="h-14 w-14 text-cyan-400 mx-auto mb-4 animate-spin-slow" />
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-100 uppercase tracking-wide">
              {selectedGoogleLang === 'it' ? 'Seleziona Lingua' : 'Select Language'}
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-2 font-sans">
              {selectedGoogleLang === 'it' 
                ? 'Scegli la lingua per tradurre automaticamente l\'intero portale.' 
                : 'Choose your language to automatically translate the entire portal.'}
            </p>
          </div>

          {/* Griglia delle lingue a pagina intera */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-4xl max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {GOOGLE_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-3.5 p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  selectedGoogleLang === lang.code
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-bold'
                    : 'bg-slate-900/30 border-slate-850 text-slate-400 hover:bg-slate-900/80 hover:border-slate-750 hover:text-white'
                }`}
              >
                <span className="text-2xl shrink-0 select-none">{lang.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-semibold truncate tracking-wide font-sans">
                    {lang.name}
                  </p>
                </div>
                {selectedGoogleLang === lang.code && (
                  <Check className="h-4 w-4 text-cyan-400 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
