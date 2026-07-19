import { Scale, ChevronRight } from 'lucide-react';
import { Language, translations, PageId } from '../types';
import { motion } from 'motion/react';

interface HeroProps {
  lang: Language;
  onExploreServices: () => void;
  openBooking: () => void;
}

export default function Hero({ lang, onExploreServices, openBooking }: HeroProps) {
  const t = translations[lang];

  const renderDoubleColor = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 1) return text;
    const mid = words.length <= 2 ? 1 : Math.ceil(words.length * 0.5);
    return (
      <>
        <span className="text-slate-100">{words.slice(0, mid).join(' ')}</span>{' '}
        <span className="text-cold-400 font-extrabold">{words.slice(mid).join(' ')}</span>
      </>
    );
  };

  return (
    <section className="space-y-10 py-6 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Main Philosophy & Text Column */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-cold-500/10 border border-cold-500/20 text-cold-400 font-mono text-[9px] px-3.5 py-1.5 rounded-full uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cold-400 animate-pulse"></span>
            <span>{t['badge-philosophy']}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight"
          >
            {renderDoubleColor(t['p1-title'])}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base leading-relaxed"
          >
            {t['p1-desc']}
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="border-l-2 border-cold-500 pl-4 py-2 italic text-slate-300 text-xs md:text-sm bg-cold-900/10 rounded-r"
          >
            "{t['p1-quote']}"
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-3 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={openBooking}
              id="hero-booking-cta"
              className="bg-cold-500 hover:bg-cold-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded transition-all shadow-lg shadow-cold-500/10 flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
            >
              <span>{t['p1-cta']}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreServices}
              id="hero-explore-cta"
              className="border border-slate-800 hover:border-cold-400 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs px-6 py-4 rounded transition-all cursor-pointer active:scale-[0.98]"
            >
              {t['p1-explore']}
            </button>
          </motion.div>
        </div>

        {/* Criminological Technical Monitor HUD Column */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative bg-slate-900/15 border border-slate-800/80 p-6 rounded-lg shadow-2xl scanlines overflow-hidden"
          >
            <div className="absolute top-2 right-2 font-mono text-[8px] text-cold-400/30">
              STATION_SYS // ACTIVE
            </div>
            <h4 className="font-mono text-[10px] text-cold-400 uppercase tracking-widest mb-3.5">
              // ANALYSIS_DIAGNOSTIC_SUITE
            </h4>

            {/* Embedded High-Quality Forensic Imagery */}
            <div className="mb-4 rounded-lg overflow-hidden border border-slate-800/60 shadow-lg relative group">
              <img 
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600" 
                alt="Forensic Analysis Station" 
                className="w-full h-36 md:h-40 object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-1.5 left-2 text-[7px] font-mono text-cyan-400/80">
                SPECTROMETRY_READOUT // CELL_IMAGING_ACTIVE
              </div>
            </div>

            <div className="space-y-5">
              {/* Stat 1 */}
              <div className="border-b border-slate-800/40 pb-3">
                <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1">
                  <span>3D_SCENE_RECONSTRUCTION (FORA)</span>
                  <span className="text-cold-400">100% VALIDATED</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-cold-600 to-cold-400 h-full"
                  ></motion.div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="border-b border-slate-800/40 pb-3">
                <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1">
                  <span>CRIMINAL_PROFILING_ACCURACY</span>
                  <span className="text-cold-400">98.2% INTEGRITY</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '98.2%' }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                    className="bg-gradient-to-r from-cold-600 to-cold-400 h-full"
                  ></motion.div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="border-b border-slate-800/40 pb-3">
                <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1">
                  <span>PSYCHOLOGICAL_AUTOPSY_PROTOCOL</span>
                  <span className="text-cold-400">91.4% RELIABILITY</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '91.4%' }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    className="bg-gradient-to-r from-cold-600 to-cold-400 h-full"
                  ></motion.div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3.5 bg-cold-950/60 rounded border border-cyan-950/30 text-[11px] font-mono text-cyan-400/80 flex items-start space-x-2.5">
              <span className="relative flex h-2 w-2 mt-1 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="leading-relaxed">{t['m-shield-desc']}</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
