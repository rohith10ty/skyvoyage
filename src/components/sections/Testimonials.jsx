import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Plane } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonials } from '../../data/testimonials';
import { handleImageError } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Auto-play interval
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [prefersReducedMotion, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-slate-50/70 relative overflow-hidden border-t border-slate-200/80">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-200/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="VOICES OF DISTINCTION"
          title="Acclaimed by"
          highlight="Global Aviators"
          subtitle="Read verified reflections from our private aviation clientele, family offices, and luxury expedition voyagers."
        />

        {/* Carousel Card Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[340px] sm:min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-[0_15px_40px_rgba(15,23,42,0.06)] relative"
              >
                {/* Quotation Icon Decor */}
                <div className="absolute top-6 right-6 text-slate-100 pointer-events-none">
                  <Quote className="w-20 h-20" />
                </div>

                {/* Rating Stars & Route Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-bold">
                    <Plane className="w-3.5 h-3.5" />
                    <span>{activeTestimonial.route}</span>
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-xl text-slate-800 font-display italic leading-relaxed mb-8">
                  "{activeTestimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    onError={(e) => handleImageError(e)}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-400"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900">{activeTestimonial.name}</h3>
                    <p className="text-xs text-slate-500 font-sans">{activeTestimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to testimonial ${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === dotIdx ? 'w-8 bg-sky-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
