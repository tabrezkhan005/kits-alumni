import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
    Mail,
    MapPin,
    Phone,
    Instagram,
    Linkedin,
    Copyright,
    ExternalLink
} from "lucide-react";

const Footer = () => {
    return (
        <>
            {/* Footer Start */}
            <div className="bg-gray-50 py-16 border-t">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Logo and About Section */}
                        <div className="col-span-1 lg:col-span-1">
                            <div className="space-y-4">
                                <div className="mb-4">
                                    <Image
                                        src="/img/alumini logo2.jpg"
                                        alt="KITS AI ML Department Logo"
                                        className="h-16 w-auto rounded-lg"
                                        width={100}
                                        height={64}
                                    />
                                </div>
                                <h5 className="text-gray-800 font-medium text-lg">Department of Artificial Intelligence & Machine Learning</h5>
                                <p className="text-gray-600">KKR & KSR Institute of Technology and Sciences</p>
                                <p className="text-gray-600">Pioneering education and research in AI & ML technologies since 2018.</p>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-span-1">
                            <div className="space-y-4">
                                <h4 className="text-xl font-semibold mb-4 text-gray-900">Quick Links</h4>
                                <nav className="flex flex-col space-y-2">
                                    <FooterLink href="/" label="Home" />
                                    <FooterLink href="/about" label="About Us" />
                                    <FooterLink href="/event" label="Events" />
                                    <FooterLink href="/achievements" label="Achievements" />
                                    <FooterLink href="/members" label="Faculty" />
                                    <FooterLink href="/blog" label="Blog" />
                                </nav>
                            </div>
                        </div>

                        {/* Resources */}
                        <div className="col-span-1">
                            <div className="space-y-4">
                                <h4 className="text-xl font-semibold mb-4 text-gray-900">Resources</h4>
                                <nav className="flex flex-col space-y-2">
                                    <FooterLink href="/alumni" label="Alumni Directory" />
                                    <FooterLink href="/gallery" label="Gallery" />
                                    <FooterLink href="/resources" label="Learning Resources" />
                                    <FooterLink href="/faq" label="FAQ" />
                                    <FooterLink href="/contact" label="Contact Us" />
                                    <FooterLink href="/privacy" label="Privacy Policy" />
                                </nav>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="col-span-1">
                            <div className="space-y-4">
                                <h4 className="text-xl font-semibold mb-4 text-gray-900">Contact Information</h4>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-start">
                                        <MapPin className="h-5 w-5 text-[#800020] mr-3 mt-1 flex-shrink-0" />
                                        <p className="text-gray-600">KKR & KSR Institute of Technology and Sciences, Vinjanampadu, Guntur, Andhra Pradesh - 522017</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-[#800020] mr-3 flex-shrink-0" />
                                        <a href="mailto:ai-hod@kitsguntur.ac.in" className="text-gray-600 hover:text-[#800020] transition">ai-hod@kitsguntur.ac.in</a>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-[#800020] mr-3 flex-shrink-0" />
                                        <a href="tel:+919848508545" className="text-gray-600 hover:text-[#800020] transition">+91 9848508545</a>
                                    </div>
                                    <div className="flex items-center space-x-3 mt-2">
                                        <Button size="icon" variant="outline" className="rounded-full h-10 w-10 border-gray-300 hover:bg-[#800020] hover:text-white hover:border-[#800020]">
                                            <Linkedin className="h-4 w-4" />
                                            <span className="sr-only">LinkedIn</span>
                                        </Button>
                                        <Button size="icon" variant="outline" className="rounded-full h-10 w-10 border-gray-300 hover:bg-[#800020] hover:text-white hover:border-[#800020]">
                                            <Instagram className="h-4 w-4" />
                                            <span className="sr-only">Instagram</span>
                                        </Button>
                                        <Button size="icon" variant="outline" className="rounded-full h-10 w-10 border-gray-300 hover:bg-[#800020] hover:text-white hover:border-[#800020]">
                                            <ExternalLink className="h-4 w-4" />
                                            <span className="sr-only">Website</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}

            {/* Copyright Start */}
            <div className="bg-[#800020] text-white py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <Copyright className="h-4 w-4 mr-2" />
                            <span className="text-sm">2024 KKR & KSR Institute of Technology and Sciences. All rights reserved.</span>
                        </div>
                        <div className="text-sm">
                            <span>Department of Artificial Intelligence & Machine Learning</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Copyright End */}
        </>
    );
};

// Helper component for footer links
const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <Link
        href={href}
        className="text-gray-600 hover:text-[#800020] group flex items-center transition-all duration-200"
    >
        <span className="h-1 w-1 bg-[#800020] rounded-full mr-2 group-hover:bg-[#800020] transition-all"></span>
        <span className="group-hover:translate-x-1 transition-transform duration-200 group-hover:underline">{label}</span>
    </Link>
);

export default Footer;
