"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Calendar, Users, Sparkles } from 'lucide-react';

export function FacultyCTA() {
    return (
        <section className="py-24 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,167,46,0.2)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-gold" />
                            <span className="text-white font-medium text-sm">Get Started</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-white mb-4 leading-tight">
                            Ready to{" "}
                            <span className="text-gold">Connect?</span>
                        </h2>

                        <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                            Take the next step in your AI and Machine Learning journey with our world-class faculty.
                        </p>
                    </motion.div>

                    {/* Compact Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-dark transition-all duration-300 flex items-center gap-3 shadow-lg shadow-gold/30"
                            >
                                <Mail className="w-5 h-5" />
                                <span>Contact Faculty</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>

                        <Link href="/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-xl hover:bg-white/20 border border-white/30 transition-all duration-300 flex items-center gap-3"
                            >
                                <Users className="w-5 h-5" />
                                <span>Join Program</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-6 text-sm"
                    >
                        <Link href="/about" className="text-white/70 hover:text-gold transition-colors">
                            Learn More
                        </Link>
                        <div className="w-1 h-1 bg-white/30 rounded-full" />
                        <Link href="/contact" className="text-white/70 hover:text-gold transition-colors">
                            Schedule Visit
                        </Link>
                        <div className="w-1 h-1 bg-white/30 rounded-full" />
                        <Link href="/faculty" className="text-white/70 hover:text-gold transition-colors">
                            View All Faculty
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}



