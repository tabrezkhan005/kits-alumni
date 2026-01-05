"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

/**
 * HOD Welcome Section
 * Split section with photo on left, greeting on right
 */
export function HodWelcomeSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3F426B]/3 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* Left: HOD Photo - Circular */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-[#3F426B]/20">
              <Image
                src="/img/hodsir.jpg"
                alt="Head of Department"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4A72E]/15 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#3F426B]/8 rounded-full blur-xl pointer-events-none"></div>
          </motion.div>

          {/* Right: Welcome Message */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3F426B]/10 border border-[#3F426B]/20 rounded-full text-[#3F426B] text-sm font-semibold font-poppins-semibold">
              <Quote className="w-4 h-4" />
              HOD's Welcome
            </div>

            {/* Greeting */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3F426B] font-space-grotesk-bold leading-tight">
              Welcome to{" "}
              <span className="text-[#D4A72E]">KITS CSM</span>
            </h2>

            {/* Warm Message */}
            <p className="text-lg md:text-xl text-gray-700 font-poppins-regular leading-relaxed">
              As the Head of the Computer Science & Machine Learning Department,
              I am thrilled to welcome you to a community of innovation, excellence,
              and boundless opportunities. Our department stands at the forefront of
              technological advancement, where cutting-edge research meets practical application.
            </p>

            {/* Quote */}
            <div className="relative bg-white rounded-xl p-6 border-l-4 border-[#D4A72E] shadow-lg">
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#D4A72E]/20" />
              <p className="text-xl md:text-2xl font-semibold text-[#3F426B] italic font-space-grotesk-semibold relative z-10">
                "We don't just teach technology; we shape the innovators who will
                transform tomorrow's digital landscape."
              </p>
            </div>

            {/* HOD Info */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#3F426B] font-space-grotesk-bold">
                Head of Department
              </h3>
              <p className="text-lg text-gray-600 font-poppins-medium">
                Computer Science & Machine Learning
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4A72E] text-[#2A2E5C] font-semibold rounded-xl hover:bg-[#C4972A] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl font-poppins-semibold mt-6"
            >
              Know more
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
