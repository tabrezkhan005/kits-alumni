"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Users } from 'lucide-react';

export default function ScheduleHero() {
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
            <Calendar className="w-4 h-4 text-gold" />
            <span className="text-navy font-medium text-sm">Schedule Meeting</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight">
            Book a Meeting with{" "}
            <span className="text-gold">Our Faculty</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            Connect directly with the Head of Department or faculty members for academic guidance,
            research collaboration, or career mentorship through our integrated scheduling system.
          </p>

          {/* Quick Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg"
            >
              <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-bold text-navy mb-2">Video Conferencing</h3>
              <p className="text-sm text-gray-600">Seamless Google Meet integration</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-navy mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600">Choose your preferred time slot</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg"
            >
              <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-navy" />
              </div>
              <h3 className="font-bold text-navy mb-2">Expert Guidance</h3>
              <p className="text-sm text-gray-600">Connect with industry experts</p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-navy/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-navy/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

