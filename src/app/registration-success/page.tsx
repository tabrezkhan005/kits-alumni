"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, GraduationCap, Clock, Mail } from "lucide-react";

export default function RegistrationSuccessPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-8 font-inter relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-space-grotesk font-bold text-navy mb-4"
        >
          Welcome to the <span className="text-gold">Alumni Family!</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 font-medium mb-10 leading-relaxed"
        >
          Your registration has been submitted successfully. The department will review your request and you'll be notified once approved.
        </motion.p>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <Clock className="w-6 h-6 text-gold mx-auto mb-2" />
            <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest">Review Time</p>
            <p className="text-navy font-bold text-sm mt-1">24-48 Hours</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <Mail className="w-6 h-6 text-gold mx-auto mb-2" />
            <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest">Notification</p>
            <p className="text-navy font-bold text-sm mt-1">Via Email</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <GraduationCap className="w-6 h-6 text-gold mx-auto mb-2" />
            <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest">Access</p>
            <p className="text-navy font-bold text-sm mt-1">After Approval</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="bg-navy text-white font-bold py-4 px-8 rounded-[1.5rem] hover:bg-gold hover:text-navy transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-2 group"
          >
            Back to Home
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="bg-white text-navy font-bold py-4 px-8 rounded-[1.5rem] hover:bg-gray-50 transition-all border border-gray-200 flex items-center justify-center gap-2"
          >
            Go to Login
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
