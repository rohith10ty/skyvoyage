import React from 'react';

export function Logo({ size = 'md', theme = 'light', className = '', showSubtitle = true }) {
  const sizeConfig = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-[11px]' }
  };

  const current = sizeConfig[size] || sizeConfig.md;
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Aerodynamic Jet Mark */}
      <div className={`relative ${current.icon} flex items-center justify-center shrink-0`}>
        <div className={`absolute inset-0 rounded-xl transition-all duration-300 group-hover:scale-105 ${
          isDark
            ? 'bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-amber-500/20 border border-white/20 group-hover:border-cyan-400'
            : 'bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-amber-500/15 border border-slate-200/90 shadow-sm group-hover:border-sky-500'
        }`} />
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 transition-transform duration-300 group-hover:rotate-6 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logoJetGradient" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#00B4D8" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="jetTrail" x1="0" y1="18" x2="18" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Vapor Trail */}
          <path d="M4 22C10 21 16 19 20 17" stroke="url(#jetTrail)" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Aeroplane Polygon */}
          <path
            d="M31 6L7 16L18 20L21 30L25 22L31 6Z"
            fill="url(#logoJetGradient)"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />
          {/* Inner Fold Line */}
          <path d="M18 20L31 6" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
          {/* Beacon Dot */}
          <circle cx="31" cy="6" r="1.5" fill="#F59E0B" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight font-display font-extrabold">
          <span className={`${current.text} ${isDark ? 'text-white' : 'text-slate-900'}`}>SKY</span>
          <span className={`${current.text} text-gradient-sky`}>VOYAGE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1 transition-transform group-hover:scale-125" />
        </div>
        {showSubtitle && (
          <span className={`${current.sub} uppercase tracking-[0.22em] ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold mt-1 font-mono`}>
            Aviation &bull; Tours
          </span>
        )}
      </div>
    </div>
  );
}
