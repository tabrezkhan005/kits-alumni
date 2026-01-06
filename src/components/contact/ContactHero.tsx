"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ContactHero() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full mb-6"
          >
            <MessageSquare className="w-4 h-4 text-gold" />
            <span className="text-navy font-medium text-sm">Contact Us</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight">
            Let's Start a{" "}
            <span className="text-gold">Conversation</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            Have questions about our programs, need assistance, or want to collaborate?
            We're here to help you connect with the KITS CSM community.
          </p>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-navy mb-2">Call Us</h3>
              <p className="text-sm text-gray-600">+91 98485 08545</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Mon-Fri, 9AM-5PM</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-navy mb-2">Email Us</h3>
              <p className="text-sm text-gray-600 break-all">hod_csm@kits.edu.in</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>24/7 Response</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-navy mb-2">Visit Us</h3>
              <p className="text-sm text-gray-600">Vinjanampadu, Guntur</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>Andhra Pradesh</span>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4">
              <Link href="/schedule">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-navy text-white font-semibold rounded-xl hover:bg-gold hover:text-navy transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Meet
                </motion.div>
              </Link>

              <Link href="/contact#faq-section">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-navy font-semibold rounded-xl hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
                >
                  View FAQ
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

