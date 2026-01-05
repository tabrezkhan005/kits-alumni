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

                            {/* Portal Access Button */}
                            <div className="hidden lg:flex items-center">
                                <Link href="/login">
                                    <motion.button
                                        whileHover="hover"
                                        whileTap="tap"
                                        initial="initial"
                                        animate={{
                                            boxShadow: [
                                                "0 0 20px rgba(0,31,63,0.1)",
                                                "0 0 25px rgba(212,175,55,0.2)",
                                                "0 0 20px rgba(0,31,63,0.1)"
                                            ]
                                        }}
                                        transition={{
                                            boxShadow: {
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        }}
                                        className="relative group px-6 py-2.5 bg-navy text-white rounded-full overflow-hidden transition-all duration-500 text-sm font-bold flex items-center gap-3 border border-white/10"
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
                                        <div className="absolute inset-0 bg-navy group-hover:bg-navy-dark transition-colors duration-300" />
                                        
                                        <span className="relative z-20">Portal Access</span>
                                        
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
                                                <Link href="/login" className="w-full relative group flex items-center justify-center gap-3 bg-navy text-white py-4 rounded-2xl font-bold shadow-xl shadow-navy/20 overflow-hidden border border-white/10">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                    <span className="relative z-10">Student Login</span>
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
                height: isScrolled ? '40px' : '106px'
            }}></div>
        </div>
    );
};

export default Navbar;
