'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface PricingCard3DProps {
  children: React.ReactNode;
  isPopular?: boolean;
  className?: string;
}

export default function PricingCard3D({ children, isPopular = false, className = '' }: PricingCard3DProps) {
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

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full w-full">
      <motion.div
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
        className={`relative h-full w-full rounded-2xl transition-all duration-300 ${isPopular
            ? 'border-2 border-[#0064D0] shadow-2xl shadow-[#0064D0]/35 hover:shadow-[#0064D0]/55 hover:border-blue-400'
            : 'border border-zinc-200/80 dark:border-slate-800/80 hover:border-[#0064D0]/80 hover:shadow-2xl hover:shadow-sky-500/25'
          } ${className}`}
      >
        {/* 3D Depth Inner Wrapper — elevates content in 3D space */}
        <div
          className="h-full w-full"
          style={{
            transform: 'translateZ(30px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
