"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, BadgeCheck, User, Calendar, Phone, AlertCircle, UserX, ArrowLeft, Linkedin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitRegistration } from "@/lib/registration";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const BATCH_YEARS = Array.from({ length: 15 }, (_, i) => 2026 - i);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    regNumber: "",
    batchYear: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedinUrl: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    // For regNumber, auto-uppercase and limit to 10 chars
    if (id === "regNumber") {
      const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, regNumber: cleaned }));
    } else if (id === "phone") {
      const cleaned = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: cleaned }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const selectYear = (year: number) => {
    setFormData((prev) => ({ ...prev, batchYear: String(year) }));
    setIsYearOpen(false);
    if (errors.batchYear) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.batchYear;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.regNumber.trim()) {
      newErrors.regNumber = "Registration number is required";
    } else if (formData.regNumber.length !== 10) {
      newErrors.regNumber = "Must be exactly 10 characters (e.g. 2XJRXXXXXX)";
    }
    if (!formData.batchYear.trim()) newErrors.batchYear = "Batch year is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const result = await submitRegistration({
          ...formData,
          branch: "CSM" // Auto-set since single branch
        });
        if (result.success) {
          toast.success("Registration request submitted successfully!", {
            description: "Please wait for department approval. You'll receive an email shortly.",
            duration: 5000,
          });
          router.push('/registration-success');
        } else {
          toast.error(result.message || "Registration failed");
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-white flex overflow-hidden font-inter">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/3 bg-navy relative items-start justify-center p-16 overflow-hidden">
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-gold/10 via-navy to-navy" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
         </div>

         <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           className="relative z-10 w-full"
         >
            <Link href="/" className="inline-flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-[0.4em] mb-12 hover:translate-x-[-4px] transition-transform">
               <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <h1 className="text-5xl font-space-grotesk font-bold text-white mb-8 leading-[1.1]">
               Join the <span className="text-gold">Legacy</span>
            </h1>
            <p className="text-white/50 font-medium leading-relaxed mb-12">
               Connect with over 1,200 alumni and students. Share your journey and contribute to the CSM community.
            </p>

            <ul className="space-y-6">
               {[
                 "Global Networking",
                 "Research Collaboration",
                 "Industry Mentorship",
                 "Career Opportunities"
               ].map((item, i) => (
                 <motion.li
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 * i + 0.5 }}
                   className="flex items-center gap-4 group"
                 >
                    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-gold transition-all duration-300">
                       <CheckCircle2 className="w-4 h-4 text-gold group-hover:text-navy" />
                    </div>
                    <span className="text-white font-bold text-xs uppercase tracking-widest">{item}</span>
                 </motion.li>
               ))}
            </ul>
         </motion.div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8 md:p-16 lg:p-24 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-space-grotesk font-bold text-navy mb-4">Create Account</h2>
            <p className="text-gray-500 font-medium">Join the KITS CSM Alumni Association today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput label="First Name" id="firstName" icon={<User className="w-4 h-4" />} value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="Rahul" />
              <FormInput label="Last Name" id="lastName" icon={<User className="w-4 h-4" />} value={formData.lastName} onChange={handleChange} error={errors.lastName} placeholder="Sharma" />
            </div>

            {/* Reg Number & Batch Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-4">Reg. Number</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <BadgeCheck className="w-4 h-4" />
                  </div>
                  <input
                    id="regNumber"
                    value={formData.regNumber}
                    onChange={handleChange}
                    placeholder="2XJRXXXXXX"
                    maxLength={10}
                    className={cn(
                      "w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-4 text-navy font-bold text-sm placeholder:text-gray-300 focus:outline-none focus:border-navy transition-all uppercase tracking-wider",
                      errors.regNumber && "border-red-500"
                    )}
                  />
                  {/* Character count */}
                  <span className={cn(
                    "absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-wider",
                    formData.regNumber.length === 10 ? "text-green-500" : "text-gray-300"
                  )}>
                    {formData.regNumber.length}/10
                  </span>
                </div>
                {errors.regNumber && <p className="text-[10px] text-red-500 font-bold uppercase ml-4">{errors.regNumber}</p>}
              </div>

              {/* Custom Year Picker */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-4">Batch Year</label>
                <div className="relative">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setIsYearOpen(!isYearOpen)}
                    className={cn(
                      "w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-4 text-left font-bold text-sm focus:outline-none focus:border-navy transition-all",
                      formData.batchYear ? "text-navy" : "text-gray-300",
                      errors.batchYear && "border-red-500",
                      isYearOpen && "border-navy"
                    )}
                  >
                    {formData.batchYear || "Select Year"}
                  </button>

                  {/* Custom Dropdown */}
                  <AnimatePresence>
                    {isYearOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 top-full mt-2 w-full bg-white rounded-2xl shadow-2xl shadow-navy/15 border border-gray-100 overflow-hidden"
                      >
                        <div className="p-2 max-h-[240px] overflow-y-auto custom-scrollbar">
                          <div className="grid grid-cols-3 gap-1.5">
                            {BATCH_YEARS.map((year) => (
                              <button
                                key={year}
                                type="button"
                                onClick={() => selectYear(year)}
                                className={cn(
                                  "py-2.5 px-3 rounded-xl text-sm font-bold transition-all duration-200",
                                  formData.batchYear === String(year)
                                    ? "bg-navy text-white shadow-md"
                                    : "text-navy/70 hover:bg-navy/5 hover:text-navy"
                                )}
                              >
                                {year}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.batchYear && <p className="text-[10px] text-red-500 font-bold uppercase ml-4">{errors.batchYear}</p>}
              </div>
            </div>

            {/* Phone & LinkedIn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-4">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="absolute left-14 top-1/2 -translate-y-1/2 text-navy/40 font-bold text-sm pr-2 border-r border-gray-200">
                    +91
                  </div>
                  <input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    type="tel"
                    className={cn(
                      "w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] pl-[5.5rem] pr-6 py-4 text-navy font-bold text-sm placeholder:text-gray-300 focus:outline-none focus:border-navy transition-all tracking-wide",
                      errors.phone && "border-red-500"
                    )}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase ml-4">{errors.phone}</p>}
              </div>
              <FormInput label="LinkedIn URL (Optional)" id="linkedinUrl" icon={<Linkedin className="w-4 h-4" />} value={formData.linkedinUrl} onChange={handleChange} placeholder="linkedin.com/in/rahul" />
            </div>

            {/* Email */}
            <FormInput label="Email Address" id="email" type="email" icon={<Mail className="w-4 h-4" />} value={formData.email} onChange={handleChange} error={errors.email} placeholder="rahul.sharma@email.com" />

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput label="Password" id="password" type="password" icon={<Lock className="w-4 h-4" />} value={formData.password} onChange={handleChange} error={errors.password} placeholder="••••••••" />
              <FormInput label="Confirm Password" id="confirmPassword" type="password" icon={<Lock className="w-4 h-4" />} value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="••••••••" />
            </div>

            <div className="pt-4">
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full bg-navy text-white font-bold py-6 rounded-[1.5rem] hover:bg-gold hover:text-navy transition-all shadow-2xl shadow-navy/20 flex items-center justify-center gap-3 disabled:opacity-70 group"
               >
                 {isSubmitting ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 ) : (
                   <>
                     SUBMIT REGISTRATION
                     <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   </>
                 )}
               </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Already have an account? {" "}
              <Link href="/login" className="text-gold hover:text-navy transition-colors ml-2">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

const FormInput = ({ label, id, icon, error, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-4">{label}</label>
    <div className="relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
         {icon}
      </div>
      <input
        id={id}
        {...props}
        className={cn(
          "w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-4 text-navy font-bold text-sm placeholder:text-gray-300 focus:outline-none focus:border-navy transition-all",
          error && "border-red-500"
        )}
      />
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold uppercase ml-4">{error}</p>}
  </div>
);
