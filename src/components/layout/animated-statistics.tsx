"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Users, GraduationCap, Code2, Briefcase, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';

const statisticsData = [
  {
    id: 1,
    number: 500,
    suffix: '+',
    label: 'Alumni Network',
    description: 'Global professionals making an impact',
    icon: Users,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    bgPattern: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
  },
  {
    id: 2,
    number: 50,
    suffix: '+',
    label: 'Expert Faculty',
    description: 'Industry leaders and researchers',
    icon: GraduationCap,
    gradient: 'from-gold via-yellow-400 to-amber-500',
    glowColor: 'rgba(212, 167, 46, 0.3)',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(212, 167, 46, 0.1) 0%, transparent 50%)'
  },
  {
    id: 3,
    number: 120,
    suffix: '+',
    label: 'Research Projects',
    description: 'Cutting-edge innovations',
    icon: Code2,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    bgPattern: 'radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
  },
  {
    id: 4,
    number: 98,
    suffix: '%',
    label: 'Placement Rate',
    description: 'Career success guaranteed',
    icon: Briefcase,
    gradient: 'from-navy via-blue-600 to-indigo-600',
    glowColor: 'rgba(44, 62, 124, 0.3)',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(44, 62, 124, 0.1) 0%, transparent 50%)'
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
      className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Floating Orbs */}
        {statisticsData.map((stat, index) => (
          <motion.div
            key={`orb-${stat.id}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: '400px',
              height: '400px',
              background: `linear-gradient(135deg, ${stat.glowColor}, transparent)`,
              left: `${20 + index * 20}%`,
              top: `${30 + (index % 2) * 40}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full mb-8 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-navy font-semibold text-sm tracking-wide">By The Numbers</span>
            <TrendingUp className="w-4 h-4 text-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-space-grotesk font-black text-navy mb-6 leading-[0.95]"
          >
            Excellence in{" "}
            <span className="relative inline-block">
              <span className="text-gold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Numbers
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the metrics that define our commitment to academic excellence and professional success
          </motion.p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statisticsData.map((stat, index) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card Container */}
                <motion.div
                  className="relative h-full p-8 rounded-3xl bg-white border border-gray-100 overflow-hidden"
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    boxShadow: isHovered
                      ? `0 20px 60px -15px ${stat.glowColor}, 0 0 0 1px rgba(255, 255, 255, 0.1)`
                      : '0 4px 20px -4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Animated Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: stat.bgPattern,
                    }}
                  />

                  {/* Gradient Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${stat.glowColor}, transparent)`,
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* Icon Container */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative inline-flex">
                      {/* Icon Background with Gradient */}
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-xl`}
                        animate={isHovered ? {
                          boxShadow: [
                            `0 0 20px ${stat.glowColor}`,
                            `0 0 40px ${stat.glowColor}`,
                            `0 0 20px ${stat.glowColor}`,
                          ],
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <IconComponent className="w-8 h-8" />
                      </motion.div>

                      {/* Pulsing Ring */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2"
                          style={{ borderColor: stat.glowColor }}
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Number Display */}
                  <div className="relative mb-3">
                    <motion.div
                      className="text-5xl md:text-6xl font-black text-navy font-space-grotesk tracking-tight"
                      animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CountUp end={stat.number} suffix={stat.suffix} />
                    </motion.div>

                    {/* Animated Underline */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full mt-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                    />
                  </div>

                  {/* Label */}
                  <motion.h3
                    className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2"
                    animate={isHovered ? { color: "#2C3E7C" } : {}}
                  >
                    {stat.label}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-sm text-gray-400 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    {stat.description}
                  </motion.p>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0, rotate: -45 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/30 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-gold" />
                    </div>
                  </motion.div>

                  {/* Shimmer Effect on Hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ transform: 'skewX(-20deg)' }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-16 rounded-full"
        />
      </div>
    </section>
  );
}
