"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Eye, Bot, Database, Cpu, Network, Sparkles, ArrowRight } from 'lucide-react';

const researchAreas = [
  {
    id: 1,
    title: "Natural Language Processing",
    shortDesc: "Human-AI Communication",
    description: "Advancing human-computer communication through advanced language models and linguistic analysis.",
    icon: Brain,
    x: 25,
    y: 30,
    connections: [2, 4],
    color: "#3B82F6",
  },
  {
    id: 2,
    title: "Computer Vision",
    shortDesc: "Machine Perception",
    description: "Teaching machines to see and understand the visual world for medical and industrial applications.",
    icon: Eye,
    x: 75,
    y: 25,
    connections: [1, 3, 5],
    color: "#D4A72E",
  },
  {
    id: 3,
    title: "Robotics & Automation",
    shortDesc: "Intelligent Systems",
    description: "Building intelligent systems that transform industries through precise mechanical coordination.",
    icon: Bot,
    x: 50,
    y: 50,
    connections: [2, 4, 6],
    color: "#3D5AA8",
  },
  {
    id: 4,
    title: "Data Science",
    shortDesc: "Insight Discovery",
    description: "Unlocking hidden insights from complex datasets to drive informed decision making.",
    icon: Database,
    x: 20,
    y: 70,
    connections: [1, 3, 5],
    color: "#D4A72E",
  },
  {
    id: 5,
    title: "Neural Networks",
    shortDesc: "Deep Learning",
    description: "Developing complex architecture for deep learning and cognitive computing.",
    icon: Network,
    x: 80,
    y: 70,
    connections: [2, 4, 6],
    color: "#3B82F6",
  },
  {
    id: 6,
    title: "Edge AI",
    shortDesc: "Real-time Intelligence",
    description: "Deploying intelligent models on resource-constrained hardware for real-time processing.",
    icon: Cpu,
    x: 50,
    y: 85,
    connections: [3, 5],
    color: "#3D5AA8",
  },
];

export default function ResearchPillarsSection() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  return (
    <section className="py-12 bg-[#0A0118] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-white font-semibold text-sm">Research Excellence</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-space-grotesk font-black text-white mb-6 leading-tight"
          >
            Pioneering{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
              AI & ML Research
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Our research spans cutting-edge areas in artificial intelligence, machine learning, and data science, driving innovation that shapes the future of technology.
          </motion.p>
        </motion.div>

        {/* Mobile: Grid Layout */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {researchAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-xl border-2 shadow-lg"
                      style={{
                        backgroundColor: area.color + '25',
                        borderColor: area.color,
                        boxShadow: `0 0 20px ${area.color}40`
                      }}
                    >
                      <IconComponent
                        className="w-6 h-6"
                        style={{ color: area.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg font-space-grotesk">{area.title}</h3>
                      <p className="text-white/70 text-sm">{area.shortDesc}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{area.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Interactive Network */}
        <div className="hidden md:block relative" style={{ height: '600px' }}>
          <div className="absolute inset-0">
          {/* Neural Network Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4A72E" stopOpacity="0.6" />
                <stop offset="30%" stopColor="#3D5AA8" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D4A72E" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
        </defs>
        {researchAreas.map((area) => (
          area.connections.map((connectionId) => {
            const connectedArea = researchAreas.find(a => a.id === connectionId);
            if (!connectedArea) return null;

            return (
              <motion.line
                key={`${area.id}-${connectionId}`}
                x1={`${area.x}%`}
                y1={`${area.y}%`}
                x2={`${connectedArea.x}%`}
                y2={`${connectedArea.y}%`}
                stroke="url(#connectionGradient)"
                strokeWidth="3"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                transition={{
                  pathLength: { duration: 1.5, delay: area.id * 0.1, ease: "easeInOut" },
                  opacity: { duration: 0.5, delay: area.id * 0.1 }
                }}
                className="drop-shadow-2xl"
              />
            );
          })
        ))}

        {/* Animated particles along connections */}
        {researchAreas.map((area) => (
          area.connections.map((connectionId, connectionIndex) => {
            const connectedArea = researchAreas.find(a => a.id === connectionId);
            if (!connectedArea) return null;

            return (
              <motion.circle
                key={`particle-${area.id}-${connectionId}`}
                r="2"
                fill="#D4A72E"
                filter="url(#glow)"
                initial={{}}
                animate={{}}
                transition={{
                  duration: 4,
                  delay: area.id * 0.2 + connectionIndex * 0.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  offsetPath: `path('M ${area.x} ${area.y} L ${connectedArea.x} ${connectedArea.y}')`,
                  offsetDistance: "0%",
                  transform: "scale(0.5)"
                }}
              />
            );
          })
        ))}
        </svg>

        {/* Research Area Nodes */}
        {researchAreas.map((area, index) => {
          const IconComponent = area.icon;
          return (
            <motion.div
              key={`node-${area.id}`}
              className="absolute cursor-pointer group"
              style={{
                left: `${area.x}%`,
                top: `${area.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedNode(selectedNode === area.id ? null : area.id)}
            >
              {/* Node Circle */}
              <motion.div
                className="relative w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-xl border-2 shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: area.color + '25',
                  borderColor: area.color,
                  boxShadow: `0 0 30px ${area.color}50, 0 0 60px ${area.color}20`
                }}
                whileHover={{
                  boxShadow: `0 0 40px ${area.color}70, 0 0 80px ${area.color}30`
                }}
              >
                <IconComponent
                  className="w-8 h-8"
                  style={{ color: area.color }}
                />

                {/* Pulsing Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: area.color }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.2, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Node Label */}
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ y: -10 }}
                whileHover={{ y: 0 }}
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-xl px-4 py-2 shadow-xl border border-white/20">
                  <h3 className="text-gray-900 font-bold text-sm font-space-grotesk text-center">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 text-xs text-center mt-1">
                    {area.shortDesc}
                  </p>
                </div>

                {/* Tooltip Arrow */}
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent"
                  style={{ borderBottomColor: 'rgba(255, 255, 255, 0.95)' }}
                ></div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Selected Node Details */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20"
            >
              {(() => {
                const selectedArea = researchAreas.find(area => area.id === selectedNode);
                if (!selectedArea) return null;
                const IconComponent = selectedArea.icon;

                return (
                  <div className="flex items-start gap-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl border-2 shadow-lg flex-shrink-0"
                      style={{
                        backgroundColor: selectedArea.color + '20',
                        borderColor: selectedArea.color,
                        boxShadow: `0 0 20px ${selectedArea.color}40`
                      }}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: selectedArea.color }}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 font-space-grotesk mb-2">
                        {selectedArea.title}
                      </h3>
                      <p className="text-gray-600 font-medium mb-3">
                        {selectedArea.shortDesc}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedArea.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedNode(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
}
