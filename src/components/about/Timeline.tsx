"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    Rocket,
    GraduationCap,
    Trophy,
    Microscope,
    Lightbulb,
    ArrowRight,
    Sparkles,
    Award
} from "lucide-react";

const Timeline = () => {
    const [activeItem, setActiveItem] = useState<number | null>(null);

    // For section header
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const timelineItems = [
        {
            year: "2010",
            title: "Department Establishment",
            description: "The AI & ML department was established with a vision to pioneer education in the emerging field of artificial intelligence and machine learning, setting the foundation for technological innovation.",
            icon: Rocket,
            color: "#3B82F6",
            gradient: "from-blue-500/20 to-cyan-500/20",
            position: "left" as const
        },
        {
            year: "2012",
            title: "First Graduating Batch",
            description: "Our inaugural batch of 25 students graduated with remarkable placement statistics, setting a benchmark for future batches and establishing our reputation in the academic community.",
            icon: GraduationCap,
            color: "#10B981",
            gradient: "from-green-500/20 to-emerald-500/20",
            position: "right" as const
        },
        {
            year: "2014",
            title: "NAAC Accreditation",
            description: "The department received the prestigious NAAC A+ accreditation, recognizing our commitment to educational excellence and quality standards.",
            icon: Trophy,
            color: "#D4A72E",
            gradient: "from-gold/20 to-yellow-500/20",
            position: "left" as const
        },
        {
            year: "2019",
            title: "Elite Club",
            description: "Establishment of our department's Elite Club with specialized labs for machine learning, computer vision, and NLP, fostering research and innovation among students.",
            icon: Microscope,
            color: "#8B5CF6",
            gradient: "from-purple-500/20 to-pink-500/20",
            position: "right" as const
        },
        {
            year: "2022",
            title: "AI Quest",
            description: "Launched our annual flagship technical fest 'AI Quest' bringing together industry experts, researchers, and students to showcase innovations and build a collaborative AI community.",
            icon: Lightbulb,
            color: "#F59E0B",
            gradient: "from-orange-500/20 to-yellow-500/20",
            position: "left" as const
        }
    ];

    return (
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[size:32px_32px]" />
            </div>

            {/* Floating Elements */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-white/20 rounded-full mb-8 shadow-lg">
                        <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                        <span className="text-navy font-semibold text-sm tracking-wide">Our Journey</span>
                        <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-black text-navy mb-6 leading-[0.95]">
                        Evolution of{" "}
                        <span className="text-gold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                            Excellence
                        </span>
                    </h2>

                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        From humble beginnings to becoming a center of innovation, trace our remarkable journey
                        in shaping the future of AI education and research.
                    </p>

                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </motion.div>

                {/* Modern Timeline */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Central Timeline Track */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
                        <div className="w-full h-full bg-gradient-to-b from-navy via-gold to-navy rounded-full opacity-20" />
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-navy via-gold to-navy rounded-full"
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeOut" }}
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="relative z-10 space-y-24">
                        {timelineItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isLeft = item.position === 'left';

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                                        <motion.div
                                            className="relative"
                                            whileHover={{ scale: 1.2 }}
                                            onHoverStart={() => setActiveItem(index)}
                                            onHoverEnd={() => setActiveItem(null)}
                                        >
                                            <div
                                                className="w-16 h-16 rounded-full border-4 border-white shadow-xl flex items-center justify-center"
                                                style={{ backgroundColor: item.color }}
                                            >
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>

                                            {/* Pulse Effect */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-2"
                                                style={{ borderColor: item.color }}
                                                animate={{
                                                    scale: [1, 1.5, 1],
                                                    opacity: [0.6, 0, 0.6],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />

                                            {/* Active Glow */}
                                            {activeItem === index && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full blur-xl"
                                                    style={{ backgroundColor: item.color, opacity: 0.3 }}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 2 }}
                                                    exit={{ scale: 0 }}
                                                />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Content Card */}
                                    <motion.div
                                        className={`w-full max-w-lg ${isLeft ? 'pr-16' : 'pl-16'}`}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 ${
                                            activeItem === index ? `shadow-2xl border-gold/50` : ''
                                        }`}>

                                            {/* Year Badge */}
                                            <div className="inline-block px-4 py-2 bg-navy/10 text-navy font-bold rounded-full text-sm mb-4">
                                                {item.year}
                                            </div>

                                            <h3 className="text-2xl font-bold text-navy mb-3 font-space-grotesk">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed mb-6">
                                                {item.description}
                                            </p>

                                            {/* Achievement Indicator */}
                                            <div className="flex items-center gap-2 text-gold">
                                                <Award className="w-4 h-4" />
                                                <span className="text-sm font-semibold">Key Milestone</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex justify-center mt-16 gap-4">
                        {timelineItems.map((_, index) => (
                            <motion.button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    activeItem === index ? 'bg-gold scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                onClick={() => setActiveItem(index)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-20"
                >
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-3xl font-bold text-navy mb-6 font-space-grotesk">
                            Join Our Continuing Legacy
                        </h3>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Be part of the next chapter in our journey of innovation and excellence.
                        </p>

                        <motion.button
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-navy to-navy-dark text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-navy/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Start Your Journey</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Timeline;
