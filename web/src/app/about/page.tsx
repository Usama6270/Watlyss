'use client';

import React, { useRef } from 'react';
import Navbar from '@/components/navbar';
import FooterSection from '@/components/footer-section';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ShieldCheck, 
  Droplets, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Leaf, 
  Layers, 
  Activity, 
  Users, 
  Building2,
  Lock,
  Flame,
  Zap,
  Check,
  PhoneCall
} from 'lucide-react';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Motion & Pointer Tracking Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 18 });

  // 3D Perspective Tilt Transformations for Banner
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-16, 16]);
  const bannerScale = useTransform(mouseY, [-0.5, 0.5], [1.03, 1.08]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseXPos = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseXPos);
    y.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const textFadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  const purificationSteps = [
    { step: '01', title: 'Micro-Filtration', desc: 'Removes all suspended physical particles, sediment, and fine debris down to 5 microns.', icon: Layers },
    { step: '02', title: 'Carbon Absorption', desc: 'Activated coconut-shell carbon absorbs organic compounds, odors, and chlorine residues.', icon: Flame },
    { step: '03', title: 'Reverse Osmosis', desc: 'High-pressure semi-permeable membrane filtering out dissolved heavy metals & impurities.', icon: Activity },
    { step: '04', title: 'Mineral Balancing', desc: 'Enriches water with optimal bioavailable Calcium, Magnesium, & Potassium ions.', icon: Sparkles },
    { step: '05', title: 'Ozonation', desc: 'Disinfects with natural reactive oxygen (O3) leaving zero chemical taste or residue.', icon: Zap },
    { step: '06', title: 'UV Treatment', desc: 'Ultraviolet light chamber eliminates 99.99% of biological microbes & pathogens.', icon: ShieldCheck },
    { step: '07', title: 'Sealed Bottling', desc: 'Automated touchless filling into sterilized 19L containers under cleanroom conditions.', icon: Lock },
  ];

  const missionPoints = [
    {
      title: 'Pure Quality First',
      desc: 'Advanced multi-stage filtration ensuring 100% safe mineral balance and crisp, refreshing taste in every drop.',
      icon: ShieldCheck,
      badge: 'Certified Pure',
    },
    {
      title: 'Eco-Friendly Hydration',
      desc: 'Reusable 19L food-grade bottles to eliminate single-use plastic waste and protect our environmental footprint.',
      icon: Leaf,
      badge: 'Zero Plastic Waste',
    },
    {
      title: 'Seamless Delivery',
      desc: 'Smart scheduled doorstep refills tailored to home and corporate needs, managed directly from your account.',
      icon: Truck,
      badge: 'Doorstep Concierge',
    },
  ];

  const impactStats = [
    { value: '10K+', label: 'Happy Households', subtext: 'Delivered across Pakistan' },
    { value: '100%', label: 'BPA-Free Packaging', subtext: 'Food-grade glass & polycarbonate' },
    { value: 'PKR 320', label: 'Flat Transparent Pricing', subtext: 'No hidden surge costs' },
  ];

  const labMetrics = [
    { component: 'pH Balance', limit: '6.5 - 8.5', value: '7.8', status: 'Optimal' },
    { component: 'Calcium (Ca)', limit: '200 mg/L', value: '12.4 mg/L', status: 'Compliant' },
    { component: 'Magnesium (Mg)', limit: '150 mg/L', value: '4.2 mg/L', status: 'Compliant' },
    { component: 'Silica (SiO2)', limit: 'N/A', value: '9.8 mg/L', status: 'Natural Trace' },
    { component: 'Microplastics', limit: '0%', value: 'Undetected', status: 'Pure' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#070e20] text-slate-900 dark:text-[#FAFAFA] flex flex-col transition-colors duration-300 overflow-x-hidden pt-20 font-sans">
      <Navbar />

      <main className="flex-1 w-full pb-32">
        {/* 1. Top Banner Section with Interactive 3D Parallax & Pointer Tilt */}
        <section 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
          className="w-full h-[340px] md:h-[450px] relative overflow-hidden bg-slate-950 select-none cursor-pointer group shadow-lg"
        >
          {/* 3D Motion Inner Wrapper */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              scale: bannerScale,
              transformStyle: 'preserve-3d',
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="relative w-full h-full"
          >
            <Image
              src="/Waterabout.jpg"
              alt="Watlys Premium Water Banner"
              fill
              className="object-cover object-center transition-transform duration-300"
              priority
            />
          </motion.div>

          {/* Dynamic Interactive Light Sheen Effect */}
          <motion.div 
            style={{
              x: useTransform(mouseX, [-0.5, 0.5], [-120, 120]),
              opacity: useTransform(mouseY, [-0.5, 0.5], [0.08, 0.25]),
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-300/30 to-transparent pointer-events-none z-10 transition-opacity duration-300" 
          />

          {/* Bottom Fade Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] dark:from-[#070e20] via-transparent to-black/20 pointer-events-none z-20" />
        </section>

        {/* 2. Centered "Our Story" Section (Below Banner) */}
        <section className="max-w-4xl mx-auto text-center px-4 py-12 space-y-6">
          {/* Centered Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-[0.25em] mx-auto shadow-2xs"
          >
            EST. 2024 • WATLYS MINERAL WATER
          </motion.div>

          {/* Centered Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Our Story
          </motion.h1>

          {/* Centered Subheadline in Ocean Blue */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-semibold text-blue-600 dark:text-sky-400 max-w-2xl mx-auto leading-relaxed"
          >
            Reimagining the ritual of daily drinking water in Pakistan.
          </motion.p>

          {/* Centered Body Paragraph */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed text-sm md:text-base font-light"
          >
            Watlys was founded with a singular commitment: delivering uncompromised, laboratory-certified 19-Liter mineral water with complete transparency and doorstep convenience.
          </motion.p>

          {/* Centered Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-4 pt-4 flex-wrap"
          >
            <Link
              href="/order"
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Order 19L Bottle</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/923000000000?text=Hello%20Watlys!%20I%20want%20to%20learn%20more%20about%20your%2019L%20water%20delivery"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Concierge</span>
            </a>
          </motion.div>
        </section>

        {/* 3. Detailed Sections & Visual Showcase */}
        <div className="max-w-7xl mx-auto px-6 space-y-28 pt-8">

          {/* Section A: The Watlys Mission (3-Column Grid) */}
          <motion.section {...textFadeIn} className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
                THE WATLYS COMMITMENT
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 dark:text-white">
                Our Core Pillars & Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                We combine environmental responsibility with rigorous scientific filtration to transform your daily hydration experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missionPoints.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl bg-white dark:bg-[#0e1938] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 block">
                        {item.badge}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-semibold text-blue-600 dark:text-sky-400">
                      <span>Verified Standard</span>
                      <CheckCircle2 className="w-4 h-4 ml-auto text-blue-600 dark:text-sky-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Section B: 7-Step Purification Pipeline */}
          <motion.section {...textFadeIn} className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
                SCIENTIFIC EXCELLENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 dark:text-white">
                Our 7-Step Purification Pipeline
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Every drop of Watlys 19L water passes through our state-of-the-art multi-barrier filtration process before bottling.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {purificationSteps.map((s, idx) => {
                const StepIcon = s.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0e1938] border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-blue-400 transition-all shadow-xs relative overflow-hidden"
                  >
                    <span className="absolute top-3 right-4 text-3xl font-extrabold text-blue-100 dark:text-blue-900/40 select-none">
                      {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white pt-1">
                      {s.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-300 font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Section C: Impact Statistics Bar */}
          <motion.section {...textFadeIn} className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-700/60">
              {impactStats.map((stat, idx) => (
                <div key={idx} className="pt-6 md:pt-0 px-4 space-y-2">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white block">
                    {stat.value}
                  </span>
                  <h4 className="text-sm font-bold text-sky-200 uppercase tracking-wider block">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-sky-100/80 font-light">
                    {stat.subtext}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Lab Metrics Transparency Section */}
          <motion.section {...textFadeIn} className="bg-white dark:bg-[#0e1938] border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 rounded-3xl space-y-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider block">LABORATORY CERTIFICATION</span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Chemical & Mineral Assay Results</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-sky-300 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                Verified ISO/PCSIR Standard
              </span>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs font-light">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    <th className="py-3">Component Analyzed</th>
                    <th className="py-3">Regulatory Limit</th>
                    <th className="py-3">Watlys Assayed</th>
                    <th className="py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {labMetrics.map((row) => (
                    <tr key={row.component} className="border-b border-slate-100 dark:border-slate-800/60 text-slate-700 dark:text-slate-200">
                      <td className="py-3.5 font-semibold text-slate-900 dark:text-white">{row.component}</td>
                      <td className="py-3.5 text-slate-400">{row.limit}</td>
                      <td className="py-3.5 text-blue-600 dark:text-sky-400 font-bold">{row.value}</td>
                      <td className="py-3.5 text-right font-medium">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Section D: Final CTA Banner */}
          <motion.section {...textFadeIn} className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 p-8 sm:p-14 text-white overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" /> Start Your Subscription Today
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to Upgrade Your Daily Hydration?
              </h2>

              <p className="text-sky-50 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                Experience ultra-pure 19L mineral water delivered directly to your doorstep in Lahore, Karachi, and Islamabad. Flat PKR 320 refills with flexible delivery schedules.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/order"
                  className="px-8 py-4 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Order Your 19L Bottle Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/packages"
                  className="px-8 py-4 rounded-xl bg-blue-800/40 hover:bg-blue-800/60 text-white border border-white/30 font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-all backdrop-blur-md cursor-pointer"
                >
                  <span>Explore Subscription Plans</span>
                </Link>
              </div>
            </div>

            {/* Decorative Background Glow Elements */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          </motion.section>

        </div>
      </main>

      <FooterSection />
    </div>
  );
}
