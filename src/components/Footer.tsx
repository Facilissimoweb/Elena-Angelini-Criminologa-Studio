import { Scale, Lock, Shield, Eye, FileText, Landmark, ShieldCheck } from 'lucide-react';
import { Language, PageId, translations } from '../types';

interface FooterProps {
  lang: Language;
  onOpenLegal?: (tab: 'privacy' | 'cookie' | 'terms') => void;
  onNavigate?: (page: PageId) => void;
}

export default function Footer({ lang, onOpenLegal, onNavigate }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="border-t border-slate-900 bg-cold-950 text-slate-500 py-12 px-6 text-center text-[12px] md:text-[13px] font-mono mt-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Title */}
        <p className="text-slate-300 font-bold tracking-widest font-serif text-base md:text-lg uppercase">
          {t['footer-title']}
        </p>

        {/* Corporate & contact info */}
        <p className="text-slate-400 text-[13px] md:text-[14px]">
          {t['footer-info']}
        </p>

        {/* VAT and copyright */}
        <div className="space-y-1.5">
          <p className="text-slate-500 text-[11px] md:text-xs">
            &copy; {new Date().getFullYear()} Studio Criminalistica Elena Angelini. {lang === 'it' ? 'Tutti i diritti riservati' : 'All rights reserved'}. | P.IVA 01234567890
          </p>
          <p className="text-slate-600 text-[10px] md:text-[11px] uppercase tracking-wider font-mono">
            Designed by <a href="https://facilissimoweb.com" target="_blank" rel="noopener noreferrer" className="text-cyan-500/80 hover:text-cyan-400 hover:underline transition-all">facilissimoweb.com</a> di M.Teresa Rogani
          </p>
        </div>

        {/* SITE MAP / MAPPA DEL SITO GRID */}
        <div className="py-8 border-t border-b border-slate-900/30 text-left max-w-4xl mx-auto">
          <div className="flex items-center space-x-1.5 text-cyan-500/80 font-bold uppercase tracking-widest text-[10px] md:text-[11px] mb-6 font-serif select-none justify-center md:justify-start">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>{lang === 'it' ? 'MAPPA DEL SITO // SYSTEM SITE MAP' : 'SITE MAP // SYSTEM SITE MAP'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 font-sans">
            {/* Column 1: Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs md:text-sm font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-900/60 pb-1.5">
                {lang === 'it' ? 'Navigazione Principale' : 'Main Navigation'}
              </h4>
              <ul className="space-y-2 text-[13.5px] md:text-[15px]">
                <li>
                  <button 
                    onClick={() => onNavigate?.('home')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Home Page (Studio & FORA)' : 'Home Page (Office & FORA)'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('chi-siamo')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Chi Siamo' : 'About Us'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('punti-forza')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Punti di Forza' : 'Strengths'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('testimonianze')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Testimonianze & Casi' : 'Testimonials & Cases'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('blog')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Blog & News' : 'Blog & News'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Forensic Services */}
            <div className="space-y-3">
              <h4 className="text-xs md:text-sm font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-900/60 pb-1.5">
                {lang === 'it' ? 'Servizi di Criminalistica' : 'Forensic Services'}
              </h4>
              <ul className="space-y-2 text-[13.5px] md:text-[15px]">
                <li>
                  <button 
                    onClick={() => onNavigate?.('servizi')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Grafologia Forense' : 'Forensic Graphology'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('servizi')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Analisi Documentale' : 'Document Analysis'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('servizi')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Consulenza Grafologica' : 'Graphological Assessment'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('servizi')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Perizie e Pareri Tecnici' : 'Expert Witness Opinions'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources & Legals */}
            <div className="space-y-3">
              <h4 className="text-xs md:text-sm font-bold tracking-widest text-slate-400 uppercase font-mono border-b border-slate-900/60 pb-1.5">
                {lang === 'it' ? 'Supporto e Legale' : 'Resources & Legal'}
              </h4>
              <ul className="space-y-2 text-[13.5px] md:text-[15px]">
                <li>
                  <button 
                    onClick={() => onNavigate?.('contatti')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Contattaci (Prenota Studio)' : 'Contact Us (Book Session)'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('faq')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Domande Frequenti (FAQ)' : 'Frequently Asked Questions (FAQ)'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenLegal?.('privacy')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Informativa sulla Privacy' : 'Privacy Policy Info'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenLegal?.('cookie')}
                    className="text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    &raquo; {lang === 'it' ? 'Configura Preferenze Cookie' : 'Manage Cookie Consent'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Secrecy Shield Block */}
        <div className="max-w-xl mx-auto p-4 bg-slate-950 border border-slate-900/80 rounded-xl space-y-2 text-left">
          <div className="flex items-center space-x-1.5 text-cold-400 font-bold uppercase tracking-wider text-[10px] md:text-[11px]">
            <Lock className="w-3.5 h-3.5 text-cold-500" />
            <span>CONFIDENTIALITY_ESTABLISHMENT // SECRECY_REGULATED</span>
          </div>
          <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-sans">
            {t['footer-disclaimer']}
          </p>
        </div>

        {/* AI Declaration Notice */}
        <div className="max-w-xl mx-auto p-4 bg-cyan-950/10 border border-cyan-900/40 rounded-xl space-y-2 text-left">
          <div className="flex items-center space-x-1.5 text-cyan-400 font-bold uppercase tracking-wider text-[10px] md:text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span>AI_ASSISTED_SYSTEM // INFORMATIVA IA</span>
          </div>
          <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed font-sans">
            {lang === 'it' 
              ? "Si dichiara che questo sito si avvale di strumenti di Intelligenza Artificiale (IA) per l'ottimizzazione dell'esperienza di navigazione, il supporto interattivo dell'assistente virtuale e la generazione di elementi informativi."
              : "We declare that this website utilizes Artificial Intelligence (AI) systems to optimize the browsing experience, provide interactive virtual assistance, and facilitate information delivery."
            }
          </p>
        </div>

        {/* Accepted Payment Methods Section */}
        <div className="py-4 border-t border-b border-slate-900/30 max-w-xl mx-auto space-y-3.5 select-none">
          <div 
            className="flex items-center justify-center space-x-1.5 text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-[11px] font-serif"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            <span>{lang === 'it' ? 'METODI DI PAGAMENTO ACCETTATI' : 'ACCEPTED PAYMENT METHODS'}</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* Visa */}
            <div className="flex items-center justify-center h-6.5 px-3 bg-slate-900/60 border border-slate-900/80 rounded text-[11px] font-bold tracking-wider text-slate-300">
              <span className="text-cyan-400 font-extrabold italic text-[13px]">V</span>
              <span className="text-slate-200 font-extrabold italic text-[13px]">ISA</span>
            </div>

            {/* Mastercard */}
            <div className="flex items-center justify-center h-6.5 px-3 bg-slate-900/60 border border-slate-900/80 rounded text-[11px] font-bold tracking-wider text-slate-300">
              <div className="flex -space-x-1 shrink-0 mr-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
              </div>
              <span className="text-[11px] font-bold text-slate-300">MASTERCARD</span>
            </div>

            {/* American Express */}
            <div className="flex items-center justify-center h-6.5 px-3 bg-slate-900/60 border border-slate-900/80 rounded text-[11px] font-extrabold tracking-widest text-cyan-400">
              <span>AMEX</span>
            </div>

            {/* PayPal */}
            <div className="flex items-center justify-center h-6.5 px-3 bg-slate-900/60 border border-slate-900/80 rounded text-[11px] font-bold tracking-wider text-slate-300">
              <span className="text-blue-400 font-extrabold italic text-[12px]">P</span>
              <span className="text-cyan-400 font-extrabold italic text-[12px]">ay</span>
              <span className="text-blue-500 font-extrabold italic text-[12px]">P</span>
              <span className="text-cyan-500 font-extrabold italic text-[12px]">al</span>
            </div>

            {/* Apple Pay */}
            <div className="flex items-center justify-center h-6.5 px-3 bg-slate-900/60 border border-slate-900/80 rounded text-[11px] font-bold tracking-wider text-slate-300">
              <span className="font-semibold text-slate-100 text-sm mr-1 leading-none"></span>
              <span className="text-[11px] font-bold text-slate-300">PAY</span>
            </div>

            {/* Bank Transfer (Bonifico SEPA) */}
            <div className="flex items-center justify-center h-6.5 px-3 bg-slate-900/60 border border-slate-900/80 rounded text-[11px] font-bold tracking-wider text-slate-300 space-x-1.5">
              <Landmark className="w-3 h-3 text-cyan-500" />
              <span className="text-[10px] tracking-wider uppercase font-mono">{lang === 'it' ? 'BONIFICO SEPA' : 'BANK TRANSFER'}</span>
            </div>
          </div>
          
          <p className="text-[10.5px] md:text-[11.5px] text-slate-500 font-sans leading-relaxed text-center max-w-md mx-auto">
            {lang === 'it' 
              ? "Ogni transazione consulenziale è protetta da protocolli crittografati SSL a 256-bit conformi agli standard di massima riservatezza bancaria."
              : "Every advisory transaction is secured through 256-bit SSL encrypted protocols conforming to high-standard banking security rules."
            }
          </p>
        </div>

        {/* Interactive Legal & Cookie Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[11.5px] md:text-[12px] tracking-widest text-slate-500 max-w-xl mx-auto pt-3 border-t border-slate-900/30">
          <button 
            onClick={() => onOpenLegal?.('privacy')}
            className="hover:text-cyan-400 transition-all cursor-pointer focus:outline-none flex items-center space-x-1 uppercase"
            title="Privacy Policy"
          >
            <Eye className="w-3 h-3 text-slate-600 hover:text-cyan-400 shrink-0" />
            <span>Privacy Policy</span>
          </button>
          
          <span className="text-slate-800 text-xs">•</span>
          
          <button 
            onClick={() => onOpenLegal?.('cookie')}
            className="hover:text-cyan-400 transition-all cursor-pointer focus:outline-none flex items-center space-x-1 uppercase font-bold text-slate-400"
            title="Cookie Preferences // Configura Cookie"
          >
            <Shield className="w-3 h-3 text-cyan-600 hover:text-cyan-400 shrink-0" />
            <span>Cookie Settings</span>
          </button>
          
          <span className="text-slate-800 text-xs">•</span>
          
          <button 
            onClick={() => onOpenLegal?.('terms')}
            className="hover:text-cyan-400 transition-all cursor-pointer focus:outline-none flex items-center space-x-1 uppercase"
            title="Terms of Service // Termini di Servizio"
          >
            <FileText className="w-3 h-3 text-slate-600 hover:text-cyan-400 shrink-0" />
            <span>Termini di Servizio</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
