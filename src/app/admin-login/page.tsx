"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
    if (authError) setAuthError(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setAuthError(null);
      try {
        const response = await fetch('/api/admin-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        const data = await response.json();

        if (response.ok && data.success) {
          router.push(`/admin`);
        } else {
          throw new Error(data.error || 'Admin login failed');
        }
      } catch (error) {
        setAuthError(error instanceof Error ? error.message : 'Login failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-navy border-t-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white flex overflow-hidden font-inter">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy to-black relative items-center justify-center p-20 overflow-hidden">
         <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px]" />
         </div>

         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-10 text-center max-w-lg"
         >
            <Link href="/" className="inline-flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-12 hover:translate-x-[-4px] transition-transform">
               <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
               <ShieldCheck className="w-12 h-12 text-gold" />
            </div>
            <h1 className="text-5xl font-space-grotesk font-bold text-white mb-6 leading-tight">
               Admin <span className="text-gold">Portal</span>
            </h1>
            <p className="text-white/60 font-medium leading-relaxed">
               Securely manage the KITS CSM alumni network, authenticate users, and govern platform content.
            </p>
         </motion.div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-space-grotesk font-bold text-navy mb-4">Admin Access</h2>
            <p className="text-gray-500 font-medium">Please enter your authorized credentials</p>
          </div>

          {authError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              {authError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-4">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-5 text-navy font-bold text-sm placeholder:text-gray-300 focus:outline-none focus:border-navy transition-all",
                    errors.email && "border-red-500"
                  )}
                  placeholder="admin@university.edu"
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase ml-4">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-4">
                 <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest">Password</label>
                 <Link href="/forgot-password" className="text-[10px] font-bold text-gold uppercase tracking-widest hover:text-navy transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-5 text-navy font-bold text-sm placeholder:text-gray-300 focus:outline-none focus:border-navy transition-all",
                    errors.password && "border-red-500"
                  )}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-bold uppercase ml-4">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy text-white font-bold py-6 rounded-[1.5rem] hover:bg-gold hover:text-navy transition-all shadow-2xl shadow-navy/20 flex items-center justify-center gap-3 disabled:opacity-70 group overflow-hidden relative mt-8"
            >
              {isLoading ? (
               <div className="flex items-center gap-3">
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 <span>LOGGING IN...</span>
               </div>
              ) : (
                <>
                  LOGIN
                  <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
      </div>
    </main>
  );
}
