'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Video, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  type: string;
  image: string;
}

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-navy/5 hover:shadow-2xl hover:shadow-navy/15 hover:border-gold/30 transition-all duration-500 flex flex-col"
        >
          <div className="relative h-64 overflow-hidden">
            <Image 
              src={event.image} 
              alt={event.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
               <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-bold text-navy shadow-lg border border-white/20 uppercase tracking-widest">
                 {event.category}
               </span>
               <span className={cn(
                 "px-4 py-1.5 backdrop-blur-md rounded-xl text-[10px] font-bold text-white shadow-lg border border-white/20 uppercase tracking-widest",
                 event.type === 'Virtual' ? 'bg-navy/80' : 'bg-gold/80'
               )}>
                 {event.type}
               </span>
            </div>
          </div>

          <div className="p-10 flex-1 flex flex-col">
            <div className="flex items-center gap-4 text-xs font-bold text-gold uppercase tracking-tighter mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <h3 className="text-2xl font-space-grotesk font-bold text-navy mb-6 group-hover:text-gold transition-colors duration-300 leading-tight">
              {event.title}
            </h3>

            <div className="space-y-4 mb-8">
               <div className="flex items-start gap-3 text-gray-500">
                  <Clock className="w-5 h-5 text-navy/30 shrink-0" />
                  <p className="text-sm font-medium">{event.time}</p>
               </div>
               <div className="flex items-start gap-3 text-gray-500">
                  <MapPin className="w-5 h-5 text-navy/30 shrink-0" />
                  <p className="text-sm font-medium">{event.location}</p>
               </div>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
               <Link href={`/events/${event.id}`} className="group/btn flex items-center gap-3 bg-navy text-white px-8 py-3 rounded-full font-bold text-xs hover:bg-gold hover:text-navy transition-all shadow-xl shadow-navy/10">
                  REGISTER NOW
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
