"use client";

import React from 'react';
import { InfiniteMovingCards } from '@/components/aceternity/infinite-moving-cards';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "KITS CSM's engineering programs gave me the technical depth and practical skills needed to excel at Google. The hands-on AI/ML projects and industry partnerships were game-changers.",
    name: "Priya Sharma",
    title: "Senior Software Engineer at Google",
  },
  {
    quote: "The engineering faculty at KITS CSM are exceptional. Their industry experience and research expertise helped me build a strong foundation in data science engineering.",
    name: "Arjun Patel",
    title: "Principal Data Engineer at Microsoft",
  },
  {
    quote: "KITS CSM's cybersecurity engineering program with cutting-edge labs and real-world simulations prepared me perfectly for my role as a Security Architect at Amazon.",
    name: "Sneha Reddy",
    title: "Security Architect at Amazon Web Services",
  },
  {
    quote: "The innovation culture and engineering mentorship at KITS CSM inspired me to launch my AI startup. The alumni network continues to be invaluable.",
    name: "Rohit Kumar",
    title: "Founder & CTO, AI Solutions Inc.",
  },
  {
    quote: "KITS CSM's engineering curriculum and industry connections helped me secure my dream role at Meta. The practical projects gave me a competitive edge.",
    name: "Ananya Singh",
    title: "Product Engineering Manager at Meta",
  },
  {
    quote: "The advanced machine learning engineering courses and research opportunities at KITS CSM prepared me for cutting-edge AI research at NVIDIA.",
    name: "Vikram Joshi",
    title: "Senior AI Research Scientist at NVIDIA",
  },
  {
    quote: "KITS CSM's state-of-the-art engineering facilities and collaborative environment made my journey from student to cloud architect seamless.",
    name: "Kavya Nair",
    title: "Senior Cloud Solutions Architect at IBM",
  },
  {
    quote: "The engineering focus and practical approach at KITS CSM helped me develop the skills needed for large-scale software development at Netflix.",
    name: "Rajesh Gupta",
    title: "Senior Software Engineer at Netflix",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-navy-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A72E' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-primary/10 border border-gold-primary/20 rounded-full text-gold-primary text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Success Stories
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-space-grotesk">
            Engineering{" "}
            <span className="gradient-text bg-gradient-to-r from-gold-primary to-gold-light bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>

          <p className="text-xl text-gray-200 max-w-4xl mx-auto font-medium">
            Discover how our engineering graduates are leading innovation at top tech companies worldwide.
            From AI research to cloud architecture, our alumni are building the future of technology.
          </p>
        </div>

        {/* Infinite Moving Cards */}
        <div className="relative">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
          />
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gold-primary/20">
            <div className="text-3xl font-bold text-gold-primary mb-2 drop-shadow-lg">98%</div>
            <div className="text-gray-200 text-sm font-medium">Engineering Placement Rate</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gold-primary/20">
            <div className="text-3xl font-bold text-gold-primary mb-2 drop-shadow-lg">₹18L+</div>
            <div className="text-gray-200 text-sm font-medium">Average Engineering Package</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gold-primary/20">
            <div className="text-3xl font-bold text-gold-primary mb-2 drop-shadow-lg">500+</div>
            <div className="text-gray-200 text-sm font-medium">Engineering Alumni</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gold-primary/20">
            <div className="text-3xl font-bold text-gold-primary mb-2 drop-shadow-lg">50+</div>
            <div className="text-gray-200 text-sm font-medium">Tech Companies</div>
          </div>
        </div>
      </div>
    </section>
  );
}
