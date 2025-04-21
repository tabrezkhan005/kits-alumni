"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, LogIn } from "lucide-react";
import { authenticateStudent, saveStudentSession, isStudentAuthenticated } from "@/lib/hooks/useStudentAuth";

// For development and demo purposes only - not for production
const DEMO_USERS = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'student@example.com',
    password_hash: 'password123', // In a real app, this would be hashed
    reg_number: 'REG123456',
    branch: 'Computer Science',
    batch_year: '2020-2024'
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "student" // Default to student login
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Authentication error
  const [authError, setAuthError] = useState<string | null>(null);

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if already logged in
  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isStudentAuthenticated()) {
      router.push('/student-dashboard');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Clear auth error when user modifies form
    if (authError) {
      setAuthError(null);
    }
  };

  // Toggle user type (student/admin)
  const toggleUserType = (type: "student" | "admin") => {
    setFormData((prev) => ({ ...prev, userType: type }));
    // Clear auth error when switching user types
    if (authError) {
      setAuthError(null);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Authenticate with demo data
  const authenticateWithDemoData = () => {
    const demoUser = DEMO_USERS.find(user => user.email === formData.email);

    if (!demoUser) {
      throw new Error('Student not found. Please check your email and try again.');
    }

    if (demoUser.password_hash !== formData.password) {
      throw new Error('Incorrect password. Please try again.');
    }

    // Login successful with demo user
    const studentData = {
      id: demoUser.id,
      email: demoUser.email,
      firstName: demoUser.first_name,
      lastName: demoUser.last_name,
      regNumber: demoUser.reg_number,
      branch: demoUser.branch,
      batchYear: demoUser.batch_year
    };

    // Save the student session with the correct data
    saveStudentSession(studentData);

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setAuthError(null);

      try {
        if (formData.userType === "student") {
          // Direct authentication against registered_students table
          const authResult = await authenticateStudent(formData.email, formData.password);

          if (authResult.success && authResult.student) {
            // Save student session
            saveStudentSession(authResult.student);

            // Redirect to dashboard
            router.push('/student-dashboard');
          } else {
            // Authentication failed
            throw new Error(authResult.message || 'Authentication failed');
          }
        } else {
          // Admin login implementation
          const response = await fetch('/api/admin-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password
            }),
          });

          const data = await response.json();

          if (response.ok && data.success) {
            // Admin login succeeded, redirect to admin page
            router.push('/admin');
          } else {
            // Admin login failed
            throw new Error(data.error || 'Admin login failed. Please check your credentials.');
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        setAuthError(error instanceof Error ? error.message : 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // If still checking authentication, show loading
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back!</h1>
            </div>
          </div>

          {/* Login Form */}
          <div className="p-6 md:p-8">
            {/* User Type Toggle with Animated Slider */}
            <div className="relative flex bg-gray-100 p-1 rounded-full mb-8 max-w-xs mx-auto">
              {/* Animated background pill that slides */}
              <div
                className={`absolute inset-y-1 w-1/2 bg-burgundy rounded-full shadow-md transition-all duration-300 ease-in-out ${
                  formData.userType === "student" ? "left-1" : "left-[50%] -translate-x-[2px]"
                }`}
                aria-hidden="true"
              ></div>

              {/* Student button */}
              <button
                type="button"
                onClick={() => toggleUserType("student")}
                className={`relative z-10 flex-1 py-2 px-4 rounded-full text-center transition-colors duration-300 ease-in-out ${
                  formData.userType === "student" ? "text-white font-medium" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Student
              </button>

              {/* Admin button */}
              <button
                type="button"
                onClick={() => toggleUserType("admin")}
                className={`relative z-10 flex-1 py-2 px-4 rounded-full text-center transition-colors duration-300 ease-in-out ${
                  formData.userType === "admin" ? "text-white font-medium" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Authentication error message */}
            {authError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Link href="/forgot-password" className="text-xs text-burgundy hover:text-burgundy-dark hover:underline transition-colors">
                    Forgot Password?
                  </Link>
                </div>
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
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Demo Credentials Notice */}
              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                <p className="font-medium">Demo Credentials:</p>
                <p>Email: student@example.com</p>
                <p>Password: password123</p>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-burgundy focus:ring-burgundy border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-burgundy hover:bg-burgundy-dark text-white font-semibold py-3 px-6 rounded-md transition duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-70 disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <LogIn className="mr-2" size={20} />
                    Login
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account? {" "}
                <Link href="/register" className="text-burgundy hover:text-burgundy-dark font-medium hover:underline transition-colors">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
