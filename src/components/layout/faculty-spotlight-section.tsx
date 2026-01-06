"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, User, Star, ArrowRight } from 'lucide-react';

const featuredFaculty = [
  {
    id: 1,
    name: "Dr. S Nagendram",
    designation: "Associate Professor",
    image: "/img/nagendrammam.jpg",
    profile: "/faculty/nagendram"
  },
  {
    id: 2,
    name: "Dr. S. Radhakrishnan",
    designation: "Professor",
    image: "/img/radhakrshnasir.jpg",
    profile: "/faculty/radhakrishnan"
  },
  {
    id: 3,
    name: "Dr. D Harikrishna",
    designation: "Associate Professor",
    image: "/img/harii.jpg",
    profile: "/faculty/harikrishna"
  }
];

export function FacultySpotlightSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % featuredFaculty.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + featuredFaculty.length) % featuredFaculty.length);

  return (
    <section className="py-12 bg-gray-50/50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
               <div className="w-10 h-1 bg-gold rounded-full" />
               <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Academic Leaders</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy font-space-grotesk tracking-tight leading-tight">
              Faculty <span className="text-gold">Spotlight</span>
            </h2>
          </div>

          <div className="flex gap-4">
             <button onClick={prev} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-navy hover:text-white transition-all">
                <ChevronLeft className="w-6 h-6" />
             </button>
             <button onClick={next} className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                <ChevronRight className="w-6 h-6" />
             </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[4rem] bg-white border border-gray-100 shadow-2xl shadow-navy/5 p-8 md:p-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden">
                 <Image
                   src={featuredFaculty[currentIndex].image}
                   alt={featuredFaculty[currentIndex].name}
                   fill
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                   className="object-cover"
                   loading="lazy"
                 />
              </div>

              <div>
                 <h3 className="text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-bold text-navy mb-4">{featuredFaculty[currentIndex].name}</h3>
                 <p className="text-xl text-gold font-bold mb-10">{featuredFaculty[currentIndex].designation}</p>

                 <p className="text-gray-500 text-lg leading-relaxed mb-12">
                   Leading research and innovation in Computer Science and Machine Learning. Dedicated to mentoring the next generation of technology leaders at KITS.
                 </p>

                 <div className="flex flex-wrap gap-8 items-center">
                    <Link href={featuredFaculty[currentIndex].profile}>
                      <button className="px-10 py-5 bg-navy text-white font-bold rounded-full hover:bg-gold hover:text-navy transition-all shadow-2xl shadow-navy/20 flex items-center gap-3">
                        VIEW FULL PROFILE
                        <User className="w-4 h-4" />
                      </button>
                    </Link>

                    <Link href="/faculty" className="group flex items-center gap-3 text-navy font-bold text-sm tracking-widest uppercase">
                       Meet All Faculty
                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
