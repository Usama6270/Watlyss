'use client';

import { useEffect, useRef } from 'react';
import { useSpring, useTransform, MotionValue } from 'framer-motion';

interface PointerPositionOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function usePointerPosition(
  elementRef: React.RefObject<HTMLElement | null>,
  options: PointerPositionOptions = {}
) {
  const { stiffness = 120, damping = 18, mass = 1.1 } = options;

  const springConfig = { stiffness, damping, mass };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      mouseX.set(Math.max(-1, Math.min(1, x)));
      mouseY.set(Math.max(-1, Math.min(1, y)));
    };

    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleReset = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    // Gyroscope tilt support for mobile devices
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (window.innerWidth < 768 && e.gamma !== null && e.beta !== null) {
        const gyroX = Math.max(-1, Math.min(1, e.gamma / 30));
        const gyroY = Math.max(-1, Math.min(1, (e.beta - 40) / 30));
        mouseX.set(gyroX);
        mouseY.set(gyroY);
      }
    };

    const targetEl = elementRef.current || window;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleReset);
    window.addEventListener('touchcancel', handleReset);
    document.body.addEventListener('mouseleave', handleReset);

    if (window.DeviceOrientationEvent && window.innerWidth < 768) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleReset);
      window.removeEventListener('touchcancel', handleReset);
      document.body.removeEventListener('mouseleave', handleReset);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, [elementRef, mouseX, mouseY]);

  return { mouseX, mouseY };
}
