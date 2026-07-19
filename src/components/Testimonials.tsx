import { MessageSquare, BadgeCheck, FileText, Quote } from 'lucide-react';
import { Language, testimonialsData, translations } from '../types';
import { motion } from 'motion/react';

const authorAvatars: Record<string, string> = {
  t1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150', // corporate CEO
  t2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=150', // specialized technician
  t3: 'https://images.unsplash.com/photo-1472417583565-62e7bdeda490?auto=format&fit=crop&q=80&w=150', // pensioner
  t4: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150', // teacher/student educator
};

interface TestimonialsProps {
  lang: Language;
  openBooking: () => void;
}

export default function Testimonials({ lang, openBooking }: TestimonialsProps) {
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
    <section className="space-y-10 py-6">
      
      {/* Header Block */}
      <div className="text-left space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 bg-cold-500/10 border border-cold-500/20 text-cold-400 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded">
          <span>// {t['badge-testimonials']}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-serif">
          {renderDoubleColor(t['p4-title'])}
        </h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          {t['p4-desc']}
        </p>
      </div>

      {/* Grid of testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {testimonialsData.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-900/15 border border-slate-800/80 p-6 rounded-xl flex flex-col justify-between hover:border-cold-400/40 transition-all relative overflow-hidden"
            >
              {/* Decorative Subtle Quote Mark Icon */}
              <div className="absolute right-4 top-4 text-slate-800/25 pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              {/* Text content */}
              <div className="space-y-4 text-left z-10">
                <p className="text-slate-200 text-xs sm:text-sm md:text-base italic leading-relaxed font-sans">
                  {t[item.textKey]}
                </p>
              </div>

              {/* Author & Segment Tags */}
              <div className="mt-6 pt-4 border-t border-slate-900/40 flex items-center justify-between text-[11px] font-mono z-10">
                <div className="flex items-center space-x-3 text-left">
                  <img 
                    src={authorAvatars[item.id]} 
                    alt={t[item.authorKey]} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-800/80 filter grayscale hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-cold-200">
                      {t[item.authorKey]}
                    </span>
                    <span className="text-slate-500">
                      {t[item.tagKey]}
                    </span>
                  </div>
                </div>
                
                {/* CASE STATUS EMBLEM */}
                <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">
                    {lang === 'it' ? 'Risolto' : 'Resolved'}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action callout */}
      <div className="mt-4 bg-slate-900/10 border border-slate-800 p-6 md:p-8 rounded-xl text-center space-y-4">
        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          {t['p4-cta-text']}
        </p>
        <button
          onClick={openBooking}
          id="testimonials-booking-cta"
          className="bg-cold-500 hover:bg-cold-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-lg transition-all cursor-pointer active:scale-95 shadow-md shadow-cold-500/15"
        >
          {t['p4-cta-btn']}
        </button>
      </div>

    </section>
  );
}
