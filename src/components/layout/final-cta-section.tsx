"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Users, TrendingUp, BookOpen, Sparkles } from 'lucide-react';

export function FinalCTASection() {
  const [currentStep, setCurrentStep] = useState(0);

  const journeySteps = [
    {
      icon: BookOpen,
      title: "Learn",
      description: "Master cutting-edge AI technologies",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Sparkles,
      title: "Innovate",
      description: "Build solutions that transform industries",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: TrendingUp,
      title: "Excel",
      description: "Launch your career with top-tier placements",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % journeySteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[length:24px_24px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gold/5 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-navy/5 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-navy/5 rounded-full border border-navy/10 mb-8"
            >
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-navy font-semibold text-sm tracking-wide">Your Future Starts Here</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-navy font-space-grotesk tracking-tight leading-tight mb-6"
            >
              Shape Tomorrow's{" "}
              <motion.span
                className="text-gold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Technology
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Join a community of innovators, researchers, and industry leaders shaping the future of artificial intelligence.
              Your journey to excellence begins with a single decision.
            </motion.p>
          </div>

          {/* Journey Steps */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === currentStep;

              return (
                <motion.div
                  key={index}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-500 ${
                    isActive
                      ? 'border-gold bg-gold/5 shadow-lg shadow-gold/10'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
                      isActive ? step.bgColor + ' border border-gold/20' : 'bg-gray-50'
                    }`}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className={`w-7 h-7 ${isActive ? step.color : 'text-gray-600'}`} />
                  </motion.div>

                  <h3 className={`text-xl font-bold mb-3 font-space-grotesk ${
                    isActive ? 'text-navy' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>

                  <p className={`leading-relaxed ${
                    isActive ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}

                  {/* Progress Bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-2xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="h-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Statistics & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { value: "500+", label: "Alumni Network", icon: Users },
                { value: "98%", label: "Placement Rate", icon: TrendingUp },
                { value: "15+", label: "Research Labs", icon: BookOpen }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                  <div className="text-3xl font-bold text-navy mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register">
                  <button className="group px-12 py-5 bg-navy text-white font-bold rounded-xl hover:bg-navy-dark transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 text-lg">
                    <span>Join Our Community</span>
                    <GraduationCap className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <button className="group px-12 py-5 bg-white border-2 border-navy/20 text-navy font-bold rounded-xl hover:bg-navy hover:text-white hover:border-navy transition-all duration-300 flex items-center gap-3 text-lg">
                    <span>Learn More</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Closing Message */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-500 text-lg italic">
                "The future belongs to those who believe in the beauty of their dreams."
              </p>
              <div className="mt-4 text-sm text-gray-400 font-medium">
                — Eleanor Roosevelt
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
