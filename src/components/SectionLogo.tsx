import { Language } from '../types';

interface SectionLogoProps {
  lang: Language;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionLogo({ lang, className = '', align = 'left' }: SectionLogoProps) {
  const isCenter = align === 'center';
  const isRight = align === 'right';

  return (
    <div className={`flex items-center space-x-2.5 pb-3 opacity-75 hover:opacity-100 transition-opacity duration-300 ${isCenter ? 'justify-center text-center' : isRight ? 'justify-end text-right' : 'justify-start text-left'} ${className}`}>
      <div className="relative flex-shrink-0 select-none">
        <svg
          className="w-5.5 h-5.5 text-cold-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" className="stroke-cyan-500/10"></circle>
          <circle cx="12" cy="12" r="7" strokeDasharray="4 2"></circle>
          <circle cx="12" cy="12" r="2.5" className="fill-cold-400/20"></circle>
          <line x1="12" y1="0" x2="12" y2="24" className="stroke-cyan-500/20"></line>
          <line x1="0" y1="12" x2="24" y2="12" className="stroke-cyan-500/20"></line>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-bold tracking-widest uppercase font-serif text-slate-100">
          Elena Angelini
        </span>
        <span className="text-[7.5px] font-mono text-cold-400 tracking-wider uppercase">
          {lang === 'it' ? 'Studio Criminalistica' : 'Forensic Studio'}
        </span>
      </div>
    </div>
  );
}
