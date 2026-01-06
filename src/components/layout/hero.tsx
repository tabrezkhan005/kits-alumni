'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Entropy } from '@/components/ui/entropy';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
    variant?: 'entropy' | 'grid' | 'dots' | 'geometric' | 'excellence' | 'forum' | 'simple';
  className?: string;
}

export function Hero({ title, subtitle, variant = 'entropy', className }: HeroProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Interactive Background State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const sectionElement = ref.current;
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      sectionElement.addEventListener('mouseenter', () => setIsHovering(true));
      sectionElement.addEventListener('mouseleave', () => setIsHovering(false));
      return () => {
        sectionElement.removeEventListener('mousemove', handleMouseMove);
        sectionElement.removeEventListener('mouseenter', () => setIsHovering(true));
        sectionElement.removeEventListener('mouseleave', () => setIsHovering(false));
      };
    }
  }, [ref]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full min-h-[75vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-[#2A2E5C] via-[#2A2E5C] to-[#1E2235]",
        className
      )}
    >
      {/* Professional Background Layers */}
      <div className="absolute inset-0">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:32px_32px]" />

        {/* Primary Interactive Gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isHovering
              ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 167, 46, 0.08) 0%, rgba(42, 46, 92, 0.06) 30%, transparent 60%)`
              : `radial-gradient(circle at 50% 50%, rgba(212, 167, 46, 0.04) 0%, rgba(42, 46, 92, 0.03) 30%, transparent 60%)`
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Sophisticated Geometric Elements */}
        <motion.div
          className="absolute top-1/5 left-1/6 w-40 h-40 border border-gold/10 rounded-2xl backdrop-blur-sm"
          animate={{
            rotate: mousePosition.x * 0.005,
            scale: 1 + mousePosition.y * 0.00002,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/5 w-28 h-28 border border-white/5 rounded-full backdrop-blur-sm"
          animate={{
            rotate: mousePosition.y * -0.003,
            scale: 1 + mousePosition.x * 0.00001,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Professional Light Rays */}
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            background: `linear-gradient(${mousePosition.x * 0.02}deg, transparent 0%, rgba(212, 167, 46, 0.04) 40%, rgba(42, 46, 92, 0.02) 60%, transparent 100%)`
          }}
        />

        {/* Subtle Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Professional Content Layer */}
      <motion.div
        style={{ y: y1, opacity }}
        className="container relative z-20 px-6 py-12 md:py-16"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-12 md:mb-14">
            {/* Elegant Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
            >
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                Department of CSM
              </span>
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            </motion.div>

            {/* Premium Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-black text-white mb-6 leading-[0.95] tracking-tight"
              variants={itemVariants}
            >
              <span className="block mb-2 md:mb-3">
                {title.split(' ').slice(0, 2).join(' ')}
              </span>
              <motion.span
                className="block text-gold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {title.split(' ').slice(2).join(' ')}
              </motion.span>
            </motion.h1>

            {/* Refined Subtitle */}
            {subtitle && (
              <motion.div
                variants={itemVariants}
                className="max-w-3xl mx-auto"
              >
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-3">
                  {subtitle}
                </p>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
              </motion.div>
            )}
          </div>

          {/* Compact Stats Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-3xl mx-auto mb-12"
          >
            {[
              { value: "500+", label: "Students" },
              { value: "50+", label: "Faculty" },
              { value: "15+", label: "Labs" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-black text-gold mb-1"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/70 text-sm font-medium group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Compact CTA Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-navy font-bold rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 shadow-lg shadow-gold/15">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center gap-2 text-base">
                  Discover Excellence
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="group px-8 py-4 border-2 border-white/25 text-white font-bold rounded-xl hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300 backdrop-blur-sm text-base">
                <span className="flex items-center gap-2">
                  Explore Programs
                  <motion.span
                    className="text-gold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ↗
                  </motion.span>
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Minimal Timeline */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-white/70 text-xs font-medium">
                Pioneering Computer Science Since 2008
              </span>
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle Bottom Transition */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/3 to-transparent" />
    </section>
  );
}
