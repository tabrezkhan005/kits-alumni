"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles, Award, TrendingUp } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    type: "Student",
    quote: "The CSM department at KITS has been a transformative experience. The cutting-edge curriculum and hands-on projects have prepared me for real-world challenges in AI and Machine Learning.",
    author: "Priya Sharma",
    title: "Final Year Student, B.Tech CSM",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    glowColor: "rgba(59, 130, 246, 0.2)"
  },
  {
    id: 2,
    type: "Alumnus",
    quote: "My time at KITS CSM laid the foundation for my career at Google. The faculty's mentorship and state-of-the-art labs equipped me with skills that directly translate to industry success.",
    author: "Rajesh Kumar",
    title: "Software Engineer @ Google, Class of '22",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    gradient: "from-gold via-yellow-400 to-amber-500",
    glowColor: "rgba(212, 167, 46, 0.2)"
  },
  {
    id: 3,
    type: "Recruiter",
    quote: "KITS CSM graduates consistently demonstrate exceptional problem-solving skills and technical expertise. They're always our top choice for AI/ML roles.",
    author: "Sarah Johnson",
    title: "Senior Recruiter, Microsoft India",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    glowColor: "rgba(168, 85, 247, 0.2)"
  },
];

export function TestimonialsCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section
      className="py-32 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Floating Gradient Orbs */}
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={`orb-${testimonial.id}`}
            className="absolute rounded-full blur-3xl opacity-10"
            style={{
              width: '500px',
              height: '500px',
              background: `linear-gradient(135deg, ${testimonial.glowColor}, transparent)`,
              left: `${15 + index * 30}%`,
              top: `${20 + (index % 2) * 50}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
              x: [0, 60, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.7,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full mb-8 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-navy font-semibold text-sm tracking-wide">Voices of Success</span>
            <Award className="w-4 h-4 text-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-black text-navy mb-6 leading-[0.95]"
          >
            Community{" "}
            <span className="relative inline-block">
              <span className="text-gold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Perspectives
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Hear from students, alumni, and industry partners about their experiences with our department
          </motion.p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-7xl mx-auto relative">
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Image Side */}
                <motion.div
                  className="lg:col-span-5 relative"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
                    {/* Image Container */}
                    <div className="absolute inset-0">
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.author}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent" />
                    </div>

                    {/* Floating Quote Icon */}
                    <motion.div
                      className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gold to-gold-dark p-8 rounded-[2rem] shadow-2xl z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Quote className="w-8 h-8 text-navy" />
                      <motion.div
                        className="absolute inset-0 rounded-[2rem] bg-gold/20 blur-xl"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    {/* Type Badge */}
                    <motion.div
                      className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full shadow-lg"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-navy">
                        {currentTestimonial.type}
                      </span>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-navy/10 rounded-full blur-3xl" />
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                  className="lg:col-span-7 lg:pl-8"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
                    {/* Background Pattern */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        background: `radial-gradient(circle at 20% 50%, ${currentTestimonial.glowColor} 0%, transparent 50%)`,
                      }}
                    />

                    {/* Rating Stars */}
                    <motion.div
                      className="flex items-center gap-2 mb-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-gold text-gold" />
                        </motion.div>
                      ))}
                      <span className="ml-2 text-sm text-gray-500 font-semibold">
                        {currentTestimonial.rating}.0
                      </span>
                    </motion.div>

                    {/* Quote */}
                    <motion.blockquote
                      className="text-2xl md:text-3xl lg:text-4xl font-space-grotesk font-bold text-navy mb-8 leading-relaxed relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-gold/20" />
                      "{currentTestimonial.quote}"
                    </motion.blockquote>

                    {/* Author Info */}
                    <motion.div
                      className="mb-10 pb-8 border-b border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h4 className="text-2xl font-bold text-navy mb-2 font-space-grotesk">
                        {currentTestimonial.author}
                      </h4>
                      <p className="text-gray-500 font-semibold uppercase tracking-widest text-xs">
                        {currentTestimonial.title}
                      </p>
                    </motion.div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-4">
                      <motion.button
                        onClick={prev}
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center hover:border-gold hover:bg-gold hover:text-white transition-all shadow-lg group"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                      </motion.button>

                      <motion.button
                        onClick={next}
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-navy to-navy-dark text-white flex items-center justify-center hover:from-gold hover:to-gold-dark hover:text-navy transition-all shadow-xl group"
                      >
                        <ChevronRight className="w-6 h-6 transition-colors" />
                      </motion.button>

                      {/* Progress Indicators */}
                      <div className="flex gap-2 ml-6">
                        {testimonials.map((_, i) => (
                          <motion.button
                            key={i}
                            onClick={() => {
                              setDirection(i > currentIndex ? 1 : -1);
                              setCurrentIndex(i);
                            }}
                            className="relative"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <motion.div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                i === currentIndex
                                  ? 'w-8 bg-gradient-to-r from-gold to-gold-dark'
                                  : 'w-2 bg-gray-300 hover:bg-gray-400'
                              }`}
                              layoutId="activeIndicator"
                            />
                            {i === currentIndex && (
                              <motion.div
                                className="absolute inset-0 rounded-full bg-gold/30 blur-md"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Auto-play Indicator */}
                      <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
                        <motion.div
                          className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-gold' : 'bg-gray-300'}`}
                          animate={isAutoPlaying ? { scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span>{isAutoPlaying ? 'Auto' : 'Paused'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-16 rounded-full"
        />
      </div>
    </section>
  );
}
