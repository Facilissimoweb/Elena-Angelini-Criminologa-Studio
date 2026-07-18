import { useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function Toast({ isOpen, title, message, onClose }: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cold-500/40 text-slate-100 px-5 py-4 rounded-xl shadow-2xl flex items-start space-x-3.5 max-w-sm scanlines"
          id="toast-notification-banner"
        >
          {/* Animated Glow Dot */}
          <div className="relative flex h-5 w-5 mt-0.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <ShieldCheck className="relative inline-flex rounded-full w-5 h-5 text-emerald-400 bg-slate-950" />
          </div>

          <div className="flex-grow space-y-1 text-left font-mono">
            <p className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              {title}
            </p>
            <p className="text-[11px] text-slate-400 leading-normal font-sans">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            id="toast-close-btn"
            className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
