"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold text-burgundy mb-4 text-center">Admin OTP Verification</h1>
      <p className="text-gray-600 mb-6 text-center">Enter the OTP sent to your email to verify your admin account.</p>
      {message && (
        <div className={`mb-4 p-3 rounded-md text-center ${
          message.type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
            placeholder="Enter your admin email"
            required
          />
        </div>
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy"
            placeholder="Enter the 6-digit OTP"
            required
            maxLength={6}
            pattern="[0-9]{6}"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-burgundy text-white font-semibold py-2 rounded-md transition duration-300 ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-burgundy-dark"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
