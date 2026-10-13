import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Plane, ShieldCheck, Star, Globe2 } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsTouch } from '../../hooks/useIsTouch';
import { useLenis } from '../layout/SmoothScroll';

const headlineWords = [
  { text: 'Fly', gradient: false },
  { text: 'Beyond', gradient: true },
  { text: 'the', gradient: false },
  { text: 'Ordinary.', gradient: false },
];

export function Hero() {
  const containerRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const { scrollTo } = useLenis() || {};

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isTouch || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  const handleScrollToBooking = () => {
    if (scrollTo) {
      scrollTo('#booking-widget');
    } else {
      document.querySelector('#booking-widget')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDestinations = () => {
    if (scrollTo) {
      scrollTo('#destinations');
    } else {
      document.querySelector('#destinations')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 sm:pt-32 pb-10 sm:pb-14 overflow-hidden bg-gradient-to-b from-[#EDF5FF] via-[#F2F7FD] to-[#EBF3FC]"
    >
      {/* Global SVG ClipPath for Exact Hand-Drawn Doodle Frosted Glass Shape */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          {/* User's Exact Doodle Box Shape for all 4 cards */}
          <clipPath id="doodle-exact-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.06,0.08 C 0.25,0.04 0.45,0.07 0.72,0.04 C 0.86,0.03 0.94,0.05 0.96,0.11 C 0.985,0.18 0.975,0.42 0.975,0.56 C 0.975,0.74 0.985,0.88 0.95,0.93 C 0.86,0.96 0.68,0.93 0.45,0.97 C 0.24,0.95 0.12,0.97 0.06,0.92 C 0.025,0.86 0.02,0.72 0.02,0.52 C 0.02,0.32 0.025,0.15 0.06,0.08 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Light Cinematic Atmosphere & Ambient Radiance */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: !prefersReducedMotion && !isTouch ? `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)` : 'none',
        }}
      >
        {/* Soft Golden Hour, Cyan & Sky Glow Behind Hero & Glass Card */}
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] rounded-full bg-gradient-to-b from-sky-300/35 via-cyan-200/20 to-transparent blur-[120px]" />
        <div className="absolute top-[25%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-300/25 blur-[100px]" />
        <div className="absolute top-[35%] -right-[10%] w-[500px] h-[500px] rounded-full bg-amber-300/30 blur-[110px]" />

        {/* Ambient Radial Glass Glow directly behind the centered glass card */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] rounded-full bg-gradient-to-r from-sky-400/30 via-cyan-300/25 to-amber-300/30 blur-[70px] pointer-events-none" />

        {/* Ambient soft sky radiance behind the bottom stat cards */}
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[300px] rounded-full bg-gradient-to-r from-sky-200/35 via-cyan-100/25 to-amber-200/30 blur-[80px] pointer-events-none" />

        {/* Airy Cloud Texture Overlay across sky */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80')`,
            backgroundPosition: 'center 42%',
          }}
        />
        {/* Subtle, soft transition only at the very bottom edge where it meets next section */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#F8FAFC]/80 pointer-events-none" />
      </div>

      {/* Synchronized Dotted Flight Line & Moving Aeroplane */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* DESKTOP & LAPTOP SVG PATH: Smooth flight across the sky (>= 768px) */}
        <svg
          viewBox="0 0 1440 700"
          fill="none"
          className="hidden md:block w-full h-full opacity-85"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="dottedLineGradDesktop" x1="0" y1="0" x2="1440" y2="700" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.3" />
              <stop offset="30%" stopColor="#00B4D8" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Dotted Flight Path from Left to Right - passing right through the centered glass card */}
          <path
            id="flightTrackPathDesktop"
            d="M -60 260 C 200 180, 360 350, 720 355 C 1080 360, 1260 260, 1540 160"
            stroke="url(#dottedLineGradDesktop)"
            strokeWidth="3.25"
            strokeDasharray="8 8"
            fill="none"
          />

          {/* Aeroplane moving slowly and smoothly on the dotted line from left to right */}
          {!prefersReducedMotion && (
            <g>
              <animateMotion
                dur="22s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#flightTrackPathDesktop" />
              </animateMotion>

              {/* Exact user uploaded flight icon - filled flight */}
              <g transform="rotate(45)">
                <image
                  href="/plane-hero-solid.png"
                  x="-17"
                  y="-17"
                  width="34"
                  height="34"
                  preserveAspectRatio="xMidYMid meet"
                  className="filter drop-shadow-sm"
                />
              </g>
            </g>
          )}
        </svg>

        {/* MOBILE SVG PATH: Tailored, unstretched, perfectly proportioned flight across mobile screens (< 768px) */}
        <svg
          viewBox="0 0 440 850"
          fill="none"
          className="block md:hidden w-full h-full opacity-85"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="dottedLineGradMobile" x1="0" y1="280" x2="440" y2="280" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.25" />
              <stop offset="30%" stopColor="#00B4D8" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Gentle mobile flight path that swoops gracefully across the screen behind the frosted glass card */}
          <path
            id="flightTrackPathMobile"
            d="M -50 280 C 80 315, 150 350, 220 350 C 290 350, 360 310, 490 260"
            stroke="url(#dottedLineGradMobile)"
            strokeWidth="2.75"
            strokeDasharray="6 6"
            strokeLinecap="round"
            fill="none"
          />

          {!prefersReducedMotion && (
            <g>
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#flightTrackPathMobile" />
              </animateMotion>

              <g transform="rotate(45)">
                <image
                  href="/plane-hero-solid.png"
                  x="-13"
                  y="-13"
                  width="26"
                  height="26"
                  preserveAspectRatio="xMidYMid meet"
                  className="filter drop-shadow-sm"
                />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Headline strictly in 2 lines: Line 1 (Fly Beyond the) & Line 2 (Ordinary.) */}
        <h1 className="hero-title text-slate-900 tracking-tight flex flex-col items-center">
          {/* Line 1: Fly Beyond the */}
          <div className="flex items-center justify-center gap-x-3 sm:gap-x-4 md:gap-x-5">
            <span className="hero-title-word overflow-hidden inline-block pt-1 pb-4 sm:pb-5 px-1 -mb-3 sm:-mb-4">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-slate-900"
              >
                Fly
              </motion.span>
            </span>

            <span className="hero-title-word overflow-hidden inline-block pt-1 pb-4 sm:pb-5 px-1 -mb-3 sm:-mb-4">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.27, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-gradient-sky"
              >
                Beyond
              </motion.span>
            </span>

            <span className="hero-title-word overflow-hidden inline-block pt-1 pb-4 sm:pb-5 px-1 -mb-3 sm:-mb-4">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.39, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-slate-900"
              >
                the
              </motion.span>
            </span>
          </div>

          {/* Line 2: Ordinary. */}
          <div className="flex items-center justify-center">
            <span className="hero-title-word overflow-hidden inline-block pt-1 pb-4 sm:pb-5 px-1 -mb-3 sm:-mb-4">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.51, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-slate-900"
              >
                Ordinary.
              </motion.span>
            </span>
          </div>
        </h1>

        {/* Centered Frosted Glass Description Card with Hand-Drawn Doodle Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hero-subtitle-card glass-component-72 mt-6 sm:mt-8 px-5 sm:px-8 py-4 sm:py-5 max-w-2xl mx-auto text-center relative"
        >
          {/* Frosted Glass Background clipped to exact organic doodle contour */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'url(#doodle-exact-clip)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.14) 100%)',
              backdropFilter: 'blur(6px) saturate(160%) contrast(105%)',
              WebkitBackdropFilter: 'blur(6px) saturate(160%) contrast(105%)',
              boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.08)',
            }}
          />

          {/* SVG Doodle Frame Contour Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 6,8 C 25,4 45,7 72,4 C 86,3 94,5 96,11 C 98.5,18 97.5,42 97.5,56 C 97.5,74 98.5,88 95,93 C 86,96 68,93 45,97 C 24,95 12,97 6,92 C 2.5,86 2,72 2,52 C 2,32 2.5,15 6,8 Z"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Description text: Strictly 3 balanced lines with equal words on desktop and laptop */}
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium relative z-10">
            <span className="sm:block">Unrivaled private aeroplane tours and bespoke aerial</span>{' '}
            <span className="sm:block">expeditions across the world's most breathtaking horizons.</span>{' '}
            <span className="sm:block">Step directly from private terminal lounge to&nbsp;sky.</span>
          </p>
        </motion.div>

        {/* CTAs with Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="hero-cta-group mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <MagneticButton
            variant="gold"
            strength={0.45}
            onClick={handleScrollToBooking}
            className="min-h-[50px] px-8 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-[0_10px_25px_rgba(245,158,11,0.35)]"
          >
            <span>Book Your Flight</span>
            <Plane className="w-4 h-4 ml-1 rotate-45" />
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            strength={0.45}
            onClick={handleScrollToDestinations}
            className="min-h-[50px] px-7 text-base font-semibold bg-white/90 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-sky-600 hover:border-sky-300 shadow-sm"
          >
            <span>Explore Destinations</span>
            <ArrowDown className="w-4 h-4 ml-1" />
          </MagneticButton>
        </motion.div>

        {/* The 3 Bottom Stat Cards */}
        <div className="hero-stats-group w-full max-w-3xl mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 px-2">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={!prefersReducedMotion && !isTouch ? { y: -4, transition: { duration: 0.2 } } : {}}
            className="hero-stat-card glass-component-72-stat p-4 sm:p-5 flex items-center gap-3.5 hover:shadow-lg transition-all duration-300 text-left relative"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: 'url(#doodle-exact-clip)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.44) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(8px) saturate(160%) contrast(105%)',
                WebkitBackdropFilter: 'blur(8px) saturate(160%) contrast(105%)',
                boxShadow: '0 16px 36px -8px rgba(15, 23, 42, 0.07)',
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 6,8 C 25,4 45,7 72,4 C 86,3 94,5 96,11 C 98.5,18 97.5,42 97.5,56 C 97.5,74 98.5,88 95,93 C 86,96 68,93 45,97 C 24,95 12,97 6,92 C 2.5,86 2,72 2,52 C 2,32 2.5,15 6,8 Z"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="hero-stat-icon w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 relative z-10">
              <Globe2 className="w-5 h-5" />
            </div>
            <div className="relative z-10">
              <h4 className="hero-stat-val font-bold text-neutral-900 text-base sm:text-lg">120+ Luxury</h4>
              <p className="hero-stat-label text-xs text-neutral-600 font-medium">Global Charter Routes</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={!prefersReducedMotion && !isTouch ? { y: -4, transition: { duration: 0.2 } } : {}}
            className="hero-stat-card glass-component-72-stat p-4 sm:p-5 flex items-center gap-3.5 hover:shadow-lg transition-all duration-300 text-left relative"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: 'url(#doodle-exact-clip)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.44) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(8px) saturate(160%) contrast(105%)',
                WebkitBackdropFilter: 'blur(8px) saturate(160%) contrast(105%)',
                boxShadow: '0 16px 36px -8px rgba(15, 23, 42, 0.07)',
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 6,8 C 25,4 45,7 72,4 C 86,3 94,5 96,11 C 98.5,18 97.5,42 97.5,56 C 97.5,74 98.5,88 95,93 C 86,96 68,93 45,97 C 24,95 12,97 6,92 C 2.5,86 2,72 2,52 C 2,32 2.5,15 6,8 Z"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="hero-stat-icon w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 relative z-10">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div className="relative z-10">
              <h4 className="hero-stat-val font-bold text-neutral-900 text-base sm:text-lg">4.95 / 5.0</h4>
              <p className="hero-stat-label text-xs text-neutral-600 font-medium">Elite Traveler Rating</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={!prefersReducedMotion && !isTouch ? { y: -4, transition: { duration: 0.2 } } : {}}
            className="hero-stat-card glass-component-72-stat p-4 sm:p-5 flex items-center gap-3.5 hover:shadow-lg transition-all duration-300 text-left relative"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: 'url(#doodle-exact-clip)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.44) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(8px) saturate(160%) contrast(105%)',
                WebkitBackdropFilter: 'blur(8px) saturate(160%) contrast(105%)',
                boxShadow: '0 16px 36px -8px rgba(15, 23, 42, 0.07)',
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 6,8 C 25,4 45,7 72,4 C 86,3 94,5 96,11 C 98.5,18 97.5,42 97.5,56 C 97.5,74 98.5,88 95,93 C 86,96 68,93 45,97 C 24,95 12,97 6,92 C 2.5,86 2,72 2,52 C 2,32 2.5,15 6,8 Z"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="hero-stat-icon w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 relative z-10">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="relative z-10">
              <h4 className="hero-stat-val font-bold text-neutral-900 text-base sm:text-lg">ARG/US Gold</h4>
              <p className="hero-stat-label text-xs text-neutral-600 font-medium">Highest Aviation Safety</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={handleScrollToBooking}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll down to booking widget"
        className="hero-explore-btn mt-8 flex flex-col items-center gap-2 text-slate-400 hover:text-sky-600 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full p-2 cursor-pointer z-10"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-slate-500">EXPLORE FLIGHTS</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-sky-600" />
        </motion.div>
      </motion.button>
    </section>
  );
}
