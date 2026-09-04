'use client';

import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import Image from 'next/image';
import { usePointerPosition } from '@/hooks/use-pointer-position';

export default function Responsive3DBottleHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Unified Pointer Tracking Hook (Mouse & Touch Parity with touchend reset)
  const { mouseX, mouseY } = usePointerPosition(containerRef, {
    stiffness: 120,
    damping: 18,
    mass: 1.1,
  });

  // 3D Perspective Transformations (Desktop & Mobile Touch)
  const rotateX = useTransform(mouseY, [-1, 1], [22, -22]);
  const rotateY = useTransform(mouseX, [-1, 1], [-28, 28]);

  // Synchronized Cap Z-rotation (max 8deg for fluid hinge motion anchored to bottom-center)
  const capRotateZ = useTransform(mouseX, [-1, 1], [-8, 8]);

  // Synchronized Reverse Ground Shadow Shift & Scale for enhanced 3D depth perception
  const shadowX = useTransform(mouseX, [-1, 1], [28, -28]);
  const shadowScale = useTransform(mouseY, [-1, 1], [0.85, 1.15]);

  return (
    <section
      style={{ perspective: 1000 }}
      className="relative flex min-h-[50vh] sm:min-h-[80vh] lg:min-h-[90vh] w-full items-center justify-center overflow-hidden pt-6 sm:pt-16 pb-4 sm:pb-8 select-none"
    >
      {/* Clean Ambient Radial Glow (Dark Mode Friendly) */}
      <div className="absolute w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-200/30 via-slate-50 to-transparent dark:from-sky-900/20 dark:via-slate-950 dark:to-slate-950 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Parent Container: Mobile (<640px: h-[45vh] w-[90vw] max-w-[340px]), Desktop (>=1024px: h-[85vh] w-[85vh] max-w-[800px]) */}
      <div
        ref={containerRef}
        style={{ perspective: 1000 }}
        className="relative mx-auto h-[45vh] w-[90vw] max-w-[340px] sm:h-[70vh] sm:w-[70vh] sm:max-w-[650px] lg:h-[85vh] lg:w-[85vh] lg:max-w-[800px] aspect-square flex items-center justify-center touch-none overflow-hidden"
      >
        {/* 2. Shared Motion Wrapper scaling BOTH Bottle & Cap together seamlessly (scale-[1.3] on mobile, scale-[1.65] on desktop) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 50%',
          }}
          className="relative w-full h-full flex items-center justify-center scale-[1.3] sm:scale-135 lg:scale-[1.65]"
        >
          {/* 3. Synchronized Ground 3D Reverse Shadow */}
          <motion.div
            style={{
              x: shadowX,
              scaleX: shadowScale,
            }}
            className="absolute bottom-[3%] left-1/2 -translate-x-1/2 h-8 sm:h-10 w-[70%] bg-black/20 dark:bg-black/50 blur-xl rounded-full scale-y-50 pointer-events-none"
          />

          {/* 4. Main 19L Bottle Asset (`public/bottle.png`) — Edge Bounds & Pointer Locking */}
          <div className="relative h-full w-full rounded-none overflow-hidden select-none pointer-events-none">
            <Image
              src="/bottle.png"
              alt="Watlys 19L Bottle"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,100,200,0.15)] dark:drop-shadow-[0_25px_35px_rgba(0,100,200,0.25)] select-none pointer-events-none"
            />
          </div>

          {/* 5. Synchronized Bottle Cap Asset (`public/cap.png`) — Locked flush on top of bottle neck rim */}
          <motion.div
            style={{
              rotateZ: capRotateZ,
            }}
            className="absolute top-[18.2%] left-1/2 -translate-x-1/2 w-[60px] h-[48px] sm:w-[76px] sm:h-[64px] lg:w-[82px] lg:h-[70px] z-30 origin-bottom pointer-events-none select-none"
          >
            <Image
              src="/cap.png"
              alt="Bottle Cap"
              fill
              priority
              className="object-contain drop-shadow-[0_4px_12px_rgba(0,100,208,0.25)] select-none pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
