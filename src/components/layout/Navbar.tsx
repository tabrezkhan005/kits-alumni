"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from "lucide-react";
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

import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Faculty", href: "/faculty" },
        { name: "Events", href: "/events" },
        { name: "Achievements", href: "/achievements" },
        { name: "Blog", href: "/blog" },
        { name: "Forum", href: "/forum" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <div className="w-full relative">
            <motion.div 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "w-full fixed z-40 transition-all duration-500",
                    isScrolled ? "top-0 shadow-xl" : "top-10"
                )}
            >
                <div className={cn(
                    "w-full transition-all duration-300 border-b overflow-hidden",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-md border-navy/10 py-2"
                        : "bg-white/95 backdrop-blur-sm border-gray-100 py-3"
                )}>
                    <div className="container mx-auto px-6">
                        <nav className="flex items-center justify-between font-inter">
                            <Link href="/" className="flex items-center group">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Image
                                        src="/logo1.png"
                                        alt="KITS CSM"
                                        width={isScrolled ? 50 : 64}
                                        height={isScrolled ? 50 : 64}
                                        className="rounded-lg transition-all duration-300 shadow-sm group-hover:shadow-md"
                                    />
                                </motion.div>
                                <div className="ml-3 hidden sm:block">
                                    <h1 className={cn(
                                        "font-space-grotesk font-bold leading-none transition-all duration-300",
                                        isScrolled ? "text-lg text-navy" : "text-xl text-navy"
                                    )}>KITS CSM</h1>
                                    <p className="text-[10px] text-gold font-bold tracking-widest uppercase">Department</p>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-1">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.name}
                                        href={link.href} 
                                        className={cn(
                                            "relative px-4 py-2 text-[14px] font-bold tracking-wide transition-all duration-300 rounded-full",
                                            pathname === link.href 
                                                ? "text-navy bg-navy/5" 
                                                : "text-gray-600 hover:text-navy hover:bg-navy/5"
                                        )}
                                    >
                                        {link.name}
                                        {pathname === link.href && (
                                            <motion.span 
                                                layoutId="nav-underline"
                                                className="absolute bottom-1 left-4 right-4 h-0.5 bg-gold-primary rounded-full"
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>

                            {/* Let's Connect Button */}
                            <div className="hidden lg:flex items-center">
                                <Link href="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2.5 bg-navy text-white rounded-full hover:bg-navy-dark transition-all duration-300 text-sm font-bold shadow-lg shadow-navy/20 flex items-center gap-2 border border-navy/10"
                                    >
                                        <span>Portal Access</span>
                                        <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                                            <ChevronRight className="w-3 h-3 text-navy" strokeWidth={3} />
                                        </div>
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="lg:hidden flex items-center">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-navy hover:bg-navy/5">
                                            <Menu className="h-6 w-6" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-navy/10 bg-white/95 backdrop-blur-xl">
                                        <div className="flex flex-col h-full py-6">
                                            <div className="flex items-center mb-10 px-4">
                                                <Image src="/logo1.png" alt="Logo" width={50} height={50} />
                                                <div className="ml-3">
                                                    <h2 className="text-xl font-bold text-navy font-space-grotesk">KITS CSM</h2>
                                                    <p className="text-[10px] text-gold font-bold tracking-widest uppercase">Navigation</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                {navLinks.map((link) => (
                                                    <Link 
                                                        key={link.name}
                                                        href={link.href} 
                                                        className={cn(
                                                            "px-4 py-4 text-lg font-bold transition-all duration-300 flex items-center justify-between rounded-xl",
                                                            pathname === link.href 
                                                                ? "text-navy bg-navy/5 translate-x-2" 
                                                                : "text-gray-600 hover:text-navy hover:bg-navy/5 hover:translate-x-2"
                                                        )}
                                                    >
                                                        {link.name}
                                                        {pathname === link.href && <div className="w-2 h-2 rounded-full bg-gold shadow-glow" />}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="mt-auto px-4 pb-10">
                                                <Link href="/login" className="w-full flex items-center justify-center gap-2 bg-navy text-white py-4 rounded-2xl font-bold shadow-xl shadow-navy/20">
                                                    Student Login
                                                    <ChevronRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </nav>
                    </div>
                </div>
            </motion.div>

            {/* Spacer */}
            <div className="w-full transition-all duration-500" style={{
                height: isScrolled ? '40px' : '106px'
            }}></div>
        </div>
    );
};

export default Navbar;
