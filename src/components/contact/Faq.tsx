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
  const [activeId, setActiveId] = useState<string | null>("faq1");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <HelpCircle className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-4xl font-space-grotesk font-bold text-navy mb-6">Common Inquiries</h2>
          <p className="text-gray-500 font-medium">
            Everything you need to know about the KITS CSM Alumni Network and departmental collaborations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                activeId === item.id 
                ? "border-gold/30 bg-navy/5 shadow-xl shadow-navy/5" 
                : "border-gray-100 bg-white hover:border-gold/20"
              }`}
            >
              <button
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className={`text-lg font-bold font-space-grotesk transition-colors ${
                  activeId === item.id ? "text-gold" : "text-navy"
                }`}>
                  {item.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  activeId === item.id ? "bg-gold text-navy rotate-0" : "bg-navy/5 text-navy rotate-90"
                }`}>
                  {activeId === item.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8">
                       <div className="h-px bg-gold/10 mb-6 w-full" />
                       <p className="text-gray-500 leading-relaxed font-medium">
                         {item.answer}
                       </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
