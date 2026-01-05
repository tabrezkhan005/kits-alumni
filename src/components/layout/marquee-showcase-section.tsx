"use client"

import React from 'react';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';
import { Sparkles, Brain, Zap, TrendingUp, Code, Database, Rocket } from 'lucide-react';

/**
 * Marquee Showcase Section
 * Beautiful double marquee with AI/ML related keywords
 * Placed after Faculty Spotlight section
 */
export function MarqueeShowcaseSection() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2A2E5C]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A72E]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A2E5C] mb-4 font-space-grotesk-bold">
            Technologies We <span className="text-[#D4A72E]">Master</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-poppins-regular">
            Explore the cutting-edge technologies and frameworks powering our AI & ML programs
          </p>
        </div>

        {/* Double Marquee Effect */}
        <div className="flex flex-col gap-4 mb-12">
          {/* First Marquee - Left Direction */}
          <MarqueeAnimation
            direction="left"
            baseVelocity={-3}
            className="bg-gradient-to-r from-[#2A2E5C] to-[#3F426B] text-white py-4 shadow-lg"
          >
            • Artificial Intelligence • Machine Learning • Deep Learning • Neural Networks • Computer Vision • Natural Language Processing • Data Science •
          </MarqueeAnimation>

          {/* Second Marquee - Right Direction */}
          <MarqueeAnimation
            direction="right"
            baseVelocity={-3}
            className="bg-gradient-to-r from-[#D4A72E] to-[#C4972A] text-[#2A2E5C] py-4 shadow-lg font-space-grotesk-bold"
          >
            • Python • TensorFlow • PyTorch • Scikit-learn • Keras • OpenCV • NLTK • Transformers • Reinforcement Learning • Robotics • Cloud Computing •
          </MarqueeAnimation>
        </div>

        {/* Icon Grid Below Marquee */}
        <div className="grid grid-cols-3 md:grid-cols-7 gap-6 md:gap-8 mt-12">
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#2A2E5C]/10 to-[#2A2E5C]/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2A2E5C]/20 group-hover:to-[#2A2E5C]/10 transition-all duration-300 border border-[#2A2E5C]/10 group-hover:border-[#D4A72E]/30 group-hover:scale-110">
              <Brain className="w-8 h-8 md:w-10 md:h-10 text-[#2A2E5C] group-hover:text-[#D4A72E] transition-colors duration-300" />
            </div>
            <span className="text-xs md:text-sm font-semibold text-[#2A2E5C] font-poppins-semibold text-center">AI</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#2A2E5C]/10 to-[#2A2E5C]/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2A2E5C]/20 group-hover:to-[#2A2E5C]/10 transition-all duration-300 border border-[#2A2E5C]/10 group-hover:border-[#D4A72E]/30 group-hover:scale-110">
              <Zap className="w-8 h-8 md:w-10 md:h-10 text-[#2A2E5C] group-hover:text-[#D4A72E] transition-colors duration-300" />
            </div>
            <span className="text-xs md:text-sm font-semibold text-[#2A2E5C] font-poppins-semibold text-center">ML</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#2A2E5C]/10 to-[#2A2E5C]/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2A2E5C]/20 group-hover:to-[#2A2E5C]/10 transition-all duration-300 border border-[#2A2E5C]/10 group-hover:border-[#D4A72E]/30 group-hover:scale-110">
              <Database className="w-8 h-8 md:w-10 md:h-10 text-[#2A2E5C] group-hover:text-[#D4A72E] transition-colors duration-300" />
            </div>
            <span className="text-xs md:text-sm font-semibold text-[#2A2E5C] font-poppins-semibold text-center">Data</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#2A2E5C]/10 to-[#2A2E5C]/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2A2E5C]/20 group-hover:to-[#2A2E5C]/10 transition-all duration-300 border border-[#2A2E5C]/10 group-hover:border-[#D4A72E]/30 group-hover:scale-110">
              <Code className="w-8 h-8 md:w-10 md:h-10 text-[#2A2E5C] group-hover:text-[#D4A72E] transition-colors duration-300" />
            </div>
            <span className="text-xs md:text-sm font-semibold text-[#2A2E5C] font-poppins-semibold text-center">Coding</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#2A2E5C]/10 to-[#2A2E5C]/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2A2E5C]/20 group-hover:to-[#2A2E5C]/10 transition-all duration-300 border border-[#2A2E5C]/10 group-hover:border-[#D4A72E]/30 group-hover:scale-110">
              <Rocket className="w-8 h-8 md:w-10 md:h-10 text-[#2A2E5C] group-hover:text-[#D4A72E] transition-colors duration-300" />
            </div>
            <span className="text-xs md:text-sm font-semibold text-[#2A2E5C] font-poppins-semibold text-center">Innovation</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#2A2E5C]/10 to-[#2A2E5C]/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2A2E5C]/20 group-hover:to-[#2A2E5C]/10 transition-all duration-300 border border-[#2A2E5C]/10 group-hover:border-[#D4A72E]/30 group-hover:scale-110">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-[#2A2E5C] group-hover:text-[#D4A72E] transition-colors duration-300" />
            </div>
            <span className="text-xs md:text-sm font-semibold text-[#2A2E5C] font-poppins-semibold text-center">Growth</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#2A2E5C]/10 to-[#2A2E5C]/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#2A2E5C]/20 group-hover:to-[#2A2E5C]/10 transition-all duration-300 border border-[#2A2E5C]/10 group-hover:border-[#D4A72E]/30 group-hover:scale-110">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-[#2A2E5C] group-hover:text-[#D4A72E] transition-colors duration-300" />
            </div>
            <span className="text-xs md:text-sm font-semibold text-[#2A2E5C] font-poppins-semibold text-center">Excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}










