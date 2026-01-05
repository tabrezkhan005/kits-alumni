"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, ArrowRight } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-32 bg-navy relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-12 md:p-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-8"
          >
             <div className="w-12 h-1 bg-gold rounded-full" />
             <Sparkles className="w-6 h-6 text-gold" />
             <div className="w-12 h-1 bg-gold rounded-full" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-space-grotesk tracking-tight leading-tight mb-8"
          >
            Ready to shape the <span className="text-gold">Future</span> of AI?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
          >
            Whether you're a prospective student looking for excellence or an alum wanting to give back, our community is waiting for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link href="/register">
              <button className="px-12 py-6 bg-gold text-navy font-bold rounded-full hover:bg-white transition-all shadow-2xl shadow-gold/20 flex items-center gap-3 text-lg">
                JOIN THE COMMUNITY
                <GraduationCap className="w-6 h-6" />
              </button>
            </Link>
            
            <Link href="/contact">
              <button className="px-12 py-6 bg-transparent border-2 border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-navy transition-all flex items-center gap-3 text-lg">
                GET IN TOUCH
                <ArrowRight className="w-6 h-6" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-12"
          >
             <div className="text-center">
                <div className="text-white font-bold text-2xl">500+</div>
                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Alumni Network</div>
             </div>
             <div className="text-center">
                <div className="text-white font-bold text-2xl">98%</div>
                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Placement Rate</div>
             </div>
             <div className="text-center">
                <div className="text-white font-bold text-2xl">15+</div>
                <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Research Labs</div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
