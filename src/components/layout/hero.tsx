'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Entropy } from '@/components/ui/entropy';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  variant?: 'entropy' | 'grid' | 'dots' | 'geometric' | 'simple';
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
        "relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0A0118]",
        className
      )}
    >
      {/* Background Variants */}
      {variant === 'entropy' && (
        <div className="absolute inset-0 z-0 opacity-40">
           <Entropy width={2000} height={1000} />
        </div>
      )}

      {variant === 'grid' && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/20 to-navy/80" />
        </div>
      )}

      {variant === 'dots' && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>
      )}

      {variant === 'geometric' && (
        <div className="absolute inset-0 z-0">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-navy/40 rounded-full blur-[120px]" />
           <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-white/5 rotate-45 border border-white/10" />
           <div className="absolute bottom-[20%] left-[15%] w-[15%] h-[15%] rounded-full border border-white/5" />
        </div>
      )}

      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-navy-light/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y: y1, opacity }}
        className="container relative z-20 px-6 pt-20"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} className="inline-block mb-6">
             <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gold uppercase tracking-[0.3em] backdrop-blur-sm">
                Department of CSM
             </span>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-space-grotesk font-bold tracking-tight text-white mb-8 leading-[1.1]"
            variants={itemVariants}
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className={cn(
                "inline-block mr-3",
                word.toLowerCase() === 'csm' || word.toLowerCase() === 'faculty' || word.toLowerCase() === 'events' ? "text-gold" : ""
              )}>
                {word}
              </span>
            ))}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center gap-6">
             <div className="w-12 h-1 bg-gold/50 rounded-full" />
             <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Engineering Excellence Since 2008</span>
             <div className="w-12 h-1 bg-gold/50 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
