"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Users, Award, BookOpen, TrendingUp, Target } from 'lucide-react';

const stats = [
    {
        icon: Users,
        number: 50,
        suffix: '+',
        label: 'Expert Faculty',
        description: 'Dedicated professors and researchers',
        color: '#2C3E7C'
    },
    {
        icon: BookOpen,
        number: 200,
        suffix: '+',
        label: 'Research Papers',
        description: 'Published in top-tier journals',
        color: '#D4A72E'
    },
    {
        icon: Award,
        number: 15,
        suffix: '+',
        label: 'Years Experience',
        description: 'Average industry experience',
        color: '#2C3E7C'
    },
    {
        icon: GraduationCap,
        number: 500,
        suffix: '+',
        label: 'Students Mentored',
        description: 'Successful graduates',
        color: '#D4A72E'
    },
    {
        icon: TrendingUp,
        number: 98,
        suffix: '%',
        label: 'Placement Rate',
        description: 'Career success rate',
        color: '#2C3E7C'
    },
    {
        icon: Target,
        number: 25,
        suffix: '+',
        label: 'Industry Partners',
        description: 'Active collaborations',
        color: '#D4A72E'
    }
];

function CountUp({ end, suffix, duration = 2 }: { end: number, suffix: string, duration?: number }) {
    const [count, setCount] = React.useState(0);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    React.useEffect(() => {
        if (inView) {
            let start = 0;
            const endValue = end;
            const totalMiliseconds = duration * 1000;
            const incrementTime = totalMiliseconds / endValue;

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= endValue) {
                    setCount(endValue);
                    clearInterval(timer);
                }
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [inView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export function FacultyStats() {
    return (
        <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
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
                    className="text-center mb-20 max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold text-navy mb-6 leading-tight">
                        Impact in{" "}
                        <span className="text-gold">Motion</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        The numbers that define our faculty's excellence and commitment to innovation
                    </p>
                </motion.div>

                {/* Flowing Stats Layout */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden lg:block" />

                    {/* Stats Container */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.15,
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    className={`relative flex flex-col items-center text-center ${
                                        isEven ? 'lg:mt-0' : 'lg:mt-16'
                                    }`}
                                >
                                    {/* Icon with Animated Ring */}
                                    <div className="relative mb-6">
                                        <motion.div
                                            className="w-20 h-20 rounded-full flex items-center justify-center relative"
                                            style={{ backgroundColor: `${stat.color}15` }}
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <IconComponent
                                                className="w-10 h-10 relative z-10"
                                                style={{ color: stat.color }}
                                            />
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-2"
                                                style={{ borderColor: stat.color }}
                                                animate={{
                                                    scale: [1, 1.3, 1],
                                                    opacity: [0.5, 0, 0.5],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: index * 0.3
                                                }}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Number */}
                                    <motion.div
                                        className="mb-3"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 + 0.3 }}
                                    >
                                        <div
                                            className="text-5xl md:text-6xl lg:text-7xl font-black font-space-grotesk leading-none"
                                            style={{ color: stat.color }}
                                        >
                                            <CountUp end={stat.number} suffix={stat.suffix} />
                                        </div>
                                    </motion.div>

                                    {/* Label */}
                                    <h3 className="text-lg font-bold text-navy mb-2">
                                        {stat.label}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 max-w-[200px]">
                                        {stat.description}
                                    </p>

                                    {/* Decorative Line */}
                                    {index < stats.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-gold/50 to-transparent" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Accent */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-20 rounded-full"
                />
            </div>
        </section>
    );
}



