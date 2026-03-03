import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import {
	Mail,
	MapPin,
	Phone,
	Instagram,
	Linkedin,
	ExternalLink,
	Send,
} from 'lucide-react';
import { Button } from './button';
import Image from 'next/image';
import Link from 'next/link';

/**
 * FooterLink Interface
 * Defines the structure for individual footer links
 */
interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

/**
 * FooterLinkGroup Interface
 * Groups related footer links under a common label
 */
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

/**
 * StickyFooterProps
 * Extends standard footer HTML properties
 */
type StickyFooterProps = React.ComponentProps<'footer'>;

/**
 * StickyFooter Component
 *
 * A modern sticky footer component for KITS Alumni website
 * Features:
 * - Sticky scroll behavior with clip-path effect
 * - Brand colors: Primary #3F426B, Secondary #D4A72E
 * - Animated entrance effects
 * - Newsletter subscription
 * - Social media integration
 * - Responsive design
 * - "Crafted by Tabrez Khan" signature
 */
export function StickyFooter({ className, ...props }: StickyFooterProps) {
	const [email, setEmail] = React.useState('');

	// Handle newsletter subscription
	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		// Add your newsletter subscription logic here
		console.log('Subscribing email:', email);
		setEmail('');
	};

	return (
		<footer
			className={cn('relative w-full', className)}
			style={{
				clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)',
				height: '100vh',
				minHeight: '800px'
			}}
			{...props}
		>
			<div className="fixed bottom-0 w-full" style={{ height: '100vh', minHeight: '800px' }}>
				<div className="sticky h-full overflow-y-auto" style={{ top: 0 }}>
					<div className="relative flex size-full flex-col justify-between gap-5 bg-[#2A2E5C] border-t-2 border-white/20 px-4 py-12 md:px-16 lg:px-24">
						{/* Background decorative elements */}
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict opacity-20"
						>
							<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,.06)_0,rgba(255,255,255,.02)_50%,transparent_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,.04)_0,rgba(255,255,255,.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
						</div>

						{/* Main footer content */}
						<div className="flex-1 flex items-center">
							<div className="w-full flex flex-col gap-12 md:flex-row relative z-10">
							{/* Brand and About Section */}
							<AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-6">
								<div className="flex items-center gap-4">
									<Image
										src="/logo1.png"
										alt="KITS CSM Department Logo"
										width={60}
										height={60}
										className="rounded-lg shadow-lg"
									/>
									<div>
										<h3 className="text-white text-xl font-bold font-space-grotesk-bold">KITS CSM</h3>
										<p className="text-white/70 text-xs font-poppins-regular">Alumni Network</p>
									</div>
								</div>
								<p className="text-white/90 text-sm leading-relaxed font-poppins-regular">
									Department of Computer Science & Machine Learning at KKR & KSR Institute.
									Pioneering education and research in CS & ML technologies since 2018.
								</p>

								{/* Newsletter Subscription */}
								<div className="space-y-3">
									<h4 className="text-white font-semibold text-sm uppercase tracking-wider font-jetbrains-bold">Newsletter</h4>
									<form onSubmit={handleSubscribe} className="flex gap-2">
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Enter your email"
											required
											className="flex-1 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm font-poppins-regular"
										/>
										<Button
											type="submit"
											size="icon"
											className="bg-white hover:bg-white/90 text-[#2A2E5C] rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
										>
											<Send className="size-4" />
										</Button>
									</form>
								</div>

								{/* Social Links */}
								<div className="flex gap-2">
									{socialLinks.map((link) => (
										<Link key={link.title} href={link.href}>
											<Button
												size="icon"
												variant="outline"
												className="size-10 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white hover:border-white text-white hover:text-[#2A2E5C] transition-all duration-300 hover:scale-110"
											>
												<link.icon className="size-4" />
												<span className="sr-only">{link.title}</span>
											</Button>
										</Link>
									))}
								</div>
							</AnimatedContainer>

							{/* Footer Link Groups */}
							{footerLinkGroups.map((group, index) => (
								<AnimatedContainer
									key={group.label}
									delay={0.1 + index * 0.1}
									className="w-full"
								>
									<div className="mb-10 md:mb-0">
										<h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 border-b border-white/20 pb-2 font-jetbrains-bold">
											{group.label}
										</h3>
										<ul className="text-white/80 space-y-3 text-sm font-poppins-regular">
											{group.links.map((link) => (
												<li key={link.title}>
													<Link
														href={link.href}
														className="hover:text-white inline-flex items-center transition-all duration-300 group"
													>
														{link.icon && <link.icon className="me-2 size-4" />}
														<span className="group-hover:translate-x-1 transition-transform duration-200">
															{link.title}
														</span>
													</Link>
												</li>
											))}
										</ul>
									</div>
								</AnimatedContainer>
							))}

							{/* Contact Information */}
							<AnimatedContainer delay={0.4} className="w-full max-w-xs">
								<div className="space-y-6">
									<h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6 border-b border-white/20 pb-2 font-jetbrains-bold">
										Contact Us
									</h3>
									<div className="space-y-4 text-sm font-poppins-regular">
										<div className="flex items-start gap-3 group">
											<MapPin className="size-5 text-white flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
											<p className="text-white/90 leading-relaxed">
												Vinjanampadu, Guntur, Andhra Pradesh - 522017
											</p>
										</div>
										<div className="flex items-center gap-3 group">
											<Mail className="size-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
											<a
												href="mailto:ai-hod@kitsguntur.ac.in"
												className="text-white/90 hover:text-white transition-colors duration-300"
											>
												ai-hod@kitsguntur.ac.in
											</a>
										</div>
										<div className="flex items-center gap-3 group">
											<Phone className="size-5 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
											<a
												href="tel:+919848508545"
												className="text-white/90 hover:text-white transition-colors duration-300"
											>
												+91 9848508545
											</a>
										</div>
									</div>
								</div>
							</AnimatedContainer>
							</div>
						</div>

						{/* Bottom bar with copyright and credits */}
						<div className="text-white/80 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm md:flex-row relative z-10 font-poppins-regular">
							<p className="text-center md:text-left">
								© 2025 KKR & KSR Institute of Technology and Sciences. All rights reserved.
							</p>
							<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
								<p className="text-white/70">Department of CS & ML</p>
								<span className="hidden sm:inline text-white/30">•</span>
								<p className="flex items-center gap-2">
									<span className="text-white/70">Crafted with</span>
									<motion.span
										animate={{ scale: [1, 1.2, 1] }}
										transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
										className="text-white"
									>
										♥
									</motion.span>
									<span className="text-white/70">by</span>
									<span className="text-white font-semibold font-space-grotesk-semibold">Tabrez Khan</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

/**
 * Social Media Links
 * KITS Alumni social media profiles
 */
const socialLinks = [
	{ title: 'LinkedIn', href: 'https://linkedin.com/company/kitsguntur', icon: Linkedin },
	{ title: 'Instagram', href: 'https://instagram.com/kitsguntur', icon: Instagram },
	{ title: 'Website', href: 'https://kitsguntur.ac.in', icon: ExternalLink },
];

/**
 * Footer Link Groups
 * Organized navigation links for the footer
 */
const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'Quick Links',
		links: [
			{ title: 'Home', href: '/' },
			{ title: 'About CSM', href: '/about' },
			{ title: 'Programs', href: '/programs' },
			{ title: 'Research', href: '/research' },
			{ title: 'Faculty', href: '/faculty' },
			{ title: 'Placements', href: '/placements' },
			{ title: 'Events', href: '/events' },
			{ title: 'Contact', href: '/contact' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Alumni Directory', href: '/alumni' },
			{ title: 'Gallery', href: '/gallery' },
			{ title: 'Blog', href: '/blog' },
			{ title: 'Achievements', href: '/achievements' },
			{ title: 'Forum', href: '/forum' },
			{ title: 'Learning Resources', href: '/resources' },
			{ title: 'FAQ', href: '/faq' },
			{ title: 'Admin Portal', href: '/admin-login' },
		],
	},
	{
		label: 'For Students',
		links: [
			{ title: 'Student Portal', href: '/student-dashboard' },
			{ title: 'Register', href: '/register' },
			{ title: 'Login', href: '/login' },
			{ title: 'Career Services', href: '/career' },
			{ title: 'Internships', href: '/internships' },
			{ title: 'Projects', href: '/projects' },
		],
	},
];

/**
 * AnimatedContainer Component
 *
 * Wraps child elements with scroll-triggered animations
 * Features:
 * - Fade-in effect
 * - Blur reduction
 * - Vertical translation
 * - Respects user's motion preferences
 */
type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	// If user prefers reduced motion, skip animations
	if (shouldReduceMotion) {
		return <div {...props}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
