"use client"

import { Button } from "@/components/ui/button";
import {
  BentoCell,
  BentoGrid,
  ContainerScroll,
  useContainerScroll
} from "@/components/ui/hero-gallery-scroll-animation";
import { motion, AnimatePresence, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

/**
 * Dynamic headlines that rotate every 7 seconds
 */
const DYNAMIC_HEADLINES = [
  {
    title: "Engineering the Future",
    subtitle: "with AI & Machine Learning",
    description: "Join KITS Computer Science & Machine Learning Department. Where innovation meets excellence, and tomorrow's tech leaders are shaped today."
  },
  {
    title: "Shaping Tomorrow's",
    subtitle: "Tech Innovators",
    description: "Empowering students with cutting-edge knowledge in Artificial Intelligence, Machine Learning, and Computer Science."
  },
  {
    title: "Innovation Meets",
    subtitle: "Excellence",
    description: "Experience world-class education with industry partnerships, research opportunities, and hands-on learning at KITS CSM."
  },
  {
    title: "Build Your Future",
    subtitle: "in Technology",
    description: "Join a community of 500+ alumni and industry leaders. 98% placement rate. Your journey to tech excellence starts here."
  },
  {
    title: "Leading in AI &",
    subtitle: "Machine Learning",
    description: "Advanced research, expert faculty, and state-of-the-art labs. KITS CSM is where the future of technology is being created."
  }
];

/**
 * CS/AI/ML themed images
 */
const CSML_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1920&q=80",
    title: "Artificial Intelligence",
    description: "Cutting-edge AI research and neural network innovation"
  },
  {
    url: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=1920&q=80",
    title: "Machine Learning",
    description: "Advanced ML algorithms and data science excellence"
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
    title: "Computer Engineering",
    description: "Hardware innovation meets software excellence"
  },
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    title: "Data Science",
    description: "Transform data into actionable insights"
  },
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80",
    title: "Software Development",
    description: "Building tomorrow's technology solutions today"
  },
];

/**
 * Image Grid Content Component
 * Controls image opacity based on scroll
 */
function ImageGridContent() {
  const { scrollYProgress } = useContainerScroll();
  // Images fade in more gradually and fully visible by 80%
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0, 0.3, 0.7, 1]);

  return (
    <motion.div
      className="sticky left-0 top-32 z-0 h-[calc(100vh-8rem)] w-full p-4"
      style={{ opacity: imageOpacity }}
    >
      <BentoGrid className="h-full w-full max-w-7xl mx-auto">
        {CSML_IMAGES.map((image, index) => (
          <BentoCell
            key={index}
            className="relative overflow-hidden rounded-xl shadow-xl group"
          >
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              src={image.url}
              alt={image.title}
              loading="lazy"
            />

            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
              <ImageOverlay
                title={image.title}
                description={image.description}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </BentoCell>
        ))}
      </BentoGrid>
    </motion.div>
  );
}

/**
 * ImageOverlay Component
 */
const ImageOverlay = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2E5C]/95 via-[#2A2E5C]/70 to-transparent flex flex-col justify-end p-6 md:p-8">
      <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 font-space-grotesk-bold">
        {title}
      </h3>
      <p className="text-white/90 text-sm md:text-base font-poppins-regular">
        {description}
      </p>
    </div>
  );
};

/**
 * KITS Gallery Hero Component
 * - Full-screen white background with centered text initially
 * - Images reveal on scroll
 */
export function KITSGalleryHero() {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % DYNAMIC_HEADLINES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentHeadline = DYNAMIC_HEADLINES[currentHeadlineIndex];

  return (
    <ContainerScroll className="h-[400vh] bg-white relative">
      {/* Images - start hidden, reveal on scroll */}
      <ImageGridContent />

      {/* Full-screen white overlay with centered content */}
      <WhiteOverlayContent
        currentHeadline={currentHeadline}
        headlineIndex={currentHeadlineIndex}
      />
    </ContainerScroll>
  );
}

/**
 * White Overlay Content Component
 * Full-screen white background that fades out to reveal images
 */
function WhiteOverlayContent({
  currentHeadline,
  headlineIndex
}: {
  currentHeadline: typeof DYNAMIC_HEADLINES[0];
  headlineIndex: number;
}) {
  const { scrollYProgress } = useContainerScroll();

  // White background opacity fades from 1 to 0 - completes by 60%
  const whiteOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.5, 0]);
  // Content fades out - completes by 60%
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.3, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.9, 0.8]);

  return (
    <>
      {/* Full-screen white background overlay */}
      <motion.div
        className="fixed inset-0 z-10 bg-white pointer-events-none"
        style={{ opacity: whiteOpacity }}
      />

      {/* Centered content on white background */}
      <motion.div
        className="fixed inset-0 z-20 flex items-center justify-center px-4 pointer-events-none"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        <div className="max-w-6xl mx-auto text-center w-full">
          {/* Dynamic Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={headlineIndex}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#2A2E5C] mb-6 font-space-grotesk-bold leading-tight">
                {currentHeadline.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2A2E5C] via-[#4a4d7a] to-[#2A2E5C] mt-3 font-jetbrains-bold animate-gradient bg-300%">
                  {currentHeadline.subtitle}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-poppins-regular max-w-3xl mx-auto">
                {currentHeadline.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Statistics */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-10 font-jetbrains-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#2A2E5C]">500+</div>
              <div className="text-sm text-gray-600 font-poppins-regular">Alumni Network</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#2A2E5C]">98%</div>
              <div className="text-sm text-gray-600 font-poppins-regular">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#2A2E5C]">50+</div>
              <div className="text-sm text-gray-600 font-poppins-regular">Industry Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#2A2E5C]">15+</div>
              <div className="text-sm text-gray-600 font-poppins-regular">Research Projects</div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[#2A2E5C] hover:bg-[#3a3e6c] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-poppins-semibold"
              >
                Join Alumni Network
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#2A2E5C] text-[#2A2E5C] hover:bg-[#2A2E5C] hover:text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 font-poppins-semibold"
              >
                Explore Programs
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-10 text-[#2A2E5C] text-sm font-medium font-poppins-regular"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span>Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
