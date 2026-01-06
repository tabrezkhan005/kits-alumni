"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Zap, Shield, Database, Cpu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const accordionItems = [
  {
    id: 1,
    title: 'Artificial Intelligence',
    icon: <Globe className="w-5 h-5" />,
    imageUrl: '/img/AI.jpg',
  },
  {
    id: 2,
    title: 'Machine Learning',
    icon: <Zap className="w-5 h-5" />,
    imageUrl: '/img/ML.jpg',
  },
  {
    id: 3,
    title: 'Neural Networks',
    icon: <Shield className="w-5 h-5" />,
    imageUrl: '/img/NN.jpg',
  },
  {
    id: 4,
    title: 'Data Science',
    icon: <Database className="w-5 h-5" />,
    imageUrl: '/img/DS.jpg',
  },
  {
    id: 5,
    title: 'Deep Learning',
    icon: <Cpu className="w-5 h-5" />,
    imageUrl: '/img/DL.jpg',
  },
];

const typewriterSentences = [
  "Engineering the Future with AI & Machine Learning",
  "Shaping Tomorrow's Tech Innovators",
  "Innovation Meets Excellence in Technology",
  "Building Your Future in Computer Science",
  "Leading in Artificial Intelligence & ML Research"
];

const AccordionItem = ({ item, isActive, isHovered, hoveredIndex, onMouseEnter, onMouseLeave, onClick, index }: {
    item: typeof accordionItems[0];
    isActive: boolean;
    isHovered: boolean;
    hoveredIndex: number | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick?: () => void;
    index: number;
  }) => {
    return (
      <motion.div
        layout
        className={`
          relative rounded-3xl overflow-hidden cursor-pointer
          transition-all duration-700 ease-in-out border border-white/10
          ${isHovered
            ? 'h-[300px] md:h-[450px] xl:h-[550px] xl:flex-[10] md:flex-[10] shadow-2xl shadow-navy/40 flex-1 min-w-[300px] z-20 opacity-100'
            : 'h-[120px] md:h-[180px] xl:h-[550px] xl:flex-1 opacity-70 hover:opacity-100 min-w-[150px]'
          }
          xl:flex-initial
        `}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
      {/* Show image only when hovered */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain transition-transform duration-700 hover:scale-110"
              priority={index === 0}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light background when not hovered */}
      {!isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />
      )}

      {/* Subtle overlay for active state */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-navy/10 to-navy/70 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 z-20"
          >
             <div className="w-10 h-10 md:w-12 md:h-12 bg-gold text-navy rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg transform -rotate-12">
                {item.icon}
             </div>
             <h3 className="text-lg md:text-xl xl:text-2xl font-space-grotesk font-bold text-white mb-2">{item.title}</h3>
             <p className="text-white/70 text-xs md:text-sm font-medium line-clamp-2">Leading the frontier of technological innovation and academic excellence.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-10 xl:hidden">
           <span className="text-navy text-xs md:text-sm font-bold uppercase tracking-wide text-center px-2">
              {item.title}
           </span>
        </div>
      )}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-10 hidden xl:flex">
           <span className="rotate-90 text-navy text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap">
              {item.title}
           </span>
        </div>
      )}

    </motion.div>
  );
};

function TransitioningText({ sentences }: { sentences: string[] }) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div className="relative h-[120px] md:h-[140px] lg:h-[160px] flex flex-col justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentSentenceIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.8 }
          }}
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-navy leading-[1.1] tracking-tight font-space-grotesk"
        >
          {sentences[currentSentenceIndex].split(' ').map((word, i) => {
            const isHighlight = ['AI', '&', 'Machine', 'Learning', 'Innovators', 'Technology', 'Excellence', 'Artificial', 'Intelligence', 'ML', 'Research'].includes(word.replace(/[^a-zA-Z&]/g, ''));
            return (
              <span key={i} className={isHighlight ? "text-gold relative inline-block" : "inline-block"}>
                 {word}{' '}
              </span>
            );
          })}
        </motion.h1>
      </AnimatePresence>
      <div className="mt-8 w-32 h-[3px] bg-navy/[0.03] overflow-hidden rounded-full relative">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          key={`progress-${currentSentenceIndex}`}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute inset-0 bg-gold w-full origin-left"
        />
      </div>
    </div>
  );
}

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen pt-[80px] pb-12 overflow-hidden relative selection:bg-gold/30">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-navy/5 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #001F3F 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <section className="container mx-auto px-4 md:px-6 lg:px-12 py-12 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">

          <div className="w-full xl:w-[55%] flex flex-col justify-center text-center xl:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 md:mb-8"
            >
               <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-navy/[0.03] border border-navy/5">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold animate-ping" />
                  <span className="text-navy text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    Welcome to CSM Department
                  </span>
               </div>
            </motion.div>

            <TransitioningText sentences={typewriterSentences} />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 md:mt-10 text-base md:text-lg text-gray-500 max-w-xl font-medium leading-relaxed mx-auto xl:mx-0"
            >
              Building the next generation of AI leaders at KITS. Our curriculum is designed to merge theoretical excellence with practical industry standards.
            </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 md:mt-12 grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4"
              >
                {[
                  { label: 'Alumni', val: '500+' },
                  { label: 'Faculty', val: '50+' },
                  { label: 'Projects', val: '120+' },
                  { label: 'Placements', val: '98%' }
                ].map((stat, i) => (
                  <div key={i} className="group p-3 md:p-5 rounded-2xl bg-white border border-navy/[0.06] hover:border-gold/30 hover:shadow-xl hover:shadow-navy/5 transition-all duration-500">
                    <div className="text-xl md:text-2xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">{stat.val}</div>
                    <div className="text-[9px] md:text-[10px] uppercase font-bold text-gray-400 tracking-[0.15em] md:tracking-[0.2em]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-6"
              >
                  <Link href="/register" className="flex-1 sm:flex-none">
                    <button className="relative overflow-hidden w-full group px-6 md:px-8 lg:px-10 py-4 md:py-5 bg-white text-navy font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-navy/20 flex items-center justify-center gap-2 md:gap-3 active:scale-[0.98] border border-navy/20 hover:bg-navy hover:text-white hover:shadow-[0_0_50px_rgba(44,62,124,0.4)] hover:scale-[1.02] text-sm md:text-base">
                      <span className="relative z-10 flex items-center gap-2 md:gap-3">
                        JOIN OUR NETWORK
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                    </button>
                  </Link>
                <Link href="/about" className="flex-1 sm:flex-none">
                  <button className="w-full px-6 md:px-8 lg:px-10 py-4 md:py-5 bg-gold border-2 border-gold/20 text-navy font-bold rounded-2xl hover:border-gold hover:bg-gold-dark hover:text-navy transition-all duration-500 active:scale-[0.98] flex items-center justify-center hover:shadow-xl hover:shadow-gold/30 text-sm md:text-base">
                    EXPLORE DEPARTMENT
                  </button>
                </Link>
              </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full xl:w-[45%] flex items-center"
          >
            {/* Mobile: Stack vertically */}
            <div className="flex flex-col xl:flex-row items-center gap-3 md:gap-4 w-full h-full min-h-[450px] md:min-h-[550px] xl:min-h-[600px]">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  isHovered={index === hoveredIndex}
                  hoveredIndex={hoveredIndex}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    setActiveIndex(null);
                    setHoveredIndex(null);
                  }}
                  onClick={() => setActiveIndex(index)}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
