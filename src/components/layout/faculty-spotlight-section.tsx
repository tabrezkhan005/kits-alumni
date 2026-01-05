"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Featured Faculty Data
 * Faculty marked as "featured" will appear in the carousel
 */
const featuredFaculty = [
  {
    id: 1,
    name: "Dr. Radhakrishna",
    designation: "Head of Computer Science",
    image: "/img/radhakrshnasir.jpg",
    profile: "/faculty/radhakrishna",
  },
  {
    id: 2,
    name: "Dr. Nagendra Prasad",
    designation: "Principal",
    image: "/img/nagendraPrasadsir.jpg",
    profile: "/faculty/nagendra-prasad",
  },
  {
    id: 3,
    name: "Dr. Srinivas",
    designation: "Professor of Engineering",
    image: "/img/srinivassir.jpg",
    profile: "/faculty/srinivas",
  },
  {
    id: 4,
    name: "Dr. John Saida",
    designation: "Professor of Mathematics",
    image: "/img/johnsaidasir.jpg",
    profile: "/faculty/john-saida",
  },
];

/**
 * Faculty Spotlight Section
 * Horizontal scrolling carousel of featured faculty
 */
export function FacultySpotlightSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredFaculty.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + featuredFaculty.length) % featuredFaculty.length);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % featuredFaculty.length);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A72E]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A2E5C] mb-6 font-space-grotesk-bold">
            Faculty <span className="text-[#D4A72E]">Spotlight</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2A2E5C] to-[#D4A72E] mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-poppins-regular">
            Meet our distinguished faculty members leading innovation in AI and Machine Learning
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#2A2E5C] rounded-full p-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="Previous faculty"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#2A2E5C] rounded-full p-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
            aria-label="Next faculty"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {featuredFaculty.map((faculty, index) => (
                <div
                  key={faculty.id}
                  className="min-w-full px-4 md:px-8"
                >
                  <Link href={faculty.profile}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Faculty Photo */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={faculty.image}
                            alt={faculty.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2E5C]/20 to-transparent"></div>
                        </div>

                        {/* Faculty Info */}
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-3xl md:text-4xl font-bold text-[#2A2E5C] mb-4 font-space-grotesk-bold group-hover:text-[#D4A72E] transition-colors duration-300">
                            {faculty.name}
                          </h3>
                          <p className="text-xl md:text-2xl text-gray-600 mb-6 font-poppins-semibold">
                            {faculty.designation}
                          </p>
                          <p className="text-gray-700 font-poppins-regular leading-relaxed max-w-2xl">
                            Leading research and innovation in Computer Science and Machine Learning.
                            Dedicated to mentoring the next generation of technology leaders.
                          </p>
                          <div className="mt-6 inline-flex items-center gap-2 text-[#2A2E5C] font-semibold group-hover:text-[#D4A72E] transition-colors duration-300 font-poppins-semibold">
                            View Full Profile
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {featuredFaculty.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#D4A72E]'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#2A2E5C] text-white font-semibold rounded-xl hover:bg-[#3F426B] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl font-poppins-semibold"
          >
            View All Faculty
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}










