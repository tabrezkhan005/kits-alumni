"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AI/ML related images and content for KITS CSM
 */
const accordionItems = [
  {
    id: 1,
    title: 'Artificial Intelligence',
    imageUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Machine Learning',
    imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Neural Networks',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Data Science',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2090&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Deep Learning',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
  },
];

/**
 * Typewriter sentences for dynamic text effect
 */
const typewriterSentences = [
  "Engineering the Future with AI & Machine Learning",
  "Shaping Tomorrow's Tech Innovators",
  "Innovation Meets Excellence in Technology",
  "Building Your Future in Computer Science",
  "Leading in Artificial Intelligence & ML Research"
];

/**
 * Accordion Item Component
 * Individual expandable image card
 */
const AccordionItem = ({ item, isActive, onMouseEnter }: {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error';
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

/**
 * Simple Text Transition Component
 * Cycles through sentences with smooth fade transitions
 */
function TransitioningText({ sentences }: { sentences: string[] }) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    // Cycle through sentences every 4 seconds
    const interval = setInterval(() => {
      setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentSentenceIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2A2E5C] leading-tight tracking-tighter font-space-grotesk-bold absolute inset-0"
        >
          {sentences[currentSentenceIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

/**
 * Main Landing Accordion Component
 * Interactive image accordion with typewriter text
 */
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(2);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white font-sans min-h-screen -mt-[96px] pt-[120px] pb-12 md:pb-24">
      <section className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">

          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left pt-4 md:pt-8">
            {/* Simple Transition Title */}
            <TransitioningText sentences={typewriterSentences} />

            <p className="mt-8 text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0 font-poppins-regular leading-relaxed">
              Build high-performance AI applications and cutting-edge machine learning solutions.
              Join KITS CSM Department where innovation meets excellence, and tomorrow's tech leaders are shaped today.
            </p>

            {/* Statistics Cards */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto md:mx-0">
              <div className="bg-gray-50 rounded-xl p-4 border border-[#2A2E5C]/10">
                <div className="text-3xl md:text-4xl font-bold text-[#2A2E5C] font-space-grotesk-bold mb-1">500+</div>
                <div className="text-sm md:text-base text-gray-600 font-poppins-medium">Alumni</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-[#2A2E5C]/10">
                <div className="text-3xl md:text-4xl font-bold text-[#2A2E5C] font-space-grotesk-bold mb-1">50+</div>
                <div className="text-sm md:text-base text-gray-600 font-poppins-medium">Faculty</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-[#2A2E5C]/10">
                <div className="text-3xl md:text-4xl font-bold text-[#2A2E5C] font-space-grotesk-bold mb-1">100+</div>
                <div className="text-sm md:text-base text-gray-600 font-poppins-medium">Projects</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-[#2A2E5C]/10">
                <div className="text-3xl md:text-4xl font-bold text-[#2A2E5C] font-space-grotesk-bold mb-1">95%</div>
                <div className="text-sm md:text-base text-gray-600 font-poppins-medium">Placements</div>
              </div>
            </div>

            {/* Two Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start gap-4">
              <a
                href="/register"
                className="inline-block bg-[#D4A72E] hover:bg-[#C4972A] text-[#2A2E5C] font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-poppins-semibold text-lg"
              >
                Join Alumni Network
              </a>
              <a
                href="/about"
                className="inline-block bg-white border-2 border-[#2A2E5C] text-[#2A2E5C] font-semibold px-8 py-4 rounded-xl hover:bg-[#2A2E5C] hover:text-white transition-all duration-300 hover:scale-105 font-poppins-semibold text-lg"
              >
                Explore Programs
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
