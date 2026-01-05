'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, User, Calendar, Trophy } from 'lucide-react';
import { Achievement } from '@/types/achievement'; // I should check if this exists or define it

interface AchievementsListProps {
  achievements: any[];
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {achievements.map((ach) => (
        <motion.article
          key={ach.id}
          variants={item}
          className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-navy/5 hover:shadow-2xl hover:shadow-navy/15 hover:border-gold/30 transition-all duration-500 flex flex-col"
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={ach.image || "https://images.unsplash.com/photo-1523240715630-19d7bb1d33ed?q=80&w=800&auto=format&fit=crop"}
              alt={ach.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6">
              <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-bold text-navy shadow-lg border border-white/20 uppercase tracking-widest">
                 {ach.category}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="p-10 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-gold">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>

            <h3 className="text-2xl font-space-grotesk font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300 leading-tight">
              {ach.title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
              {ach.description}
            </p>

            <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3.5 h-3.5 text-gold" />
                  <span className="text-xs font-bold text-navy">{ach.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-300" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {new Date(ach.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 bg-navy/5 rounded-full flex items-center justify-center group-hover:bg-gold transition-all duration-300">
                <Trophy className="w-4 h-4 text-navy group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
