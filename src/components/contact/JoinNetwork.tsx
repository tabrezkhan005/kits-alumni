'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Users, ArrowRight } from 'lucide-react';

export default function JoinNetwork() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Alumni Network</span>
              <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-navy leading-tight">
                Connect with the <span className="text-gold">Future</span> of CSM
              </h2>
            </div>
            
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Stay connected with the KITS CS & ML Department community. Update your information, network with fellow alumni, and participate in our upcoming research symposia and technical events.
            </p>

            <ul className="space-y-4">
              {[
                "Access to exclusive technical workshops",
                "Global professional networking opportunities",
                "Mentorship programs for current students",
                "Career development & placement resources"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-6 h-6 bg-navy/5 rounded-full flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4 text-navy" />
                  </div>
                  <span className="text-navy font-bold text-sm tracking-tight">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-6">
              <Link href="/register">
                <button className="px-10 py-5 bg-navy text-white font-bold rounded-full hover:bg-gold hover:text-navy transition-all shadow-2xl shadow-navy/10 flex items-center gap-3 group">
                  REGISTER NOW
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-navy/20 border-[12px] border-white group">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop"
                alt="KITS Alumni Network"
                width={800}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 hidden md:block"
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center">
                    <Users className="text-navy w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-2xl font-space-grotesk font-bold text-navy">1200+</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Members</p>
                 </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-navy/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
