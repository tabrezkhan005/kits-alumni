"use client"

import React, { useState, useEffect, useRef } from 'react';

/**
 * Statistics data configuration
 * Can be easily updated for admin panel integration
 */
const statisticsData = [
  {
    id: 1,
    number: 500,
    suffix: '+',
    label: 'Alumni',
    duration: 2500, // Animation duration in ms
  },
  {
    id: 2,
    number: 50,
    suffix: '+',
    label: 'Faculty',
    duration: 2000,
  },
  {
    id: 3,
    number: 100,
    suffix: '+',
    label: 'Projects',
    duration: 2500,
  },
  {
    id: 4,
    number: 95,
    suffix: '%',
    label: 'Placements',
    duration: 2000,
  },
];

/**
 * Individual Stat Card Component
 * Displays a single statistic with count-up animation
 */
function StatCard({
  stat,
  isInView
}: {
  stat: typeof statisticsData[0];
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only animate once when section comes into view
    if (isInView && !hasAnimatedRef.current && stat.number > 0) {
      hasAnimatedRef.current = true;

      const startTime = performance.now();
      const targetNumber = stat.number;
      let startCount = 0;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / stat.duration, 1);

        // Easing function for smooth animation (ease-out cubic)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easedProgress * targetNumber);

        if (currentCount < targetNumber) {
          setCount(currentCount);
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure final value is exact
          setCount(targetNumber);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        }
      };

      // Start animation immediately
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInView, stat.number, stat.duration]);

  return (
    <div className="group relative bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#3F426B]/30 h-full flex flex-col">
      {/* Background decorative element - subtle */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#3F426B]/5 rounded-bl-full opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col flex-grow">
        {/* Large animated number */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3F426B] font-space-grotesk-bold tabular-nums">
            {count}
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F426B] font-space-grotesk-bold">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <div className="text-base md:text-lg text-gray-700 font-poppins-semibold mb-4">
          {stat.label}
        </div>

        {/* Decorative line */}
        <div className="mt-auto w-12 h-1 bg-[#3F426B] rounded-full group-hover:w-20 transition-all duration-300"></div>
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 rounded-xl bg-[#3F426B]/0 group-hover:bg-[#3F426B]/3 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}

/**
 * Animated Statistics Section Component
 * Main component that displays all statistics with scroll-triggered animations
 */
export function AnimatedStatistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Check if section is already visible on mount
    const checkInitialView = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          setIsInView(true);
        }
      }
    };

    // Check immediately
    checkInitialView();

    // Also use Intersection Observer for scroll detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: '50px 0px -50px 0px', // Start animation earlier
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Also check on window resize
    window.addEventListener('resize', checkInitialView);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      window.removeEventListener('resize', checkInitialView);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-50 py-16 md:py-24 overflow-hidden"
    >
      {/* Background decorative elements - subtle */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3F426B]/2 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3F426B]/2 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F426B] mb-4 font-space-grotesk-bold">
            Department at a Glance
          </h2>
          <div className="w-24 h-1 bg-[#3F426B] mx-auto rounded-full mb-6"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-poppins-regular leading-relaxed">
            Excellence in numbers: Our commitment to innovation, research, and student success
          </p>
        </div>

        {/* Statistics Grid - Equal height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statisticsData.map((stat) => (
            <StatCard
              key={stat.id}
              stat={stat}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
