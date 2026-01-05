"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Zap, Shield, Database, Cpu } from 'lucide-react';
import Link from 'next/link';

const accordionItems = [
  {
    id: 1,
    title: 'Artificial Intelligence',
    icon: <Globe className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Machine Learning',
    icon: <Zap className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Neural Networks',
    icon: <Shield className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Data Science',
    icon: <Database className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2090&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Deep Learning',
    icon: <Cpu className="w-5 h-5" />,
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
  },
];

const typewriterSentences = [
  "Engineering the Future with AI & Machine Learning",
  "Shaping Tomorrow's Tech Innovators",
  "Innovation Meets Excellence in Technology",
  "Building Your Future in Computer Science",
  "Leading in Artificial Intelligence & ML Research"
];

const AccordionItem = ({ item, isActive, onMouseEnter }: {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <motion.div
      layout
      className={`
        relative h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out border border-white/10
        ${isActive ? 'flex-[4] md:flex-[5] shadow-2xl shadow-navy/40' : 'flex-1 opacity-70 hover:opacity-100'}
      `}
      onMouseEnter={onMouseEnter}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-navy/10 to-navy/90 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`} />

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute bottom-8 left-8 right-8 z-20"
          >
             <div className="w-12 h-12 bg-gold text-navy rounded-2xl flex items-center justify-center mb-4 shadow-lg transform -rotate-12">
                {item.icon}
             </div>
             <h3 className="text-xl md:text-2xl font-space-grotesk font-bold text-white mb-2">{item.title}</h3>
             <p className="text-white/70 text-xs md:text-sm font-medium line-clamp-2">Leading the frontier of technological innovation and academic excellence.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
           <span className="rotate-90 text-white/50 text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap">
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
    <div className="relative h-[180px] md:h-[240px] lg:h-[280px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentSentenceIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.05] tracking-tight font-space-grotesk"
        >
          {sentences[currentSentenceIndex].split(' ').map((word, i) => {
            const isHighlight = ['AI', '&', 'Machine', 'Learning', 'Innovators', 'Technology', 'Excellence', 'Artificial', 'Intelligence', 'ML', 'Research'].includes(word.replace(/[^a-zA-Z&]/g, ''));
            return (
              <span key={i} className={isHighlight ? "text-gold inline-block" : "inline-block"}>
                 {word}{' '}
              </span>
            );
          })}
        </motion.h1>
      </AnimatePresence>
      <div className="absolute -bottom-6 left-0 w-full h-[2px] bg-gray-100 overflow-hidden rounded-full">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          key={`progress-${currentSentenceIndex}`}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gold w-full origin-left"
        />
      </div>
    </div>
  );
}

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-white min-h-screen pt-[120px] pb-20 overflow-hidden relative selection:bg-gold/30">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-navy/5 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #001F3F 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <section className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-16 lg:gap-24">

          <div className="w-full xl:w-[45%] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/[0.03] border border-navy/5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span className="text-navy text-[10px] font-bold uppercase tracking-[0.3em]">
                    Welcome to CSM Department
                  </span>
               </div>
            </motion.div>
            
            <TransitioningText sentences={typewriterSentences} />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 text-lg text-gray-500 max-w-xl font-medium leading-relaxed"
            >
              Building the next generation of AI leaders at KITS. Our curriculum is designed to merge theoretical excellence with practical industry standards.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: 'Alumni', val: '500+' },
                { label: 'Faculty', val: '50+' },
                { label: 'Projects', val: '120+' },
                { label: 'Placements', val: '98%' }
              ].map((stat, i) => (
                <div key={i} className="group p-5 rounded-[2rem] bg-gray-50/50 border border-gray-100 hover:border-gold/20 hover:bg-white hover:shadow-2xl hover:shadow-navy/5 transition-all duration-500">
                  <div className="text-2xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">{stat.val}</div>
                  <div className="text-[9px] uppercase font-bold text-gray-400 tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <Link href="/register">
                <button className="group px-10 py-5 bg-navy text-white font-bold rounded-full hover:bg-gold hover:text-navy transition-all duration-500 shadow-2xl shadow-navy/20 flex items-center gap-3 active:scale-95">
                  JOIN OUR NETWORK
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/about">
                <button className="px-10 py-5 bg-white border-2 border-navy/10 text-navy font-bold rounded-full hover:border-navy hover:bg-navy hover:text-white transition-all duration-500 active:scale-95">
                  EXPLORE DEPARTMENT
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full xl:w-[55%] flex items-center"
          >
            <div className="flex flex-row items-center gap-3 md:gap-4 w-full h-full min-h-[450px] md:min-h-[550px]">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
