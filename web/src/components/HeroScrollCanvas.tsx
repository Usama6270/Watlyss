'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 150;
const PREFETCH_RADIUS = 8;

function frameUrl(index: number) {
  const frameNum = String(index).padStart(3, '0');
  return `/frames/ezgif-frame-${frameNum}.webp`;
}

export default function HeroScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>(new Array(TOTAL_FRAMES));
  const inflightRef = useRef<Set<number>>(new Set());
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 34,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

  const ctaOpacity = useTransform(smoothProgress, [0.72, 0.86, 1], [0, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.72, 0.86, 1], [28, 0, 0]);
  const ctaScale = useTransform(smoothProgress, [0.72, 0.86, 1], [0.94, 1, 1]);

  const loadSingleFrame = useCallback((index: number): Promise<HTMLImageElement | null> => {
    if (index < 1 || index > TOTAL_FRAMES) return Promise.resolve(null);
    const existing = imagesRef.current[index - 1];
    if (existing?.complete && existing.naturalWidth > 0) return Promise.resolve(existing);
    if (inflightRef.current.has(index)) {
      return new Promise((resolve) => {
        const check = () => {
          const img = imagesRef.current[index - 1];
          if (img?.complete && img.naturalWidth > 0) resolve(img);
          else setTimeout(check, 40);
        };
        check();
      });
    }

    inflightRef.current.add(index);
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = frameUrl(index);
      img.onload = () => {
        imagesRef.current[index - 1] = img;
        inflightRef.current.delete(index);
        resolve(img);
      };
      img.onerror = () => {
        // Fallback to PNG if webp missing
        const fallback = new Image();
        fallback.src = `/frames/ezgif-frame-${String(index).padStart(3, '0')}.png`;
        fallback.onload = () => {
          imagesRef.current[index - 1] = fallback;
          inflightRef.current.delete(index);
          resolve(fallback);
        };
        fallback.onerror = () => {
          inflightRef.current.delete(index);
          resolve(null);
        };
      };
    });
  }, []);

  const prefetchAround = useCallback(
    (center: number) => {
      const start = Math.max(1, Math.floor(center) - PREFETCH_RADIUS);
      const end = Math.min(TOTAL_FRAMES, Math.ceil(center) + PREFETCH_RADIUS);
      for (let i = start; i <= end; i++) {
        void loadSingleFrame(i);
      }
    },
    [loadSingleFrame]
  );

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetFrame = Math.min(TOTAL_FRAMES, Math.max(1, Math.floor(index)));

    let img: HTMLImageElement | undefined;
    for (let f = targetFrame; f >= 1; f--) {
      const candidate = imagesRef.current[f - 1];
      if (candidate?.complete && candidate.naturalWidth > 0) {
        img = candidate;
        break;
      }
    }
    if (!img) {
      for (let f = targetFrame + 1; f <= TOTAL_FRAMES; f++) {
        const candidate = imagesRef.current[f - 1];
        if (candidate?.complete && candidate.naturalWidth > 0) {
          img = candidate;
          break;
        }
      }
    }

    if (!imagesRef.current[targetFrame - 1]) {
      void loadSingleFrame(targetFrame).then((loaded) => {
        if (loaded) renderFrame(targetFrame);
      });
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    const isMobile = w < 768;
    const navOffset = isMobile ? 64 : 84;
    const bottomPadding = isMobile ? 60 : 40;
    const availableH = Math.max(200, h - navOffset - bottomPadding);
    const scale = isMobile
      ? (availableH * 0.55) / imgH
      : Math.min((w * 0.95) / imgW, availableH / imgH);

    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const x = (w - renderW) / 2;
    const y = isMobile ? navOffset + 60 : navOffset + (availableH - renderH) / 2;

    ctx.drawImage(img, x, y, renderW, renderH);
    ctx.restore();
  }, [loadSingleFrame]);

  // First paint: only frame 1 — never flood the network on load
  useEffect(() => {
    let cancelled = false;
    loadSingleFrame(1).then((img) => {
      if (cancelled) return;
      if (img) renderFrame(1);
      setImagesLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [loadSingleFrame, renderFrame]);

  // After user starts scrolling the hero, prefetch a window + sparse keyframes
  useEffect(() => {
    let started = false;
    const startBulk = () => {
      if (started) return;
      started = true;
      prefetchAround(frameIndex.get() || 1);

      const keyframes: number[] = [];
      for (let i = 10; i <= TOTAL_FRAMES; i += 10) keyframes.push(i);

      let i = 0;
      const pump = () => {
        if (i >= keyframes.length) return;
        const batch = keyframes.slice(i, i + 2);
        i += 2;
        Promise.all(batch.map((idx) => loadSingleFrame(idx))).then(() => {
          if ('requestIdleCallback' in window) {
            (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(
              pump,
              { timeout: 500 }
            );
          } else {
            setTimeout(pump, 120);
          }
        });
      };
      pump();
    };

    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.01) startBulk();
    });

    // Also start after short idle if user hasn't scrolled (so scrub is ready)
    const idleTimer = window.setTimeout(startBulk, 1800);

    return () => {
      unsub();
      clearTimeout(idleTimer);
    };
  }, [scrollYProgress, frameIndex, loadSingleFrame, prefetchAround]);

  const tickingRef = useRef(false);
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    prefetchAround(latest);
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(() => {
        renderFrame(latest);
        tickingRef.current = false;
      });
    }
  });

  useEffect(() => {
    const handleResize = () => renderFrame(frameIndex.get());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frameIndex, renderFrame]);

  useEffect(() => {
    if (!imagesLoaded) return;
    renderFrame(frameIndex.get() || 1);
  }, [imagesLoaded, frameIndex, renderFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[200vh] sm:h-[280vh] md:h-[320vh] bg-background transition-colors duration-300"
      style={{ touchAction: 'pan-y' }}
    >
      <div className="sticky top-0 z-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-background transition-colors duration-300">
        {/* Tiny LCP poster while canvas boots */}
        {!imagesLoaded && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/frames/ezgif-frame-001.webp"
            alt=""
            width={450}
            height={700}
            fetchPriority="high"
            decoding="async"
            className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-auto w-[min(55vh,280px)] -translate-x-1/2 -translate-y-[42%] object-contain opacity-95 sm:w-[min(60vh,360px)]"
          />
        )}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10 block h-full w-full"
          aria-hidden
        />

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
          className="pointer-events-auto absolute bottom-10 z-20 mx-auto max-w-xs px-4 text-center sm:max-w-md"
        >
          <Link
            href="/order"
            className="btn-primary group gap-3 px-8 py-4 text-xs shadow-xl sm:px-10 sm:text-sm"
          >
            <ShoppingBag size={18} className="transition-transform group-hover:-translate-y-0.5" />
            <span>Order Now</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
