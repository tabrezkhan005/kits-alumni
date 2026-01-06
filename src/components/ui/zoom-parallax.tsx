'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Image interface for zoom parallax
 */
interface Image {
	src: string;
	alt?: string;
}

/**
 * Zoom Parallax Props
 */
interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: Image[];
}

/**
 * Zoom Parallax Component
 * Creates a stunning zoom parallax effect with multiple layered images
 * As user scrolls, images zoom at different rates creating depth
 */
export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);

	// Ensure component is mounted on client
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
		layoutEffect: false, // Prevent layout issues
	});

	// Different scale transforms for layered effect
	// Start from visible size (1.0) and scale up smoothly
	// Use more gradual scaling for better animation
	const scale4 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2.5, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 3, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 3.5, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 4.5, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 5, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	// Image position styles based on index - Full width layout
	const getImageStyle = (index: number): React.CSSProperties => {
		switch (index) {
			case 0:
				return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '40vh', width: '40vw', maxWidth: '600px', maxHeight: '400px' }; // Center
			case 1:
				return { top: '10%', left: '5%', height: '35vh', width: '30vw', maxWidth: '450px', maxHeight: '350px' };
			case 2:
				return { top: '15%', right: '5%', height: '40vh', width: '25vw', maxWidth: '400px', maxHeight: '380px' };
			case 3:
				return { bottom: '20%', left: '10%', height: '30vh', width: '28vw', maxWidth: '420px', maxHeight: '300px' };
			case 4:
				return { bottom: '25%', right: '10%', height: '32vh', width: '26vw', maxWidth: '400px', maxHeight: '320px' };
			case 5:
				return { top: '50%', left: '2%', transform: 'translateY(-50%)', height: '28vh', width: '22vw', maxWidth: '350px', maxHeight: '280px' };
			case 6:
				return { top: '50%', right: '2%', transform: 'translateY(-50%)', height: '26vh', width: '20vw', maxWidth: '320px', maxHeight: '260px' };
			default:
				return {};
		}
	};

	if (!isMounted) {
		return (
			<div className="relative h-[200vh] w-full">
				<div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-transparent">
					<div className="text-white text-xl">Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<div ref={container} className="relative h-[200vh] w-full">
			{/* Sticky container that holds all images - Full width */}
			<div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
				{/* Images container - Full width, no centering */}
				<div className="absolute inset-0 w-full h-full">
					{images.map(({ src, alt }, index) => {
						const scale = scales[index % scales.length];
						const positionStyle = getImageStyle(index);
						// Remove transform from positionStyle if we're applying scale transform
						const { transform, ...styleWithoutTransform } = positionStyle;

						return (
							<motion.div
								key={`parallax-img-${index}`}
								style={{
									scale,
									...styleWithoutTransform,
									position: 'absolute',
									zIndex: images.length - index, // Layered z-index
								}}
								initial={{ opacity: 0.8 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<div
									className="relative min-w-[200px] min-h-[150px]"
									style={{
										height: positionStyle.height || '25vh',
										width: positionStyle.width || '25vw',
										transform: transform || 'none',
									}}
								>
									<Image
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										src={src || '/placeholder.svg'}
										alt={alt || `Parallax image ${index + 1}`}
										className="object-cover rounded-xl shadow-2xl border-2 border-white/30"
										loading="eager"
										onError={(e) => {
											// Fallback to placeholder if image fails to load
											(e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop';
										}}
									/>
									{/* Subtle overlay for depth */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl pointer-events-none"></div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
