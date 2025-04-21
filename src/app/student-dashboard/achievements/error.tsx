"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Error component for the Achievements page
 * Displayed when an error occurs loading the achievements page
 */
export default function AchievementsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Achievements page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          We couldn't load your achievements. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-burgundy text-white rounded-md hover:bg-burgundy/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
