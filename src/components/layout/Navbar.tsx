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
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
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
                    "w-full fixed z-40 transition-all duration-500",
                    isScrolled ? "top-0 shadow-xl" : "top-[40px]"
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

                            {/* Portal Access Button */}
                            <div className="hidden lg:flex items-center">
                                <Link href="/schedule">
                                    <motion.button
                                        whileHover="hover"
                                        whileTap="tap"
                                        initial="initial"
                                        variants={{
                                            initial: {
                                                boxShadow: "0 0 20px rgba(0,0,0,0.1)"
                                            },
                                            hover: {
                                                boxShadow: [
                                                    "0 0 20px rgba(0,0,0,0.1)",
                                                    "0 0 40px rgba(212,175,55,0.3)",
                                                    "0 0 20px rgba(0,0,0,0.1)"
                                                ],
                                                transition: {
                                                    boxShadow: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }
                                                }
                                            }
                                        }}
                                        className="relative group px-6 py-2.5 bg-white text-navy rounded-full overflow-hidden transition-all duration-500 text-sm font-bold flex items-center gap-3 border border-navy/20"
                                    >
                                        {/* Shimmer Effect */}
                                        <motion.div
                                            variants={{
                                                initial: { x: "-100%" },
                                                hover: { x: "100%" }
                                            }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
                                        />

                                        {/* Background Glow */}
                                        <div className="absolute inset-0 bg-white group-hover:bg-gray-50 transition-colors duration-300 z-10" />

                                        <span className="relative z-20">Schedule a Meet</span>

                                        <motion.div
                                            variants={{
                                                initial: { x: 0 },
                                                hover: { x: 3 }
                                            }}
                                            className="relative z-20 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/20"
                                        >
                                            <ChevronRight className="w-3.5 h-3.5 text-navy transition-transform group-hover:scale-110" strokeWidth={3} />
                                        </motion.div>

                                        {/* Pulse Ring */}
                                        <div className="absolute inset-0 rounded-full border border-gold/0 group-hover:border-gold/50 group-hover:scale-105 transition-all duration-500" />
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="lg:hidden flex items-center">
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
                                            <div className="mt-auto px-4 pb-10">
                                                <Link href="/schedule" className="w-full relative group flex items-center justify-center gap-3 bg-white text-navy py-5 rounded-2xl font-bold shadow-xl shadow-navy/20 overflow-hidden border border-navy/20 min-h-[60px]">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                    <span className="relative z-10">Schedule a Meet</span>
                                                    <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
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
                height: isScrolled ? '60px' : '100px'
            }}></div>
        </div>
    );
};

export default Navbar;
