"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, Award, Briefcase, FlaskConical, Users, ChevronRight } from "lucide-react";

/**
 * AnnouncementBar Component
 *
 * Professional announcement bar with clean design
 * Features:
 * - Automatically rotates through multiple announcements every 5 seconds
 * - Smooth fade-in/fade-out transitions using Framer Motion
 * - Engineering and alumni-focused announcements
 * - Responsive design with mobile-first approach
 * - Uses brand color: #2A2E5C with white text
 * - JetBrains Mono Bold font for professional appearance
 * - Always visible at top, navbar hides behind it when scrolling
 * - Clean visual effects with icons and animations
 * - No emojis - corporate and professional styling
 */

// Define the announcements array with engineering-related content and icons
const announcements = [
  {
    id: 1,
    text: "Technical Workshop on AI & Machine Learning - Registration Now Open",
    link: "/events",
    icon: Sparkles,
    category: "WORKSHOP"
  },
  {
    id: 2,
    text: "Alumni Startup Showcase featuring groundbreaking tech ventures by KITS graduates",
    link: "/achievements",
    icon: TrendingUp,
    category: "INNOVATION"
  },
  {
    id: 3,
    text: "Students secured First Place in National Robotics Championship 2024",
    link: "/achievements",
    icon: Award,
    category: "ACHIEVEMENT"
  },
  {
    id: 4,
    text: "Engineering Career Fair with Top Tech Companies - November 15th",
    link: "/events",
    icon: Briefcase,
    category: "CAREER"
  },
  {
    id: 5,
    text: "Department publishes breakthrough research in IEEE International Conference",
    link: "/about",
    icon: FlaskConical,
    category: "RESEARCH"
  },
  {
    id: 6,
    text: "Alumni working at Google, Microsoft, Amazon and leading tech companies worldwide",
    link: "/faculty",
    icon: Users,
    category: "ALUMNI"
  },
];

export function AnnouncementBar() {
  // State to track the current announcement index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to manage visibility for manual dismissal (optional feature for future)
  const [isVisible, setIsVisible] = useState(true);

  // Effect to rotate announcements every 5 seconds
  useEffect(() => {
    // Set up interval to change announcement
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000); // 5000ms = 5 seconds

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // If the bar is dismissed, don't render anything
  if (!isVisible) return null;

  // Get the current announcement object
  const currentAnnouncement = announcements[currentIndex];
  const IconComponent = currentAnnouncement.icon;

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-[#2A2E5C] text-white overflow-hidden z-50 shadow-lg" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Subtle animated overlay for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Minimal bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20" />

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center gap-2 md:gap-3 py-1.5 min-h-[40px]">
          {/* Animated announcement content */}
          <div className="flex items-center justify-center flex-1 max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncement.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
                }}
                className="flex items-center justify-center w-full"
              >
                <a
                  href={currentAnnouncement.link}
                  className="group flex items-center justify-center gap-2 md:gap-3 text-center px-2 md:px-4 hover:opacity-90 transition-opacity duration-300"
                >
                  {/* Icon with subtle effect */}
                  <div className="hidden sm:flex items-center justify-center w-6 h-6 rounded bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300">
                    <IconComponent className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Category badge */}
                  <span className="hidden lg:inline-flex px-2 py-0.5 text-xs font-bold tracking-wider bg-white/10 text-white border border-white/20 rounded">
                    {currentAnnouncement.category}
                  </span>

                  {/* Announcement text */}
                  <span className="text-xs sm:text-sm font-bold leading-tight text-white">
                    {currentAnnouncement.text}
                  </span>

                  {/* Animated arrow */}
                  <ChevronRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced progress indicators with animations - positioned absolutely */}
          <div className="hidden md:flex items-center gap-1.5 absolute right-4 lg:right-8 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full relative ${
                  index === currentIndex
                    ? "w-6 h-1.5 bg-white shadow-md shadow-white/30"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60 hover:scale-125"
                }`}
                aria-label={`Go to announcement ${index + 1}`}
              >
                {/* Active indicator glow effect */}
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
