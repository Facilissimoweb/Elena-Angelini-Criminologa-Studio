import { useState } from 'react';
import { Search, AlertTriangle, Briefcase, Map, ChevronDown, ChevronUp, UserCheck, ShieldCheck } from 'lucide-react';
import { Language, servicesData, translations } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesProps {
  lang: Language;
  onNavigateToContact: () => void;
}

const iconMap = {
  Search: Search,
  AlertTriangle: AlertTriangle,
  Briefcase: Briefcase,
  Map: Map,
};

const serviceImages: Record<string, string> = {
  s1: 'https://images.unsplash.com/photo-1453728219085-87f2c1f8d1b8?auto=format&fit=crop&q=80&w=600', // magnifying lens profiling
  s2: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=600', // lab microscope suspicion
  s3: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600', // mobbing/office dispute
  s4: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600', // geographic mapping gis
};

export default function Services({ lang, onNavigateToContact }: ServicesProps) {
  const t = translations[lang];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Extra detailed text to display when a service card is clicked/expanded to enrich content
  const extraDetails: Record<string, { it: string[]; en: string[] }> = {
    s1: {
      it: [
        "Analisi della scena del crimine e dei fascicoli processuali.",
        "Ricostruzioni tridimensionali delle dinamiche omicidiarie (FORA 3D).",
        "Redazione di perizie e consulenze tecniche di parte (CTP).",
        "Supporto criminologico integrato per avvocati penalisti in sede dibattimentale."
      ],
      en: [
        "Crime scene investigation & case file analysis.",
        "High-fidelity 3D homicide dynamic modeling (FORA 3D).",
        "Technical forensic reports and expert witness advisory.",
        "Integrated criminological support for criminal defense attorneys."
      ]
    },
    s2: {
      it: [
        "Autopsia Psicologica: studio approfondito dello stato mentale della persona prima della scomparsa.",
        "Analisi vittimologica e interviste cognitive a parenti e testimoni.",
        "Incrocio dei reperti medico-legali e tossicologici con la ricostruzione d'ambiente.",
        "Valutazioni per la riapertura di casi archiviati come suicidi o incidenti."
      ],
      en: [
        "Psychological Autopsies: deep reconstruction of the decedent's state of mind.",
        "Victimology profiles and cognitive interview protocols.",
        "Toxicological and forensic pathology data correlation with scene blueprints.",
        "Cold case reviews for cases closed as suicides or accidental deaths."
      ]
    },
    s3: {
      it: [
        "Valutazione del nesso causale tra condotte mobbizzanti e danno biologico/psichico.",
        "Analisi criminologica aziendale delle dinamiche relazionali e vessatorie.",
        "Raccolta e blindatura legale delle prove digitali e comportamentali.",
        "Supporto tecnico per vertenze di lavoro e procedimenti disciplinari."
      ],
      en: [
        "Causal nexus assessment between hostile behavior and biological damage.",
        "Corporate criminology analysis of relational abuse and bossing patterns.",
        "Legal packaging and forensic validation of digital and behavioral proof.",
        "Technical support for labor disputes and disciplinary actions."
      ]
    },
    s4: {
      it: [
        "Mappatura GIS dei tassi di delittuosità di quartiere.",
        "Analisi spaziale dei pattern criminali sul territorio romagnolo.",
        "Survey vittimologiche locali per lo studio della percezione della sicurezza.",
        "Progettazione di piani di prevenzione integrata per enti locali e aziende."
      ],
      en: [
        "GIS mapping and predictive spatial modeling of crime density indices.",
        "Geographic criminal pattern profiling in regional territory segments.",
        "Victimological surveys on security index perception parameters.",
        "Designing integrated crime prevention protocols for corporations and municipalities."
      ]
    }
  };

  return (
    <section className="space-y-10 py-6">
      
      {/* Title block */}
      <div className="text-left space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-cold-500/10 border border-cold-500/20 text-cold-400 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded">
          <span>// {t['badge-methods']}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-serif text-slate-100">
          {t['p2-title']}
        </h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {t['p2-desc']}
        </p>
      </div>

      {/* Services Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {servicesData.map((service, index) => {
          const IconComponent = iconMap[service.iconName];
          const isExpanded = expandedId === service.id;
          const details = extraDetails[service.id]?.[lang] || [];

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-slate-900/15 border rounded-xl p-5 md:p-6 transition-all flex flex-col justify-between cursor-pointer hover:bg-slate-900/30 ${
                isExpanded ? 'border-cold-400/60 ring-1 ring-cold-400/20' : 'border-slate-800/80 hover:border-cold-500/30'
              }`}
              onClick={() => toggleExpand(service.id)}
            >
              <div className="space-y-4">
                
                {/* Widescreen Forensic Thumbnail Banner */}
                <div className="w-full h-32 md:h-36 rounded-lg overflow-hidden border border-slate-800/40 shadow-sm relative group">
                  <img 
                    src={serviceImages[service.id]} 
                    alt={t[service.titleKey]} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-cold-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                    CODE: {service.code}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-cold-500/10 border border-cold-500/20 flex items-center justify-center text-cold-400">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Title & Brief Description */}
                <div className="space-y-2 text-left">
                  <h4 className="text-xl font-bold font-serif text-slate-100 flex items-center justify-between">
                    <span>{t[service.titleKey]}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-cold-400 ml-2 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 ml-2 flex-shrink-0" />
                    )}
                  </h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {t[service.descKey]}
                  </p>
                </div>

                {/* Interactive Accordion Expansion */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-slate-900/60 space-y-2 text-left">
                        <span className="text-[9px] font-mono text-cyan-400/80 block uppercase tracking-wider mb-2">
                          // SPECIFICHE DI PROTOCOLLO:
                        </span>
                        <ul className="space-y-2">
                          {details.map((point, idx) => (
                            <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                              <span className="text-cold-400 mt-1 flex-shrink-0">▪</span>
                              <span className="leading-normal">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Informative tap footer helper */}
              {!isExpanded && (
                <div className="mt-4 pt-3 border-t border-slate-900/30 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>TAP TO EXPAND DETAILED METHODOLOGY</span>
                  <span>[ + ]</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Strategic CTA Callout */}
      <div className="bg-slate-950/40 border border-slate-900 p-6 md:p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 text-left relative overflow-hidden scanlines">
        <div className="space-y-1.5 max-w-xl z-10">
          <h4 className="font-bold text-slate-200 text-sm md:text-base">
            {t['p2-cta-text']}
          </h4>
          <p className="text-xs text-slate-500">
            {t['cta-sub-free']}
          </p>
        </div>
        <button
          onClick={onNavigateToContact}
          id="services-strategy-cta"
          className="bg-cold-500 hover:bg-cold-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded transition-all whitespace-nowrap cursor-pointer active:scale-95 z-10"
        >
          {t['p2-cta-btn']}
        </button>
      </div>

    </section>
  );
}
