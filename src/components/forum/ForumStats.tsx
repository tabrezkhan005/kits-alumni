"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, Clock, Award, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: "524",
    label: "Active Members",
    description: "Engaged community participants",
    color: "text-navy"
  },
  {
    icon: MessageSquare,
    value: "1,280",
    label: "Total Threads",
    description: "Active discussions",
    color: "text-gold"
  },
  {
    icon: TrendingUp,
    value: "48",
    label: "Replies Today",
    description: "Recent activity",
    color: "text-navy"
  },
  {
    icon: Award,
    value: "95%",
    label: "Solved Issues",
    description: "Community support rate",
    color: "text-gold"
  }
];

export function ForumStats() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-navy font-medium text-sm">Community Impact</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-bold text-navy mb-4 leading-tight">
            Forum by the{" "}
            <span className="text-gold">Numbers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 text-center hover:border-gold/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-2xl sm:text-3xl font-bold mb-1 font-space-grotesk ${stat.color}`}>
                  {stat.value}
                </div>
                <h3 className="text-sm font-bold text-navy mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-gray-600">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

