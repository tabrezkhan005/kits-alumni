"use client";

import { useEffect, useState } from 'react';
import { Loader } from "lucide-react";

export default function Spinner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide spinner when page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Small delay for visual smoothness
    };

    // Check if window is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback to ensure spinner is hidden eventually
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div id="spinner" className={`fixed inset-0 bg-white z-50 flex items-center justify-center ${isLoading ? 'show' : ''}`}>
      <div className="relative">
        <Loader className="h-10 w-10 text-[#800020] animate-spin" />
        <div className="absolute top-0 -left-1 h-10 w-10 animate-ping rounded-full bg-[#800020] opacity-20"></div>
      </div>
    </div>
  );
}
