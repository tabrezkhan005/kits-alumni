"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const newsAndEvents = [
  {
    id: 1,
    title: "AI Research Symposium 2024",
    date: "December 15, 2024",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=800&auto=format&fit=crop",
    category: "Event",
    summary: "Join leading researchers and industry experts for cutting-edge AI discussions.",
  },
  {
    id: 2,
    title: "New Research Partnership with Tech Giants",
    date: "December 10, 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    category: "News",
    summary: "KITS CSM announces groundbreaking collaboration with major technology companies.",
  },
  {
    id: 3,
    title: "Student Innovation Day Celebration",
    date: "December 5, 2024",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    category: "Event",
    summary: "Showcasing exceptional student projects and technological innovations.",
  },
];

export function NewsEventsSection() {
  return (
    <section className="py-32 bg-gray-50/50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-navy/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

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
               <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Stay Updated</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy font-space-grotesk tracking-tight leading-tight"
            >
              What's Happening at <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-navy-light">KITS CSM</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/events">
              <button className="group relative overflow-hidden flex items-center gap-3 px-10 py-5 bg-navy border border-navy/20 text-white font-bold rounded-full hover:bg-navy-dark hover:text-white transition-all duration-500 shadow-2xl shadow-navy/20 hover:shadow-[0_0_40px_rgba(44,62,124,0.4)] hover:scale-[1.05] active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-3">
                  VIEW ALL EVENTS
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/30 transition-all duration-500" />
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsAndEvents.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-navy/5 hover:shadow-2xl hover:shadow-navy/15 hover:border-gold/30 transition-all duration-500"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-6 right-6">
                   <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-bold text-navy shadow-lg border border-white/20 uppercase tracking-widest">
                     {item.category}
                   </span>
                </div>
              </div>

              <div className="p-10">
                <div className="flex items-center gap-3 text-gold mb-6">
                   <Calendar className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-widest">{item.date}</span>
                </div>

                <h3 className="text-2xl font-space-grotesk font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>

                <p className="text-gray-500 font-medium mb-8 line-clamp-2">
                  {item.summary}
                </p>

                <Link href={`/${item.category.toLowerCase()}/${item.id}`} className="inline-flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-widest group/link">
                  Learn More
                  <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center group-hover/link:bg-gold transition-all duration-300">
                     <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
