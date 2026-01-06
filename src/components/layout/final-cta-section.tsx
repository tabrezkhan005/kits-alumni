"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Sparkles, Users } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-navy/5" />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#3F426B_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-gold/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 bg-navy/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Elegant Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 backdrop-blur-sm border border-navy/10 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-navy font-medium text-sm tracking-wide font-space-grotesk">Join Our Community</span>
          </motion.div>

          {/* Innovative Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight"
          >
            Shape Your{" "}
            <span className="relative text-gold">
              Future
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gold/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>{" "}
            Today
          </motion.h2>

          {/* Enhanced Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-600 mb-12 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Become part of KITS CSM's legacy of excellence. Join thousands of alumni who are leading innovation across industries worldwide.
          </motion.p>

          {/* Statistics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto"
          >
            {[
              { value: "500+", label: "Alumni", icon: Users },
              { value: "98%", label: "Success Rate", icon: Sparkles },
              { value: "50+", label: "Faculty", icon: GraduationCap },
              { value: "120+", label: "Projects", icon: ArrowRight }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                className="bg-white/60 backdrop-blur-sm border border-navy/10 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy mb-1 font-space-grotesk">{stat.value}</div>
                <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Link href="/register">
                <button className="relative overflow-hidden px-10 py-5 bg-gradient-to-r from-navy to-navy/90 text-white font-space-grotesk font-bold rounded-2xl shadow-2xl shadow-navy/30 hover:shadow-navy/50 transition-all duration-500 flex items-center gap-3 text-lg group-hover:scale-[1.02]">
                  <span className="relative z-10">Begin Your Journey</span>
                  <ArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2" />

                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                </button>
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact">
                <button className="px-10 py-5 bg-white border-2 border-navy/20 text-navy font-space-grotesk font-bold rounded-2xl hover:bg-navy/5 hover:border-navy/40 transition-all duration-500 flex items-center gap-3 text-lg shadow-lg hover:shadow-xl">
                  <span>Learn More</span>
                  <GraduationCap className="w-6 h-6" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
