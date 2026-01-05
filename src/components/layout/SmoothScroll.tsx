"use client";

import React from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll Component
 *
 * Provides smooth scrolling functionality using Lenis
 * Enhances the user experience, especially for sticky elements like the footer
 *
 * Features:
 * - Smooth momentum-based scrolling
 * - Better scrolling performance
 * - Improved sticky element animations
 * - Optimized for modern browsers
 */

export function SmoothScroll({ children }: { children: React.ReactNode }) {
	React.useEffect(() => {
		// Initialize Lenis smooth scroll
		const lenis = new Lenis({
			duration: 1.2, // Animation duration in seconds
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
			orientation: 'vertical', // Vertical scroll
			gestureOrientation: 'vertical',
			smoothWheel: true, // Enable smooth wheel scrolling
			wheelMultiplier: 1, // Scroll speed multiplier
			touchMultiplier: 2,
		});

		// Animation frame function
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		// Start the animation loop
		requestAnimationFrame(raf);

		// Cleanup function
		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}










