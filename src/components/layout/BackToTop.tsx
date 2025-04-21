"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top scroll to 0
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <Button
            onClick={scrollToTop}
            size="icon"
            variant="default"
            className={cn(
                "fixed right-6 bottom-6 h-10 w-10 rounded-full bg-[#800020] border-2 border-[#D4AF37] z-50 shadow-lg transition-all duration-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
            )}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    );
};

export default BackToTop;
