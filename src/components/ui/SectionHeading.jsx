import React from 'react';
import { motion } from 'framer-motion';

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center', // 'center' | 'left'
  className = ''
}) {
  const isCentered = align === 'center';

  return (
    <div className={`relative mb-12 sm:mb-16 ${isCentered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {/* Badge Eyebrow */}
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs ${isCentered ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      {/* Main Title */}
      <h2 className="section-title text-slate-900">
        {title}{' '}
        {highlight && (
          <span className="text-gradient-sky inline-block">{highlight}</span>
        )}
      </h2>

      {/* Animated Aviation Trail Underline */}
      <div className={`relative mt-4 mb-5 flex items-center ${isCentered ? 'justify-center' : 'justify-start'}`}>
        <div className="relative w-36 h-2 flex items-center">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          <motion.div
            initial={{ left: '0%' }}
            animate={{ left: '100%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 1
            }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <svg className="w-3.5 h-3.5 text-amber-500 rotate-45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
