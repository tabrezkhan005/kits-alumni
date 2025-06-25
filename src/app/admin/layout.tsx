"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import {
  HomeIcon,
  UserPlusIcon,
  TrophyIcon,
  CalendarIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  CogIcon,
  UserCircleIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

// Admin navigation items with icons
const navItems = [
  {
    name: "Register Requests",
    href: "/admin/register-requests",
    icon: UserPlusIcon,
  },
  {
    name: "Achievements",
    href: "/admin/achievements",
    icon: TrophyIcon,
  },
  {
    name: "Event Organising",
    href: "/admin/events",
    icon: CalendarIcon,
  },
  {
    name: "Student Blogs",
    href: "/admin/blogs",
    icon: BookOpenIcon,
  },
  {
    name: "Queries",
    href: "/admin/queries",
    icon: QuestionMarkCircleIcon,
  },
  {
    name: "Broadcast",
    href: "/admin/broadcast",
    icon: EnvelopeIcon,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: CogIcon,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adminInfo, setAdminInfo] = useState<{ name?: string; email?: string } | null>(null);

  // Fetch admin info
  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await fetch("/api/check-admin");
        const data = await res.json();
        if (data.isAdmin && data.admin) {
          setAdminInfo({ name: data.admin.name, email: data.admin.email });
        }
      } catch (e) {
        setAdminInfo(null);
      }
    }
    fetchAdmin();
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Helper to get display name (before @ if email, or name)
  const getDisplayName = () => {
    if (adminInfo?.name && adminInfo.name !== adminInfo.email) return adminInfo.name;
    if (adminInfo?.email) return adminInfo.email.split("@")[0];
    return "Admin";
  };

  // Helper to get initial for avatar
  const getInitial = () => {
    const displayName = getDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
        {/* User profile section */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xl font-bold select-none">
              {/* Show initial if no image */}
              {getInitial()}
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-medium text-gray-900 leading-tight">
                {getDisplayName()}
              </h3>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg group transition-colors ${
                  isActive
                    ? "bg-burgundy text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className={`flex-shrink-0 w-5 h-5 mr-3 ${
                  isActive ? "text-white" : "text-gray-500 group-hover:text-gray-600"
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with date and time */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-3 flex items-center justify-between h-[72px]">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-medium text-gray-900">Admin Dashboard</h2>
                <p className="text-xs text-gray-500">Control Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full bg-burgundy/10 flex items-center justify-center">
                <CalendarIcon className="w-7 h-7 text-burgundy" />
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  {format(currentTime, "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-burgundy font-semibold">
                  {format(currentTime, "h:mm a")}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
