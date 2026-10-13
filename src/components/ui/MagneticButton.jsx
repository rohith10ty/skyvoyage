import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsTouch } from '../../hooks/useIsTouch';

export function MagneticButton({
  children,
  className = '',
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'gold' | 'ghost'
  type = 'button',
  ariaLabel,
  disabled = false,
  strength = 0.45,
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isTouch || disabled || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-display font-semibold transition-colors duration-200 rounded-full select-none cursor-pointer text-sm tracking-wide disabled:opacity-50 disabled:pointer-events-none min-h-[44px] px-6 py-2.5';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:shadow-[0_10px_25px_rgba(2,132,199,0.35)] hover:brightness-105 active:scale-95',
    gold: 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold hover:shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:brightness-105 active:scale-95',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 hover:border-sky-400 hover:text-sky-600 shadow-sm active:scale-95',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95'
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', damping: 15, stiffness: 220, mass: 0.1 }}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      <motion.span
        animate={{ x: position.x * 0.35, y: position.y * 0.35 }}
        transition={{ type: 'spring', damping: 15, stiffness: 220, mass: 0.1 }}
        className="relative z-10 flex items-center gap-2 pointer-events-none"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
