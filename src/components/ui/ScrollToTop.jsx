import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';
import { useLenis } from '../layout/SmoothScroll';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const { scrollTo } = useLenis() || {};

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    setIsTakingOff(true);
    if (scrollTo) {
      scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsTakingOff(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll back to top of flight runway"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_25px_rgba(15,23,42,0.15)] text-slate-800 hover:text-sky-600 hover:border-sky-400 hover:shadow-[0_15px_30px_rgba(2,132,199,0.25)] flex items-center justify-center transition-colors group cursor-pointer"
        >
          {/* Subtle Circular Pulse Ring */}
          <span className="absolute inset-0 rounded-full border border-sky-400/40 animate-ping opacity-30 pointer-events-none" />

          {/* Flying Jet Icon */}
          <motion.div
            animate={isTakingOff ? { y: -35, opacity: [1, 0] } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeIn' }}
            className="flex items-center justify-center"
          >
            <Plane className="w-5 h-5 -rotate-45 text-sky-600 group-hover:text-amber-500 transition-colors" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
