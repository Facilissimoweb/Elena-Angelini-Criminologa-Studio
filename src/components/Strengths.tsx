import { Shield, Cpu, Activity, ShieldCheck, Layers, FileSpreadsheet } from 'lucide-react';
import { Language, strengthsData, translations } from '../types';
import { motion } from 'motion/react';

interface StrengthsProps {
  lang: Language;
  onNavigateToContact: () => void;
}

const iconMap = {
  Shield: Shield,
  Cpu: Cpu,
  Activity: Activity,
};

export default function Strengths({ lang, onNavigateToContact }: StrengthsProps) {
  const t = translations[lang];

  return (
    <section className="space-y-10 py-6">
      
      {/* Header Block */}
      <div className="text-left space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-cold-500/10 border border-cold-500/20 text-cold-400 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded">
          <span>// {t['badge-strengths']}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-serif text-slate-100">
          {t['p3-title']}
        </h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {t['p3-desc']}
        </p>
      </div>

      {/* Grid of Key Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {strengthsData.map((item, index) => {
          const IconComponent = iconMap[item.iconName];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="bg-slate-900/15 border border-slate-800/80 p-6 md:p-8 rounded-xl space-y-5 hover:border-cold-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Number Highlight & Icon Row */}
                <div className="flex items-center justify-between">
                  <div className="font-mono text-4xl text-cold-400/10 font-extrabold group-hover:text-cold-400/25 transition-colors">
                    {item.num}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-cold-400 group-hover:border-cold-500/40 transition-colors">
                    <IconComponent className="w-5 h-5 text-cold-400" />
                  </div>
                </div>

                {/* Advantage Title & Details */}
                <div className="space-y-2 text-left">
                  <h4 className="text-xl font-bold font-serif text-slate-100">
                    {t[item.titleKey]}
                  </h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                    {t[item.descKey]}
                  </p>
                </div>

              </div>

              {/* Forensic Status Tag */}
              <div className="pt-4 border-t border-slate-900/40 text-[9px] font-mono text-slate-500 text-left flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>VERIFIED_CAPABILITY // CTP_COMPLIANT</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Callout */}
      <div className="mt-4 bg-slate-900/10 border border-slate-800/60 p-8 rounded-xl text-center space-y-5">
        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {t['p3-cta']}
        </p>
        <button
          onClick={onNavigateToContact}
          id="strengths-start-defense-cta"
          className="bg-cold-500 hover:bg-cold-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded-lg transition-all cursor-pointer active:scale-95 shadow-md shadow-cold-500/15 inline-flex items-center space-x-2"
        >
          <span>{t['p3-cta-btn']}</span>
        </button>
      </div>

    </section>
  );
}
