'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'framer-motion';

const TOTAL_PROCESS_FRAMES = 200;

export default function ProcessScrollCanvas({ onStepChange }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastStepRef = useRef(-1);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Track scroll progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Apply physics spring for butter-smooth scrolling animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0001,
  });

  // Map smooth progress (0 to 1) -> frame index (1 to 200)
  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_PROCESS_FRAMES]);

  // 1. Preload 200 JPG Process Frames into Memory (Non-blocking Instant Load)
  useEffect(() => {
    let isMounted = true;
    const loadedImages = new Array(TOTAL_PROCESS_FRAMES);
    imagesRef.current = loadedImages;

    // Load Frame 1 with high priority to render immediately
    const firstImg = new Image();
    firstImg.src = '/process/ezgif-frame-001.jpg';
    firstImg.onload = () => {
      if (!isMounted) return;
      loadedImages[0] = firstImg;
      renderFrame(1);
      setImagesLoaded(true);
    };
    firstImg.onerror = () => {
      if (!isMounted) return;
      setImagesLoaded(true);
    };

    // Background load remaining frames 2..200 progressively
    for (let i = 2; i <= TOTAL_PROCESS_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/process/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        if (!isMounted) return;
        loadedImages[i - 1] = img;
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-DPI Sharp Canvas Render Function with High-Quality Smoothing
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const targetFrame = Math.min(TOTAL_PROCESS_FRAMES, Math.max(1, Math.floor(index)));

    // Find nearest available loaded frame
    let img;
    for (let f = targetFrame; f >= 1; f--) {
      const candidate = imagesRef.current[f - 1];
      if (candidate && candidate.complete && candidate.naturalWidth > 0) {
        img = candidate;
        break;
      }
    }
    if (!img) {
      for (let f = targetFrame + 1; f <= TOTAL_PROCESS_FRAMES; f++) {
        const candidate = imagesRef.current[f - 1];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          img = candidate;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 800;
    const h = canvas.clientHeight || 600;

    if (w === 0 || h === 0) return;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // High quality HD image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;

    // Cover scale formula for ultra-sharp rendering
    const scale = Math.max(w / imgW, h / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const x = (w - renderW) / 2;
    const y = (h - renderH) / 2;

    ctx.drawImage(img, x, y, renderW, renderH);
    ctx.restore();
  };

  // Re-render frame when frameIndex changes smoothly via spring physics
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    requestAnimationFrame(() => renderFrame(latest));
    if (onStepChange) {
      const progress = (latest - 1) / (TOTAL_PROCESS_FRAMES - 1);
      const newStep = Math.min(4, Math.max(0, Math.floor(progress * 5)));
      if (newStep !== lastStepRef.current) {
        lastStepRef.current = newStep;
        onStepChange(newStep);
      }
    }
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
      className="relative w-full h-full bg-slate-950 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block opacity-100"
      />
    </div>
  );
}
