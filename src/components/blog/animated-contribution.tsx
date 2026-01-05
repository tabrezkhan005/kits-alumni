'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AnimatedContribution() {
  return (
    <section className="bg-navy py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Share Your Experience</span>
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-8">Have a story to tell?</h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-10 font-medium">
            We encourage our alumni to share their professional journey, technical expertise, and life lessons with the student community.
          </p>
          <Link href="/student-dashboard/blogs">
            <button className="px-10 py-4 bg-gold text-navy font-bold rounded-full hover:bg-gold-light transition-all shadow-2xl shadow-gold/20 flex items-center gap-3 mx-auto">
              CONTRIBUTE A STORY
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
    </section>
  );
}
