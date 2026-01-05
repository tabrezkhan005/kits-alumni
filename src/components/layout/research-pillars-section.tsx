"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Bot, Database, Sparkles, Cpu, Network } from 'lucide-react';

const researchAreas = [
  {
    title: "Natural Language Processing",
    description: "Advancing human-computer communication through advanced language models and linguistic analysis.",
    icon: <Brain className="w-6 h-6" />,
    color: "from-blue-500/20 to-navy/20",
  },
  {
    title: "Computer Vision",
    description: "Teaching machines to see and understand the visual world for medical and industrial applications.",
    icon: <Eye className="w-6 h-6" />,
    color: "from-gold/20 to-navy/20",
  },
  {
    title: "Robotics & Automation",
    description: "Building intelligent systems that transform industries through precise mechanical coordination.",
    icon: <Bot className="w-6 h-6" />,
    color: "from-navy-light/20 to-navy/20",
  },
  {
    title: "Data Science",
    description: "Unlocking hidden insights from complex datasets to drive informed decision making.",
    icon: <Database className="w-6 h-6" />,
    color: "from-gold/20 to-navy/20",
  },
  {
    title: "Neural Networks",
    description: "Developing complex architecture for deep learning and cognitive computing.",
    icon: <Network className="w-6 h-6" />,
    color: "from-blue-500/20 to-navy/20",
  },
  {
    title: "Edge AI",
    description: "Deploying intelligent models on resource-constrained hardware for real-time processing.",
    icon: <Cpu className="w-6 h-6" />,
    color: "from-navy-light/20 to-navy/20",
  },
];

export default function ResearchPillarsSection() {
  return (
    <section className="py-32 bg-[#0A0118] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
          >
             <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Research Pillars</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-space-grotesk tracking-tight leading-tight mb-6"
          >
            Advancing the Frontiers of <span className="text-gold">Intelligence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto font-medium"
          >
            Our department is dedicated to groundbreaking research across the core domains of Artificial Intelligence and Machine Learning.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className={`h-full p-10 rounded-[2.5rem] bg-gradient-to-br ${area.color} border border-white/5 backdrop-blur-xl hover:border-gold/30 transition-all duration-500`}>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-xl">
                  {area.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 font-space-grotesk group-hover:text-gold transition-colors">
                  {area.title}
                </h3>
                
                <p className="text-white/50 font-medium leading-relaxed">
                  {area.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                   Explore Projects
                   <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
