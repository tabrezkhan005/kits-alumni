"use client";

import { useEffect } from 'react';

const WowScript = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Handle spinner
            const spinner = document.getElementById('spinner');
            if (spinner) {
                setTimeout(() => {
                    spinner.classList.remove('show');
                }, 1000);
            }

            // Custom scroll animations
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('[data-animate-on-scroll]');

                elements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

                    if (rect.bottom >= 0 && rect.top <= viewHeight - 100) {
                        element.classList.add('animated');
                    }
                });
            };

            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Check initial state

            return () => {
                window.removeEventListener('scroll', animateOnScroll);
            };
        }
    }, []);

    return null; // This component doesn't render anything
};

export default WowScript;
