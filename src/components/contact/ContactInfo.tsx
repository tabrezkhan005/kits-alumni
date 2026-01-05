"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('queries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            category: formData.category,
            message: formData.message,
          }
        ]);

      if (error) {
        toast.error("Failed to submit your message. Please try again.");
        return;
      }

      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });

      toast.success("Thank you! Your message has been received.");
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContactCard = ({ icon, title, content, index }: { icon: React.ReactNode, title: string, content: string | React.ReactNode, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-navy/5 hover:shadow-2xl hover:shadow-navy/10 hover:border-gold/30 transition-all duration-500 group"
    >
      <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
        <div className="text-navy transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h4 className="text-xl font-space-grotesk font-bold text-navy mb-3">{title}</h4>
      <div className="text-gray-500 text-sm leading-relaxed font-medium">
        {content}
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-6 py-24">
      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <ContactCard 
          index={0}
          icon={<MapPin className="w-8 h-8" />}
          title="Campus Location"
          content={
            <p>
              Department of CS & ML<br />
              KKR & KSR Institute of Technology and Sciences<br />
              Vinjanampadu, Guntur, AP - 522017
            </p>
          }
        />
        <ContactCard 
          index={1}
          icon={<Phone className="w-8 h-8" />}
          title="Direct Contact"
          content={
            <p>
              Department Head Office<br />
              <span className="text-navy font-bold">+91 98485 08545</span>
            </p>
          }
        />
        <ContactCard 
          index={2}
          icon={<Mail className="w-8 h-8" />}
          title="Email Support"
          content={
            <p>
              Inquiries & Admissions<br />
              <span className="text-navy font-bold">hod_csm@kits.edu.in</span>
            </p>
          }
        />
      </div>

      {/* Contact Form and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Form Side */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-navy p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-navy/30 relative overflow-hidden"
        >
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase">Contact Us</span>
               <div className="w-10 h-0.5 bg-gold/30"></div>
            </div>
            <h3 className="text-3xl font-space-grotesk font-bold text-white mb-10">Send a Query</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-4">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-4">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-4">Query Category</label>
                <select
                  id="category"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white/70 focus:outline-none focus:border-gold transition-all appearance-none"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled className="bg-navy">Select a category</option>
                  <option value="general" className="bg-navy">General Inquiry</option>
                  <option value="alumni" className="bg-navy">Alumni Registration</option>
                  <option value="event" className="bg-navy">Event Proposal</option>
                  <option value="mentorship" className="bg-navy">Mentorship Program</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-4">Your Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold transition-all resize-none"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-navy font-bold py-5 rounded-2xl hover:bg-gold-light transition-all shadow-xl shadow-gold/10 flex items-center justify-center gap-3 disabled:opacity-50 group"
              >
                {isSubmitting ? "Processing..." : "Submit Message"}
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Map Side */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-full flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
             <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase">Location</span>
             <div className="w-10 h-0.5 bg-gold/30"></div>
          </div>
          <h3 className="text-3xl font-space-grotesk font-bold text-navy mb-10">Find our Campus</h3>
          
          <div className="flex-1 min-h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white shadow-navy/10 relative group">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d957.6140388892469!2d80.42868853498763!3d16.248375264983594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a74eab6bb902d%3A0x256a70b621cbfbf0!2sKKR%20AND%20KSR%20Institute%20Of%20Technology%20And%20Sciences!5e0!3m2!1sen!2sin!4v1744625377772!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                       <Info className="text-gold w-5 h-5" />
                    </div>
                    <p className="text-[11px] font-bold text-navy uppercase tracking-tight">Main Campus Entrance, Vinjanampadu</p>
                 </div>
              </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
