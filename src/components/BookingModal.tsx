import { useState, FormEvent } from 'react';
import { X, ShieldCheck, PhoneCall, Clock, Lock } from 'lucide-react';
import { Language, translations } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  triggerToast: (title: string, message: string) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  lang,
  triggerToast,
}: BookingModalProps) {
  const t = translations[lang];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timePreference, setTimePreference] = useState('mattina');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onClose();
    triggerToast(t['toast-success'], t['toast-msg']);
    
    // Clear inputs
    setName('');
    setPhone('');
    setTimePreference('mattina');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-cold-950/80 backdrop-blur-md cursor-pointer"
          ></motion.div>

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl space-y-6 z-10 scanlines text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              id="close-booking-modal-btn"
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Badge */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-1.5 bg-cyan-950 border border-cyan-900/60 text-cyan-400 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold">
                <PhoneCall className="w-3 h-3 text-cyan-400" />
                <span>FREE_ASSESSMENT // TELEPHONE</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-slate-100">
                {t['m-title']}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {t['m-desc']}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {t['f-name']}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-cold-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-cold-400 focus:ring-1 focus:ring-cold-500/20 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {t['f-phone']}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-cold-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-cold-400 focus:ring-1 focus:ring-cold-500/20 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {t['m-time-label']}
                </label>
                <div className="relative">
                  <select
                    value={timePreference}
                    onChange={(e) => setTimePreference(e.target.value)}
                    className="w-full bg-cold-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-100 focus:outline-none focus:border-cold-400 focus:ring-1 focus:ring-cold-500/20 transition-all font-mono appearance-none"
                  >
                    <option value="mattina">{t['opt-morning']}</option>
                    <option value="pomeriggio">{t['opt-afternoon']}</option>
                  </select>
                  <Clock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="booking-modal-submit-btn"
                className="w-full bg-cold-500 hover:bg-cold-600 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-lg transition-all text-center cursor-pointer active:scale-95 focus:outline-none"
              >
                {t['m-btn']}
              </button>
            </form>

            {/* Legal / Encryption info */}
            <div className="text-[9px] font-mono text-slate-500 text-center flex items-center justify-center space-x-1.5 border-t border-slate-900/80 pt-3">
              <Lock className="w-3.5 h-3.5 text-cold-500 flex-shrink-0" />
              <span>{t['m-shield']}</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
