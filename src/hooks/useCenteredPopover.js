import { useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Hook to center popovers horizontally:
 * - On mobile (< 768px): Centers popover horizontally relative to the viewport/screen.
 * - On desktop / laptop (>= 768px): Centers popover horizontally beneath its trigger,
 *   with boundary clamping to prevent clipping off the viewport edges.
 */
export function useCenteredPopover({
  isOpen,
  defaultWidth = 360,
  minPadding = 16,
  externalContainerRef = null,
} = {}) {
  const internalContainerRef = useRef(null);
  const containerRef = externalContainerRef || internalContainerRef;
  const popoverRef = useRef(null);
  const [popoverStyle, setPopoverStyle] = useState({});

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth < 768;

    // Measure popover width if mounted, else use defaultWidth
    let popoverWidth = defaultWidth;
    if (popoverRef.current && popoverRef.current.offsetWidth > 0) {
      popoverWidth = popoverRef.current.offsetWidth;
    }

    // Never exceed viewport minus margins
    const maxAllowedWidth = viewportWidth - minPadding * 2;
    if (popoverWidth > maxAllowedWidth) {
      popoverWidth = maxAllowedWidth;
    }

    let targetLeftOnScreen;
    if (isMobile) {
      // Symmetrically centered on mobile screen
      targetLeftOnScreen = (viewportWidth - popoverWidth) / 2;
    } else {
      // Symmetrically centered beneath the trigger button on laptop/desktop
      const triggerCenter = rect.left + rect.width / 2;
      targetLeftOnScreen = triggerCenter - popoverWidth / 2;

      // Edge guards: prevent bleeding off left or right screen edges
      if (targetLeftOnScreen < minPadding) {
        targetLeftOnScreen = minPadding;
      } else if (targetLeftOnScreen + popoverWidth > viewportWidth - minPadding) {
        targetLeftOnScreen = viewportWidth - minPadding - popoverWidth;
      }
    }

    const relativeLeft = Math.round(targetLeftOnScreen - rect.left);
    setPopoverStyle({
      left: `${relativeLeft}px`,
      maxWidth: `calc(100vw - ${minPadding * 2}px)`,
    });
  }, [containerRef, defaultWidth, minPadding]);

  useIsomorphicLayoutEffect(() => {
    if (!isOpen) return;

    // Immediately compute before paint
    updatePosition();

    // Re-check after mount/layout in next frame
    const rafId = requestAnimationFrame(updatePosition);

    const handleResizeOrScroll = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll, true);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll, true);
    };
  }, [isOpen, updatePosition]);

  return {
    containerRef,
    popoverRef,
    popoverStyle,
    recalculatePosition: updatePosition,
  };
}
