"use client";

import { GraduationCap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const AboutHero = () => {
    const [scrolled, setScrolled] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(true);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative overflow-hidden py-24 pb-16 md:pt-32 md:pb-20 bg-[#800020] text-white">
            {/* Animated background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute w-40 h-40 rounded-full bg-[#D4AF37]/20 top-10 left-10 animate-pulse"></div>
                <div className="absolute w-60 h-60 rounded-full bg-[#D4AF37]/10 bottom-20 right-20 animate-pulse"></div>
                <div className="absolute w-20 h-20 rounded-full bg-[#D4AF37]/30 top-1/2 left-1/3 animate-pulse"></div>

                <div className="absolute w-2 h-2 bg-white/50 top-1/4 left-1/4 animate-float"></div>
                <div className="absolute w-3 h-3 bg-white/40 top-3/4 left-2/3 animate-float-slow"></div>
                <div className="absolute w-2 h-2 bg-white/30 top-1/3 left-1/2 animate-float-reverse"></div>
                <div className="absolute w-1 h-1 bg-white/60 top-2/3 left-1/3 animate-float-slow"></div>
                <div className="absolute w-2 h-2 bg-white/50 top-1/2 left-3/4 animate-float"></div>

                <div className="absolute h-0.5 w-40 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/40 to-[#D4AF37]/0 top-1/4 left-1/4 rotate-45"></div>
                <div className="absolute h-0.5 w-60 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/30 to-[#D4AF37]/0 top-2/3 left-1/3 -rotate-12"></div>
                <div className="absolute h-0.5 w-40 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/40 to-[#D4AF37]/0 top-1/3 right-1/4 rotate-12"></div>
                <div className="absolute h-0.5 w-60 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/30 to-[#D4AF37]/0 bottom-1/4 right-1/3 -rotate-45"></div>
            </div>

            <div className="container px-4 mx-auto py-5 relative z-10">
                <div className="flex justify-center">
                    <div className="max-w-4xl text-center">
                        <span className="inline-block px-4 py-1.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-lg font-bold mb-4 translate-y-0 opacity-100 transition-all duration-700">
                            ABOUT OUR NETWORK
                        </span>
                        <h1 className="mb-6 text-[#D4AF37] text-4xl lg:text-7xl font-bold translate-y-0 opacity-100 transition-all duration-700">
                            Our Alumni Story
                        </h1>
                        <div className="flex items-center justify-center mb-8 translate-y-0 opacity-100 transition-all duration-700">
                            <div className="h-0.5 w-12 bg-[#D4AF37]"></div>
                            <GraduationCap className="mx-3 text-[#D4AF37] h-15 w-15" />
                            <div className="h-0.5 w-12 bg-[#D4AF37]"></div>
                        </div>
                        <p className="text-2xl text-white/90 mb-10 max-w-2xl mx-auto translate-y-0 opacity-100 transition-all duration-700">
                            Discover the history, values, and mission driving our vibrant alumni community.
                            We connect generations of KITS graduates, fostering professional growth and collaboration.
                        </p>
                        <div className="flex justify-center space-x-4 translate-y-0 opacity-100 transition-all duration-700">
                            <Button
                                className="bg-[#D4AF37] text-black hover:bg-[#B58D28] transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-lg"
                            >
                                Join Our Network
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white text-black hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-lg"
                            >
                                Learn More
                            </Button>
                        </div>
                        <div className="mt-10 flex flex-col items-center opacity-100 transition-all duration-700 animate-bounce-slow">
                            <ChevronDown className="h-6 w-6 text-white/70" />
                            <span className="text-sm text-white/70 mt-1">Scroll to explore</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;
