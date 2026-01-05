"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

/**
 * Testimonials Data
 * One slide for Student, Alumnus, and Recruiter
 */
const testimonials = [
  {
    id: 1,
    type: "Student",
    quote: "The CSM department at KITS has been a transformative experience. The cutting-edge curriculum and hands-on projects have prepared me for real-world challenges in AI and Machine Learning.",
    author: "Priya Sharma",
    title: "Final Year Student, B.Tech CSM",
    image: "/img/default-avatar.png",
  },
  {
    id: 2,
    type: "Alumnus",
    quote: "My time at KITS CSM laid the foundation for my career at Google. The faculty's mentorship and state-of-the-art labs equipped me with skills that directly translate to industry success.",
    author: "Rajesh Kumar",
    title: "Software Engineer @ Google, Class of '22",
    image: "/img/default-avatar.png",
  },
  {
    id: 3,
    type: "Recruiter",
    quote: "KITS CSM graduates consistently demonstrate exceptional problem-solving skills and technical expertise. They're always our top choice for AI/ML roles.",
    author: "Sarah Johnson",
    title: "Senior Recruiter, Microsoft India",
    image: "/img/default-avatar.png",
  },
];

/**
 * Testimonials Carousel Section
 * Full-width quote-centric carousel slider
 */
export function TestimonialsCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000); // Resume after 12s
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2A2E5C]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A72E]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A2E5C] mb-6 font-space-grotesk-bold">
            What People <span className="text-[#D4A72E]">Say</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2A2E5C] to-[#D4A72E] mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-poppins-regular">
            Hear from our students, alumni, and industry partners about their experiences
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-[#D4A72E]/10 rounded-full flex items-center justify-center">
                  <Quote className="w-10 h-10 text-[#D4A72E]" />
                </div>
              </div>

              {/* Quote Text */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2A2E5C] text-center mb-12 leading-relaxed font-space-grotesk-semibold italic">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Author Photo */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Author Details */}
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-[#2A2E5C] mb-2 font-space-grotesk-bold">
                    {currentTestimonial.author}
                  </h3>
                  <p className="text-lg text-gray-600 font-poppins-medium">
                    {currentTestimonial.title}
                  </p>
                  {/* Type Badge */}
                  <div className="inline-block mt-3 px-4 py-1 bg-[#2A2E5C]/10 text-[#2A2E5C] rounded-full text-sm font-semibold font-poppins-semibold">
                    {currentTestimonial.type}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#D4A72E]'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}










