"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Plus, Calendar, BookOpen, Medal, FileCheck, Loader2, Trophy, AlertCircle, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getStudentSession, StudentUser } from "@/lib/hooks/useStudentAuth";

// Define achievement types and their icons
const ACHIEVEMENT_TYPES = [
  { value: "Competition wins", label: "Competition wins", icon: <Trophy size={18} /> },
  { value: "Research Publications", label: "Research Publications", icon: <BookOpen size={18} /> },
  { value: "Sports Medal", label: "Sports Medal", icon: <Medal size={18} /> },
];

// Interface for Achievement data
interface Achievement {
  id: string;
  name: string;
  subject: string;
  description: string;
  date: string;
  type: string;
  status: string;
  created_at: string;
}

export default function AchievementsPage() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentUser | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Form state
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [achievementDate, setAchievementDate] = useState("");
  const [achievementType, setAchievementType] = useState("Competition wins");
  const [formError, setFormError] = useState("");

  // Check authentication and load student data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get student session data
        let studentData = getStudentSession();
        console.log("Initial student data from session:", studentData);

        // If no data or invalid data, try to reload the page
        if (!studentData || (!studentData.firstName && !studentData.lastName && !studentData.email)) {
          console.warn("Invalid student data, redirecting to login");

          // Clear any potentially corrupted session
          localStorage.removeItem('student_user');

          // Redirect to login
          router.push('/login');
          return;
        }

        // Set student data and load achievements
        setStudent(studentData);

        // Try to load achievements
        try {
          await loadAchievements(studentData);
        } catch (error) {
          console.error("Failed to load achievements:", error);
          setFetchError("Failed to load your achievements. Please try refreshing the page.");
        }
      } catch (error) {
        console.error("Authentication check error:", error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Get student full name
  const getStudentFullName = (studentData: StudentUser | null): string => {
    if (!studentData) {
      console.error("Student data is null or undefined");
      return "Unknown Student";
    }

    // Log the entire student data to help debug
    console.log("Current student data:", JSON.stringify(studentData, null, 2));

    // If we have email, use it as default fallback first
    const emailFallback = studentData.email ? studentData.email.split('@')[0] : "Unknown Student";

    // Try first with camelCase
    if (studentData.firstName || studentData.lastName) {
      const fullName = `${studentData.firstName || ""} ${studentData.lastName || ""}`.trim();
      // If the result is empty or just spaces, use email fallback
      return fullName && fullName !== " " ? fullName : emailFallback;
    }

    // If camelCase doesn't work, try with snake_case (in case data format is inconsistent)
    // @ts-ignore - handle potential snake_case field names
    if (studentData.first_name || studentData.last_name) {
      // @ts-ignore
      const fullName = `${studentData.first_name || ""} ${studentData.last_name || ""}`.trim();
      // If the result is empty or just spaces, use email fallback
      return fullName && fullName !== " " ? fullName : emailFallback;
    }

    // If no name fields are found or they resulted in empty strings, use email
    return emailFallback;
  };

  // Load student achievements with improved error handling
  const loadAchievements = async (studentData: StudentUser) => {
    try {
      setLoading(true);
      setFetchError("");

      // Always use email as a reliable identifier if available
      let fullName = studentData.email ? studentData.email.split('@')[0] : "";

      // Try to get display name if available
      try {
        const displayName = getStudentFullName(studentData);
        if (displayName && displayName !== "Unknown Student") {
          fullName = displayName;
        }
      } catch (error) {
        console.log("Using email as fallback for achievement loading");
      }

      if (!fullName) {
        throw new Error("Could not determine student identifier for loading achievements");
      }

      console.log("Loading achievements for student:", fullName); // Debug loaded name

      // Method 1: Try using the RPC function first
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc(
          'get_student_achievements',
          { _student_name: fullName }
        );

        if (rpcError) {
          console.log("RPC method failed, trying direct query:", rpcError);
          throw rpcError;
        }

        setAchievements(rpcData || []);
      } catch (rpcError) {
        // Method 2: Fall back to direct query if RPC fails
        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .eq('name', fullName)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setAchievements(data || []);
      }
    } catch (error: any) {
      console.error('Error loading achievements:', error);
      setFetchError(error.message || "Failed to load your achievements. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Submit new achievement with improved error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation - first check if student exists
    if (!student) {
      // Try to refresh student data one more time
      const freshData = getStudentSession();
      if (!freshData) {
        setFormError("You appear to be logged out. Please refresh the page or log in again.");
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        return;
      }
      setStudent(freshData);
    }

    // Form validation
    if (!subject.trim() || !description.trim() || !achievementDate || !achievementType) {
      setFormError("All fields are required");
      return;
    }

    try {
      setSubmitting(true);
      setFormError("");

      // Get current student data or refresh from session
      const studentData = student || getStudentSession();
      if (!studentData) {
        throw new Error("Not logged in. Please log in to submit achievements.");
      }

      // Always use email as identifier if we have it
      let fullName = studentData.email ? studentData.email.split('@')[0] : "Unknown";

      // Try to get a proper display name if available
      try {
        const displayName = getStudentFullName(studentData);
        if (displayName && displayName !== "Unknown Student") {
          fullName = displayName;
        }
      } catch (error) {
        console.error("Error getting student name:", error);
        // Continue using email fallback
      }

      console.log("Submitting achievement for student:", fullName); // Debug submitted name

      // Method 1: Try using the RPC function first
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc(
          'add_student_achievement',
          {
            _name: fullName,
            _subject: subject,
            _description: description,
            _date: achievementDate,
            _type: achievementType
          }
        );

        if (rpcError) {
          console.log("RPC method failed, trying direct insert:", rpcError);
          throw rpcError;
        }

        // If successful, get the newly created achievement
        if (rpcData) {
          const { data: newAchievement, error: fetchError } = await supabase
            .from('achievements')
            .select('*')
            .eq('id', rpcData)
            .single();

          if (!fetchError && newAchievement) {
            setAchievements([newAchievement, ...achievements]);
          }
        }
      } catch (rpcError) {
        // Method 2: Fall back to direct insert if RPC fails
        const { data, error } = await supabase
          .from('achievements')
          .insert([
            {
              name: fullName,
              subject: subject,
              description: description,
              date: achievementDate,
              type: achievementType,
              status: 'pending' // Initial status
            }
          ])
          .select();

        if (error) {
          throw error;
        }

        // Add new achievement to the list
        if (data && data.length > 0) {
          setAchievements([data[0], ...achievements]);
        }
      }

      // Reset form and hide it
      setSubject("");
      setDescription("");
      setAchievementDate("");
      setAchievementType("Competition wins");
      setFormVisible(false);

    } catch (error: any) {
      console.error('Error submitting achievement:', error);
      setFormError(error.message || "Failed to submit achievement. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get icon based on achievement type
  const getTypeIcon = (type: string) => {
    const achievementType = ACHIEVEMENT_TYPES.find(t => t.value === type);
    return achievementType ? achievementType.icon : <Award size={18} />;
  };

  // Get status color based on achievement status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // If no student data is available, the checkAuth function will redirect to login
  if (!student) return null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Back button */}
      <button
        onClick={() => router.push('/student-dashboard')}
        className="mb-4 flex items-center text-gray-600 hover:text-burgundy transition-colors"
        aria-label="Back to Dashboard"
      >
        <ChevronLeft size={20} />
        <span>Back to Dashboard</span>
      </button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Achievements</h1>
          <p className="text-gray-600">
            Record and track your academic and extracurricular achievements
          </p>
        </div>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="px-4 py-2 bg-burgundy text-white rounded-md flex items-center gap-2 hover:bg-burgundy/90 transition-colors"
        >
          {formVisible ? "Cancel" : <>
            <Plus size={18} />
            Add Achievement
          </>}
        </button>
      </div>

      {/* Add Achievement Form */}
      {formVisible && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Achievement</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Achievement Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy focus:border-burgundy"
                placeholder="e.g., First Place in Science Fair"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy focus:border-burgundy h-24"
                placeholder="Describe your achievement in detail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={achievementDate}
                  onChange={(e) => setAchievementDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={achievementType}
                  onChange={(e) => setAchievementType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy focus:border-burgundy"
                >
                  {ACHIEVEMENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-burgundy text-white rounded-md hover:bg-burgundy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileCheck size={18} />
                    Submit Achievement
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Achievements List */}
      <div className="space-y-4">
        {fetchError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Error loading achievements</h3>
              <p className="text-red-700 text-sm mt-1">{fetchError}</p>
              <button
                onClick={() => student && loadAchievements(student)}
                className="mt-2 text-sm font-medium text-red-600 hover:text-red-800 flex items-center"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <Loader2 size={30} className="animate-spin mx-auto text-burgundy" />
            <p className="mt-2 text-gray-600">Loading your achievements...</p>
          </div>
        ) : achievements.length === 0 && !fetchError ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <Award size={48} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No achievements yet</h3>
            <p className="text-gray-600 mt-1">
              Start by adding your first achievement using the button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex flex-col">
                <div className="p-5 flex-grow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy mr-3">
                        {getTypeIcon(achievement.type)}
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(achievement.status)}`}>
                        {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-900 mt-3">{achievement.subject}</h3>
                  <div className="mt-1 text-sm text-gray-600 line-clamp-3">
                    {achievement.description}
                  </div>
                </div>

                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                  <div>
                    {achievement.type}
                  </div>
                  <div>
                    Added {new Date(achievement.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
