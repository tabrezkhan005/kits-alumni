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

  const ContactCard = ({ icon, title, content, index }: { icon: React.ReactNode, title: string, content: string | React.ReactNode, index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-gold/50 transition-all duration-300 group"
      >
        <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors duration-300">
          <div className="text-navy group-hover:text-gold transition-colors duration-300">
            {icon}
          </div>
        </div>
        <h4 className="text-lg font-bold text-navy mb-3">{title}</h4>
        <div className="text-gray-600 text-sm leading-relaxed">
          {content}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-24 bg-gray-50">
      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <ContactCard
          index={0}
          icon={<MapPin className="w-8 h-8" />}
          title="Campus Location"
          content={
            <div>
              <p className="text-sm leading-relaxed mb-3">
                Department of CS & ML<br />
                KKR & KSR Institute of Technology and Sciences<br />
                Vinjanampadu, Guntur, AP - 522017
              </p>
              <button
                onClick={() => window.open('https://maps.google.com/?q=KKR & KSR Institute of Technology and Sciences, Vinjanampadu, Guntur', '_blank')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300"
              >
                <MapPin className="w-3 h-3" />
                Get Directions
              </button>
            </div>
          }
        />
        <ContactCard
          index={1}
          icon={<Phone className="w-8 h-8" />}
          title="Direct Contact"
          content={
            <div>
              <p className="text-sm leading-relaxed mb-3">
                Department Head Office<br />
                <span className="text-navy font-bold">+91 98485 08545</span>
              </p>
              <a
                href="/schedule"
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300"
              >
                <Phone className="w-3 h-3" />
                Schedule Meet
              </a>
            </div>
          }
        />
        <ContactCard
          index={2}
          icon={<Mail className="w-8 h-8" />}
          title="Email Support"
          content={
            <div>
              <p className="text-sm leading-relaxed mb-3">
                Inquiries & Admissions<br />
                <span className="text-navy font-bold">hod_csm@kits.edu.in</span>
              </p>
              <button
                onClick={() => window.open('mailto:hod_csm@kits.edu.in')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300"
              >
                <Mail className="w-3 h-3" />
                Send Email
              </button>
            </div>
          }
        />
      </div>

      {/* Contact Form and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" id="contact-form">
        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200"
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
               <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase">Get in Touch</span>
               <div className="w-8 h-0.5 bg-gold/30"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-space-grotesk font-bold text-navy mb-2">Send us a Message</h3>
            <p className="text-gray-600">We'll get back to you within 24 hours</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-navy uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-navy uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-navy uppercase tracking-wide">Query Category</label>
                <select
                  id="category"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="general">General Inquiry</option>
                  <option value="alumni">Alumni Registration</option>
                  <option value="event">Event Proposal</option>
                  <option value="mentorship">Mentorship Program</option>
                  <option value="technical">Technical Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-navy uppercase tracking-wide">Your Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-navy text-white font-bold py-4 rounded-xl hover:bg-gold hover:text-navy transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
          </form>
        </motion.div>

        {/* Map Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-full flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
             <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase">Location</span>
             <div className="w-8 h-0.5 bg-gold/30"></div>
          </div>
          <h3 className="text-2xl md:text-3xl font-space-grotesk font-bold text-navy mb-6">Visit Our Campus</h3>
          <p className="text-gray-600 mb-8 text-sm">Located in the heart of Guntur, Andhra Pradesh</p>

          <div className="flex-1 min-h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 relative group">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d957.6140388892469!2d80.42868853498763!3d16.248375264983594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a74eab6bb902d%3A0x256a70b621cbfbf0!2sKKR%20AND%20KSR%20Institute%20Of%20Technology%20And%20Sciences!5e0!3m2!1sen!2sin!4v1744625377772!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-500"
                title="KITS Campus Location"
              ></iframe>
              <div className="absolute bottom-4 left-4 right-4">
                 <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                         <MapPin className="text-gold w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">KKR & KSR Institute</p>
                        <p className="text-xs text-gray-600">Vinjanampadu, Guntur</p>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open('https://maps.google.com/?q=KKR & KSR Institute of Technology and Sciences, Vinjanampadu, Guntur', '_blank')}
                      className="w-full px-4 py-2 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-gold hover:text-navy transition-all duration-300"
                    >
                      Get Directions
                    </button>
                 </div>
              </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
