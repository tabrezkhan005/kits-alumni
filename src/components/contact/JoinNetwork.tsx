'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Users, ArrowRight } from 'lucide-react';

export default function JoinNetwork() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Alumni Network</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-bold text-navy leading-tight mb-4">
                Join the <span className="text-gold">KITS Family</span>
              </h2>
              <p className="text-gray-600 text-sm">Stay connected with fellow alumni and current students</p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Become part of our vibrant alumni community. Access exclusive resources, network with industry leaders,
              and contribute to the next generation of innovators.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Exclusive workshops & events",
                "Global networking opportunities",
                "Mentorship programs",
                "Career development resources"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-navy font-medium text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-navy text-white font-bold rounded-xl hover:bg-gold hover:text-navy transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                >
                  Join Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/alumni">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-navy font-semibold rounded-xl hover:border-gold hover:text-gold transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 group">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop"
                alt="KITS Alumni Network"
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hidden md:block"
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                    <Users className="text-navy w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-2xl font-space-grotesk font-bold text-navy">1200+</p>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Active Alumni</p>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
