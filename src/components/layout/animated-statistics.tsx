"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, GraduationCap, Code2, Briefcase } from 'lucide-react';

const statisticsData = [
  {
    id: 1,
    number: 500,
    suffix: '+',
    label: 'Alumni Network',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-gold'
  },
  {
    id: 2,
    number: 50,
    suffix: '+',
    label: 'Expert Faculty',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-navy-light'
  },
  {
    id: 3,
    number: 120,
    suffix: '+',
    label: 'Research Projects',
    icon: <Code2 className="w-6 h-6" />,
    color: 'bg-gold'
  },
  {
    id: 4,
    number: 98,
    suffix: '%',
    label: 'Placement Rate',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'bg-navy-light'
  },
];

function CountUp({ end, suffix, duration = 2 }: { end: number, suffix: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const endValue = end;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / endValue;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === endValue) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function AnimatedStatistics() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statisticsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="p-10 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-navy/5 group-hover:border-gold/30 transition-all duration-500 h-full">
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-navy font-space-grotesk tracking-tight mb-2">
                  <CountUp end={stat.number} suffix={stat.suffix} />
                </div>
                
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                  {stat.label}
                </p>
                
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
