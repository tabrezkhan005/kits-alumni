"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
    Settings, 
    Network, 
    BookOpen, 
    Briefcase, 
    Handshake, 
    GraduationCap,
    CheckCircle2,
    Target,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const AboutSection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-1/2 -z-10"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Image Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-navy/20 border-8 border-white group">
                            <Image
                                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
                                alt="KITS Campus"
                                width={800}
                                height={600}
                                className="object-cover h-[500px] group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60"></div>
                            
                            <div className="absolute bottom-10 left-10 right-10">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center shadow-lg">
                                            <Target className="text-navy w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg">Excellence Driven</p>
                                            <p className="text-white/70 text-sm">Shaping tomorrow's engineers today.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="text-navy w-5 h-5" />
                                </div>
                                <p className="text-navy font-bold">AICTE Approved</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content Column */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Our Legacy</span>
                            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-navy mb-8 leading-tight">
                                Pioneering the Future of <span className="text-gold">Tech Education</span>
                            </h2>
                            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
                                The KKR Institute of Technology and Sciences Department of Computer Science & Machine Learning (CSM) stands at the forefront of technical education. We combine academic rigor with industry-integrated learning to empower our students for the global stage.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 mb-12">
                                <FeatureItem 
                                    icon={<Zap className="w-5 h-5" />} 
                                    title="Innovation Lab"
                                    desc="State-of-the-art facilities for research."
                                />
                                <FeatureItem 
                                    icon={<Network className="w-5 h-5" />} 
                                    title="Global Network"
                                    desc="Alumni working in Fortune 500s."
                                />
                                <FeatureItem 
                                    icon={<BookOpen className="w-5 h-5" />} 
                                    title="Modern Curriculum"
                                    desc="Always updated with industry trends."
                                />
                                <FeatureItem 
                                    icon={<GraduationCap className="w-5 h-5" />} 
                                    title="Career Success"
                                    desc="Dedicated placement and mentoring."
                                />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/register">
                                    <Button className="px-10 py-6 bg-navy text-white rounded-full hover:bg-navy-dark transition-all shadow-xl shadow-navy/20 font-bold text-sm uppercase tracking-widest">
                                        Join Our Community
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="px-10 py-6 border-2 border-navy text-navy rounded-full hover:bg-navy hover:text-white transition-all font-bold text-sm uppercase tracking-widest">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="flex items-start gap-4 group">
        <div className="w-12 h-12 bg-navy/5 text-navy rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-all duration-300">
            {icon}
        </div>
        <div>
            <h4 className="text-navy font-bold text-lg mb-1">{title}</h4>
            <p className="text-gray-500 text-sm">{desc}</p>
        </div>
    </div>
);

export default AboutSection;
