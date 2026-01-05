"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Mock news and events data
 * Will be replaced with dynamic data from admin panel later
 */
const newsAndEvents = [
  {
    id: 1,
    title: "AI Research Symposium 2024",
    date: "December 15, 2024",
    image: "/img/conference.jpg",
    category: "Event",
    summary: "Join leading researchers and industry experts for cutting-edge AI discussions.",
  },
  {
    id: 2,
    title: "New Research Partnership with Tech Giants",
    date: "December 10, 2024",
    image: "/img/aiquest.jpg",
    category: "News",
    summary: "KITS CSM announces groundbreaking collaboration with major technology companies.",
  },
  {
    id: 3,
    title: "Student Innovation Day Celebration",
    date: "December 5, 2024",
    image: "/img/innovationday.jpg",
    category: "Event",
    summary: "Showcasing exceptional student projects and technological innovations.",
  },
];

/**
 * News & Events Section
 * Improved stable 3-column grid with consistent spacing and animations
 */
export function NewsEventsSection() {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements - subtle */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2A2E5C]/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A72E]/3 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A2E5C] mb-4 font-space-grotesk-bold">
            What's Happening at{" "}
            <span className="text-[#D4A72E]">CSM</span>
          </h2>
          <div className="w-24 h-1 bg-[#2A2E5C] mx-auto rounded-full mb-6"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-poppins-regular leading-relaxed">
            Stay updated with the latest news, events, and achievements from our department
          </p>
        </div>

        {/* 3-Column Grid - Stable Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {newsAndEvents.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              className="group relative h-full"
            >
              {/* Card Container - Stable height */}
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#2A2E5C]/30 h-full flex flex-col">
                {/* Hover overlay - solid color */}
                <div className="absolute inset-0 bg-[#2A2E5C]/0 group-hover:bg-[#2A2E5C]/5 rounded-xl transition-all duration-300 pointer-events-none z-0"></div>

                {/* Image Container - Fixed height to prevent layout shift */}
                <div className="relative h-56 md:h-52 overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index === 0}
                  />
                  {/* Solid overlay for text readability */}
                  <div className="absolute inset-0 bg-black/40"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                      item.category === 'News'
                        ? 'bg-[#D4A72E] text-[#2A2E5C]'
                        : 'bg-[#2A2E5C] text-white'
                    } font-poppins-semibold shadow-sm`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content - Flex grow for consistent spacing */}
                <div className="p-5 md:p-6 relative z-10 flex flex-col flex-grow">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-3 font-poppins-medium">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{item.date}</span>
                  </div>

                  {/* Title - Fixed height to prevent layout shift */}
                  <h3 className="text-lg md:text-xl font-bold text-[#2A2E5C] mb-3 font-space-grotesk-bold group-hover:text-[#3F426B] transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                    {item.title}
                  </h3>

                  {/* Summary - Flex grow to push button down */}
                  <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2 font-poppins-regular flex-grow leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/${item.category.toLowerCase()}/${item.id}`}
                    className="inline-flex items-center gap-2 text-[#2A2E5C] font-semibold hover:text-[#3F426B] transition-colors duration-300 group/link font-poppins-semibold text-sm md:text-base mt-auto"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3F426B] text-white font-semibold rounded-xl hover:bg-[#2A2E5C] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg font-poppins-semibold text-base"
          >
            View All News
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
