"use client";

import React from 'react';
import { BackgroundBeams } from '@/components/aceternity/background-beams';
import { HeroParallax } from '@/components/aceternity/hero-parallax';
import { AnimatedCounter } from '@/components/magicui/animated-counter';
import { Button } from '@/components/ui/button';
import { ChevronDown, GraduationCap, Users, TrendingUp, Award } from 'lucide-react';
import Image from 'next/image';

// Department images for the hero parallax - Engineering focused
const departmentImages = [
  {
    title: "AI & Machine Learning",
    link: "/programs/ai-ml",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center",
    description: "Advanced neural networks and deep learning algorithms"
  },
  {
    title: "Data Science Engineering",
    link: "/programs/data-science",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center",
    description: "Big data processing and predictive analytics"
  },
  {
    title: "Software Engineering",
    link: "/programs/software-engineering",
    thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop&crop=center",
    description: "Full-stack development and system architecture"
  },
  {
    title: "Cybersecurity Engineering",
    link: "/programs/cybersecurity",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop&crop=center",
    description: "Network security and ethical hacking"
  }
];

export function CSMHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background with neural network pattern */}
      <BackgroundBeams className="absolute inset-0 z-0" />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-navy-dark via-navy-dark/90 to-navy-dark/70" />

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          {/* Left side - Main content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-primary/10 border border-gold-primary/20 rounded-full text-gold-primary text-sm font-medium">
                <Award className="w-4 h-4" />
                Leading CS & ML Education Since 2018
              </div>

              {/* Main heading */}
              <h1 className="text-5xl lg:text-7xl font-bold text-white font-space-grotesk leading-tight drop-shadow-lg">
                Engineering Tomorrow's{" "}
                <span className="gradient-text bg-gradient-to-r from-gold-primary to-gold-light bg-clip-text text-transparent drop-shadow-lg">
                  Tech Leaders
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md font-medium">
                Advanced Computer Science & Machine Learning Engineering Programs.
                <span className="text-gold-primary font-semibold"> Hands-on learning</span> with cutting-edge technology,
                <span className="text-gold-primary font-semibold"> industry projects</span>, and
                <span className="text-gold-primary font-semibold"> real-world applications</span>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="group relative px-8 py-4 bg-gold-primary text-navy-dark font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover-glow shadow-lg shadow-gold-primary/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Explore Engineering Programs
                  </span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl transition-all duration-300 hover:bg-white hover:text-navy-dark hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Join CSM Community
                  </span>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gold-primary/30">
                <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gold-primary/20">
                  <div className="text-3xl lg:text-4xl font-bold text-gold-primary mb-2 drop-shadow-lg">
                    <AnimatedCounter value={500} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-200 flex items-center justify-center gap-1 font-medium">
                    <Users className="w-4 h-4 text-gold-primary" />
                    Engineering Students
                  </div>
                </div>
                <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gold-primary/20">
                  <div className="text-3xl lg:text-4xl font-bold text-gold-primary mb-2 drop-shadow-lg">
                    <AnimatedCounter value={98} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-200 flex items-center justify-center gap-1 font-medium">
                    <TrendingUp className="w-4 h-4 text-gold-primary" />
                    Placement Rate
                  </div>
                </div>
                <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gold-primary/20">
                  <div className="text-3xl lg:text-4xl font-bold text-gold-primary mb-2 drop-shadow-lg">
                    <AnimatedCounter value={50} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-200 flex items-center justify-center gap-1 font-medium">
                    <Award className="w-4 h-4 text-gold-primary" />
                    Research Papers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Floating cards */}
          <div className="flex-1 relative max-w-lg mx-auto lg:mx-0">
            <div className="grid grid-cols-2 gap-4">
              {departmentImages.map((dept, index) => (
                <div
                  key={dept.title}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer card-hover ${
                    index === 0 ? "col-span-2 h-32" :
                    index === 1 ? "row-span-2 h-full" :
                    "h-32"
                  }`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-light/30 to-gold-primary/30" />
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={dept.thumbnail}
                    alt={dept.title}
                    className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {dept.title}
                    </h3>
                    <p className="text-gray-300 text-xs">
                      {dept.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gold-primary/20 rounded-full blur-xl animate-float" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-navy-light/20 rounded-full blur-xl animate-float-reverse" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gold-primary" />
        </div>
      </div>
    </section>
  );
}
