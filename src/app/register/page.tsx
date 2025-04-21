"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, BadgeCheck, User, Calendar, Code, AlertCircle, UserX } from "lucide-react";
import { toast } from "sonner";
import { submitRegistration } from "@/lib/registration";

export default function RegisterPage() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    regNumber: "",
    batchYear: "",
    branch: "",
    email: "",
    password: "",
    confirmPassword: "",
    linkedinUrl: ""
  });

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Router for navigation
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }

    // Clear submission message when form changes
    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.regNumber.trim()) newErrors.regNumber = "Registration number is required";
    if (!formData.batchYear.trim()) newErrors.batchYear = "Batch year is required";
    if (!formData.branch.trim()) newErrors.branch = "Branch is required";

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitMessage(null);

      try {
        // Submit registration to Supabase
        const result = await submitRegistration({
          ...formData
        });

        if (result.success) {
          // Clear form on success
          setFormData({
            firstName: "",
            lastName: "",
            regNumber: "",
            batchYear: "",
            branch: "",
            email: "",
            password: "",
            confirmPassword: "",
            linkedinUrl: ""
          });

          // Show success toast with redirection when the toast is dismissed or closed
          toast.success("Your registration request has successfully been registered", {
            duration: 4000,
            onAutoClose: () => router.push('/'),
            onDismiss: () => router.push('/')
          });

          setSubmitMessage({
            type: 'success',
            text: result.message
          });
        } else {
          // Check for existing user error
          if (result.message === 'You are already an existing user') {
            toast.error(result.message, {
              icon: <UserX size={20} />,
              style: {
                backgroundColor: '#fff0f0',
                border: '1px solid #ffcccc'
              }
            });
          } else if (result.message === 'This registration number is already registered') {
            toast.error(result.message, {
              icon: <AlertCircle size={20} />,
              style: {
                backgroundColor: '#fff0f0',
                border: '1px solid #ffcccc'
              }
            });
          } else {
            // Generic error toast
            toast.error(result.message || "Registration failed. Please try again.");
          }

          setSubmitMessage({
            type: 'error',
            text: result.message
          });
        }
      } catch (error) {
        console.error('Registration error:', error);

        // Show error toast
        toast.error("An unexpected error occurred. Please try again.");

        setSubmitMessage({
          type: 'error',
          text: 'An unexpected error occurred. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-burgundy text-white py-8 px-6 relative">
            <div className="absolute inset-0 opacity-20"
                 style={{
                   backgroundImage: `url('/img/alumini logo2.jpg')`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   filter: 'blur(2px)'
                 }}></div>
            <div className="relative z-10 text-center">
              <Image
                src="/img/alumini logo2.jpg"
                alt="KITS Alumni Logo"
                width={80}
                height={80}
                className="mx-auto rounded-full border-4 border-white mb-3"
              />
              <h1 className="text-2xl md:text-5xl font-bold mb-2">Alumni Registration</h1>
              <p className="text-white/90 font-semibold">Join our growing alumni network</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="p-6 md:p-10">
            {/* Submission message */}
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-md ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold text-gray-800 mb-6 uppercase text-center">Personal Information</h2>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent`}
                      placeholder="Enter your first name"
                    />
                  </div>
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent`}
                      placeholder="Enter your last name"
                    />
                  </div>
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              {/* Registration Number */}
              <div className="mb-6">
                <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <BadgeCheck size={18} />
                  </span>
                  <input
                    type="text"
                    id="regNumber"
                    value={formData.regNumber}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.regNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent`}
                    placeholder="Enter your registration number"
                  />
                </div>
                {errors.regNumber && <p className="mt-1 text-sm text-red-600">{errors.regNumber}</p>}
              </div>

              {/* Batch Year and Branch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="batchYear" className="block text-sm font-medium text-gray-700 mb-1">Batch Year</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Calendar size={18} />
                    </span>
                    <select
                      id="batchYear"
                      value={formData.batchYear}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.batchYear ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent`}
                    >
                      <option value="">Select batch year</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  {errors.batchYear && <p className="mt-1 text-sm text-red-600">{errors.batchYear}</p>}
                </div>

                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Code size={18} />
                    </span>
                    <select
                      id="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.branch ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent`}
                    >
                      <option value="">Select branch</option>
                      <option value="AIML">AI & ML</option>
                      <option value="CSE">Computer Science</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="EEE">Electrical & Electronics</option>
                      <option value="MECH">Mechanical</option>
                      <option value="CIVIL">Civil</option>
                    </select>
                  </div>
                  {errors.branch && <p className="mt-1 text-sm text-red-600">{errors.branch}</p>}
                </div>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-6 uppercase text-center">Account Information</h2>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Lock size={18} />
                    </span>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent`}
                      placeholder="Create a password"
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Lock size={18} />
                    </span>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* LinkedIn URL (Optional) */}
              <div className="mb-8">
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile URL <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </span>
                  <input
                    type="url"
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-burgundy hover:bg-burgundy-dark text-white font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2" size={20} />
                    Register
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account? {" "}
                <Link href="/login" className="text-burgundy hover:text-burgundy-dark font-medium hover:underline transition-colors">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
