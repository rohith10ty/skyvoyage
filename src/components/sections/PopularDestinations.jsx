import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, ArrowRight, X, PlaneTakeoff, ShieldAlert, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { destinations } from '../../data/destinations';
import { formatCurrency, handleImageError } from '../../lib/utils';
import { useLenis } from '../layout/SmoothScroll';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function PopularDestinations({ onSelectDestination }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useLenis() || {};

  const handleOpenModal = (destination) => {
    setSelectedDestination(destination);
  };

  const handleBookFromModal = (destination) => {
    if (onSelectDestination) {
      onSelectDestination(destination.name);
    }
    setSelectedDestination(null);
    if (scrollTo) {
      scrollTo('#contact');
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-slate-200/60">
      {/* Background Soft Radiance */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="CURATED HORIZONS"
          title="World-Class"
          highlight="Tours & Escapes"
          subtitle="Handcrafted aerial itineraries to the planet's most coveted destinations. Travel on your schedule with zero terminal wait times."
        />

        {/* 8 Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard
                enableTilt={true}
                className="group h-full flex flex-col bg-white border border-slate-200/90 hover:border-sky-400/80 cursor-pointer shadow-[0_4px_20px_rgba(15,23,42,0.05)] hover:shadow-[0_15px_35px_rgba(2,132,199,0.12)] transition-all duration-300"
                onClick={() => handleOpenModal(dest)}
              >
                {/* Image Container with aspect ratio to avoid layout shift */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country} luxury tour`}
                    loading="eager"
                    onError={(e) => handleImageError(e, dest.fallbackBg)}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                  {/* Rating Tag */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm flex items-center gap-1.5 text-xs font-mono text-slate-800 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dest.rating.toFixed(2)}</span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm flex items-center gap-1.5 text-xs font-mono text-sky-700 font-semibold">
                    <Clock className="w-3 h-3 text-sky-600" />
                    <span>{dest.flightDuration}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                      {dest.country}
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {dest.tagline}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">From</span>
                      <span className="text-lg font-display font-extrabold text-slate-900">
                        {formatCurrency(dest.price)}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-all duration-300 transform group-hover:translate-x-1 shadow-xs">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDestination(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-[0_25px_60px_rgba(15,23,42,0.25)] overflow-hidden z-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-dest-title"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-slate-200 text-slate-800 hover:text-amber-600 flex items-center justify-center cursor-pointer shadow-sm"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative h-64 sm:h-72 w-full">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                    {selectedDestination.country}
                  </span>
                  <h3 id="modal-dest-title" className="text-3xl font-display font-bold text-white">
                    {selectedDestination.name}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedDestination.tagline}. Every journey is tailored with customized flight schedules, private terminal transfers, and five-star accommodations.
                </p>

                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-700 font-bold mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Curated Tour Highlights</span>
                </h4>
                <ul className="space-y-2 mb-8">
                  {selectedDestination.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-slate-400 font-bold block">Charter Package From</span>
                    <span className="text-2xl font-display font-extrabold text-slate-900">
                      {formatCurrency(selectedDestination.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookFromModal(selectedDestination)}
                    className="min-h-[44px] px-6 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-amber-500 text-white font-display font-bold text-sm hover:shadow-[0_0_25px_rgba(2,132,199,0.35)] cursor-pointer flex items-center gap-2"
                  >
                    <PlaneTakeoff className="w-4 h-4" />
                    <span>Inquire for {selectedDestination.name}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
