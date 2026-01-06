"use client";

import { GraduationCap, Users, Award, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutHero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden py-12">
            {/* Professional Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/img/slide3new.jpg"
                    alt="KITS CSM Campus"
                    fill
                    className="object-cover blur-md"
                    priority
                />
                {/* Elegant Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
            </div>

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02] z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,#ffffff_1px,transparent_0)] bg-[size:40px_40px]" />
            </div>

            {/* Minimal Floating Elements */}
            <motion.div
                className="absolute top-20 right-20 w-32 h-32 bg-gold/10 rounded-full blur-xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Elegant Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
                    >
                        <Users className="w-4 h-4 text-gold" />
                        <span className="text-white font-medium text-sm tracking-wide">About KITS CSM</span>
                    </motion.div>

                    {/* Professional Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-space-grotesk font-bold text-white mb-6 leading-tight"
                    >
                        Building{" "}
                        <span className="text-gold relative">
                            Futures
                            <motion.div
                                className="absolute -bottom-3 left-0 right-0 h-1 bg-gold rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            />
                        </span>{" "}
                        Together
                    </motion.h1>

                    {/* Elegant Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        For over a decade, we've been nurturing talent, fostering innovation, and creating lasting connections
                        that transcend generations. Our story is one of excellence, community, and unwavering commitment to progress.
                    </motion.p>

                    {/* Key Statistics */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                    >
                        {[
                            { value: "500+", label: "Alumni Worldwide", icon: Users },
                            { value: "98%", label: "Placement Success", icon: Award },
                            { value: "10+", label: "Years of Excellence", icon: GraduationCap }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center"
                            >
                                <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                                <div className="text-3xl font-bold text-white mb-1 font-space-grotesk">{stat.value}</div>
                                <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Professional CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-gold/30 flex items-center gap-3 text-lg"
                        >
                            <span>Explore Our Story</span>
                            <GraduationCap className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center gap-3 text-lg"
                        >
                            <span>Connect With Us</span>
                            <Users className="w-5 h-5" />
                        </motion.button>
                    </motion.div>

                    {/* Subtle Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex flex-col items-center text-white/60"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronDown className="w-6 h-6" />
                        </motion.div>
                        <span className="text-sm mt-2 font-medium">Discover our legacy</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
