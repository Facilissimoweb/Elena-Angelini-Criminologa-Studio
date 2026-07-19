import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';

interface PageProgressBarProps {
  currentPage: PageId;
}

export default function PageProgressBar({ currentPage }: PageProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show and reset progress
    setVisible(true);
    setProgress(0);

    // Simulate multi-stage loading sequence
    const t1 = setTimeout(() => {
      setProgress(25);
    }, 30);

    const t2 = setTimeout(() => {
      setProgress(60);
    }, 120);

    const t3 = setTimeout(() => {
      setProgress(100);
    }, 320);

    const t4 = setTimeout(() => {
      setVisible(false);
    }, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [currentPage]);

  return (
    <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-[100] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full h-full bg-cyan-950/20"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ 
                type: 'spring', 
                stiffness: 120, 
                damping: 20,
                mass: 0.8
              }}
              className="h-full bg-gradient-to-r from-cyan-500 via-cold-400 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.7)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
