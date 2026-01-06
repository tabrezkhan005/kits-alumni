"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Users,
  Shield,
  TrendingUp,
  BookOpen,
  Sparkles,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: "Real-time Discussions",
    description: "Engage in live conversations with peers, faculty, and alumni",
    x: 50,
    y: 20,
    connections: [1, 2, 3]
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find answers quickly with our advanced search functionality",
    x: 20,
    y: 50,
    connections: [0, 4, 5]
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Get help from experienced members and build connections",
    x: 80,
    y: 50,
    connections: [0, 3, 4]
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Moderated discussions ensuring respectful and productive exchanges",
    x: 35,
    y: 80,
    connections: [0, 2, 5]
  },
  {
    icon: TrendingUp,
    title: "Trending Topics",
    description: "Stay updated with the most popular and relevant discussions",
    x: 65,
    y: 80,
    connections: [1, 2, 5]
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description: "Access curated resources and solutions from past discussions",
    x: 50,
    y: 65,
    connections: [1, 3, 4]
  }
];

export function ForumFeatures() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-navy font-medium text-sm">Connected Network</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight">
            Everything You Need to{" "}
            <span className="text-gold">Connect</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Our forum creates a connected ecosystem where every feature works together to enhance your learning experience
          </p>
        </motion.div>

        {/* Network Visualization */}
        <div ref={containerRef} className="relative h-[600px] max-w-6xl mx-auto">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Connection Lines */}
            {features.map((feature, index) =>
              feature.connections.map((connectionIndex) => {
                const targetFeature = features[connectionIndex];
                const isHighlighted = hoveredNode === index || hoveredNode === connectionIndex;

                return (
                  <motion.line
                    key={`${index}-${connectionIndex}`}
                    x1={`${feature.x}%`}
                    y1={`${feature.y}%`}
                    x2={`${targetFeature.x}%`}
                    y2={`${targetFeature.y}%`}
                    stroke={isHighlighted ? "#D4A72E" : "#E5E7EB"}
                    strokeWidth={isHighlighted ? "2" : "1"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="drop-shadow-sm"
                  />
                );
              })
            )}

            {/* Animated Particles on Connections */}
            {features.map((feature, index) =>
              feature.connections.map((connectionIndex, connIndex) => {
                const targetFeature = features[connectionIndex];
                const isActive = hoveredNode === index || hoveredNode === connectionIndex;

                if (!isActive) return null;

                return (
                  <motion.circle
                    key={`particle-${index}-${connIndex}`}
                    r="2"
                    fill="#D4A72E"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: connIndex * 0.5
                    }}
                    style={{
                      offsetPath: `path("M ${feature.x} ${feature.y} L ${targetFeature.x} ${targetFeature.y}")`,
                      offsetRotate: "0deg"
                    }}
                    className="drop-shadow-sm"
                  />
                );
              })
            )}
          </svg>

          {/* Feature Nodes */}
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredNode === index;
            const hasConnection = hoveredNode !== null && (feature.connections.includes(hoveredNode) || hoveredNode === index);

            return (
              <motion.div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${feature.x}%`,
                  top: `${feature.y}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                onHoverStart={() => setHoveredNode(index)}
                onHoverEnd={() => setHoveredNode(null)}
                whileHover={{ scale: 1.1 }}
              >
                {/* Node Container */}
                <div className="relative">
                  {/* Outer Glow Ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${
                      isHovered ? 'border-gold/50 shadow-lg shadow-gold/20' : 'border-navy/20'
                    }`}
                    animate={isHovered ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Main Node */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'bg-gold shadow-lg shadow-gold/30 scale-110'
                      : hasConnection
                        ? 'bg-navy/10 border-2 border-gold/30'
                        : 'bg-white border-2 border-gray-200 hover:border-navy/30'
                  }`}>
                    <IconComponent className={`w-7 h-7 transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-navy'
                    }`} />
                  </div>

                  {/* Pulsing Connection Indicator */}
                  {hasConnection && !isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gold/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Feature Info Card */}
                <motion.div
                  className={`absolute z-20 bg-white rounded-xl p-4 shadow-lg border min-w-[200px] ${
                    feature.x > 50 ? 'right-20' : 'left-20'
                  } ${feature.y > 50 ? 'bottom-20' : 'top-20'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-bold text-navy mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                  <div className="mt-3 text-xs text-gold font-semibold">
                    Connected to {feature.connections.length} features
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-16 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold"></div>
            <span className="text-gray-600">Active Connection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-navy/20 border border-gray-200"></div>
            <span className="text-gray-600">Feature Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
            <span className="text-gray-600">Data Flow</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



