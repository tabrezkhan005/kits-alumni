"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap } from 'lucide-react';

/**
 * Final CTA Section
 * Large visually distinct banner at the bottom
 */
export function FinalCTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-[#2A2E5C] via-[#3F426B] to-[#2A2E5C] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A72E]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A72E]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Animated particles */}
      {typeof window !== 'undefined' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#D4A72E]/30 rounded-full"
              initial={{
                x: Math.random() * 1920,
                y: Math.random() * 1080,
                opacity: 0,
              }}
              animate={{
                y: [null, -100, 1180],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-[#D4A72E]" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-space-grotesk-bold leading-tight">
                Ready to be a part of the{" "}
                <span className="text-[#D4A72E]">AI Revolution?</span>
              </h2>
              <Sparkles className="w-8 h-8 text-[#D4A72E]" />
            </div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-poppins-regular mt-6">
              Join the next generation of innovators shaping the future of technology
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          >
            {/* Apply Now Button */}
            <Link
              href="/register"
              className="group relative px-10 py-5 bg-[#D4A72E] text-[#2A2E5C] font-bold text-lg rounded-xl overflow-hidden shadow-2xl hover:shadow-[#D4A72E]/50 transition-all duration-300 hover:scale-105 font-poppins-bold"
            >
              <span className="relative z-10 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Apply Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C4972A] to-[#D4A72E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Alumni Reconnect Button */}
            <Link
              href="/login"
              className="group relative px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl overflow-hidden hover:bg-white hover:text-[#2A2E5C] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl font-poppins-bold"
            >
              <span className="relative z-10 flex items-center gap-2">
                Alumni: Reconnect
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-gray-300 font-poppins-medium"
          >
            <p>Start your journey today • Connect with our community • Shape tomorrow</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
