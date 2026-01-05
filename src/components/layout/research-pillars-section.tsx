"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Bot, Database, Sparkles } from 'lucide-react';

/**
 * BentoGrid Component
 */
const BentoGrid = ({ items, className }) => {
  return (
    <div className={`grid ${className}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 ${item.className}`}
        >
          {item.header}
          <div className="group-hover/bento:translate-x-2 transition duration-200">
            {item.icon}
            <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
              {item.title}
            </div>
            <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Research Pillars Data
 */
const researchAreas = [
  {
    title: "Natural Language Processing",
    description: "Advancing human-computer communication through advanced language models",
    icon: <Brain className="w-8 h-8 text-[#D4A72E]" />,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    className: "md:col-span-1",
  },
  {
    title: "Computer Vision",
    description: "Teaching machines to see and understand the visual world",
    icon: <Eye className="w-8 h-8 text-[#D4A72E]" />,
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=600&h=400&fit=crop",
    className: "md:col-span-1",
  },
  {
    title: "Robotics & Automation",
    description: "Intelligent systems that transform industries",
    icon: <Bot className="w-8 h-8 text-[#D4A72E]" />,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    className: "md:col-span-1",
  },
  {
    title: "Data Science",
    description: "Unlocking insights from complex datasets",
    icon: <Database className="w-8 h-8 text-[#D4A72E]" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    className: "md:col-span-1",
  },
  {
    title: "AI Ethics & Governance",
    description: "Responsible AI development for a better future",
    icon: <Sparkles className="w-8 h-8 text-[#D4A72E]" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    className: "md:col-span-2",
  },
];

const featuredProject = {
  title: "Featured Project: AI-Powered Healthcare Diagnostics",
  description: "Revolutionizing medical diagnosis through deep learning and computer vision",
  image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
};

/**
 * Research Pillars Section
 */
export default function ResearchPillarsSection() {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#D4A72E 1px, transparent 1px), linear-gradient(90deg, #D4A72E 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)',
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4A72E] rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, Math.random() * 100 + '%'],
              opacity: [null, 0, Math.random() * 0.5 + 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Glow effect following mouse */}
      <div
        className="absolute w-96 h-96 bg-[#D4A72E]/20 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-[#D4A72E]/10 border border-[#D4A72E]/30 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[#D4A72E] text-sm font-semibold tracking-wider">AIML RESEARCH</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Innovating the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A72E] to-[#FFD700] animate-pulse">
              Intelligence
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 mb-6">
            <motion.div
              className="h-1 w-12 bg-[#D4A72E] rounded-full"
              animate={{ width: ["48px", "96px", "48px"] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <div className="w-2 h-2 bg-[#D4A72E] rounded-full animate-pulse"></div>
            <motion.div
              className="h-1 w-12 bg-[#D4A72E] rounded-full"
              animate={{ width: ["48px", "96px", "48px"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            ></motion.div>
          </div>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore cutting-edge research domains where artificial intelligence meets real-world impact
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="max-w-7xl mx-auto mb-12">
          <BentoGrid
            items={[
              // Featured Project (Large Block)
              {
                title: featuredProject.title,
                description: featuredProject.description,
                header: (
                  <motion.div
                    className="flex flex-1 w-full h-full min-h-[10rem] rounded-2xl relative overflow-hidden group cursor-pointer"
                    onHoverStart={() => setActiveIndex(0)}
                    onHoverEnd={() => setActiveIndex(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#D4A72E] via-[#2A2E5C] to-[#1a1f3a]"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      style={{ backgroundSize: '200% 200%' }}
                    />

                    <img
                      src={featuredProject.image}
                      alt="Featured Project"
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500 mix-blend-overlay"
                    />

                    {/* Neural network effect */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1" fill="#D4A72E"/>
                            <line x1="20" y1="20" x2="40" y2="20" stroke="#D4A72E" strokeWidth="0.5" opacity="0.3"/>
                            <line x1="20" y1="20" x2="20" y2="40" stroke="#D4A72E" strokeWidth="0.5" opacity="0.3"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)"/>
                      </svg>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                    {/* Glowing border effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow: activeIndex === 0 ? '0 0 40px rgba(212, 167, 46, 0.6), inset 0 0 40px rgba(212, 167, 46, 0.1)' : 'none'
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <motion.div
                        className="flex items-center gap-2 mb-3"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-6 h-6 text-[#D4A72E]" />
                        </motion.div>
                        <span className="text-[#D4A72E] text-sm font-semibold tracking-wider">FEATURED PROJECT</span>
                      </motion.div>

                      <motion.h3
                        className="text-white text-2xl font-bold mb-2 drop-shadow-2xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        AI-Powered Healthcare Diagnostics
                      </motion.h3>

                      <motion.p
                        className="text-gray-300 text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Revolutionizing medical diagnosis through deep learning
                      </motion.p>

                      {/* Hover indicator */}
                      <motion.div
                        className="flex items-center gap-2 mt-4 text-[#D4A72E] text-sm font-semibold"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1, x: 10 }}
                      >
                        <span>Explore Project</span>
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </motion.div>
                ),
                className: "md:col-span-2 md:row-span-2",
                icon: <Sparkles className="w-6 h-6 text-[#D4A72E]" />,
              },
              // Research Areas
              ...researchAreas.map((area, idx) => ({
                title: area.title,
                description: area.description,
                header: (
                  <motion.div
                    className="flex flex-1 w-full h-full min-h-[8rem] rounded-2xl relative overflow-hidden group cursor-pointer"
                    onHoverStart={() => setActiveIndex(idx + 1)}
                    onHoverEnd={() => setActiveIndex(null)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background with glassmorphism */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2A2E5C]/80 via-[#1a1f3a]/60 to-[#0a0e27]/80 backdrop-blur-sm"></div>

                    <img
                      src={area.image}
                      alt={area.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                    />

                    {/* Animated border gradient */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: activeIndex === idx + 1
                          ? 'linear-gradient(45deg, #D4A72E, #FFD700, #D4A72E)'
                          : 'transparent',
                        padding: '2px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                      animate={activeIndex === idx + 1 ? {
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Icon with pulsing effect */}
                    <motion.div
                      className="absolute top-4 right-4 z-10"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <motion.div
                        animate={activeIndex === idx + 1 ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {area.icon}
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <motion.h3
                        className="text-white text-lg font-bold mb-2 drop-shadow-lg"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {area.title}
                      </motion.h3>

                      <motion.p
                        className="text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {area.description}
                      </motion.p>

                      {/* Progress bar indicator */}
                      <motion.div
                        className="h-1 bg-[#D4A72E]/30 rounded-full mt-3 overflow-hidden"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.5, duration: 0.8 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#D4A72E] to-[#FFD700]"
                          initial={{ width: '0%' }}
                          animate={activeIndex === idx + 1 ? { width: '100%' } : { width: '60%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                    </div>

                    {/* Particle effect on hover */}
                    {activeIndex === idx + 1 && (
                      <motion.div className="absolute inset-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#D4A72E] rounded-full"
                            initial={{
                              x: '50%',
                              y: '50%',
                              opacity: 1,
                              scale: 0
                            }}
                            animate={{
                              x: `${Math.random() * 100}%`,
                              y: `${Math.random() * 100}%`,
                              opacity: 0,
                              scale: 1
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ),
                className: area.className,
                icon: area.icon,
              })),
            ]}
            className="grid-cols-1 md:grid-cols-3 gap-6"
          />
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4A72E] to-[#FFD700] text-[#0a0e27] font-semibold rounded-xl relative overflow-hidden group cursor-pointer shadow-2xl"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(212, 167, 46, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            <span className="relative z-10">Explore All Research</span>

            <motion.svg
              className="w-5 h-5 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>

          {/* Additional stats */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-12 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            {[
              { label: 'Research Papers', value: '150+' },
              { label: 'Active Projects', value: '30+' },
              { label: 'Collaborations', value: '50+' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-3xl font-bold text-[#D4A72E] mb-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + idx * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
