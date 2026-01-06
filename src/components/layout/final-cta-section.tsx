"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';

export function FinalCTASection() {

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6 font-space-grotesk">
            Ready to Start Your Journey?
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            Join KITS CSM and be part of the next generation of AI innovators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/register">
                <button className="px-8 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-dark transition-colors duration-300 flex items-center gap-2">
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <button className="px-8 py-4 bg-white border-2 border-navy text-navy font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2">
                  <span>Contact Us</span>
                  <GraduationCap className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
