"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlusIcon, TrophyIcon, CalendarIcon, BookOpenIcon, QuestionMarkCircleIcon, CogIcon } from "@heroicons/react/24/outline";
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Stats card component for the dashboard
const StatCard = ({ title, value, icon: Icon, href, color }: {
  title: string;
  value: number;
  icon: any;
  href: string;
  color: string;
}) => (
  <Link href={href}>
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  </Link>
);

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminData, setAdminData] = useState<{ isAdmin: boolean; admin: any | null }>({
    isAdmin: false,
    admin: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const response = await fetch('/api/check-admin');
        const data = await response.json();

        setAdminData(data);

        if (!data.isAdmin) {
          // Redirect to login if not admin
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminStatus();
  }, [router]);

  // Admin logout function
  const handleLogout = async () => {
    try {
      await fetch('/api/admin-logout', {
        method: 'POST',
      });

      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Show loading while checking admin status
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  // If not admin and not loading, we'll redirect in useEffect
  if (!adminData.isAdmin && !isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-8 px-4 flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-burgundy mb-4">Admin Dashboard</h1>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">Welcome, {adminData.admin?.email}</p>
            <p className="text-sm text-gray-500 mt-1">You are logged in as an administrator</p>
          </div>

          <div className="flex justify-between items-center">
            <Button
              className="bg-burgundy hover:bg-burgundy/90 text-white px-4 py-2 rounded-md"
              asChild
            >
              <Link href="/admin/register-requests">Manage Registration Requests</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Logout button positioned at the bottom left */}
      <div className="container mx-auto px-4 pb-4">
        <Button
          onClick={handleLogout}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
