import { Scale, Lock } from 'lucide-react';
import { Language, translations } from '../types';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  return (
    <footer className="border-t border-slate-900 bg-cold-950 text-slate-500 py-10 px-4 text-center text-[10px] font-mono mt-12">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Title */}
        <p className="text-slate-300 font-bold tracking-widest font-serif text-sm uppercase">
          {t['footer-title']}
        </p>

        {/* Corporate & contact info */}
        <p className="text-slate-400">
          {t['footer-info']}
        </p>

        {/* VAT and copyright */}
        <p className="text-slate-500">
          &copy; {new Date().getFullYear()} Studio Criminalistica Elena Angelini. {lang === 'it' ? 'Tutti i diritti riservati' : 'All rights reserved'}. | P.IVA 01234567890
        </p>

        {/* Professional Secrecy Shield Block */}
        <div className="max-w-xl mx-auto p-4 bg-slate-950 border border-slate-900/80 rounded-xl space-y-2 text-left">
          <div className="flex items-center space-x-1.5 text-cold-400 font-bold uppercase tracking-wider text-[8px]">
            <Lock className="w-3.5 h-3.5 text-cold-500" />
            <span>CONFIDENTIALITY_ESTABLISHMENT // SECRECY_REGULATED</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-sans">
            {t['footer-disclaimer']}
          </p>
        </div>

      </div>
    </footer>
  );
}
