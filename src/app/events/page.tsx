import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Video, Users, Sparkles } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Department Events | KITS CSM',
  description: 'Stay updated with the latest workshops, seminars, and alumni meetups at KITS Computer Science & Machine Learning department.',
};

// Mock events data for the UI overhaul
const events = [
  {
    id: 1,
    title: "International Conference on Neural Networks",
    date: "2026-03-15",
    time: "09:00 AM - 05:00 PM",
    location: "KITS Main Auditorium",
    category: "CONFERENCE",
    type: "In-Person",
    image: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Alumni Meet 2026: Rekindling Connections",
    date: "2026-04-20",
    time: "10:30 AM onwards",
    location: "Vinjanampadu Campus",
    category: "ALUMNI",
    type: "In-Person",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Workshop: Advanced MLOps Patterns",
    date: "2026-02-10",
    time: "02:00 PM - 04:00 PM",
    location: "Online via Zoom",
    category: "WORKSHOP",
    type: "Virtual",
    image: "https://images.unsplash.com/photo-1591115765373-520b7098f7bb?q=80&w=800&auto=format&fit=crop"
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero 
        title="Departmental Events"
        subtitle="Join our technical workshops, alumni networking sessions, and academic conferences designed to foster growth and collaboration."
        size={400}
      />

      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-navy mb-4">Upcoming Schedule</h2>
            <div className="w-20 h-1 bg-gold rounded-full"></div>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
             <button className="px-6 py-2 rounded-full bg-navy text-white text-xs font-bold shadow-lg shadow-navy/20">Upcoming</button>
             <button className="px-6 py-2 rounded-full bg-gray-50 text-gray-400 text-xs font-bold hover:bg-navy/5 transition-all">Past Events</button>
          </div>
        </div>

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

        {/* Calendar View CTA */}
        <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-gray-100">
           <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                 <Sparkles className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-3xl font-space-grotesk font-bold text-navy mb-4">Never miss a beat</h3>
              <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                Subscribe to our departmental calendar and get notified about guest lectures, hackathons, and research symposiums.
              </p>
              <button className="px-10 py-4 bg-navy text-white rounded-full font-bold text-sm hover:bg-gold hover:text-navy transition-all shadow-2xl shadow-navy/10 flex items-center gap-3 mx-auto">
                 SYNC WITH CALENDAR
                 <Video className="w-4 h-4" />
              </button>
           </div>
           
           {/* Decorative */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-navy/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>

      {/* Community Hosting CTA */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
           <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[4rem] text-center max-w-5xl mx-auto">
              <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block">Host an Event</span>
              <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-10">
                Are you an alum with <span className="text-gold">insight</span>?
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-12 font-medium">
                We're always looking for alumni to share their expertise. Host a webinar, conduct a workshop, or join a panel discussion.
              </p>
              <Link href="/contact">
                <button className="px-12 py-5 bg-gold text-navy font-bold rounded-full hover:bg-white transition-all shadow-2xl shadow-gold/20 flex items-center gap-3 mx-auto">
                    PROPOSE AN EVENT
                    <Users className="w-4 h-4" />
                </button>
              </Link>
           </div>
        </div>
      </section>
    </main>
  );
}