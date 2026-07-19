import { useState, FormEvent, ChangeEvent } from 'react';
import { Lock, Loader2, CheckCircle, Send, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ContactFormProps {
  lang: Language;
  triggerToast: (title: string, message: string) => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
}

type TransmissionStep = 'idle' | 'encrypting' | 'routing' | 'done';

export default function ContactForm({ lang, triggerToast }: ContactFormProps) {
  const t = translations[lang];
  
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy: false,
  });

  const [txStep, setTxStep] = useState<TransmissionStep>('idle');
  const [txProgress, setTxProgress] = useState<number>(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) return;

    // Start secure transmission simulation pipeline
    setTxStep('encrypting');
    setTxProgress(10);

    // Stage 1: Encrypting
    const interval = setInterval(() => {
      setTxProgress((p) => {
        if (p < 40) {
          return p + 15;
        } else if (p >= 40 && p < 80) {
          setTxStep('routing');
          return p + 10;
        } else if (p >= 80 && p < 100) {
          return p + 5;
        } else {
          clearInterval(interval);
          setTxStep('done');
          setTimeout(() => {
            triggerToast(t['toast-success'], t['toast-contact-msg']);
            // Reset state
            setFormData({
              name: '',
              email: '',
              phone: '',
              message: '',
              privacy: false,
            });
            setTxStep('idle');
            setTxProgress(0);
          }, 800);
          return 100;
        }
      });
    }, 250);
  };

  return (
    <section className="space-y-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="space-y-4">
            <span className="text-cold-400 font-mono text-xs uppercase tracking-widest font-semibold bg-cold-500/10 px-3 py-1 rounded border border-cold-500/10">
              // {t['badge-contacts']}
            </span>
            <h3 className="text-3xl font-bold font-serif text-slate-100">
              {t['p5-title']}
            </h3>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              {t['p5-desc']}
            </p>
          </div>

          <div className="space-y-4 pt-2 text-xs md:text-sm">
            {/* Address Card */}
            <div className="flex items-start space-x-3.5 bg-slate-900/15 p-4 border border-slate-800/80 rounded-xl hover:border-slate-700/60 transition-colors">
              <div className="text-cold-400 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-200">{t['c-address-title']}</h4>
                <p className="text-slate-400 mt-1 leading-relaxed">
                  c/o "Arbor Vitae" - Via Fabio Filzi 9, 47923 Rimini, Italia
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-start space-x-3.5 bg-slate-900/15 p-4 border border-slate-800/80 rounded-xl hover:border-slate-700/60 transition-colors">
              <div className="text-cold-400 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-200">{t['c-phone-title']}</h4>
                <a href="tel:+393661236464" className="text-cold-400 hover:underline font-mono font-bold block mt-1">
                  +39 3661236464
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex items-start space-x-3.5 bg-slate-900/15 p-4 border border-slate-800/80 rounded-xl hover:border-slate-700/60 transition-colors">
              <div className="text-cold-400 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-200">Email</h4>
                <a href="mailto:info@studiocriminalistica.it" className="text-cold-400 hover:underline font-mono font-bold block mt-1">
                  info@studiocriminalistica.it
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-cold-950 border border-cyan-950/40 rounded-xl space-y-1">
            <span className="text-[10px] font-mono text-cold-400 block font-bold">
              {t['p5-cta-badge']}
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t['p5-cta-text']}
            </p>
          </div>
        </div>

        {/* Transmission Form Column */}
        <div className="lg:col-span-7 bg-slate-900/10 border border-slate-800/80 p-6 md:p-8 rounded-2xl scanlines relative">
          
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-mono text-[10px] text-cold-400 uppercase tracking-widest">
              // {t['f-form-title']}
            </h4>
            <div className="flex items-center space-x-1.5 text-slate-500 font-mono text-[9px]">
              <Lock className="w-3.5 h-3.5 text-cold-500/80" />
              <span>AES_256_E2E</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {txStep === 'idle' ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      {t['f-name']}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-cold-950 border border-slate-800 rounded p-3 text-xs text-slate-100 focus:outline-none focus:border-cold-400 focus:ring-1 focus:ring-cold-500/20 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      {t['f-email']}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-cold-950 border border-slate-800 rounded p-3 text-xs text-slate-100 focus:outline-none focus:border-cold-400 focus:ring-1 focus:ring-cold-500/20 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    {t['f-phone']}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-cold-950 border border-slate-800 rounded p-3 text-xs text-slate-100 focus:outline-none focus:border-cold-400 focus:ring-1 focus:ring-cold-500/20 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    {t['f-message']}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-cold-950 border border-slate-800 rounded p-3 text-xs text-slate-100 focus:outline-none focus:border-cold-400 focus:ring-1 focus:ring-cold-500/20 transition-all font-mono"
                  ></textarea>
                </div>

                <div className="flex items-start space-x-2.5 pt-2">
                  <input
                    type="checkbox"
                    name="privacy"
                    required
                    checked={formData.privacy}
                    onChange={handleInputChange}
                    className="mt-1 rounded bg-cold-950 border-slate-800 text-cold-500 focus:ring-0 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500 leading-snug font-mono">
                    {t['f-privacy']}
                  </p>
                </div>

                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  className="w-full bg-cold-500 hover:bg-cold-600 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99] focus:outline-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t['f-btn']}</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 flex flex-col items-center justify-center space-y-6"
                id="form-secure-pipeline-simulation"
              >
                {txStep === 'encrypting' && (
                  <>
                    <Loader2 className="w-12 h-12 text-cold-400 animate-spin" />
                    <div className="text-center space-y-1.5 font-mono">
                      <p className="text-xs text-slate-200 font-bold uppercase tracking-widest">
                        ENCRYPTING TRANSMISSION PACKS
                      </p>
                      <p className="text-[10px] text-cold-500">
                        HASHING PAYLOAD VIA AES_256... {txProgress}%
                      </p>
                    </div>
                  </>
                )}

                {txStep === 'routing' && (
                  <>
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                    <div className="text-center space-y-1.5 font-mono">
                      <p className="text-xs text-slate-200 font-bold uppercase tracking-widest">
                        SECURE ROUTING INTEGRATION
                      </p>
                      <p className="text-[10px] text-cyan-500">
                        UPLOADING CORRELATION MAPS... {txProgress}%
                      </p>
                    </div>
                  </>
                )}

                {txStep === 'done' && (
                  <>
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 10 }}
                    >
                      <ShieldCheck className="w-16 h-16 text-emerald-400" />
                    </motion.div>
                    <div className="text-center space-y-1.5 font-mono">
                      <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">
                        SECURE PIPELINE COMPLETE
                      </p>
                      <p className="text-[10px] text-slate-400">
                        PACKETS SIGNED AND ARCHIVED WITH PROFESSIONAL PRIVACY SEAL.
                      </p>
                    </div>
                  </>
                )}

                <div className="w-full max-w-xs bg-slate-950 h-1.5 rounded overflow-hidden border border-slate-900">
                  <div
                    className="bg-gradient-to-r from-cold-500 to-cyan-400 h-full transition-all duration-200"
                    style={{ width: `${txProgress}%` }}
                  ></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
