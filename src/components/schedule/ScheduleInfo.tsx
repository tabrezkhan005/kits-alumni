"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, Video, Calendar, Users, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book meetings during business hours, Monday through Friday, with options for different time slots."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "All meetings are conducted through secure Google Meet links with end-to-end encryption."
  },
  {
    icon: Video,
    title: "HD Video Calls",
    description: "Crystal clear video and audio quality for professional discussions and presentations."
  },
  {
    icon: Calendar,
    title: "Calendar Integration",
    description: "Automatic calendar invites sent to both participants for easy scheduling management."
  },
  {
    icon: Users,
    title: "Multiple Participants",
    description: "Invite additional participants or bring team members to collaborative discussions."
  },
  {
    icon: CheckCircle2,
    title: "Confirmation System",
    description: "Receive instant confirmation and reminders via email to ensure no meetings are missed."
  }
];

const processSteps = [
  {
    step: "01",
    title: "Fill the Form",
    description: "Provide your details, preferred date/time, and meeting topic"
  },
  {
    step: "02",
    title: "Get Confirmation",
    description: "Receive instant confirmation and calendar invitation"
  },
  {
    step: "03",
    title: "Join Meeting",
    description: "Click the Google Meet link at the scheduled time"
  },
  {
    step: "04",
    title: "Connect & Discuss",
    description: "Engage in productive discussions with our faculty"
  }
];

export default function ScheduleInfo() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full mb-6"
            >
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-navy font-medium text-sm">Meeting Features</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-bold text-navy mb-6">
              Why Choose Our{" "}
              <span className="text-gold">Scheduling System</span>
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience seamless, professional meeting scheduling with integrated Google Meet functionality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-bold text-navy mb-6">
              How It{" "}
              <span className="text-gold">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple, streamlined process from scheduling to connection
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="text-center relative"
                >
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">
                    {step.step}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>

                  {/* Arrow for desktop */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gold/50" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-space-grotesk font-bold text-navy mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Check out our comprehensive FAQ section for answers to common questions about scheduling and meetings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact#faq-section"
                className="px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-gold hover:text-navy transition-all duration-300"
              >
                View FAQ
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-white border border-gray-200 text-navy font-semibold rounded-xl hover:border-gold hover:text-gold transition-all duration-300"
              >
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

