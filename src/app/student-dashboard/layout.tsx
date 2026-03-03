"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  User, Award, FileText,
  LogOut, MessageSquare
} from "lucide-react";
import { getStudentSession, clearStudentSession, StudentUser } from "@/lib/hooks/useStudentAuth";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [student, setStudent] = useState<StudentUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Side navigation items
  const navItems = [
    { id: "overview", label: "Dashboard", icon: <User size={20} />, path: "/student-dashboard" },
    { id: "achievements", label: "Achievements", icon: <Award size={20} />, path: "/student-dashboard/achievements" },
    { id: "blogs", label: "Student Blogs", icon: <FileText size={20} />, path: "/student-dashboard/blogs" },
    { id: "forum", label: "Forum", icon: <MessageSquare size={20} />, path: "/forum" },
  ];

  useEffect(() => {
    const checkAuth = () => {
      const studentData = getStudentSession();
      if (!studentData) {
        router.push('/login');
      } else {
        setStudent(studentData);
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    clearStudentSession();
    router.push('/login');
  };

  const handleNavItemClick = (path: string) => {
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

  if (!student) return null;

  return (
    <div className="flex h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center p-5 border-b border-gray-200 bg-white">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center text-white font-space-grotesk font-bold text-xl">
              {student.firstName.substring(0,1)}{student.lastName.substring(0,1)}
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-navy truncate">{student.firstName} {student.lastName}</h2>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{student.branch}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavItemClick(item.path)}
                    className={`flex items-center w-full px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                      isActive
                        ? "bg-navy text-white shadow-md"
                        : "text-gray-500 hover:bg-gray-50 hover:text-navy"
                    }`}
                  >
                    <span className={`mr-3 ${isActive ? 'text-gold' : ''}`}>{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-bold text-red-500 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
         {children}
      </div>
    </div>
  );
}
