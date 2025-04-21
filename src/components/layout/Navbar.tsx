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
    const [showTopbar, setShowTopbar] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => {
            setShowTopbar(window.innerWidth >= 992); // lg breakpoint
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        // Initialize on mount
        handleResize();
        handleScroll();

        // Add event listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="w-full relative">
            {/* Fixed wrapper for the entire navbar, creating hover effect */}
            <div className={cn(
                "w-full fixed top-0 z-50 transition-all duration-300",
                isScrolled ? "shadow-lg" : ""
            )}>
                {/* Top Bar */}
                <div className={cn(
                    "w-full transition-all duration-300",
                    isScrolled
                      ? "bg-[#800020]/85 backdrop-blur-sm py-1"
                      : "bg-[#800020] py-2"
                )}>
                    <div className="container mx-auto px-4 flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <span className="mr-2">
                                    <i className="fas fa-map-marker-alt text-[#D4AF37]"></i>
                                </span>
                                <a href="https://maps.app.goo.gl/DstAStquPrbKjZQp7" className="text-white text-sm hover:text-white/90 transition-colors">
                                    Vinjanampadu, Guntur
                                </a>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2">
                                    <i className="fas fa-envelope text-[#D4AF37]"></i>
                                </span>
                                <a href="mailto:ai-hod@kitsguntur.ac.in" className="text-white text-sm hover:text-white/90 transition-colors">
                                    ai-hod@kitsguntur.ac.in
                                </a>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#800020] hover:bg-white hover:scale-105 transition-all">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#800020] hover:bg-white hover:scale-105 transition-all">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className={cn(
                    "w-full transition-all duration-300",
                    isScrolled ? "bg-white/90 backdrop-blur-sm" : "bg-white"
                )}>
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center justify-between py-3">
                            <Link href="/" className="flex items-center space-x-3">
                                <Image
                                    src="/img/alumini logo1.jpg"
                                    alt="KITS AI & ML"
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                                <h1 className="text-[#800020] font-medium text-xl lg:text-2xl">
                                    KITS <span className="text-[#D4AF37]">Alumni</span>
                                </h1>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center">
                                <div className="flex items-center space-x-6 mr-8">
                                    <Link href="/" className={cn(
                                        "relative px-1 py-2 text-lg font-medium transition-colors hover:text-[#800020] group font-bold",
                                        pathname === "/" ? "text-[#800020] font-semibold" : ""
                                    )}>
                                        Home
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-[#800020] transform origin-left transition-transform duration-300",
                                            pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/about" className={cn(
                                        "relative px-1 py-2 text-lg font-medium transition-colors hover:text-[#800020] group font-bold",
                                        pathname === "/about" ? "text-[#800020] font-semibold" : ""
                                    )}>
                                        About
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-[#800020] transform origin-left transition-transform duration-300",
                                            pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/event" className={cn(
                                        "relative px-1 py-2 text-lg font-medium transition-colors hover:text-[#800020] group font-bold",
                                        pathname === "/event" ? "text-[#800020] font-semibold" : ""
                                    )}>
                                        Events
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-[#800020] transform origin-left transition-transform duration-300",
                                            pathname === "/event" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/achievements" className={cn(
                                        "relative px-1 py-2 text-lg font-medium transition-colors hover:text-[#800020] group font-bold",
                                        pathname === "/achievements" ? "text-[#800020] font-semibold" : ""
                                    )}>
                                        Achievements
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-[#800020] transform origin-left transition-transform duration-300",
                                            pathname === "/achievements" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/blog" className={cn(
                                        "relative px-1 py-2 text-lg font-medium transition-colors hover:text-[#800020] group font-bold",
                                        pathname === "/blog" ? "text-[#800020] font-semibold" : ""
                                    )}>
                                        Blog
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-[#800020] transform origin-left transition-transform duration-300",
                                            pathname === "/blog" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/faculty" className={cn(
                                        "relative px-1 py-2 text-lg font-medium transition-colors hover:text-[#800020] group font-bold",
                                        pathname === "/faculty" ? "text-[#800020] font-semibold" : ""
                                    )}>
                                        Faculty
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-[#800020] transform origin-left transition-transform duration-300",
                                            pathname === "/faculty" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                    <Link href="/contact" className={cn(
                                        "relative px-1 py-2 text-lg font-medium transition-colors hover:text-[#800020] group font-bold",
                                        pathname === "/contact" ? "text-[#800020] font-semibold" : ""
                                    )}>
                                        Contact
                                        <span className={cn(
                                            "absolute bottom-0 left-0 w-full h-0.5 bg-[#800020] transform origin-left transition-transform duration-300",
                                            pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        )}></span>
                                    </Link>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Link href="/login" className="px-6 py-2 border border-[#800020] text-[#800020] rounded-full hover:bg-[#800020] hover:text-white transition-colors duration-300 text-lg font-bold">
                                        Login
                                    </Link>
                                    <Link href="/register" className="px-6 py-2 bg-[#800020] text-white rounded-full hover:bg-[#600010] transition-colors duration-300 text-lg font-bold">
                                        Register
                                    </Link>
                                </div>
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
                                        <Link href="/contact" className={cn(
                                            "px-3 py-2 text-lg font-medium hover:text-[#800020] border-l-4",
                                            pathname === "/contact" ? "text-[#800020] font-semibold border-[#800020]" : "border-transparent"
                                        )}>
                                            Contact
                                        </Link>
                                    </div>
                                    <div className="flex flex-col space-y-3 mt-6">
                                        <Link href="/login" className="w-full px-6 py-2 border border-[#800020] text-[#800020] text-center rounded-full hover:bg-[#800020] hover:text-white transition-colors duration-300">
                                            Login
                                        </Link>
                                        <Link href="/register" className="w-full px-6 py-2 bg-[#800020] text-white text-center rounded-full hover:bg-[#600010] transition-colors duration-300">
                                            Register
                                        </Link>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Empty space to prevent content from hiding behind the fixed navbar */}
            <div className="w-full" style={{
                height: isScrolled ? 'calc(var(--topbar-height-scrolled) + var(--navbar-height))'
                                   : 'calc(var(--topbar-height) + var(--navbar-height))'
            }}></div>
        </div>
    );
};

export default Navbar;
