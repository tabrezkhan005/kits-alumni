"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export const AnimatedShinyText: React.FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    <p
      className={cn(
        "mx-auto max-w-md text-neutral-600 dark:text-neutral-300",
        className
      )}
    >
      <span className="inline-flex animate-shimmer bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--shimmer-width)] bg-clip-text text-transparent">
        {children}
      </span>
    </p>
  );
};



