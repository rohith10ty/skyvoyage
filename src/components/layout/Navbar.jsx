import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { MagneticButton } from '../ui/MagneticButton';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useLenis } from './SmoothScroll';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Destinations', href: '#destinations', id: 'destinations' },
  { name: 'Packages', href: '#packages', id: 'packages' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export function Navbar() {
  const { isScrolled } = useScrollDirection();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useLenis() || {};

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (scrollTo) {
      scrollTo(href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-2.5 sm:py-4 px-3 sm:px-6 lg:px-8 ${
          isScrolled ? 'bg-white/40 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side: Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="SkyVoyage Home"
            className="focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl p-1 shrink-0"
          >
            <Logo size="md" theme="light" />
          </a>

          {/* Middle: Floating Dock (Desktop & Laptop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_25px_rgba(15,23,42,0.06)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-semibold transition-colors rounded-full duration-200 min-h-[36px] flex items-center cursor-pointer ${
                    isActive ? 'text-sky-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-sky-50 border border-sky-300/80 shadow-xs"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Side: Magnetic "Book Flight" Button (Desktop) & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop / Laptop: Magnetic "Book Flight" Button */}
            <div className="hidden md:block">
              <MagneticButton
                variant="primary"
                className="shadow-md bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-1.5"
                onClick={(e) => handleNavClick(e, '#contact')}
                ariaLabel="Book flight inquiry"
              >
                <span>Book Flight</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle (Clean and spacious on mobile) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/90 border border-slate-200/90 text-slate-800 shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer backdrop-blur-md shrink-0"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-500" /> : <Menu className="w-5 h-5 text-sky-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Staggered Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-white/98 backdrop-blur-2xl flex flex-col px-6 pt-24 pb-8 md:hidden overflow-y-auto overscroll-contain"
          >
            <div className="flex flex-col space-y-2 max-w-sm mx-auto w-full">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-600 mb-1 font-bold">Navigation Menu</span>
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.04, duration: 0.35 }}
                    className={`text-xl font-display font-bold py-2.5 flex items-center justify-between border-b border-slate-200/80 cursor-pointer ${
                      isActive ? 'text-sky-600' : 'text-slate-800'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-slate-400">0{idx + 1}</span>
                  </motion.a>
                );
              })}

              {/* Book Flight Button placed directly below the navigation links */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-6"
              >
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full min-h-[50px] rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-amber-500 hover:from-sky-600 hover:to-amber-600 text-white font-display font-bold flex items-center justify-center gap-2 text-base shadow-lg shadow-sky-500/25 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <span>Book Flight</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
