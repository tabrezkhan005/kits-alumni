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
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY);

            // Hide navbar when scrolling down, show when scrolling up (after minimum scroll)
            if (scrollDifference > 5) {
                if (scrollingDown && currentScrollY > 80) {
                    setIsVisible(false);
                } else if (!scrollingDown) {
                    setIsVisible(true);
                }
            }

            setIsScrolled(currentScrollY > 50);
            lastScrollY = currentScrollY;
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
                animate={{
                    y: isVisible ? 0 : -100,
                    transition: { duration: 0.3, ease: "easeInOut" }
                }}
                className={cn(
                    "w-full fixed z-40 bg-white top-[40px]",
                    isScrolled && "shadow-lg"
                )}
            >
                <div className={cn(
                    "w-full transition-all duration-300 border-b",
                    isScrolled
                        ? "bg-white border-navy/10 py-2 shadow-sm"
                        : "bg-white border-gray-100 py-3"
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
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "relative px-3 py-2 text-[13px] font-bold tracking-wide transition-all duration-300 rounded-full",
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

                            {/* CTA Buttons */}
                            <div className="hidden lg:flex items-center gap-2">
                                {/* Login Button - Subtle outlined */}
                                <Link href="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-5 py-2 text-[13px] font-bold text-navy border border-navy/20 rounded-full hover:border-navy/40 hover:bg-navy/5 transition-all duration-300"
                                    >
                                        Login
                                    </motion.button>
                                </Link>

                                {/* Register Button - Bold gold filled */}
                                <Link href="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(212, 167, 46, 0.4)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="relative overflow-hidden group px-5 py-2 text-[13px] font-bold text-navy bg-gradient-to-r from-gold to-gold-light rounded-full shadow-md shadow-gold/20 transition-all duration-300"
                                    >
                                        <span className="relative z-10">Register</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    </motion.button>
                                </Link>

                                {/* Divider */}
                                <div className="w-px h-6 bg-navy/10 mx-1" />

                                {/* Schedule a Meet */}
                                <Link href="/schedule">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="relative group px-5 py-2 bg-white text-navy rounded-full overflow-hidden transition-all duration-500 text-[13px] font-bold flex items-center gap-2 border border-navy/20 hover:border-navy/40 hover:shadow-lg"
                                    >
                                        <span>Schedule a Meet</span>
                                        <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center shadow-sm">
                                            <ChevronRight className="w-3 h-3 text-navy transition-transform group-hover:translate-x-0.5" strokeWidth={3} />
                                        </div>
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="lg:hidden flex items-center">
                                {!mounted ? (
                                    <Button variant="ghost" size="icon" className="text-navy hover:bg-navy/5 h-12 w-12 text-gray-400">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                ) : (
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-navy hover:bg-navy/5 h-12 w-12">
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
                                                <div className="flex flex-col space-y-2">
                                                    {navLinks.map((link) => (
                                                        <Link
                                                            key={link.name}
                                                            href={link.href}
                                                            className={cn(
                                                                "px-6 py-5 text-lg font-bold transition-all duration-300 flex items-center justify-between rounded-xl min-h-[60px]",
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
                                                <div className="mt-auto px-4 pb-10 space-y-3">
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Link href="/login" className="flex items-center justify-center py-4 rounded-2xl font-bold text-navy border border-navy/20 hover:bg-navy/5 transition-all min-h-[56px]">
                                                            Login
                                                        </Link>
                                                        <Link href="/register" className="flex items-center justify-center py-4 rounded-2xl font-bold text-navy bg-gradient-to-r from-gold to-gold-light shadow-lg shadow-gold/20 min-h-[56px]">
                                                            Register
                                                        </Link>
                                                    </div>
                                                    <Link href="/schedule" className="w-full relative group flex items-center justify-center gap-3 bg-white text-navy py-4 rounded-2xl font-bold shadow-xl shadow-navy/20 overflow-hidden border border-navy/20 min-h-[56px]">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                        <span className="relative z-10">Schedule a Meet</span>
                                                        <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </motion.div>

            {/* Spacer */}
            <div className="w-full transition-all duration-500" style={{
                height: isScrolled ? '60px' : '100px'
            }}></div>
        </div>
    );
};

export default Navbar;
