"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Quote, ArrowRight, Award, BookOpen, Star } from 'lucide-react';

export function HodWelcomeSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#301936 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 max-w-7xl mx-auto">
          
          {/* Left: Professional Portrait with decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-navy/20 aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                alt="Head of Department"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20">
                 <h4 className="text-white font-space-grotesk font-bold text-xl mb-1">Dr. S. K. Sharma</h4>
                 <p className="text-white/70 text-sm font-medium">Head of CSM Department</p>
              </div>
            </div>

            {/* Floating Stats/Accolades */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -right-10 top-20 z-20 bg-gold p-6 rounded-3xl shadow-xl hidden xl:block"
            >
               <Award className="w-8 h-8 text-navy mb-2" />
               <div className="text-navy font-bold text-lg leading-tight">15+ Years<br/><span className="text-navy/60 text-xs font-bold uppercase tracking-widest">Experience</span></div>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-10 bottom-40 z-20 bg-navy p-6 rounded-3xl shadow-xl hidden xl:block"
            >
               <Star className="w-8 h-8 text-gold mb-2" />
               <div className="text-white font-bold text-lg leading-tight">Ph.D.<br/><span className="text-white/60 text-xs font-bold uppercase tracking-widest">IIT Kharagpur</span></div>
            </motion.div>
          </motion.div>

          {/* Right: Message Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-1 bg-gold rounded-full" />
                 <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Leader's Perspective</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-navy font-space-grotesk tracking-tight leading-tight mb-10">
                Cultivating Excellence in <span className="text-gold">Next-Gen</span> Technology
              </h2>

              <div className="relative mb-12">
                 <Quote className="absolute -top-10 -left-6 w-20 h-20 text-gray-100 -z-10" />
                 <p className="text-xl text-gray-600 font-medium leading-relaxed italic">
                   "Our mission transcends traditional education. We are building a vibrant ecosystem where theoretical machine learning meets real-world industry impact, fostering innovators who will lead the AI revolution."
                 </p>
              </div>

              <p className="text-gray-500 mb-12 leading-relaxed">
                As the Department of Computer Science & Machine Learning, we pride ourselves on a curriculum that evolves with the industry. Our students don't just learn algorithms; they build solutions for humanity. Whether it's through our dedicated AI research labs or our strong alumni network, every student at KITS is given the tools to excel.
              </p>

              <div className="flex flex-wrap gap-8 items-center">
                <Link href="/about">
                  <button className="px-10 py-5 bg-navy text-white font-bold rounded-full hover:bg-gold hover:text-navy transition-all shadow-2xl shadow-navy/20 flex items-center gap-3">
                    READ FULL MISSION
                    <BookOpen className="w-4 h-4" />
                  </button>
                </Link>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center">
                     <ArrowRight className="w-5 h-5 text-navy" />
                  </div>
                  <span className="text-navy font-bold text-sm tracking-widest uppercase">Department Brochure</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
