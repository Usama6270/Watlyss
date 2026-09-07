'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface PricingCard3DProps {
  children: React.ReactNode;
  isPopular?: boolean;
  className?: string;
}

export default function PricingCard3D({ children, isPopular = false, className = '' }: PricingCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full w-full">
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: isPopular ? 1.08 : 1.05,
          y: isPopular ? -14 : -10,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`relative h-full w-full overflow-hidden rounded-2xl transition-all duration-300 ${isPopular
            ? 'border-2 border-[#0064D0] shadow-2xl shadow-[#0064D0]/35 hover:shadow-[#0064D0]/55 hover:border-blue-400'
            : 'border border-zinc-200/80 dark:border-slate-800/80 hover:border-[#0064D0]/80 hover:shadow-2xl hover:shadow-sky-500/25'
          } ${className}`}
      >
        {/* Subtle Water Pattern Background Texture Layer (Patterns-02.png) */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center mix-blend-multiply dark:mix-blend-screen opacity-10 dark:opacity-15 transition-opacity duration-300 rounded-2xl z-0"
          style={{
            backgroundImage: `url('/patterns/Patterns-02.png'), url('/Patterns-02.png')`,
          }}
        />

        {/* 3D Depth Inner Wrapper — elevates content in 3D space */}
        <div
          className="relative z-10 h-full w-full"
          style={{
            transform: 'translateZ(20px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>

        {/* Pricing Cards Hover State Top Banner Water Pattern (Patterns-03.png Smooth Light Fade-in) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="pointer-events-none absolute top-0 left-0 right-0 h-16 z-30 overflow-hidden rounded-t-2xl border-t border-[#0064D0]/80 shadow-[0_2px_10px_rgba(0,100,208,0.15)]"
              style={{
                transform: 'translateZ(35px)',
              }}
            >
              {/* Soft blue gradient backing */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0064D0]/15 via-[#0064D0]/05 to-transparent pointer-events-none" />

              {/* Patterns-03.png light subtle water pattern texture layer */}
              <div
                className="w-full h-full bg-cover bg-top mix-blend-multiply dark:mix-blend-screen opacity-20 dark:opacity-30"
                style={{
                  backgroundImage: `url('/patterns/Patterns-03.png'), url('/Patterns-03.png')`,
                  backgroundSize: '180px auto',
                  backgroundRepeat: 'repeat-x',
                }}
              />

              {/* Subtle Shimmer Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0064D0] to-transparent opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
