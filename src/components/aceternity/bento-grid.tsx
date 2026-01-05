"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface BentoGridItem {
  title: string;
  description: string;
  header: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

interface BentoGridProps {
  items: BentoGridItem[];
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  items,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
            item.className
          )}
        >
          {item.header}
          <div className="group-hover/bento:translate-x-2 transition duration-300">
            {item.icon}
            <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
              {item.title}
            </div>
            <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const BentoGridItem: React.FC<{
  title: string;
  description: string;
  header: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}> = ({ title, description, header, className, icon }) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-300">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};



