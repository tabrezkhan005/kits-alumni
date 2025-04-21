"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

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
      // Insert form data into Supabase queries table (lowercase)
      const { error } = await supabase
        .from('queries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            category: formData.category,
            message: formData.message,
            // priority and status will use defaults from table definition
          }
        ]);

      if (error) {
        console.error("Supabase error:", error);
        toast.error(error.message || "Failed to submit your message. Please try again later.");
        return;
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });

      // Show success toast
      toast.success("Thank you for your message. We will get back to you soon!");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 border border-gray-100" data-animate-on-scroll>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-burgundy rounded-full p-4 mr-4">
              <i className="fa fa-map-marker-alt text-white text-xl"></i>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-3 text-burgundy">Visit Us</h5>
              <p className="text-gray-700">
                Department of AI & ML<br />
                KKR & KSR Institute of Technology and Sciences<br />
                Vinjanampadu, Guntur, AP - 522017
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 border border-gray-100" data-animate-on-scroll>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-burgundy rounded-full p-4 mr-4">
              <i className="fa fa-phone-alt text-white text-xl"></i>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-3 text-burgundy">Call Us</h5>
              <p className="text-gray-700">
                Department Head<br />
                +91 9848508545
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 border border-gray-100" data-animate-on-scroll>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-burgundy rounded-full p-4 mr-4">
              <i className="fa fa-envelope text-white text-xl"></i>
            </div>
            <div>
              <h5 className="text-xl font-bold mb-3 text-burgundy">Email Us</h5>
              <p className="text-gray-700">
                Department Head<br />
                ai-hod@kitsguntur.ac.in
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="shadow-lg rounded-lg p-8 border border-gray-200" data-animate-on-scroll>
          <h3 className="text-2xl font-bold text-burgundy mb-6">Send Us A Message</h3>
          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="form-floating">
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <label htmlFor="name" className="sr-only">Your Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <label htmlFor="email" className="sr-only">Your Email</label>
              </div>
            </div>

            <div className="mb-5">
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                id="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <label htmlFor="subject" className="sr-only">Subject</label>
            </div>

            <div className="mb-5">
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="" disabled>Select a category</option>
                <option value="general">General Inquiry</option>
                <option value="alumni">Alumni Registration</option>
                <option value="event">Event Proposal</option>
                <option value="mentorship">Mentorship Program</option>
                <option value="donation">Donations & Sponsorships</option>
              </select>
              <label htmlFor="category" className="sr-only">Category</label>
            </div>

            <div className="mb-5">
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                placeholder="Your Message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              ></textarea>
              <label htmlFor="message" className="sr-only">Message</label>
            </div>

            <button
              className="w-full bg-burgundy hover:bg-burgundy-dark text-white font-semibold py-3 px-6 rounded-md transition duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="h-full" data-animate-on-scroll>
          <h3 className="text-2xl font-bold text-burgundy mb-6">Find Us Here</h3>
          <div className="h-[450px] rounded-lg overflow-hidden shadow-xl border-2 border-burgundy/20 hover:shadow-2xl transition-shadow duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d957.6140388892469!2d80.42868853498763!3d16.248375264983594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a74eab6bb902d%3A0x256a70b621cbfbf0!2sKKR%20AND%20KSR%20Institute%20Of%20Technology%20And%20Sciences!5e0!3m2!1sen!2sin!4v1744625377772!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
