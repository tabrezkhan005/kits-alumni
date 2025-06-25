'use client';
import { useState } from "react";

export default function BroadcastPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!subject.trim() || !message.trim()) {
      setFeedback("Subject and message are required.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback("Broadcast sent successfully!");
        setSubject("");
        setMessage("");
      } else {
        setFeedback(data.error || "Failed to send broadcast.");
      }
    } catch {
      setFeedback("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Broadcast Email to All Students</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-burgundy"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            maxLength={120}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-vertical focus:outline-none focus:ring-2 focus:ring-burgundy"
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={2000}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-burgundy text-white px-6 py-2 rounded font-semibold hover:bg-burgundy/90 disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Broadcast"}
        </button>
        {feedback && (
          <div className={`mt-2 text-sm ${feedback.includes("success") ? "text-green-600" : "text-red-600"}`}>{feedback}</div>
        )}
      </form>
    </div>
  );
}
