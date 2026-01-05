"use client"

import React from 'react';
import Image from 'next/image';
import { InfiniteLogoTicker } from './infinite-logo-ticker';

/**
 * Recruiter Companies Data
 * Company logos for the infinite ticker
 */
const recruiters = [
  { name: "Microsoft", logo: "/logo.png" }, // Using placeholder, will be replaced with actual logos
  { name: "Google", logo: "/logo1.png" },
  { name: "Oracle", logo: "/logo.png" },
  { name: "Amazon", logo: "/logo1.png" },
  { name: "IBM", logo: "/logo.png" },
  { name: "Apple", logo: "/logo1.png" },
  { name: "Intel", logo: "/logo.png" },
  { name: "NVIDIA", logo: "/logo1.png" },
  { name: "Meta", logo: "/logo.png" },
  { name: "Cisco", logo: "/logo1.png" },
];

/**
 * Our Recruiters Section
 * Infinite horizontal scrolling ticker of company logos
 */
export function RecruitersSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2A2E5C] to-[#3F426B] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A72E]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A72E]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-space-grotesk-bold">
            Our <span className="text-[#D4A72E]">Recruiters</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4A72E] to-white mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-poppins-regular">
            Proud placement partners partnering with top technology companies worldwide
          </p>
        </div>

        {/* Infinite Logo Ticker */}
        <div className="relative">
          <InfiniteLogoTicker
            direction="right"
            speed="slow"
            pauseOnHover={true}
          >
            {recruiters.map((recruiter) => (
              <div
                key={recruiter.name}
                className="flex items-center justify-center h-24 w-48 mx-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={recruiter.logo}
                    alt={recruiter.name}
                    fill
                    className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </InfiniteLogoTicker>
        </div>

        {/* Subtitle */}
        <p className="text-center text-gray-300 mt-12 font-poppins-medium">
          Our alumni work at leading tech companies across the globe
        </p>
      </div>
    </section>
  );
}
