import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Compass, Navigation, Radio, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const waypoints = [
  {
    step: '01',
    phase: 'DEPARTURE CLEARANCE',
    title: 'Private Lounge Boarding',
    alt: '0 FT • TARMAC RAMP',
    speed: '0 KNOTS',
    description: 'Chauffeured tarmac boarding beside aircraft stairs. Zero security bottlenecks, private customs verification, champagne upon step onboard.',
  },
  {
    step: '02',
    phase: 'CRUISING VELOCITY',
    title: 'Supersonic Calm at 45,000 FT',
    alt: '45,000 FT • FL450',
    speed: '530 KNOTS',
    description: 'Flying above commercial traffic and weather turbulence. Lie-flat master stateroom comfort, Michelin course service, satellite connectivity.',
  },
  {
    step: '03',
    phase: 'PRECISION DESCENT',
    title: 'Arrival at Remote Paradise',
    alt: '1,200 FT • APPROACH',
    speed: '140 KNOTS',
    description: 'Scenic aerial descent over turquoise atolls or alpine summits. Dedicated ramp liaison with seaplane or private yacht connection awaiting.',
  },
];

export function FlightCorridor() {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const progressLineRef = useRef(null);
  const [activePhase, setActivePhase] = useState(0); // 0 = unhighlighted before scroll
  const currentPhaseRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.matchMedia();

    // Desktop Pinning Experience (>= 1024px)
    ctx.add('(min-width: 1024px)', () => {
      // Pin and scrub timeline so the bar and flight move together across the rail
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            let next = 0;
            // Phase 1 highlights ONLY when plane starts moving (p > 0.02)
            if (p <= 0.02) {
              next = 0;
            } else if (p < 0.38) {
              next = 1;
            } else if (p < 0.72) {
              next = 2; // Cruising FL450
            } else {
              next = 3; // Remote approach
            }

            if (currentPhaseRef.current !== next) {
              currentPhaseRef.current = next;
              setActivePhase(next);
            }
          },
          onLeaveBack: () => {
            currentPhaseRef.current = 0;
            setActivePhase(0);
          },
        },
      });

      // Animate horizontal progress line fill from 0% to 100%
      if (progressLineRef.current) {
        tl.fromTo(progressLineRef.current, { width: '0%' }, { width: '100%', ease: 'none' }, 0);
      }

      // Animate aeroplane flying horizontally from 0% to 100% in exact lockstep with the bar
      if (planeRef.current) {
        tl.fromTo(
          planeRef.current,
          { left: '0%' },
          {
            left: '100%',
            ease: 'none',
          },
          0
        );
      }
    });

    // Mobile / Tablet Scrub (< 1024px)
    ctx.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            let next = 0;
            if (p <= 0.05) {
              next = 0;
            } else if (p < 0.38) {
              next = 1;
            } else if (p < 0.72) {
              next = 2;
            } else {
              next = 3;
            }

            if (currentPhaseRef.current !== next) {
              currentPhaseRef.current = next;
              setActivePhase(next);
            }
          },
          onLeaveBack: () => {
            currentPhaseRef.current = 0;
            setActivePhase(0);
          },
        },
      });

      if (progressLineRef.current) {
        tl.fromTo(progressLineRef.current, { width: '0%' }, { width: '100%', ease: 'none' }, 0);
      }

      if (planeRef.current) {
        tl.fromTo(
          planeRef.current,
          { left: '0%' },
          { left: '100%', ease: 'none' },
          0
        );
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-12 lg:py-0 lg:min-h-screen bg-slate-50/70 text-slate-800 flex flex-col justify-center items-center overflow-hidden border-t border-b border-slate-200/80"
    >
      {/* Background Lighting Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-sky-200/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-16 sm:pt-20 lg:pt-10 xl:pt-14 pb-4 sm:pb-6 flex flex-col justify-center items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5 lg:mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase mb-1.5">
            <Radio className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            <span>THE SKYVOYAGE FLIGHT CORRIDOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-display font-bold tracking-tight text-slate-900">
            Seamless Aviation, From <span className="text-gradient-sky">Tarmac to Atoll</span>
          </h2>
          <p className="mt-1 text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            Experience our uncompromising flight corridor protocol engineered to protect your time and peace of mind.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* Horizontal Flight Track Corridor (Located ABOVE the 3 Phase Cards)       */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-5xl xl:max-w-6xl mx-auto mb-5 sm:mb-6 lg:mb-6 px-4 sm:px-8">
          <div className="relative h-14 sm:h-16 flex items-center">
            {/* Background static horizontal line rail */}
            <div className="absolute inset-x-8 sm:inset-x-12 h-1.5 sm:h-2 bg-slate-200 rounded-full shadow-inner overflow-hidden">
              {/* Animated horizontal progress fill line that expands with the plane */}
              <div
                ref={progressLineRef}
                className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-500 rounded-full origin-left"
                style={{ width: '0%' }}
              />
            </div>

            {/* Waypoint Waymarkers Aligned Across the Rail */}
            <div className="absolute inset-x-8 sm:inset-x-12 flex justify-between pointer-events-none items-center">
              {/* Waypoint 1 (0 FT - Tarmac Departure) */}
              <div
                className="flex flex-col items-center -translate-x-1/2 cursor-pointer pointer-events-auto"
                onClick={() => setActivePhase(1)}
              >
                <div className={`relative transition-all duration-300 ${
                  activePhase === 1 ? 'scale-125' : 'scale-100'
                }`}>
                  {activePhase === 1 && (
                    <span className="absolute -inset-1 rounded-full bg-sky-400/35 animate-ping" />
                  )}
                  <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 ${
                    activePhase === 1
                      ? 'bg-sky-500 border-white ring-4 ring-sky-300/50 shadow-md'
                      : 'bg-white border-slate-300 shadow-xs'
                  }`} />
                </div>
                <span className={`text-[10px] font-mono font-bold mt-1 sm:mt-1.5 px-2 py-0.5 rounded border whitespace-nowrap transition-all duration-300 ${
                  activePhase === 1
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  0 FT
                </span>
              </div>

              {/* Waypoint 2 (45,000 FT - Cruising FL450) */}
              <div
                className="flex flex-col items-center cursor-pointer pointer-events-auto"
                onClick={() => setActivePhase(2)}
              >
                <div className={`relative transition-all duration-300 ${
                  activePhase === 2 ? 'scale-125' : 'scale-100'
                }`}>
                  {activePhase === 2 && (
                    <span className="absolute -inset-1 rounded-full bg-cyan-400/35 animate-ping" />
                  )}
                  <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 ${
                    activePhase === 2
                      ? 'bg-cyan-500 border-white ring-4 ring-cyan-300/50 shadow-md'
                      : 'bg-white border-slate-300 shadow-xs'
                  }`} />
                </div>
                <span className={`text-[10px] font-mono font-bold mt-1 sm:mt-1.5 px-2 py-0.5 rounded border whitespace-nowrap transition-all duration-300 ${
                  activePhase === 2
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  45,000 FT
                </span>
              </div>

              {/* Waypoint 3 (1,200 FT - Precision Descent) */}
              <div
                className="flex flex-col items-center translate-x-1/2 cursor-pointer pointer-events-auto"
                onClick={() => setActivePhase(3)}
              >
                <div className={`relative transition-all duration-300 ${
                  activePhase === 3 ? 'scale-125' : 'scale-100'
                }`}>
                  {activePhase === 3 && (
                    <span className="absolute -inset-1 rounded-full bg-amber-400/35 animate-ping" />
                  )}
                  <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 ${
                    activePhase === 3
                      ? 'bg-amber-500 border-white ring-4 ring-amber-300/50 shadow-md'
                      : 'bg-white border-slate-300 shadow-xs'
                  }`} />
                </div>
                <span className={`text-[10px] font-mono font-bold mt-1 sm:mt-1.5 px-2 py-0.5 rounded border whitespace-nowrap transition-all duration-300 ${
                  activePhase === 3
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  1,200 FT
                </span>
              </div>
            </div>

            {/* Aeroplane Marker flying horizontally in lockstep with the progress bar (Plane icon only, no box) */}
            <div className="absolute inset-x-8 sm:inset-x-12 pointer-events-none">
              <div
                ref={planeRef}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center"
                style={{ left: '0%' }}
              >
                {/* Clean Plane icon with glowing aura and contrail */}
                <div className="relative flex items-center justify-center">
                  <Plane className="w-7 h-7 sm:w-8 sm:h-8 rotate-45 text-amber-500 fill-amber-400/35 drop-shadow-[0_2px_10px_rgba(245,158,11,0.55)] transition-transform" />
                  {/* Subtle jet thrust contrail behind the plane */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-7 sm:w-9 h-1 bg-gradient-to-l from-amber-400/80 to-transparent blur-[1px] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 Phase Cards Grid (Located BELOW the Horizontal Track)                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 xl:gap-6 w-full max-w-5xl xl:max-w-6xl mx-auto">
          {/* Phase 01 Card */}
          <div
            className={`transition-all duration-500 cursor-pointer ${
              activePhase === 1
                ? 'opacity-100 scale-[1.02] -translate-y-2 z-20'
                : activePhase === 0
                ? 'opacity-90 scale-100 translate-y-0 z-10'
                : 'opacity-45 hover:opacity-75 scale-[0.98] translate-y-0 z-10'
            }`}
            onClick={() => setActivePhase(1)}
          >
            <div className={`p-4 sm:p-5 xl:p-6 rounded-2xl xl:rounded-3xl bg-white transition-all duration-500 h-full flex flex-col justify-between ${
              activePhase === 1
                ? 'border border-sky-400 shadow-[0_18px_40px_-8px_rgba(2,132,199,0.22)] ring-1 ring-sky-300/40'
                : 'border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]'
            }`}>
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                  <span className="text-sky-600">PHASE {waypoints[0].step} • {waypoints[0].phase}</span>
                  <span className="text-amber-600">{waypoints[0].alt}</span>
                </div>
                <h3 className="text-base sm:text-lg xl:text-lg font-display font-bold text-slate-900 mb-1.5">
                  {waypoints[0].title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {waypoints[0].description}
                </p>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
                <span>RAMP CLEARANCE</span>
                <span className="text-sky-600 font-bold">{waypoints[0].speed}</span>
              </div>
            </div>
          </div>

          {/* Phase 02 Card */}
          <div
            className={`transition-all duration-500 cursor-pointer ${
              activePhase === 2
                ? 'opacity-100 scale-[1.02] -translate-y-2 z-20'
                : activePhase === 0
                ? 'opacity-90 scale-100 translate-y-0 z-10'
                : 'opacity-45 hover:opacity-75 scale-[0.98] translate-y-0 z-10'
            }`}
            onClick={() => setActivePhase(2)}
          >
            <div className={`p-4 sm:p-5 xl:p-6 rounded-2xl xl:rounded-3xl bg-white transition-all duration-500 h-full flex flex-col justify-between ${
              activePhase === 2
                ? 'border border-cyan-400 shadow-[0_18px_40px_-8px_rgba(6,182,212,0.22)] ring-1 ring-cyan-300/40'
                : 'border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]'
            }`}>
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                  <span className="text-cyan-600">PHASE {waypoints[1].step} • {waypoints[1].phase}</span>
                  <span className="text-amber-600">{waypoints[1].alt}</span>
                </div>
                <h3 className="text-base sm:text-lg xl:text-lg font-display font-bold text-slate-900 mb-1.5">
                  {waypoints[1].title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {waypoints[1].description}
                </p>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
                <span>CRUISE ALTITUDE</span>
                <span className="text-cyan-600 font-bold">{waypoints[1].speed}</span>
              </div>
            </div>
          </div>

          {/* Phase 03 Card */}
          <div
            className={`transition-all duration-500 cursor-pointer ${
              activePhase === 3
                ? 'opacity-100 scale-[1.02] -translate-y-2 z-20'
                : activePhase === 0
                ? 'opacity-90 scale-100 translate-y-0 z-10'
                : 'opacity-45 hover:opacity-75 scale-[0.98] translate-y-0 z-10'
            }`}
            onClick={() => setActivePhase(3)}
          >
            <div className={`p-4 sm:p-5 xl:p-6 rounded-2xl xl:rounded-3xl bg-white transition-all duration-500 h-full flex flex-col justify-between ${
              activePhase === 3
                ? 'border border-amber-400 shadow-[0_18px_40px_-8px_rgba(245,158,11,0.22)] ring-1 ring-amber-300/40'
                : 'border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)]'
            }`}>
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                  <span className="text-amber-600">PHASE {waypoints[2].step} • {waypoints[2].phase}</span>
                  <span className="text-amber-600">{waypoints[2].alt}</span>
                </div>
                <h3 className="text-base sm:text-lg xl:text-lg font-display font-bold text-slate-900 mb-1.5">
                  {waypoints[2].title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {waypoints[2].description}
                </p>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
                <span>FINAL APPROACH</span>
                <span className="text-amber-600 font-bold">{waypoints[2].speed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



