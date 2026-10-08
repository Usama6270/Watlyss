'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface PricingCard3DProps {
  children: React.ReactNode;
  isPopular?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function PricingCard3D({ children, isPopular = false, className = '', onClick }: PricingCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

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
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: isPopular ? 1.03 : 1.02,
          y: isPopular ? -6 : -4,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className={`relative h-full w-full overflow-visible rounded-[var(--radius-xl)] bg-card/95 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${isPopular
          ? 'border border-primary/70 shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/20'
          : 'border border-border hover:border-primary/50 hover:shadow-md'
          } ${className}`}
      >
        {/* Subtle Water Pattern Background Texture Layer — hover only, never clips badge */}
        <div
          className={`pointer-events-none absolute inset-0 bg-cover bg-center mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500 rounded-2xl z-0 ${
            isHovered ? 'opacity-[0.02] dark:opacity-[0.05]' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('/patterns/pattern-02.svg'), url('/patterns/Patterns-02.svg')`,
          }}
        />

        {/* Soft top wash on hover — below content, no overflow clip */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-20 rounded-t-2xl z-[1] transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(to bottom, color-mix(in srgb, var(--primary) 10%, transparent), transparent)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full w-full pointer-events-auto overflow-visible rounded-2xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
