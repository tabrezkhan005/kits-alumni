"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

/**
 * Program data
 * Each program has title, description, and specializations
 */
const programs = [
  {
    id: 'btech',
    title: 'B.Tech (CSM)',
    icon: <GraduationCap className="w-6 h-6" />,
    description: 'Our undergraduate program in Computer Science & Machine Learning provides a solid foundation in core CS principles combined with cutting-edge AI and ML technologies.',
    specializations: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Software Engineering',
      'Cloud Computing',
      'Cybersecurity'
    ],
  },
  {
    id: 'mtech',
    title: 'M.Tech (AI/ML)',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Advanced graduate program specializing in Artificial Intelligence and Machine Learning, designed for research-oriented students and industry professionals.',
    specializations: [
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Reinforcement Learning',
      'Neural Networks',
      'AI System Design'
    ],
  },
  {
    id: 'phd',
    title: 'Ph.D.',
    icon: <Award className="w-6 h-6" />,
    description: 'Doctoral program offering advanced research opportunities in AI, ML, and related fields under the guidance of distinguished faculty members.',
    specializations: [
      'Research Methodologies',
      'Advanced ML Algorithms',
      'Theoretical CS',
      'Publication & Innovation',
      'Industry Collaboration',
      'Academic Leadership'
    ],
  },
];

/**
 * Interactive Program Showcase Section
 * Tabbed interface showing different programs
 */
export function ProgramShowcaseSection() {
  const [activeTab, setActiveTab] = useState('btech');

  const activeProgram = programs.find(p => p.id === activeTab) || programs[0];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A72E]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A2E5C] mb-6 font-space-grotesk-bold">
            Our <span className="text-[#D4A72E]">Programs</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2A2E5C] to-[#D4A72E] mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-poppins-regular">
            Choose from our comprehensive range of programs designed to shape tomorrow's tech leaders
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-gray-200">
            {programs.map((program) => (
              <button
                key={program.id}
                onClick={() => setActiveTab(program.id)}
                className={`relative px-6 py-3 font-semibold transition-all duration-300 font-poppins-semibold ${
                  activeTab === program.id
                    ? 'text-[#2A2E5C]'
                    : 'text-gray-500 hover:text-[#2A2E5C]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {program.icon}
                  <span>{program.title}</span>
                </div>

                {/* Active indicator */}
                {activeTab === program.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4A72E] rounded-t-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100"
            >
              {/* Description */}
              <p className="text-lg md:text-xl text-gray-700 mb-8 font-poppins-regular leading-relaxed">
                {activeProgram.description}
              </p>

              {/* Specializations */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#2A2E5C] mb-4 font-space-grotesk-bold">
                  Key Specializations:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeProgram.specializations.map((spec, index) => (
                    <motion.div
                      key={spec}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-[#D4A72E] rounded-full"></div>
                      <span className="text-gray-700 font-poppins-medium">{spec}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2A2E5C] text-white font-semibold rounded-xl hover:bg-[#3F426B] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl font-poppins-semibold"
              >
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}










