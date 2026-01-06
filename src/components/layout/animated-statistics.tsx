"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, GraduationCap, Code2, Briefcase, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';

const statisticsData = [
  {
    id: 1,
    number: 500,
    suffix: '+',
    label: 'Alumni Network',
    description: 'Global professionals making an impact',
    icon: Users,
    gradient: 'from-navy via-navy-light to-navy',
    glowColor: 'rgba(63, 66, 107, 0.4)',
    bgPattern: 'radial-gradient(circle at 20% 50%, rgba(63, 66, 107, 0.15) 0%, transparent 50%)',
    color: '#3F426B'
  },
  {
    id: 2,
    number: 50,
    suffix: '+',
    label: 'Expert Faculty',
    description: 'Industry leaders and researchers',
    icon: GraduationCap,
    gradient: 'from-gold via-gold-light to-gold',
    glowColor: 'rgba(212, 167, 46, 0.4)',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(212, 167, 46, 0.15) 0%, transparent 50%)',
    color: '#D4A72E'
  },
  {
    id: 3,
    number: 120,
    suffix: '+',
    label: 'Research Projects',
    description: 'Cutting-edge innovations',
    icon: Code2,
    gradient: 'from-navy-light via-navy to-navy-light',
    glowColor: 'rgba(95, 99, 143, 0.4)',
    bgPattern: 'radial-gradient(circle at 50% 80%, rgba(95, 99, 143, 0.15) 0%, transparent 50%)',
    color: '#5F638F'
  },
  {
    id: 4,
    number: 98,
    suffix: '%',
    label: 'Placement Rate',
    description: 'Career success guaranteed',
    icon: Briefcase,
    gradient: 'from-gold-light via-gold to-gold-light',
    glowColor: 'rgba(191, 161, 46, 0.4)',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(191, 161, 46, 0.15) 0%, transparent 50%)',
    color: '#BFA12E'
  },
];

function CountUp({ end, suffix, duration = 2.5 }: { end: number, suffix: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const endValue = end;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / endValue;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function AnimatedStatistics() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3F426B_1px,transparent_1px),linear-gradient(to_bottom,#3F426B_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-navy/10 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 border border-gold/20 rounded-lg rotate-45"
          animate={{
            rotate: [45, 135, 45],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-navy/5 to-gold/5 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Elegant Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-xl border border-navy/10 rounded-full mb-8 shadow-xl shadow-navy/5"
          >
            <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
            <span className="text-navy font-bold text-sm tracking-wider uppercase">Excellence by Numbers</span>
            <TrendingUp className="w-4 h-4 text-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-black text-navy mb-6 leading-tight"
          >
            KITS CSM{" "}
            <span className="relative inline-block">
              <span className="text-navy">
                Statistics
              </span>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-1.5 bg-navy rounded-full"
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : { scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Discover the numbers that define our commitment to academic excellence, research innovation, and career success at KITS CSM.
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {statisticsData.map((stat, index) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 120
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Premium Card Design */}
                <motion.div
                  className="relative h-full p-8 bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-navy/5 overflow-hidden"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    boxShadow: isHovered
                      ? `0 25px 80px -15px ${stat.glowColor}, 0 0 0 1px rgba(255, 255, 255, 0.2)`
                      : '0 10px 40px -10px rgba(63, 66, 107, 0.1)',
                  }}
                >
                  {/* Animated Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: stat.bgPattern,
                    }}
                  />

                  {/* Gradient Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      borderColor: stat.color,
                      background: `linear-gradient(135deg, ${stat.glowColor}, transparent)`,
                      padding: '2px',
                    }}
                  />

                  {/* Icon Section */}
                  <motion.div
                    className="relative mb-8 flex justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="relative">
                      {/* Icon Background */}
                      <motion.div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-2xl`}
                        animate={isHovered ? {
                          boxShadow: [
                            `0 0 30px ${stat.glowColor}`,
                            `0 0 50px ${stat.glowColor}`,
                            `0 0 30px ${stat.glowColor}`,
                          ],
                        } : {}}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <IconComponent className="w-10 h-10" />
                      </motion.div>

                      {/* Pulsing Ring */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-3"
                          style={{ borderColor: stat.color }}
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 0.3, 0.8],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Number Display */}
                  <div className="relative mb-4 text-center">
                    <motion.div
                      className="text-5xl md:text-6xl font-black font-space-grotesk mb-2"
                      style={{ color: stat.color }}
                      animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CountUp end={stat.number} suffix={stat.suffix} />
                    </motion.div>

                    {/* Animated Accent Line */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-transparent via-current to-transparent rounded-full mx-auto w-16"
                      style={{ background: `linear-gradient(to right, transparent, ${stat.color}, transparent)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "4rem" }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                    />
                  </div>

                  {/* Label and Description */}
                  <div className="text-center">
                    <motion.h3
                      className="text-lg font-bold text-navy mb-3 uppercase tracking-wider"
                      animate={isHovered ? { color: stat.color } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.label}
                    </motion.h3>

                    <motion.p
                      className="text-sm text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                    >
                      {stat.description}
                    </motion.p>
                  </div>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ scale: 0, rotate: -45 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2"
                      style={{
                        backgroundColor: stat.color + '20',
                        borderColor: stat.color,
                        boxShadow: `0 0 20px ${stat.glowColor}`
                      }}
                    >
                      <ArrowUpRight className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </motion.div>

                  {/* Shimmer Effect */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-150%' }}
                      animate={{ x: '150%' }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      style={{ transform: 'skewX(-15deg)' }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Elegant Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
          className="w-24 h-1 bg-navy mx-auto mt-8 rounded-full"
        />
      </div>
    </section>
  );
}
