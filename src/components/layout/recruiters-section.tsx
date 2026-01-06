"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InfiniteLogoTicker } from './infinite-logo-ticker';

const recruiters = [
  { name: "Flipkart", logo: "/logos/flipkart.webp" },
  { name: "IDFC First Bank", logo: "/logos/idfc.webp" },
  { name: "IBM", logo: "/logos/ibm.webp" },
  { name: "Infosys", logo: "/logos/infos.webp" },
  { name: "TCS", logo: "/logos/tcs.webp" },
  { name: "Miracle Software", logo: "/logos/miracle.webp" },
  { name: "MOV", logo: "/logos/mov.webp" },
  { name: "DX", logo: "/logos/dx.webp" },
  { name: "HCL", logo: "/logos/hcl.png" },
];

export function RecruitersSection() {
  return (
    <section className="py-12 bg-[#0A0118] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
          >
             <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Placement Partners</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight leading-tight mb-6"
          >
            Where Our <span className="text-gold">Alumni</span> Shine
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto font-medium"
          >
            Our graduates are consistently recruited by the world's most innovative companies.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0A0118] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0A0118] to-transparent z-10"></div>

          <InfiniteLogoTicker
            direction="right"
            speed="slow"
            pauseOnHover={true}
          >
            {recruiters.map((recruiter, i) => (
              <div
                key={`${recruiter.name}-${i}`}
                className="flex items-center justify-center h-32 w-64 mx-6 bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-500 group"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={recruiter.logo}
                    alt={recruiter.name}
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      // Hide the img element if it fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </InfiniteLogoTicker>
        </div>
      </div>
    </section>
  );
}
