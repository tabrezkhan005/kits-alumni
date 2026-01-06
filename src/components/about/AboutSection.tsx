"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Brain,
    Cpu,
    Network,
    BookOpen,
    Sparkles,
    ArrowRight,
    Award,
    CheckCircle2
} from "lucide-react";

const AboutSection = () => {
    const features = [
        {
            icon: Brain,
            title: "AI & Machine Learning",
            description: "Cutting-edge research in artificial intelligence and advanced machine learning algorithms.",
            stats: "15+ Research Papers"
        },
        {
            icon: Cpu,
            title: "Edge Computing",
            description: "Developing intelligent systems for resource-constrained environments and IoT applications.",
            stats: "8 Active Projects"
        },
        {
            icon: Network,
            title: "Neural Networks",
            description: "Deep learning architectures and cognitive computing systems for complex problem-solving.",
            stats: "12 Model Architectures"
        },
        {
            icon: BookOpen,
            title: "Industry Curriculum",
            description: "Continuously updated syllabus aligned with current industry standards and emerging technologies.",
            stats: "25+ Industry Partners"
        }
    ];

    const values = [
        "Academic Excellence",
        "Industry Integration",
        "Research Innovation",
        "Student Success"
    ];

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.015]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20 max-w-4xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span className="text-navy font-medium text-sm">About KITS CSM</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight">
                        Pioneering{" "}
                        <span className="text-gold">Innovation</span>{" "}
                        in AI Education
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                        The Department of Computer Science & Machine Learning at KKR Institute stands at the forefront of technological education,
                        combining academic excellence with industry-integrated learning to prepare the next generation of AI innovators.
                    </p>

                    {/* Accreditation Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy/5 rounded-lg border border-navy/10"
                    >
                        <Award className="w-4 h-4 text-navy" />
                        <span className="text-navy font-medium text-sm">AICTE Accredited | NAAC A+ Grade</span>
                    </motion.div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
                    {/* Left: Feature Cards */}
                    <div className="space-y-4">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                                            <IconComponent className="w-6 h-6 text-navy group-hover:text-gold transition-colors duration-300" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-navy mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                                                {feature.description}
                                            </p>
                                            <div className="inline-block px-3 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-700">
                                                {feature.stats}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Values & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Core Values */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                            <h3 className="text-xl font-bold text-navy mb-6 font-space-grotesk">
                                Our Core Values
                            </h3>
                            <div className="space-y-4">
                                {values.map((value, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Key Statistics */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                            >
                                <div className="text-3xl font-bold text-navy mb-1 font-space-grotesk">500+</div>
                                <div className="text-xs text-gray-600 font-medium">Students</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                            >
                                <div className="text-3xl font-bold text-gold mb-1 font-space-grotesk">98%</div>
                                <div className="text-xs text-gray-600 font-medium">Placement Rate</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                            >
                                <div className="text-3xl font-bold text-navy mb-1 font-space-grotesk">50+</div>
                                <div className="text-xs text-gray-600 font-medium">Expert Faculty</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                            >
                                <div className="text-3xl font-bold text-gold mb-1 font-space-grotesk">120+</div>
                                <div className="text-xs text-gray-600 font-medium">Research Projects</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-200">
                        <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4 font-space-grotesk">
                            Ready to Join Our Community?
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Take the next step in your journey towards becoming a leader in AI and machine learning.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link href="/register">
                                    <button className="group px-8 py-4 bg-navy text-white font-semibold rounded-xl hover:bg-navy-dark transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md">
                                        <span>Join Our Community</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link href="/contact">
                                    <button className="px-8 py-4 bg-white border-2 border-gray-200 text-navy font-semibold rounded-xl hover:border-gold hover:text-gold transition-all duration-300 shadow-sm hover:shadow-md">
                                        Learn More About Us
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
