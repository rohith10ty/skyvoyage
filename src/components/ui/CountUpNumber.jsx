import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CountUpNumber({ target, decimals = 0, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, prefersReducedMotion, target]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;

    let startTimestamp = null;
    const startVal = 0;
    const endVal = Number(target);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = startVal + (endVal - startVal) * easeProgress;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endVal);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, target, duration, prefersReducedMotion]);

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.round(count);

  return (
    <span ref={elementRef} className="font-mono font-bold tracking-tight">
      {formatted}
      {suffix}
    </span>
  );
}
