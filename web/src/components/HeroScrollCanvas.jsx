'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 150;

export default function HeroScrollCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Track scroll progression over 350vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Apply physics spring for butter-smooth scrolling animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  // Map smooth progress (0 to 1) -> frame index (1 to 150)
  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Premium CTA Button opacity & motion transforms near end of scroll sequence (75% -> 100%)
  const ctaOpacity = useTransform(smoothProgress, [0.75, 0.88, 1], [0, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.75, 0.88, 1], [30, 0, 0]);
  const ctaScale = useTransform(smoothProgress, [0.75, 0.88, 1], [0.92, 1, 1]);

  // 1. Preload 150 Transparent PNG Images into Memory
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNum}.png`;

      img.onload = () => {
        loadedCount++;
        if (i === 1) {
          renderFrame(1);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load frame: /frames/ezgif-frame-${frameNum}.png`);
      };

      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // 2. High-DPI Sharp Canvas Render Function
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameNum = Math.min(TOTAL_FRAMES, Math.max(1, Math.floor(index)));
    const img = imagesRef.current[frameNum - 1];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (w === 0 || h === 0) return;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;

    // Responsive Scaling Formula: ensure full bottle sits centered and fits completely on mobile & desktop
    const isMobile = w < 768;
    const navOffset = isMobile ? 64 : 84;
    const bottomPadding = isMobile ? 60 : 40;
    const availableH = Math.max(200, h - navOffset - bottomPadding);

    // On mobile, scale bottle to ~65% of available height so entire bottle (cap to base) is fully visible
    const scale = isMobile
      ? (availableH * 0.65) / imgH
      : Math.min((w * 0.95) / imgW, availableH / imgH);

    const renderW = imgW * scale;
    const renderH = imgH * scale;

    const x = (w - renderW) / 2;
    // On mobile, position bottle cap ~36px below navbar for an attractive, spacious aesthetic
    const y = isMobile
      ? navOffset + 36 - (renderH * 0.16)
      : navOffset + (availableH - renderH) / 2;

    ctx.drawImage(img, x, y, renderW, renderH);
    ctx.restore();
  };

  // Re-render frame when frameIndex changes smoothly via spring physics
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    requestAnimationFrame(() => renderFrame(latest));
  });

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const current = frameIndex.get();
      renderFrame(current);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[180vh] sm:h-[260vh] md:h-[350vh] bg-white dark:bg-[#0a1128] transition-colors duration-300"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Forced 100vh Sticky Viewport Container matching Page Background */}
      <div
        className="sticky top-0 w-full overflow-hidden flex items-center justify-center bg-white dark:bg-[#0a1128] z-0 transition-colors duration-300"
        style={{ position: 'sticky', top: 0, height: '100vh', width: '100vw' }}
      >
        {/* Full-Screen Sharp HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none z-10 block"
        />

        {/* Loading Spinner */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-[#0a1128]/80 backdrop-blur-md z-30 pointer-events-none">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                Loading Purity Experience...
              </span>
            </div>
          </div>
        )}

        {/* Premium "Order Now" Button Lock At End of Scroll (75% - 100%) */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
          className="absolute bottom-10 text-center z-20 px-4 pointer-events-auto max-w-xs sm:max-w-md mx-auto"
        >
          <Link
            href="/order"
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-gradient-to-r from-[#0064D0] via-blue-600 to-cyan-500 hover:from-[#0052ad] hover:to-cyan-600 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.25em] rounded-2xl shadow-2xl shadow-[#0064D0]/35 hover:shadow-[#0064D0]/50 hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 border border-white/20 backdrop-blur-md"
          >
            <ShoppingBag size={18} className="transition-transform group-hover:-translate-y-0.5" />
            <span>ORDER NOW</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
