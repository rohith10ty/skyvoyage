import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Sparkles, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';
import { packagesData } from '../../data/packages';
import { formatCurrency } from '../../lib/utils';
import { useLenis } from '../layout/SmoothScroll';

export function FlightPackages({ onSelectPackage }) {
  const [region, setRegion] = useState('international'); // 'international' | 'domestic'
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 42, seconds: 19 });
  const { scrollTo } = useLenis() || {};

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentPackages = packagesData[region] || packagesData.international;

  const handleBookPackage = (pkg) => {
    if (onSelectPackage) {
      onSelectPackage(`${pkg.name} (${region.toUpperCase()})`);
    }
    if (scrollTo) {
      scrollTo('#contact');
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      {/* Background Soft Cones */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-200/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-200/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="EXCLUSIVE FLIGHT TIERS"
          title="Curated Aviation"
          highlight="Packages & Offers"
          subtitle="Engineered for discerning adventurers, executives, and couples. Choose between worldwide bespoke routes or regional luxury corridors."
        />

        {/* Region Switcher & Countdown Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 max-w-4xl mx-auto mb-14 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {/* Animated Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setRegion('international')}
              className={`relative px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 flex-1 sm:flex-initial cursor-pointer ${
                region === 'international' ? 'text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {region === 'international' && (
                <motion.div
                  layoutId="regionPill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 shadow-xs"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">International Flights</span>
            </button>

            <button
              type="button"
              onClick={() => setRegion('domestic')}
              className={`relative px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 flex-1 sm:flex-initial cursor-pointer ${
                region === 'domestic' ? 'text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {region === 'domestic' && (
                <motion.div
                  layoutId="regionPill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 shadow-xs"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Domestic Corridors</span>
            </button>
          </div>

          {/* Flash Countdown Timer */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-700">
            <div className="flex items-center gap-1.5 text-amber-600">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="font-bold uppercase tracking-wider">Flash Offer Ends In:</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-slate-900">
              <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-amber-600">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-amber-600">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-amber-600">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          <AnimatePresence mode="wait">
            {currentPackages.map((pkg, idx) => {
              const isPopular = pkg.popular;
              return (
                <motion.div
                  key={`${region}-${pkg.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex"
                >
                  <div
                    className={`relative w-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                      isPopular
                        ? 'bg-gradient-to-b from-amber-50/60 via-white to-white border-2 border-amber-400 shadow-[0_15px_40px_rgba(245,158,11,0.18)] md:-translate-y-2'
                        : 'bg-white border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-xl'
                    }`}
                  >
                    {/* Featured Ribbon Badge */}
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-xs font-bold font-mono uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>MOST POPULAR CHOICE</span>
                      </div>
                    )}

                    <div>
                      {/* Tier & Duration */}
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-sky-600 font-bold uppercase tracking-wider">{pkg.tier}</span>
                        <span className="text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pkg.duration}
                        </span>
                      </div>

                      {/* Package Name */}
                      <h3 className="text-2xl font-display font-bold text-slate-900 mb-1.5">{pkg.name}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-5 min-h-[36px]">{pkg.tagline}</p>

                      {/* Pricing Block */}
                      <div className="mb-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-display font-black text-slate-900">{formatCurrency(pkg.price)}</span>
                          <span className="text-xs text-slate-400 line-through">{formatCurrency(pkg.originalPrice)}</span>
                        </div>
                        <div className="text-[11px] font-mono text-emerald-600 font-bold mt-1">
                          {pkg.discountBadge}
                        </div>
                      </div>

                      {/* Inclusions Checklist */}
                      <div className="space-y-2.5 mb-8">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                          Included Privileges:
                        </span>
                        {pkg.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="leading-snug">{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => handleBookPackage(pkg)}
                      className={`w-full min-h-[46px] rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isPopular
                          ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 shadow-md hover:shadow-lg'
                          : 'bg-slate-100 hover:bg-sky-500 hover:text-white text-slate-800 border border-slate-200'
                      }`}
                    >
                      <span>{pkg.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
