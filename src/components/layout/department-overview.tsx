"use client";

import React from 'react';
import { BentoGrid, BentoGridItem } from '@/components/aceternity/bento-grid';
import { Brain, Database, Shield, Cloud, Code, FlaskConical } from 'lucide-react';

const departments = [
  {
    title: "AI & Machine Learning Engineering",
    description: "Advanced neural networks, deep learning algorithms, and AI system design",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/20 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&crop=center"
          alt="AI & ML"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <Brain className="absolute top-4 right-4 w-8 h-8 text-gold-primary drop-shadow-lg" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">AI & ML Engineering</h3>
          <p className="text-gray-200 text-sm font-medium">Neural networks & deep learning</p>
        </div>
      </div>
    ),
    className: "md:col-span-2",
    icon: <Brain className="w-4 h-4 text-gold-primary" />,
  },
  {
    title: "Data Science Engineering",
    description: "Big data processing, predictive analytics, and machine learning pipelines",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/20 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center"
          alt="Data Science"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <Database className="absolute top-4 right-4 w-8 h-8 text-gold-primary drop-shadow-lg" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">Data Science</h3>
          <p className="text-gray-200 text-sm font-medium">Big data & predictive analytics</p>
        </div>
      </div>
    ),
    icon: <Database className="w-4 h-4 text-gold-primary" />,
  },
  {
    title: "Software Engineering",
    description: "Full-stack development, system architecture, and DevOps practices",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/20 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop&crop=center"
          alt="Software Engineering"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <Code className="absolute top-4 right-4 w-8 h-8 text-gold-primary drop-shadow-lg" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">Software Eng</h3>
          <p className="text-gray-200 text-sm font-medium">Full-stack development</p>
        </div>
      </div>
    ),
    icon: <Code className="w-4 h-4 text-gold-primary" />,
  },
  {
    title: "Cybersecurity Engineering",
    description: "Network security, ethical hacking, and digital forensics",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/20 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop&crop=center"
          alt="Cybersecurity"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <Shield className="absolute top-4 right-4 w-8 h-8 text-gold-primary drop-shadow-lg" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">Cybersecurity</h3>
          <p className="text-gray-200 text-sm font-medium">Network security & ethical hacking</p>
        </div>
      </div>
    ),
    icon: <Shield className="w-4 h-4 text-gold-primary" />,
  },
  {
    title: "Cloud Computing Engineering",
    description: "AWS, Azure, GCP platforms and distributed systems architecture",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/20 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&crop=center"
          alt="Cloud Computing"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <Cloud className="absolute top-4 right-4 w-8 h-8 text-gold-primary drop-shadow-lg" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">Cloud Computing</h3>
          <p className="text-gray-200 text-sm font-medium">AWS, Azure, GCP platforms</p>
        </div>
      </div>
    ),
    icon: <Cloud className="w-4 h-4 text-gold-primary" />,
  },
  {
    title: "Research & Innovation Lab",
    description: "Cutting-edge research in AI, quantum computing, and emerging technologies",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/20 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=200&fit=crop&crop=center"
          alt="Research & Innovation"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <FlaskConical className="absolute top-4 right-4 w-8 h-8 text-gold-primary drop-shadow-lg" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg drop-shadow-lg">Research Lab</h3>
          <p className="text-gray-200 text-sm font-medium">Innovation & breakthrough tech</p>
        </div>
      </div>
    ),
    className: "md:col-span-2",
    icon: <FlaskConical className="w-4 h-4 text-gold-primary" />,
  },
];

export function DepartmentOverview() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-primary/10 border border-gold-primary/20 rounded-full text-gold-primary text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            Our Departments
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-space-grotesk">
            Engineering{" "}
            <span className="gradient-text bg-gradient-to-r from-navy to-navy-light bg-clip-text text-transparent">
              Specializations
            </span>
          </h2>

          <p className="text-xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto font-medium">
            Master cutting-edge engineering disciplines with hands-on projects, industry partnerships, and real-world applications.
            Our programs combine theoretical foundations with practical engineering experience.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid
          items={departments}
          className="max-w-7xl mx-auto"
        />

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-navy text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover-glow">
            <span className="relative z-10">Explore All Programs</span>
            <div className="absolute inset-0 bg-gradient-to-r from-navy to-navy-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
