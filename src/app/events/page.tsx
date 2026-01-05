import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Video, Users, Sparkles, Calendar, ArrowRight, MapPin, Clock } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { EventsList } from '@/components/layout/events-list';
import { FinalCTASection } from '@/components/layout/final-cta-section';

export const metadata: Metadata = {
  title: 'Department Events | KITS CSM',
  description: 'Stay updated with the latest workshops, seminars, and alumni meetups at KITS Computer Science & Machine Learning department.',
};

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
        title="Engineering Events & Symposiums"
        subtitle="Explore our technical workshops, global conferences, and networking events designed to keep you at the forefront of AI and ML innovation."
        variant="grid"
      />

      <section className="container mx-auto px-6 py-24">
        {/* Featured Event Spotlight */}
        <div className="mb-32">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-1 bg-gold rounded-full" />
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Featured Event</span>
          </div>
          
          <div className="group relative bg-navy rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row items-stretch border border-navy/10 shadow-2xl shadow-navy/20">
            <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
               <Image 
                 src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
                 alt="Featured Event"
                 fill
                 className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/20 to-transparent"></div>
               <div className="absolute top-10 left-10">
                  <span className="px-6 py-2 bg-gold text-navy rounded-full font-bold text-xs shadow-xl uppercase tracking-widest">
                    Registration Open
                  </span>
               </div>
            </div>
            
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
               <div className="flex items-center gap-4 text-gold mb-6">
                  <Calendar className="w-5 h-5" />
                  <span className="font-bold tracking-widest text-xs uppercase">March 24-26, 2026</span>
               </div>
               
               <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-8 leading-tight">
                 Global AI & <span className="text-gold">Machine Learning</span> Summit
               </h2>
               
               <p className="text-white/60 text-lg mb-12 font-medium leading-relaxed">
                 The flagship event of KITS CSM department. Bringing together global experts, researchers, and alumni for three days of deep technical exploration and networking.
               </p>
               
               <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="flex flex-col gap-2">
                     <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Venue</span>
                     <span className="text-white font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold" />
                        Main Campus
                     </span>
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Speakers</span>
                     <span className="text-white font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold" />
                        12+ Experts
                     </span>
                  </div>
               </div>
               
               <button className="w-fit px-12 py-5 bg-gold text-navy font-bold rounded-full hover:bg-white transition-all shadow-2xl shadow-gold/10 flex items-center gap-3 group/btn">
                  SECURE YOUR SEAT
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>

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

        <EventsList events={events} />

        {/* Calendar View CTA */}
        <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-gray-100 mb-24">
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

      <FinalCTASection />
    </main>
  );
}
