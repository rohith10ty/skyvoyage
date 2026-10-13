import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsTouch } from '../../hooks/useIsTouch';

export function GlassCard({
  children,
  className = '',
  enableTilt = false,
  variant = 'surface', // 'surface' (solid translucent for perf) | 'glass' (backdrop-blur for hero/widgets)
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  const handleMouseMove = (e) => {
    if (!enableTilt || prefersReducedMotion || isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (!enableTilt || prefersReducedMotion || isTouch) return;
    setRotate({ x: 0, y: 0 });
  };

  const baseStyle = variant === 'glass' ? 'glass-hero-card' : 'surface-card';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.1 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative rounded-2xl md:rounded-3xl overflow-hidden transition-shadow duration-300 ${baseStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
