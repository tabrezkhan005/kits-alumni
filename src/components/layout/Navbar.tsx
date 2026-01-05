"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    // Smooth scroll detection with threshold
                    if (currentScrollY > 10) {
                        setIsScrolled(true);
                    } else {
                        setIsScrolled(false);
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initialize on mount
        handleScroll();

        // Add scroll event listener with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="w-full relative">
            {/* Fixed wrapper for the navbar - positioned below the AnnouncementBar */}
            {/* When scrolled, navbar hides completely behind the announcement bar */}
            <div className={cn(
                "w-full fixed z-30 transition-all duration-700 ease-in-out",
                isScrolled
                  ? "top-10 -translate-y-full opacity-0 pointer-events-none"
                  : "top-10 translate-y-0 opacity-100 shadow-md"
            )}>
                {/* Main Navigation - Always visible when not scrolled */}
                <div className={cn(
                    "w-full transition-all duration-300 border-b",
                    isScrolled
                      ? "bg-white/95 backdrop-blur-md border-gray-200"
                      : "bg-white/95 backdrop-blur-sm border-gray-100"
                )}>
                    <div className="container mx-auto px-6">
                        <nav className="flex items-center justify-between py-3 font-inter">
                            <Link href="/" className="flex items-center ml-4">
                                <Image
                                    src="/logo1.png"
                                    alt="KITS CSM"
                                    width={64}
                                    height={64}
                                    className="rounded-lg"
                                />
                            </Link>

                            {/* Desktop Navigation - Centered */}
                            <div className="hidden lg:flex items-center flex-1 justify-center">
                                <div className="flex items-center space-x-6">
                                    <Link href="/" className={cn(
                                        "relative px-2 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group",
                                        pathname === "/" ? "text-navy" : "text-gray-700",
                                        "hover:!text-[#3F426B]"
                                    )}>
                                        Home
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-gold-primary transform origin-left transition-transform duration-300",
                                            pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/about" className={cn(
                                        "relative px-2 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group",
                                        pathname === "/about" ? "text-navy" : "text-gray-700",
                                        "hover:!text-[#3F426B]"
                                    )}>
                                        About
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-gold-primary transform origin-left transition-transform duration-300",
                                            pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/programs" className={cn(
                                        "relative px-2 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group",
                                        pathname === "/programs" ? "text-navy" : "text-gray-700",
                                        "hover:!text-[#3F426B]"
                                    )}>
                                        Programs
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-gold-primary transform origin-left transition-transform duration-300",
                                            pathname === "/programs" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/research" className={cn(
                                        "relative px-2 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group",
                                        pathname === "/research" ? "text-navy" : "text-gray-700",
                                        "hover:!text-[#3F426B]"
                                    )}>
                                        Research
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-gold-primary transform origin-left transition-transform duration-300",
                                            pathname === "/research" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/faculty" className={cn(
                                        "relative px-2 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group",
                                        pathname === "/faculty" ? "text-navy" : "text-gray-700",
                                        "hover:!text-[#3F426B]"
                                    )}>
                                        Faculty
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-gold-primary transform origin-left transition-transform duration-300",
                                            pathname === "/faculty" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/placements" className={cn(
                                        "relative px-2 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group",
                                        pathname === "/placements" ? "text-navy" : "text-gray-700",
                                        "hover:!text-[#3F426B]"
                                    )}>
                                        Placements
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-gold-primary transform origin-left transition-transform duration-300",
                                            pathname === "/placements" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/alumni" className={cn(
                                        "relative px-2 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group",
                                        pathname === "/alumni" ? "text-navy" : "text-gray-700",
                                        "hover:!text-[#3F426B]"
                                    )}>
                                        Alumni
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-gold-primary transform origin-left transition-transform duration-300",
                                            pathname === "/alumni" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/contact" className={cn(
                                        "relative px-2 py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group",
                                        pathname === "/contact" ? "text-navy" : "text-gray-700",
                                        "hover:!text-[#3F426B]"
                                    )}>
                                        Contact
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-gold-primary transform origin-left transition-transform duration-300",
                                            pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                </div>
                            </div>

                            {/* Let's Connect Button - Right Side - Primary Color CTA */}
                            <div className="hidden lg:flex items-center">
                                <Link href="/contact" className="px-8 py-3 bg-[#3F426B] text-white rounded-full hover:bg-[#2C3E7C] transition-all duration-300 text-sm font-bold hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2">
                                    <span>Let's Connect</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Mobile Navigation */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="flex flex-col">
                                    <div className="flex flex-col space-y-4 mt-8">
                                        <Link href="/" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            Home
                                        </Link>
                                        <Link href="/about" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/about" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            About
                                        </Link>
                                        <Link href="/event" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/event" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            Events
                                        </Link>
                                        <Link href="/achievements" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/achievements" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            Achievements
                                        </Link>
                                        <Link href="/blog" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/blog" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            Blog
                                        </Link>
                                        <Link href="/faculty" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/faculty" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            Faculty
                                        </Link>
                                        <Link href="/alumni" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/alumni" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            Alumni
                                        </Link>
                                        <Link href="/contact" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/contact" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            Contact
                                        </Link>
                                    </div>
                                    <div className="flex flex-col mt-6">
                                        <Link href="/contact" className="w-full px-6 py-3 bg-[#3F426B] text-white text-center rounded-full hover:bg-[#2C3E7C] transition-all duration-300 font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                            <span>Let's Connect</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Empty space to prevent content from hiding behind the fixed navbar */}
            {/* The height accounts for both AnnouncementBar (40px) and Navbar (56px) */}
            <div className="w-full transition-all duration-700 ease-in-out" style={{
                height: isScrolled ? '40px' : '96px'
            }}></div>
        </div>
    );
};

export default Navbar;
