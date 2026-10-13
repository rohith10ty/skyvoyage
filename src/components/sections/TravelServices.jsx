import React from 'react';
import { motion } from 'framer-motion';
import {
  PlaneTakeoff,
  Building2,
  FileCheck,
  ShieldCheck,
  Car,
  Compass,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { services } from '../../data/services';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const iconMap = {
  PlaneTakeoff,
  Building2,
  FileCheck,
  ShieldCheck,
  Car,
  Compass
};

export function TravelServices() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background Soft Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-100/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="END-TO-END CONCIERGE"
          title="Comprehensive"
          highlight="Travel Services"
          subtitle="From tarmac aircraft boarding to five-star villa key delivery. We engineer frictionless journeys so you only focus on the destination."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || PlaneTakeoff;

            return (
              <motion.div
                key={service.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`${service.colSpan} flex`}
              >
                <div
                  className="w-full group rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-[0_20px_40px_rgba(2,132,199,0.1)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xs"
                >
                  {/* Subtle Top Ambient Ray */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-sky-100/50 rounded-full blur-2xl group-hover:bg-sky-200/50 transition-colors pointer-events-none" />

                  <div>
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-13 h-13 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-110 group-hover:bg-sky-100 transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold group-hover:text-sky-700 transition-colors">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Service Inclusions / Perks List */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="space-y-2 mb-4">
                      {service.perks.map((perk, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-sky-600 hover:text-amber-600 transition-colors pt-2 cursor-pointer"
                    >
                      <span>Inquire Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
