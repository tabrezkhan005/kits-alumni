"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    type: "Student",
    quote: "The CSM department at KITS has been a transformative experience. The cutting-edge curriculum and hands-on projects have prepared me for real-world challenges in AI and Machine Learning.",
    author: "Priya Sharma",
    title: "Final Year Student, B.Tech CSM",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    type: "Alumnus",
    quote: "My time at KITS CSM laid the foundation for my career at Google. The faculty's mentorship and state-of-the-art labs equipped me with skills that directly translate to industry success.",
    author: "Rajesh Kumar",
    title: "Software Engineer @ Google, Class of '22",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    type: "Recruiter",
    quote: "KITS CSM graduates consistently demonstrate exceptional problem-solving skills and technical expertise. They're always our top choice for AI/ML roles.",
    author: "Sarah Johnson",
    title: "Senior Recruiter, Microsoft India",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
];

export function TestimonialsCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
             <div className="w-10 h-1 bg-gold rounded-full" />
             <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Voices of Success</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy font-space-grotesk tracking-tight">Community <span className="text-gold">Perspectives</span></h2>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Image Side */}
              <div className="lg:col-span-5 relative">
                 <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl shadow-navy/20">
                    <Image 
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>
                 </div>
                 <div className="absolute -bottom-6 -right-6 bg-gold p-8 rounded-[2rem] shadow-xl">
                    <Quote className="w-8 h-8 text-navy" />
                 </div>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-7 lg:pl-12">
                 <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                 </div>
                 
                 <blockquote className="text-2xl md:text-3xl font-space-grotesk font-bold text-navy mb-8 leading-relaxed">
                   "{testimonials[currentIndex].quote}"
                 </blockquote>

                 <div className="mb-10">
                    <h4 className="text-2xl font-bold text-navy mb-1">{testimonials[currentIndex].author}</h4>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{testimonials[currentIndex].title}</p>
                 </div>

                 <div className="flex items-center gap-4">
                    <button 
                      onClick={prev}
                      className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-navy hover:text-white transition-all shadow-xl shadow-navy/5"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={next}
                      className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center hover:bg-gold hover:text-navy transition-all shadow-xl shadow-navy/10"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    <div className="flex gap-2 ml-4">
                       {testimonials.map((_, i) => (
                         <div 
                           key={i} 
                           className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-gray-200'}`}
                         />
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
