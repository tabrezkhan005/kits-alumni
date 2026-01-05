"use client"

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Zap } from 'lucide-react';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

/**
 * AI/ML Related Images for Zoom Parallax Effect
 * High-quality AI/ML themed images
 */
const aiMLImages = [
	{
		src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Artificial Intelligence neural networks visualization',
	},
	{
		src: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Machine Learning algorithms and data processing',
	},
	{
		src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Neural network connections and deep learning',
	},
	{
		src: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Data science and analytics visualization',
	},
	{
		src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Computer vision and image recognition technology',
	},
	{
		src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Advanced AI research and innovation',
	},
	{
		src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
		alt: 'Robotics and automation with AI integration',
	},
];

/**
 * Branch Glimpse Section
 * A stunning zoom parallax showcase of AI/ML branch
 * Replaces the Interactive Program Showcase section
 */
export function BranchGlimpseSection() {
	return (
		<section className="relative bg-gradient-to-br from-[#2A2E5C] via-[#3F426B] to-[#2A2E5C] overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
			<div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A72E]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A72E]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

			{/* Section Header - Above Parallax */}
			<div className="relative z-20 pt-20 pb-12">
				<div className="container mx-auto px-4 md:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center max-w-4xl mx-auto"
					>
						{/* Section Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A72E]/20 border border-[#D4A72E]/30 rounded-full text-[#D4A72E] text-sm font-semibold mb-6 font-poppins-semibold">
							<Sparkles className="w-4 h-4" />
							Explore Our Excellence
						</div>

						{/* Main Title */}
						<h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 font-space-grotesk-bold leading-tight">
							A Glimpse into Our{' '}
							<span className="text-[#D4A72E] relative">
								Future
								<motion.span
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.8, delay: 0.3 }}
									className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4A72E] origin-left"
								/>
							</span>
						</h2>

						{/* Subtitle */}
						<p className="text-xl md:text-2xl text-gray-200 font-poppins-regular leading-relaxed mb-8">
							Immerse yourself in the world of Artificial Intelligence and Machine Learning.
							Scroll to experience the depth of innovation that defines our department.
						</p>

						{/* Stats Row */}
						<div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-10">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
								className="flex items-center gap-3"
							>
								<div className="w-12 h-12 rounded-full bg-[#D4A72E]/20 flex items-center justify-center">
									<Brain className="w-6 h-6 text-[#D4A72E]" />
								</div>
								<div className="text-left">
									<div className="text-2xl font-bold text-white font-space-grotesk-bold">AI/ML</div>
									<div className="text-sm text-gray-300 font-poppins-medium">Specializations</div>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3 }}
								className="flex items-center gap-3"
							>
								<div className="w-12 h-12 rounded-full bg-[#D4A72E]/20 flex items-center justify-center">
									<Zap className="w-6 h-6 text-[#D4A72E]" />
								</div>
								<div className="text-left">
									<div className="text-2xl font-bold text-white font-space-grotesk-bold">Cutting-Edge</div>
									<div className="text-sm text-gray-300 font-poppins-medium">Research Labs</div>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.4 }}
								className="flex items-center gap-3"
							>
								<div className="w-12 h-12 rounded-full bg-[#D4A72E]/20 flex items-center justify-center">
									<Sparkles className="w-6 h-6 text-[#D4A72E]" />
								</div>
								<div className="text-left">
									<div className="text-2xl font-bold text-white font-space-grotesk-bold">Innovation</div>
									<div className="text-sm text-gray-300 font-poppins-medium">Driven Excellence</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Zoom Parallax Effect - Full Width */}
			<div className="relative z-10 w-full -mx-4 md:-mx-6 lg:-mx-8">
				<ZoomParallax images={aiMLImages} />
			</div>

			{/* Bottom Section - After Parallax */}
			<div className="relative z-20 pt-20 pb-20">
				<div className="container mx-auto px-4 md:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center max-w-3xl mx-auto"
					>
						<h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-space-grotesk-bold">
							Experience the Future of Technology
						</h3>
						<p className="text-lg md:text-xl text-gray-200 mb-8 font-poppins-regular leading-relaxed">
							From neural networks to intelligent systems, our department is at the forefront of AI and ML innovation.
							Join us in shaping the digital landscape of tomorrow.
						</p>
						<Link
							href="/programs"
							className="inline-flex items-center gap-2 px-10 py-5 bg-[#D4A72E] text-[#2A2E5C] font-bold text-lg rounded-xl hover:bg-[#C4972A] transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#D4A72E]/50 font-poppins-bold"
						>
							Explore Our Programs
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
