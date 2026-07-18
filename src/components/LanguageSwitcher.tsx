import { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

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

  // Chiude il menu a discesa se si clicca fuori
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

  // 2. Inizializzazione dinamica di Google Translate
  useEffect(() => {
    // Definisce la callback globale richiamata dallo script di Google
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'it', // La lingua nativa del codice HTML del tuo sito
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    // Carica dinamicamente lo script di Google Translate se non è già presente
    const id = 'google-translate-script';
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Sincronizza lo stato React leggendo il cookie "googtrans" impostato in precedenza
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
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
    document.cookie = `googtrans=/it/${langCode}; path=/;`;
    document.cookie = `googtrans=/it/${langCode}; path=/; domain=${window.location.hostname};`;

    if (onLanguageChangeExternal) {
      onLanguageChangeExternal(langCode);
    }

    // Interagisce programmaticamente con la select nascosta generata da Google Translate
    const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = langCode;
      selectEl.dispatchEvent(new Event('change'));
    } else {
      // Fallback: se il widget non è ancora pronto, ritenta dopo un breve delay
      setTimeout(() => {
        const retrySelectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (retrySelectEl) {
          retrySelectEl.value = langCode;
          retrySelectEl.dispatchEvent(new Event('change'));
        } else {
          // Se fallisce ancora, ricarica la pagina per forzare l'applicazione del cookie
          window.location.reload();
        }
      }, 400);
    }
  };

  const currentLang = GOOGLE_LANGUAGES.find(l => l.code === selectedGoogleLang) || GOOGLE_LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bottone principale del Selettore */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer transition-all hover:border-cyan-500/30 shadow-md focus:outline-none"
      >
        <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
        <span className="text-slate-300">
          {currentLang.flag} {currentLang.name}
        </span>
        <ChevronDown className={`h-3 w-3 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Elemento contenitore di Google Translate Nascosto (OBBLIGATORIO) */}
      <div id="google_translate_element" className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" />

      {/* Menu a discesa personalizzato delle Lingue */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl z-50 py-1.5 custom-scrollbar">
          <div className="px-3 py-1.5 border-b border-slate-900 mb-1 text-[9px] uppercase font-bold text-slate-500 font-mono tracking-widest">
            Select Language
          </div>
          {GOOGLE_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                selectedGoogleLang === lang.code
                  ? 'bg-cyan-500/10 text-cyan-400 font-bold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span className="flex items-center space-x-2.5">
                <span className="text-sm shrink-0">{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              {selectedGoogleLang === lang.code && (
                <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
