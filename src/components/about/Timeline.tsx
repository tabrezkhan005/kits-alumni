"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import {
    Rocket,
    GraduationCap,
    Trophy,
    Microscope,
    Lightbulb,
    GitBranch,
    ArrowRight
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Timeline = () => {
    const [timelineProgress, setTimelineProgress] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
    const timelineRef = useRef<HTMLDivElement>(null);
    const lastScrollTop = useRef<number>(0);

    // Refs for each timeline item
    const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.3 });
    const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.3 });
    const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.3 });
    const { ref: ref4, inView: inView4 } = useInView({ threshold: 0.3 });
    const { ref: ref5, inView: inView5 } = useInView({ threshold: 0.3 });

    // For section header
    const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.1, triggerOnce: true });

    // For bottom CTA
    const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.2, triggerOnce: false });

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;

            // Determine scroll direction
            const st = window.scrollY || document.documentElement.scrollTop;
            setScrollDirection(st > lastScrollTop.current ? 'down' : 'up');
            lastScrollTop.current = st <= 0 ? 0 : st;

            const viewportHeight = window.innerHeight;
            const timelineTopPosition = timelineRef.current.getBoundingClientRect().top;
            const timelineHeight = timelineRef.current.offsetHeight;

            // Calculate scroll percentage
            let progress = 0;

            if (timelineTopPosition < viewportHeight * 0.8) {
                const scrolled = Math.abs(timelineTopPosition - viewportHeight * 0.8);
                const maxScroll = timelineHeight;
                progress = Math.min(100, (scrolled / maxScroll) * 100);
            }

            setTimelineProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="py-20 bg-gray-100">
            <div className="container px-4 mx-auto">
                {/* Section Header */}
                <div
                    ref={headerRef}
                    className="flex flex-col items-center mb-16"
                >
                    <span className={cn(
                        "px-6 py-3 bg-[#800020]/10 text-[#800020] rounded-full text-lg font-bold mb-3 transition-all duration-700",
                        headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        OUR JOURNEY
                    </span>
                    <h2 className={cn(
                        "text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center transition-all duration-700 delay-150",
                        headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        The Evolution of Excellence
                    </h2>
                    <div className={cn(
                        "flex items-center justify-center mb-5 transition-all duration-700 delay-300",
                        headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        <span className="h-0.5 w-12 bg-[#D4AF37]"></span>
                        <GitBranch className="mx-3 text-[#D4AF37] h-5 w-5" />
                        <span className="h-0.5 w-12 bg-[#D4AF37]"></span>
                    </div>
                    <p className={cn(
                        "max-w-2xl text-center text-gray-600 mb-8 transition-all duration-700 delay-450",
                        headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        Tracing the remarkable journey of our AI & ML department from its inception to becoming a center of innovation and excellence.
                    </p>
                </div>

                <div className="relative" ref={timelineRef}>
                    {/* Timeline Track */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 rounded-full">
                        <div
                            className="absolute top-0 left-0 w-full bg-[#800020] rounded-full transition-all duration-500"
                            style={{ height: `${timelineProgress}%` }}
                        ></div>
                    </div>

                    {/* Timeline Items */}
                    <div className="relative z-10">
                        {/* Item 1 */}
                        <div ref={ref1} className="mb-24">
                            <TimelineItem
                                year="2010"
                                title="Department Establishment"
                                description="The AI & ML department was established with a vision to pioneer education in the emerging field of artificial intelligence and machine learning, setting the foundation for technological innovation."
                                icon={<Rocket className="h-6 w-6" />}
                                position="left"
                                isVisible={inView1}
                                scrollDirection={scrollDirection}
                            />
                        </div>

                        {/* Item 2 */}
                        <div ref={ref2} className="mb-24">
                            <TimelineItem
                                year="2012"
                                title="First Graduating Batch"
                                description="Our inaugural batch of 25 students graduated with remarkable placement statistics, setting a benchmark for future batches and establishing our reputation in the academic community."
                                icon={<GraduationCap className="h-6 w-6" />}
                                position="right"
                                isVisible={inView2}
                                scrollDirection={scrollDirection}
                            />
                        </div>

                        {/* Item 3 */}
                        <div ref={ref3} className="mb-24">
                            <TimelineItem
                                year="2014"
                                title="NAAC Accreditation"
                                description="The department received the prestigious NAAC A+ accreditation, recognizing our commitment to educational excellence and quality standards."
                                icon={<Trophy className="h-6 w-6" />}
                                position="left"
                                isVisible={inView3}
                                scrollDirection={scrollDirection}
                            />
                        </div>

                        {/* Item 4 */}
                        <div ref={ref4} className="mb-24">
                            <TimelineItem
                                year="2019"
                                title="Elite Club"
                                description="Establishment of our department's Elite Club with specialized labs for machine learning, computer vision, and NLP, fostering research and innovation among students."
                                icon={<Microscope className="h-6 w-6" />}
                                position="right"
                                isVisible={inView4}
                                scrollDirection={scrollDirection}
                            />
                        </div>

                        {/* Item 5 */}
                        <div ref={ref5}>
                            <TimelineItem
                                year="2022"
                                title="AI Quest"
                                description="Launched our annual flagship technical fest 'AI Quest' bringing together industry experts, researchers, and students to showcase innovations and build a collaborative AI community."
                                icon={<Lightbulb className="h-6 w-6" />}
                                position="left"
                                isVisible={inView5}
                                scrollDirection={scrollDirection}
                            />
                        </div>
                    </div>
                </div>

                <div
                    ref={ctaRef}
                    className={cn(
                        "flex justify-center mt-20 transition-all duration-1000",
                        ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                >
                    <Button
                        className="bg-[#800020] hover:bg-[#600020] text-lg px-8 py-6 h-auto space-x- rounded-md transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                    >
                        <span>Join Our Legacy</span>
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    position: 'left' | 'right';
    isVisible: boolean;
    scrollDirection: 'up' | 'down';
}

const TimelineItem = ({ year, title, description, icon, position, isVisible, scrollDirection }: TimelineItemProps) => {
    const isLeft = position === 'left';
    const shouldHide = scrollDirection === 'up' && !isVisible;

    return (
        <div className="flex items-start">
            {/* Left content */}
            <div className="w-1/2 pr-12 md:pr-16">
                {isLeft && (
                    <div className={cn(
                        "transition-all duration-1000 ml-auto text-right",
                        isVisible && scrollDirection === 'down'
                            ? "opacity-100 translate-x-0"
                            : shouldHide
                                ? "opacity-0 -translate-x-16"
                                : isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-16"
                    )}>
                        <div className="text-[#800020] font-semibold text-lg mb-3">{year}</div>
                        <Card className="ml-auto bg-white shadow-md overflow-hidden border-0">
                            <CardHeader className="pb-2">
                                <div className="flex justify-end mb-2">
                                    <div className="w-12 h-12 rounded-full bg-[#800020]/10 flex items-center justify-center">
                                        {icon}
                                    </div>
                                </div>
                                <CardTitle className="text-xl text-right">{title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-right">{description}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* Timeline Node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={cn(
                    "w-5 h-5 rounded-full bg-[#800020] border-4 border-white transition-all duration-1000",
                    isVisible ? "scale-100" : "scale-0"
                )}>
                    <div className="absolute w-12 h-12 rounded-full bg-[#800020]/20 -top-3.5 -left-3.5 animate-pulse"></div>
                </div>
            </div>

            {/* Right content */}
            <div className="w-1/2 pl-12 md:pl-16">
                {!isLeft && (
                    <div className={cn(
                        "transition-all duration-1000",
                        isVisible && scrollDirection === 'down'
                            ? "opacity-100 translate-x-0"
                            : shouldHide
                                ? "opacity-0 translate-x-16"
                                : isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-16"
                    )}>
                        <div className="text-[#800020] font-semibold text-lg mb-3">{year}</div>
                        <Card className="mr-auto bg-white shadow-md overflow-hidden border-0">
                            <CardHeader className="pb-2">
                                <div className="flex mb-2">
                                    <div className="w-12 h-12 rounded-full bg-[#800020]/10 flex items-center justify-center">
                                        {icon}
                                    </div>
                                </div>
                                <CardTitle className="text-xl">{title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{description}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Timeline;
