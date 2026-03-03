"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User, Book, Calendar, FileText, Award, GraduationCap,
  Mail, LogOut, ChevronDown, Bell, Briefcase, Clipboard,
  Settings, MessageSquare
} from "lucide-react";
import { getStudentSession, clearStudentSession, StudentUser } from "@/lib/hooks/useStudentAuth";
import { supabase } from "@/lib/supabase";

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [achievementCount, setAchievementCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);

  // Side navigation items
  const navItems = [
    { id: "overview", label: "Dashboard", icon: <User size={20} />, path: "/student-dashboard" },
    { id: "achievements", label: "Achievements", icon: <Award size={20} />, path: "/student-dashboard/achievements" },
    { id: "blogs", label: "Student Blogs", icon: <FileText size={20} />, path: "/student-dashboard/blogs" },
    { id: "forum", label: "Forum", icon: <MessageSquare size={20} />, path: "/forum" },
  ];

  // Load student achievements count
  const loadAchievementsCount = async (studentData: StudentUser) => {
    try {
      const fullName = `${studentData.firstName} ${studentData.lastName}`;

      const { data, error, count } = await supabase
        .from('achievements')
        .select('*', { count: 'exact' })
        .eq('name', fullName);

      if (error) {
        console.error('Error loading achievement count:', error);
        return;
      }

      setAchievementCount(count || 0);
    } catch (error) {
      console.error('Error in loadAchievementsCount:', error);
    }
  };

  // Load student blogs count
  const loadBlogsCount = async (studentData: StudentUser) => {
    try {
      const fullName = `${studentData.firstName} ${studentData.lastName}`;

      const { data, error, count } = await supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .eq('name', fullName);

      if (error) {
        console.error('Error loading blogs count:', error);
        return;
      }

      setBlogsCount(count || 0);
    } catch (error) {
      console.error('Error in loadBlogsCount:', error);
    }
  };

  // Stats data (with dynamic counts)
  const statsCards = [
    { id: 2, label: "Achievements", value: achievementCount.toString(), icon: <Award size={20} className="text-yellow-500" />, path: "/student-dashboard/achievements" },
    { id: 3, label: "Upcoming Events", value: "3", icon: <Calendar size={20} className="text-green-500" />, path: "/student-dashboard" },
    { id: 4, label: "My Blogs", value: blogsCount.toString(), icon: <FileText size={20} className="text-purple-500" />, path: "/student-dashboard/blogs" },
  ];

  // Format current date and time
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = today.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const studentData = getStudentSession();
      if (!studentData) {
        // Redirect to login if no session found
        router.push('/login');
      } else {
        setStudent(studentData);
        loadAchievementsCount(studentData);
        loadBlogsCount(studentData);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    clearStudentSession();
    router.push('/login');
  };

  // Update the navigation click handler
  const handleNavItemClick = (item: typeof navItems[0]) => {
    setActiveSection(item.id);
    router.push(item.path);
  };

  // Handler for stats card clicks
  const handleStatsCardClick = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no student data is available, the checkAuth function will redirect to login
  if (!student) return null;

  return (
    <>
        {/* Header */}
        <header className="flex items-center justify-between h-20 px-8 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-navy/5 text-navy">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="text-xl font-space-grotesk font-bold text-navy">Student Dashboard</h1>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Student Portal</p>
            </div>
          </div>

          {/* Right side - Date */}
          <div className="flex items-center">
            <div className="text-right">
              <p className="text-sm font-bold text-navy">{formattedDate}</p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5">{formattedTime}</p>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="bg-navy rounded-[2rem] p-10 relative overflow-hidden shadow-2xl shadow-navy/20">
               <div className="relative z-10">
                 <h2 className="text-3xl font-space-grotesk font-bold text-white mb-2">Welcome back, {student.firstName}!</h2>
                 <p className="text-white/60 font-medium max-w-lg">Access your academic achievements, manage your community blogs, and participate in forum discussions all from one place.</p>
               </div>
               <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsCards.map((stat) => (
                <div
                  key={stat.id}
                  className="p-8 pb-10 rounded-[2rem] border border-gray-100 bg-white hover:border-gold/30 hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all group relative overflow-hidden"
                  onClick={() => handleStatsCardClick(stat.path)}
                >
                  <div className="flex flex-col h-full">
                     <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold/10 transition-transform">
                        {stat.icon}
                     </div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
                     <p className="text-4xl font-space-grotesk font-bold text-navy group-hover:text-gold transition-colors">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
    </>
  );
}
