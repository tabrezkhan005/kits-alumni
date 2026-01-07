"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    BookOpen,
    Award,
    Users,
    TrendingUp,
    Lightbulb,
    Sparkles
} from 'lucide-react';

const expertiseAreas = [
    {
        icon: Brain,
        title: "Artificial Intelligence",
        description: "Expert faculty specializing in machine learning, deep learning, and neural networks.",
        count: "12+ Experts"
    },
    {
        icon: BookOpen,
        title: "Industry Experience",
        description: "Professors with extensive industry backgrounds from leading tech companies.",
        count: "15+ Years Avg"
    },
    {
        icon: Award,
        title: "Research Excellence",
        description: "Published researchers with contributions to top-tier conferences and journals.",
        count: "200+ Papers"
    },
    {
        icon: Users,
        title: "Student Mentorship",
        description: "Dedicated mentors guiding students through academic and career development.",
        count: "500+ Students"
    },
    {
        icon: TrendingUp,
        title: "Industry Partnerships",
        description: "Active collaborations with leading companies for internships and placements.",
        count: "25+ Partners"
    },
    {
        icon: Lightbulb,
        title: "Innovation Labs",
        description: "State-of-the-art laboratories for hands-on learning and research projects.",
        count: "8 Labs"
    }
];

export function FacultyExpertise() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span className="text-navy font-medium text-sm">Faculty Excellence</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight">
                        Why Choose{" "}
                        <span className="text-gold">Our Faculty</span>
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        Our distinguished faculty members bring together academic excellence, industry expertise, and a passion for innovation to provide world-class education.
                    </p>
                </motion.div>

                {/* Expertise Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {expertiseAreas.map((area, index) => {
                        const IconComponent = area.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                                        <IconComponent className="w-6 h-6 text-navy group-hover:text-gold transition-colors duration-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-navy mb-2">
                                            {area.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                            {area.description}
                                        </p>
                                        <div className="inline-block px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-700">
                                            {area.count}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}





