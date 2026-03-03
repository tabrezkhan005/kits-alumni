"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function LaunchPage() {
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunched(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Theater Stage Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>

      {/* Curtain Rod */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-gray-700 to-gray-800 z-30 flex items-center justify-center shadow-lg">
        <div className="w-full h-1 bg-gold rounded-full shadow-sm"></div>
      </div>

      {/* Left Curtain */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-20"
        initial={{ x: 0 }}
        animate={isLaunched ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-700 to-red-600 shadow-2xl">
          {/* Subtle Pleats */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-1 bg-black/40"
                style={{ left: `${6 + i * 8}%` }}
              />
            ))}
          </div>

          {/* Gentle Folds */}
          <div className="absolute inset-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 w-12 h-24 bg-red-900/30 rounded-t-full"
                style={{
                  left: `${10 + i * 20}%`,
                }}
                animate={{
                  scaleY: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Elegant Fringe */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-gold/60 to-transparent"></div>
        </div>
      </motion.div>

      {/* Right Curtain */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden z-20"
        initial={{ x: 0 }}
        animate={isLaunched ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-red-800 via-red-700 to-red-600 shadow-2xl">
          {/* Subtle Pleats */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-1 bg-black/40"
                style={{ right: `${6 + i * 8}%` }}
              />
            ))}
          </div>

          {/* Gentle Folds */}
          <div className="absolute inset-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 w-12 h-24 bg-red-900/30 rounded-t-full"
                style={{
                  right: `${10 + i * 20}%`,
                }}
                animate={{
                  scaleY: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Elegant Fringe */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-gold/60 to-transparent"></div>
        </div>
      </motion.div>

      {/* Center Stage Area */}
      <div className="absolute inset-0 flex items-center justify-center z-40 px-6">
        {/* Subtle background for center content */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl relative z-10"
        >
          {/* Logo and Brand Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-12"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mb-8"
            >
              <Image
                src="/logo1.png"
                alt="KITS CSM Logo"
                width={120}
                height={120}
                className="mx-auto drop-shadow-2xl"
                priority
              />
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
              KITS<span className="text-gold drop-shadow-2xl"> CSM</span>
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-6 drop-shadow-lg"></div>
            <p className="text-base md:text-lg text-white font-light tracking-wide drop-shadow-lg">
              Department of CSM
            </p>
          </motion.div>

          {/* Professional Launch Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative mb-8 flex justify-center"
          >
            <Link href="/" onClick={handleLaunch} className="flex justify-center">
              <button className="group relative px-12 py-6 bg-gold hover:bg-gold-dark text-navy font-space-grotesk font-bold text-xl md:text-2xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-4 border-2 border-gold/30 hover:border-gold/50">
                <span className="flex items-center gap-4">
                  <Rocket className="w-8 h-8 transition-transform group-hover:translate-x-1" />
                  LAUNCH WEBSITE
                </span>

                {/* Subtle Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>
            </Link>
          </motion.div>

          {/* Professional Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-white/80 text-base md:text-lg font-light drop-shadow-md"
          >
            Excellence in Artificial Intelligence and Machine Learning
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-white/70 text-sm drop-shadow-sm">
          © 2026 KITS CSM Department. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
