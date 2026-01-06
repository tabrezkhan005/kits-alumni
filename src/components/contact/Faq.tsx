'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    id: "faq1",
    question: "How do I join the Alumni Association?",
    answer: "To join our Alumni Association, simply click on the \"Register\" button in the navigation menu and fill out the registration form. Once your details are verified by the department, you will receive a confirmation email with your membership access."
  },
  {
    id: "faq2",
    question: "How can I update my contact information?",
    answer: "You can update your contact information by logging into your alumni dashboard and editing your profile. For critical changes, you can also email the HOD's office directly."
  },
  {
    id: "faq3",
    question: "Are there any membership fees?",
    answer: "Basic membership in the KITS CSM Alumni Association is currently free for all graduates. We encourage active participation in our mentorship and research programs."
  },
  {
    id: "faq4",
    question: "How can I participate in alumni events?",
    answer: "Information about upcoming events is regularly posted on our Events page. You can RSVP for events through the website or by contacting the departmental event coordinator."
  },
  {
    id: "faq5",
    question: "Can I contribute to the department?",
    answer: "Yes! We highly value alumni contributions in the form of guest lectures, research collaborations, industry mentorship, and internship opportunities for current students."
  }
];

export default function Faq() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mx-auto mb-6">
             <HelpCircle className="w-6 h-6 text-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-bold text-navy mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our alumni network and departmental services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-navy pr-4">
                  {item.question}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  activeId === item.id
                    ? "bg-gold text-navy rotate-180"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gold group-hover:text-navy"
                }`}>
                  <motion.div
                    animate={{ rotate: activeId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeId === item.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6">
                       <div className="h-px bg-gray-200 mb-4 w-full" />
                       <p className="text-gray-600 leading-relaxed">
                         {item.answer}
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-navy mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Can't find what you're looking for? We're here to help.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-gold hover:text-navy transition-all duration-300"
              >
                Contact Us
              </button>
              <button
                onClick={() => window.open('mailto:hod_csm@kits.edu.in')}
                className="px-6 py-3 bg-white border border-gray-200 text-navy font-semibold rounded-xl hover:border-gold hover:text-gold transition-all duration-300"
              >
                Send Email
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
