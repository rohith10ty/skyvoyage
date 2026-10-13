import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Plane, Send, Check, Shield, Globe, Award } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useLenis } from './SmoothScroll';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isFlyingUp, setIsFlyingUp] = useState(false);
  const { scrollTo } = useLenis() || {};

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const handleBackToTop = () => {
    setIsFlyingUp(true);
    setTimeout(() => {
      if (scrollTo) {
        scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 200);
    setTimeout(() => setIsFlyingUp(false), 1200);
  };

  return (
    <footer className="relative bg-[#060A18] text-white pt-20 pb-12 overflow-hidden border-t border-white/10">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Logo size="lg" theme="dark" className="mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">

              SkyVoyage sets the gold standard for global private aviation and bespoke aeroplane tours. We transform flight hours into tranquil moments of wonder.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Shield className="w-4 h-4" />
                <span>ARG/US Gold</span>
              </span>
              <span>•</span>
              <span className="text-amber-400">Wyvern Wingman</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Home Runway</a></li>
              <li><a href="#destinations" className="hover:text-cyan-400 transition-colors">Destinations</a></li>
              <li><a href="#packages" className="hover:text-cyan-400 transition-colors">Flight Packages</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Heritage</a></li>
            </ul>
          </div>

          {/* Luxury Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Private Charters</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Helicopter Tours</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">VIP Fast-Track</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Yacht &amp; Jet Shuttles</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Medical Escorts</a></li>
            </ul>
          </div>

          {/* Newsletter / The Aviator Journal */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2">
              The SkyVoyage Dispatch
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Receive confidential empty-leg alerts, private terminal openings, and invitation-only seasonal aerial expeditions.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@domain.com"
                  className="flex-1 min-h-[46px] px-3.5 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="min-h-[46px] px-5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-navy-950 font-display font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center shrink-0 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4 text-navy-950" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-mono">
                  ✓ Priority manifest clearance confirmed. Welcome aboard.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Back To Top Action */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
          <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
            <span>LAT: 46.2044° N, LON: 6.1432° E (GENEVA)</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">CALLSIGN: SKYVOYAGE ONE</span>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top of runway"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-white/15 hover:border-cyan-400 text-slate-200 hover:text-white transition-all cursor-pointer text-xs font-mono"
          >
            <span>BACK TO SKY</span>
            <div className="relative w-4 h-4 flex items-center justify-center">
              <motion.div
                animate={isFlyingUp ? { y: -30, opacity: [1, 0] } : {}}
                transition={{ duration: 0.8, ease: 'easeIn' }}
              >
                <Plane className="w-3.5 h-3.5 -rotate-45 text-amber-400 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
          </button>
        </div>

        {/* Giant Outlined Architectural Wordmark */}
        <div className="py-12 text-center select-none overflow-hidden" aria-hidden="true">
          <span
            className="font-display font-black text-[13vw] sm:text-[14vw] tracking-tighter leading-none block uppercase"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.08)',
              color: 'transparent',
            }}
          >
            SKYVOYAGE
          </span>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} SkyVoyage Aviation Tours &amp; Charters Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-cyan-400 transition-colors">Privacy Charter</a>
            <a href="#home" className="hover:text-cyan-400 transition-colors">Aviation Terms</a>
            <a href="#home" className="hover:text-cyan-400 transition-colors">Flight Safety Manifest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
