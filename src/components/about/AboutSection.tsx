"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Settings,
    Network,
    BookOpen,
    Briefcase,
    Handshake,
    GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

const AboutSection = () => {
    const [showItems, setShowItems] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            setShowItems(true);
        }
    }, [inView]);

    return (
        <div className="py-12 bg-white" ref={ref}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className={cn(
                        "transition-all duration-1000",
                        showItems ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                    )}>
                        <Card className="border-0 shadow-xl overflow-hidden max-w-md mx-auto lg:mx-0 lg:ml-auto lg:mr-0">
                            <div className="relative">
                                <Image
                                    src="/logo1.png"
                                    alt="KITS Computer Science & Machine Learning"
                                    className="w-full object-cover"
                                    width={450}
                                    height={300}
                                    style={{ height: "270px", objectFit: "contain", objectPosition: "center" }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 navy-gradient text-white text-center py-2 px-3 text-sm font-medium">
                                    Department of Computer Science & Machine Learning
                                </div>
                            </div>
                            <CardContent className="p-3">
                                <p className="text-gray-700 text-base leading-relaxed font-medium">
                                    Established with a vision to create engineering leaders in Computer Science & Machine Learning, our department has grown into a center of excellence fostering innovation, research, and industry collaboration.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className={cn(
                        "transition-all duration-1000 delay-300",
                        showItems ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                    )}>
                        <div className="inline-block px-6 py-4 bg-gold-primary/10 text-gold-primary border border-gold-primary/20 rounded-full font-bold mb-5 text-xl">
                            About KITS CSM
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight font-space-grotesk">
                            Engineering Excellence in Computer Science & Machine Learning
                        </h2>
                        <p className="text-gray-700 text-lg mb-6 font-medium">
                            The KKR Institute of Technology and Sciences Computer Science & Machine Learning Department is a premier engineering program that bridges theoretical foundations with practical applications. Our engineering graduates lead innovation across industries, from AI research to cloud architecture, continuing the legacy of excellence established at KITS.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <FeatureItem
                                icon={<Settings className="h-5 w-5" />}
                                text="Engineering Excellence"
                                delay={0}
                                showItems={showItems}
                            />
                            <FeatureItem
                                icon={<Network className="h-5 w-5" />}
                                text="Industry Partnerships"
                                delay={150}
                                showItems={showItems}
                            />
                            <FeatureItem
                                icon={<BookOpen className="h-5 w-5" />}
                                text="Research & Innovation"
                                delay={300}
                                showItems={showItems}
                            />
                            <FeatureItem
                                icon={<Briefcase className="h-5 w-5" />}
                                text="Career Placement"
                                delay={450}
                                showItems={showItems}
                            />
                            <FeatureItem
                                icon={<Handshake className="h-5 w-5" />}
                                text="Hands-on Learning"
                                delay={600}
                                showItems={showItems}
                            />
                            <FeatureItem
                                icon={<GraduationCap className="h-5 w-5" />}
                                text="Advanced Programs"
                                delay={750}
                                showItems={showItems}
                            />
                        </div>

                        <Button
                            asChild
                            className="bg-navy hover:bg-navy-light text-white transition-all text-lg px-6 py-3 h-auto space-x-2 rounded-xl hover:-translate-y-1 duration-300 transform shadow-lg hover:shadow-xl font-semibold"
                        >
                            <Link href="/register">Apply to CSM Programs</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for feature items
const FeatureItem = ({
    icon,
    text,
    highlighted = false,
    delay = 0,
    showItems = false
}: {
    icon: React.ReactNode;
    text: string;
    highlighted?: boolean;
    delay: number;
    showItems: boolean;
}) => (
    <div className={cn(
        "flex items-center space-x-3 group transition-all duration-700",
        showItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        { "transition-delay-[delay]": delay > 0 }
    )}
    style={{ transitionDelay: `${delay}ms` }}
    >
        <div className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            highlighted
                ? "bg-gold-primary/10 text-gold-primary group-hover:bg-gold-primary group-hover:text-white"
                : "bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white"
        )}>
            {icon}
        </div>
        <h6 className="font-semibold text-gray-800 text-base group-hover:translate-x-1 transition-transform duration-300">{text}</h6>
    </div>
);

export default AboutSection;
