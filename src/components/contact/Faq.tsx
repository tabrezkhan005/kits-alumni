"use client";

import { useState, useRef, useEffect } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

// Predefined FAQ data to avoid re-renders
const faqItems: FaqItem[] = [
  {
    id: "faq1",
    question: "How do I join the Alumni Association?",
    answer: "To join our Alumni Association, simply click on the \"Register\" button in the navigation menu and fill out the registration form. Once your details are verified, you will receive a confirmation email with your membership details."
  },
  {
    id: "faq2",
    question: "How can I update my contact information?",
    answer: "You can update your contact information by logging into your alumni account and editing your profile. Alternatively, you can email us at ai-hod@kitsguntur.ac.in with your updated details."
  },
  {
    id: "faq3",
    question: "Are there any membership fees?",
    answer: "Basic membership in the KITS AI & ML Alumni Association is free. However, we do offer premium membership with additional benefits for a nominal annual fee. Details can be found on the registration page."
  },
  {
    id: "faq4",
    question: "How can I participate in alumni events?",
    answer: "Information about upcoming events is regularly posted on our Events page. You can register for events through the website or by contacting the event coordinator directly."
  },
  {
    id: "faq5",
    question: "Can I contribute to the alumni network?",
    answer: "Yes! We welcome contributions from our alumni in various forms including mentorship, guest lectures, internship opportunities, sponsorships, and donations. Please contact us through the form on this page to discuss how you can contribute."
  },
  {
    id: "faq6",
    question: "How can I access the alumni directory?",
    answer: "The alumni directory is available to registered members. After logging in, you can access the directory through the Members section of the website. It contains contact information for alumni who have opted to share their details."
  }
];

export default function Faq() {
  const [activeItem, setActiveItem] = useState<string>("faq1");
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Toggle accordion item
  const toggleAccordion = (id: string) => {
    setActiveItem(prevActiveItem => prevActiveItem === id ? "" : id);
  };

  // Set reference callback that properly handles the HTMLDivElement
  const setContentRef = (id: string) => (element: HTMLDivElement | null) => {
    contentRefs.current[id] = element;
  };

  // Simple renderFaqItem function that doesn't rely on dynamic height calculations
  const renderFaqItem = (item: FaqItem) => (
    <div
      key={item.id}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-4 transition-all duration-300 ease-in-out"
      data-animate-on-scroll
    >
      <button
        className={`w-full text-left px-6 py-4 font-semibold flex justify-between items-center transition-all duration-300 ${
          activeItem === item.id ? "bg-burgundy text-white" : "bg-white text-burgundy hover:bg-gray-50"
        }`}
        onClick={() => toggleAccordion(item.id)}
        aria-expanded={activeItem === item.id}
        aria-controls={`content-${item.id}`}
      >
        <span>{item.question}</span>
        <i className={`fas ${activeItem === item.id ? "fa-minus" : "fa-plus"} transition-transform duration-300`}></i>
      </button>
      <div
        id={`content-${item.id}`}
        ref={setContentRef(item.id)}
        className={`bg-white overflow-hidden transition-all duration-700 ease-in-out ${
          activeItem === item.id ? "max-h-96" : "max-h-0"
        }`}
        style={{
          opacity: activeItem === item.id ? 1 : 0
        }}
      >
        <div className="px-6 py-4">
          <p className="text-gray-700">{item.answer}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-burgundy mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-700">
          Find answers to common questions about the KITS AI & ML Alumni Association.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          {faqItems.slice(0, 3).map(item => renderFaqItem(item))}
        </div>

        <div>
          {faqItems.slice(3).map(item => renderFaqItem(item))}
        </div>
      </div>
    </div>
  );
}
