import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Award, Shield, CheckCircle, Plane } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { milestones, leadership } from '../../data/stats';
import { handleImageError } from '../../lib/utils';

export function AboutUs() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background Soft Radiance */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Luxury Jet Image */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1000&q=80"
                  alt="SkyVoyage private jet tarmac boarding"
                  loading="eager"
                  onError={(e) => handleImageError(e)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>

              {/* Overlapping Floating Inset Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden border-2 border-sky-400 shadow-2xl bg-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80"
                  alt="Luxury private flight cruising above clouds"
                  loading="eager"
                  onError={(e) => handleImageError(e)}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Aviation Badge */}
              <div className="absolute -top-6 -left-4 sm:-left-6 px-4 py-3 rounded-2xl bg-white/95 border border-amber-300 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-slate-900">15+ Years</div>
                  <div className="text-[10px] font-mono text-slate-500 font-semibold">Aviation Excellence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Heritage */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
              <Compass className="w-3.5 h-3.5" />
              <span>THE SKYVOYAGE ETHOS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Reimagining Flight as an <span className="text-gradient-sky">Art of Living</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              Founded by passionate aviators and luxury hospitality connoisseurs, SkyVoyage was built to liberate discerning travelers from the friction of mass commercial terminals.
            </p>

            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Every itinerary is calibrated to your rhythm: private tarmac clearance, custom flight paths around natural wonders, world-class in-flight sommeliers, and hand-selected five-star sanctuary accommodations at your destination.
            </p>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 mb-0.5">Sovereign Safety</h3>
                  <p className="text-xs text-slate-500">ARG/US Gold &amp; Wyvern certified operators only.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 mb-0.5">Total Schedule Freedom</h3>
                  <p className="text-xs text-slate-500">Depart on your terms. No baggage queues or delays.</p>
                </div>
              </div>
            </div>

            {/* Milestone Timeline */}
            <div className="mb-10 pt-6 border-t border-slate-200">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-4">
                MILESTONES OF OUR JOURNEY
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-mono text-sky-600 text-lg font-bold">{m.year}</span>
                    <span className="font-display font-bold text-xs text-slate-900 mt-0.5">{m.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meet the Flight Leadership Team */}
            <div className="pt-6 border-t border-slate-200">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3">
                AVIATION COMMAND &amp; CONCIERGE LEADERSHIP
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {leadership.map((leader, lIdx) => (
                  <div key={lIdx} className="flex items-center gap-3 p-2 pr-4 rounded-xl bg-slate-50 border border-slate-200">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      onError={(e) => handleImageError(e)}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="text-xs font-display font-bold text-slate-900">{leader.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{leader.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
