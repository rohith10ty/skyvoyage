import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users2, Plane, Sparkles } from 'lucide-react';
import { CountUpNumber } from '../ui/CountUpNumber';
import { stats, partnerAirlines } from '../../data/stats';

export function StatsAndPartners() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50/80 border-t border-b border-slate-200/80 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(2,132,199,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-lg transition-all text-center flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold mb-2 text-gradient-sky">
                  <CountUpNumber
                    target={item.value}
                    decimals={item.decimals || 0}
                    suffix={item.suffix}
                  />
                </div>
                <h3 className="text-base font-display font-bold text-slate-900 mb-2">{item.label}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Fleet & Airline Partners Marquee */}
        <div className="mt-8">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 font-bold">
              TRUSTED OPERATIONAL FLEET ALLIANCES &amp; VIP CARRIERS
            </span>
          </div>

          {/* Marquee Wrapper with fading side masks */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="animate-marquee flex items-center gap-8 py-3">
              {[...partnerAirlines, ...partnerAirlines].map((partner, index) => (
                <div
                  key={`${partner.code}-${index}`}
                  className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3.5 shrink-0 hover:border-sky-400 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 font-mono font-bold text-xs">
                    {partner.code}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display font-bold text-sm tracking-wide text-slate-900">{partner.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{partner.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
