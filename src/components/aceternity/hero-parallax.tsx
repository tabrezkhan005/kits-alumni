"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
  description?: string;
}

interface HeroParallaxProps {
  products: Product[];
  className?: string;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  products,
  className,
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-dark via-navy-dark/80 to-transparent" />

      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen relative z-20 px-4">
        {/* Left side - Content */}
        <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-white font-space-grotesk leading-tight">
              Welcome to{" "}
              <span className="gradient-text bg-gradient-to-r from-gold-primary to-gold-light bg-clip-text text-transparent">
                KITS CSM
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Pioneering Innovation in Computer Science & Machine Learning
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gold-primary text-navy-dark font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover-glow">
                <span className="relative z-10">Explore Programs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-primary to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="px-8 py-4 border-2 border-gold-primary text-gold-primary font-semibold rounded-lg transition-all duration-300 hover:bg-gold-primary hover:text-navy-dark hover:scale-105">
                Join CSM Community
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-primary">500+</div>
                <div className="text-sm text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-primary">98%</div>
                <div className="text-sm text-gray-400">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-primary">50+</div>
                <div className="text-sm text-gray-400">Research Papers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Floating cards */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={product.title}
                className={cn(
                  "group relative h-48 rounded-xl overflow-hidden cursor-pointer",
                  index === 0 && "col-span-2 h-32",
                  index === 1 && "row-span-2 h-full",
                  "card-hover"
                )}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-navy-light/20 to-gold-primary/20" />
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {product.title}
                  </h3>
                  {product.description && (
                    <p className="text-gray-300 text-xs">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Floating elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gold-primary/20 rounded-full blur-xl animate-float" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-navy-light/20 rounded-full blur-xl animate-float-reverse" />
        </div>
      </div>
    </div>
  );
};



