"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, MessageSquare, Send, CheckCircle, ChevronLeft, ChevronRight, Zap, Video } from "lucide-react";
import { toast } from "sonner";

interface ScheduleFormData {
  name: string;
  email: string;
  department: string;
  meetingType: string;
  preferredDate: string;
  preferredTime: string;
  duration: string;
  topic: string;
  description: string;
}

// Mock available time slots (in a real implementation, this would come from Google Calendar API)
const availableSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

// Mock booked slots for demonstration (would come from API)
const bookedSlots: { [key: string]: string[] } = {
  "2024-01-15": ["10:00", "14:00"],
  "2024-01-16": ["09:00", "16:00"],
  "2024-01-17": ["11:00", "15:00"],
};

function CalendarView({ selectedDate, selectedTime, onDateSelect, onTimeSelect }: {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const formatDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentMonth.getMonth() &&
           today.getFullYear() === currentMonth.getFullYear();
  };

  const isPast = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const availableTimesForDate = (date: string) => {
    return availableSlots.filter(slot => !bookedSlots[date]?.includes(slot));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gold" />
        Select Date & Time
      </h3>

      {/* Calendar */}
      <div className="mb-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-navy" />
          </button>
          <h4 className="text-lg font-semibold text-navy">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-navy" />
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentMonth).map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <button
                  onClick={() => !isPast(day) && onDateSelect(formatDate(day))}
                  disabled={isPast(day)}
                  className={`w-full h-full text-sm rounded-lg transition-all ${
                    isPast(day)
                      ? 'text-gray-400 cursor-not-allowed'
                      : selectedDate === formatDate(day)
                      ? 'bg-gold text-white font-bold'
                      : isToday(day)
                      ? 'bg-navy/10 text-navy font-semibold hover:bg-navy/20'
                      : 'hover:bg-gray-100 text-navy'
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t pt-6"
        >
          <h4 className="text-lg font-semibold text-navy mb-4">Available Times</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableTimesForDate(selectedDate).map(time => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                  selectedTime === time
                    ? 'bg-gold text-white border-gold'
                    : 'bg-gray-50 text-navy border-gray-200 hover:bg-gray-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          {availableTimesForDate(selectedDate).length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">
              No available slots for this date. Please select another date.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default function ScheduleForm() {
  const [step, setStep] = useState(1); // 1: Calendar, 2: Details, 3: Confirmation
  const [formData, setFormData] = useState<ScheduleFormData>({
    name: "",
    email: "",
    department: "",
    meetingType: "",
    preferredDate: "",
    preferredTime: "",
    duration: "30",
    topic: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, preferredDate: date, preferredTime: "" }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, preferredTime: time }));
  };

  const handleNextStep = () => {
    if (step === 1 && formData.preferredDate && formData.preferredTime) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would integrate with Google Calendar API and Google Meet
      // For now, we'll simulate the process

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real implementation, you would:
      // 1. Create a Google Calendar event
      // 2. Generate a Google Meet link
      // 3. Send confirmation emails
      // 4. Store the meeting details in your database

      console.log("Scheduling meeting:", formData);

      setIsSubmitted(true);
      toast.success("Meeting scheduled successfully! Check your email for confirmation.");
    } catch (error) {
      toast.error("Failed to schedule meeting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-space-grotesk font-bold text-navy mb-4">
              Meeting Scheduled Successfully!
            </h2>
            <p className="text-gray-600 mb-8">
              Your meeting request has been submitted. You will receive a confirmation email with the Google Meet link and calendar invitation within the next few minutes.
            </p>
            <div className="space-y-4 text-left bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-navy mb-4">What happens next:</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-navy rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <p>The HOD will review and confirm your meeting request</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-navy rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <p>You'll receive a Google Calendar invitation with the Meet link</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-navy rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <p>Join the meeting at the scheduled time</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                setFormData({
                  name: "",
                  email: "",
                  department: "",
                  meetingType: "",
                  preferredDate: "",
                  preferredTime: "",
                  duration: "30",
                  topic: "",
                  description: "",
                });
              }}
              className="mt-8 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-gold hover:text-navy transition-all duration-300"
            >
              Schedule Another Meeting
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNum ? 'bg-gold text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step > stepNum ? 'bg-gold' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-space-grotesk font-bold text-navy mb-2">
              {step === 1 ? "Select Date & Time" : step === 2 ? "Enter Details" : "Confirm Meeting"}
            </h2>
            <p className="text-gray-600">
              {step === 1 ? "Choose your preferred meeting slot from the calendar" :
               step === 2 ? "Provide your information and meeting details" :
               "Review and confirm your meeting"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Calendar or Form */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: step > 1 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {step === 1 ? (
                <CalendarView
                  selectedDate={formData.preferredDate}
                  selectedTime={formData.preferredTime}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect}
                />
              ) : (
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200">
                  <h3 className="text-2xl font-space-grotesk font-bold text-navy mb-6">
                    {step === 2 ? "Your Information" : "Review Details"}
                  </h3>

                  {step === 2 ? (
                    <div className="space-y-8">
                      {/* Personal Information */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                          <User className="w-5 h-5 text-gold" />
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-navy uppercase tracking-wide">Full Name</label>
                            <input
                              type="text"
                              id="name"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-navy uppercase tracking-wide">Email Address</label>
                            <input
                              type="email"
                              id="email"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-navy uppercase tracking-wide">Department/Organization</label>
                          <input
                            type="text"
                            id="department"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                            placeholder="e.g., Computer Science, Alumni, Industry Partner"
                            value={formData.department}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Meeting Type */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-gold" />
                          Meeting Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-navy uppercase tracking-wide">Meeting Type</label>
                            <select
                              id="meetingType"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                              value={formData.meetingType}
                              onChange={handleChange}
                              required
                            >
                              <option value="" disabled>Select meeting type</option>
                              <option value="academic">Academic Consultation</option>
                              <option value="research">Research Collaboration</option>
                              <option value="mentorship">Career Mentorship</option>
                              <option value="industry">Industry Partnership</option>
                              <option value="alumni">Alumni Discussion</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-navy uppercase tracking-wide">Topic/Subject</label>
                            <input
                              type="text"
                              id="topic"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                              placeholder="Brief topic or subject"
                              value={formData.topic}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-navy uppercase tracking-wide">Description (Optional)</label>
                          <textarea
                            id="description"
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-navy placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                            placeholder="Additional details..."
                            value={formData.description}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
                        <div>
                          <p className="text-xs font-bold text-navy/50 uppercase tracking-widest mb-1">Date & Time</p>
                          <p className="font-semibold text-navy">{formData.preferredDate} at {formData.preferredTime}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy/50 uppercase tracking-widest mb-1">Duration</p>
                          <p className="font-semibold text-navy">{formData.duration} Minutes</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy/50 uppercase tracking-widest mb-1">Participant</p>
                          <p className="font-semibold text-navy">{formData.name}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy/50 uppercase tracking-widest mb-1">Meeting Type</p>
                          <p className="font-semibold text-navy capitalize">{formData.meetingType}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs font-bold text-navy/50 uppercase tracking-widest mb-1">Topic</p>
                          <p className="font-semibold text-navy">{formData.topic}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gold/10 border border-gold/20 rounded-xl">
                        <Video className="w-5 h-5 text-gold" />
                        <p className="text-xs text-navy/70">
                          A Google Meet link will be automatically generated and sent to <strong>{formData.email}</strong> upon confirmation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right Side - Summary and Navigation */}
            <div className="space-y-6">
              <div className="bg-navy p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />

                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gold" />
                  Meeting Summary
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60 text-sm font-medium">Preferred Date</span>
                    <span className="font-bold">{formData.preferredDate || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60 text-sm font-medium">Preferred Time</span>
                    <span className="font-bold">{formData.preferredTime || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60 text-sm font-medium">Duration</span>
                    <span className="font-bold">{formData.duration} Minutes</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {step === 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextStep}
                      disabled={!formData.preferredDate || !formData.preferredTime}
                      className="w-full bg-gold text-navy font-bold py-4 rounded-xl hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                    >
                      Continue to Details
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  ) : step === 2 ? (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handlePrevStep}
                        className="px-4 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                      </button>
                      <button
                        onClick={() => {
                          if (formData.name && formData.email && formData.department && formData.meetingType && formData.topic) {
                            setStep(3);
                          } else {
                            toast.error("Please fill in all required fields.");
                          }
                        }}
                        className="px-4 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                      >
                        Review
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handlePrevStep}
                        className="px-4 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-4 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/20 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                        ) : (
                          <>
                            Confirm
                            <CheckCircle className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h4 className="font-bold text-navy mb-3 flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-gold" />
                  Quick Tips
                </h4>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-gold mt-1.5" />
                    Meetings are typically confirmed within 24 hours.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-gold mt-1.5" />
                    Keep your topic description concise and clear.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-gold mt-1.5" />
                    Ensure you have a stable internet connection.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
