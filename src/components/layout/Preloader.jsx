import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is requested, already shown in this session, or skip param present, skip immediately
    const hasSeenPreloader = sessionStorage.getItem('skyvoyage_preloader_shown');
    const hasSkipParam = typeof window !== 'undefined' && window.location.search.includes('skipPreloader');
    if (prefersReducedMotion || hasSeenPreloader || hasSkipParam) {
      setIsVisible(false);
      onComplete?.();
      return;
    }


    // Progress counter running over ~1.6 seconds (max 2s limit)
    const startTime = Date.now();
    const duration = 1600;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        sessionStorage.setItem('skyvoyage_preloader_shown', 'true');
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070C1E] text-white overflow-hidden pointer-events-auto"
          aria-live="polite"
          aria-label="Loading SkyVoyage experience"
        >
          {/* Subtle Runway Ambience Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.1)_0%,_transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-sm px-6 w-full text-center">
            {/* Animated Plane Mark */}
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  filter: ['drop-shadow(0 0 15px rgba(0,212,255,0.4))', 'drop-shadow(0 0 25px rgba(245,184,65,0.5))', 'drop-shadow(0 0 15px rgba(0,212,255,0.4))']
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F1A3A] to-[#0A1128] border border-white/15"
              >
                <svg className="w-9 h-9 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
                </svg>
              </motion.div>
            </div>

            {/* Brand Wordmark */}
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">SKYVOYAGE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-8 font-medium">
              Bespoke Aviation &bull; Cleared for Takeoff
            </p>

            {/* Glowing Runway Progress Bar */}
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-white/10 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            <div className="flex justify-between w-full mt-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                INITIALIZING SYSTEMS
              </span>
              <span className="text-cyan-400 font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
