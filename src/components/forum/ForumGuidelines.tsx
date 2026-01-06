"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Heart, Lightbulb } from 'lucide-react';

const guidelines = [
  {
    icon: Heart,
    title: "Be Respectful",
    description: "Treat all members with kindness and respect. Disagreements are fine, but personal attacks are not.",
    color: "text-red-500"
  },
  {
    icon: Lightbulb,
    title: "Share Knowledge",
    description: "Contribute valuable insights and help others learn. Quality over quantity in your posts.",
    color: "text-yellow-500"
  },
  {
    icon: CheckCircle2,
    title: "Stay On Topic",
    description: "Keep discussions relevant to the thread. Use appropriate categories for your posts.",
    color: "text-green-500"
  },
  {
    icon: AlertCircle,
    title: "Follow Rules",
    description: "Adhere to community guidelines. Spam, self-promotion, and inappropriate content will be removed.",
    color: "text-blue-500"
  }
];

export function ForumGuidelines() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
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
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight">
            Community{" "}
            <span className="text-gold">Guidelines</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Help us maintain a positive and productive environment for everyone
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {guidelines.map((guideline, index) => {
            const IconComponent = guideline.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${guideline.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-navy mb-2">
                      {guideline.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {guideline.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



