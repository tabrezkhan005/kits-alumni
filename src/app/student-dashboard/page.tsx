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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center p-5 border-b border-gray-200 bg-white">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center text-white">
              <User size={24} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{student.firstName} {student.lastName}</h2>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavItemClick(item)}
                  className={`flex items-center w-full px-4 py-2 text-sm rounded-md transition-colors ${
                    activeSection === item.id
                      ? "bg-burgundy text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-burgundy text-white mr-2">
              <GraduationCap size={16} />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Student Dashboard</h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>

          {/* Right side - Date */}
          <div className="flex items-center">
            <div className="text-right">
              <p className="text-sm font-medium">{formattedDate}</p>
              <p className="text-xs text-gray-500">{formattedTime}</p>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>
            <p className="text-gray-600">Welcome to the KITS College student portal. View your achievements, blogs, and more.</p>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsCards.map((stat) => (
                <div
                  key={stat.id}
                  className="p-6 rounded-lg shadow-sm bg-white hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => handleStatsCardClick(stat.path)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className="rounded-full p-3">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
