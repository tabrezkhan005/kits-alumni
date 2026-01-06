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
            description: "The AI & ML department was established with a vision to pioneer education in artificial intelligence and machine learning, setting the foundation for technological innovation.",
            icon: Rocket,
            color: "#3F426B", // Navy
            bgColor: "#3F426B",
            position: "left" as const
        },
        {
            year: "2012",
            title: "First Graduating Batch",
            description: "Our inaugural batch of 25 students graduated with remarkable placement statistics, setting a benchmark for future batches and establishing our reputation in the academic community.",
            icon: GraduationCap,
            color: "#D4A72E", // Gold
            bgColor: "#D4A72E",
            position: "right" as const
        },
        {
            year: "2014",
            title: "NAAC Accreditation",
            description: "The department received the prestigious NAAC A+ accreditation, recognizing our commitment to educational excellence and quality standards.",
            icon: Trophy,
            color: "#3F426B", // Navy
            bgColor: "#3F426B",
            position: "left" as const
        },
        {
            year: "2019",
            title: "Elite Club",
            description: "Establishment of our department's Elite Club with specialized labs for machine learning, computer vision, and NLP, fostering research and innovation among students.",
            icon: Microscope,
            color: "#D4A72E", // Gold
            bgColor: "#D4A72E",
            position: "right" as const
        },
        {
            year: "2022",
            title: "AI Quest",
            description: "Launched our annual flagship technical fest 'AI Quest' bringing together industry experts, researchers, and students to showcase innovations and build a collaborative AI community.",
            icon: Lightbulb,
            color: "#3F426B", // Navy
            bgColor: "#3F426B",
            position: "left" as const
        }
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.015]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,#3F426B_1px,transparent_0)] bg-[size:32px_32px]" />
            </div>

            {/* Minimal Floating Elements */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-48 h-48 bg-navy/3 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gold/4 rounded-full blur-2xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
            />

            <div className="container mx-auto px-6 relative z-10">

                {/* Professional Section Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 border border-navy/10 rounded-full mb-6"
                    >
                        <span className="text-navy font-medium text-sm">Our History</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight"
                    >
                        Journey of{" "}
                        <span className="text-gold relative">
                            Innovation
                            <motion.div
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gold rounded-full"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        From our founding to becoming a leader in AI education, discover the milestones that shaped our commitment to excellence and innovation.
                    </motion.p>
                </motion.div>

                {/* Professional Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Clean Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full">
                        <div className="w-full h-full bg-gradient-to-b from-gray-200 via-navy/30 to-gray-200" />
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-navy to-gold"
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2.5, ease: "easeOut" }}
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="relative z-10 space-y-16">
                        {timelineItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isLeft = item.position === 'left';

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: index * 0.15 }}
                                    className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                                        <motion.div
                                            className="relative"
                                            whileHover={{ scale: 1.1 }}
                                            onHoverStart={() => setActiveItem(index)}
                                            onHoverEnd={() => setActiveItem(null)}
                                        >
                                            <div
                                                className="w-14 h-14 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all duration-300"
                                                style={{ backgroundColor: item.bgColor }}
                                            >
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>

                                            {/* Subtle Glow */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-2"
                                                style={{ borderColor: item.color }}
                                                initial={{ scale: 1, opacity: 0.3 }}
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.3, 0.1, 0.3],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Professional Content Card */}
                                    <motion.div
                                        className={`w-full max-w-md ${isLeft ? 'pr-12' : 'pl-12'}`}
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 ${
                                            activeItem === index ? 'shadow-xl border-gold/30 bg-gray-50/50' : 'hover:shadow-xl'
                                        }`}>

                                            {/* Year Badge */}
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy/10 text-navy font-semibold rounded-lg text-sm mb-4">
                                                <span className="w-2 h-2 bg-navy rounded-full"></span>
                                                {item.year}
                                            </div>

                                            <h3 className="text-xl font-bold text-navy mb-3 font-space-grotesk leading-tight">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Minimal Progress Indicators */}
                    <div className="flex justify-center mt-12 gap-3">
                        {timelineItems.map((_, index) => (
                            <motion.button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    activeItem === index ? 'bg-navy scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                onClick={() => setActiveItem(index)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Minimal CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <div className="max-w-xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-dark transition-colors duration-300 cursor-pointer"
                        >
                            <span>Continue Our Legacy</span>
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Timeline;
