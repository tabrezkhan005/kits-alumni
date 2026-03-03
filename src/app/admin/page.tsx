"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlusIcon, TrophyIcon, CalendarIcon, BookOpenIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { supabase } from "@/lib/supabase";

// Stats card component for the dashboard
const StatCard = ({ title, value, icon: Icon, href, color, loading }: {
  title: string;
  value: number;
  icon: any;
  href: string;
  color: string;
  loading?: boolean;
}) => (
  <Link href={href}>
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-12 bg-gray-200 rounded animate-pulse" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
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
  const [stats, setStats] = useState({
    registerRequests: 0,
    pendingRegistrations: 0,
    blogs: 0,
    pendingBlogs: 0,
    achievements: 0,
    pendingAchievements: 0,
    queries: 0,
    pendingQueries: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const response = await fetch('/api/check-admin');
        const data = await response.json();

        setAdminData(data);

        if (!data.isAdmin) {
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

  // Fetch stats from database
  useEffect(() => {
    async function fetchStats() {
      if (!adminData.isAdmin) return;

      try {
        const [regRes, blogsRes, achieveRes, queriesRes] = await Promise.all([
          supabase.from('register_requests').select('id, status'),
          supabase.from('blogs').select('id, status'),
          supabase.from('achievements').select('id, status'),
          supabase.from('queries').select('id, status'),
        ]);

        setStats({
          registerRequests: regRes.data?.length || 0,
          pendingRegistrations: regRes.data?.filter(r => r.status === 'pending').length || 0,
          blogs: blogsRes.data?.length || 0,
          pendingBlogs: blogsRes.data?.filter(b => b.status === 'pending').length || 0,
          achievements: achieveRes.data?.length || 0,
          pendingAchievements: achieveRes.data?.filter(a => a.status === 'pending').length || 0,
          queries: queriesRes.data?.length || 0,
          pendingQueries: queriesRes.data?.filter(q => q.status === 'pending').length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setStatsLoading(false);
      }
    }

    fetchStats();
  }, [adminData.isAdmin]);

  // Admin logout function
  const handleLogout = async () => {
    try {
      await fetch('/api/admin-logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!adminData.isAdmin && !isLoading) return null;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {adminData.admin?.name || adminData.admin?.email}</h1>
        <p className="text-gray-500">Here's an overview of what's happening in the alumni portal today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registration Requests"
          value={stats.pendingRegistrations}
          icon={UserPlusIcon}
          href="/admin/register-requests"
          color="text-blue-600"
          loading={statsLoading}
        />
        <StatCard
          title="Pending Blogs"
          value={stats.pendingBlogs}
          icon={BookOpenIcon}
          href="/admin/blogs"
          color="text-purple-600"
          loading={statsLoading}
        />
        <StatCard
          title="Pending Achievements"
          value={stats.pendingAchievements}
          icon={TrophyIcon}
          href="/admin/achievements"
          color="text-yellow-600"
          loading={statsLoading}
        />
        <StatCard
          title="Open Queries"
          value={stats.pendingQueries}
          icon={QuestionMarkCircleIcon}
          href="/admin/queries"
          color="text-red-600"
          loading={statsLoading}
        />
      </div>

      {/* Totals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registrations"
          value={stats.registerRequests}
          icon={UserPlusIcon}
          href="/admin/register-requests"
          color="text-blue-400"
          loading={statsLoading}
        />
        <StatCard
          title="Total Blogs"
          value={stats.blogs}
          icon={BookOpenIcon}
          href="/admin/blogs"
          color="text-purple-400"
          loading={statsLoading}
        />
        <StatCard
          title="Total Achievements"
          value={stats.achievements}
          icon={TrophyIcon}
          href="/admin/achievements"
          color="text-yellow-400"
          loading={statsLoading}
        />
        <StatCard
          title="Total Queries"
          value={stats.queries}
          icon={QuestionMarkCircleIcon}
          href="/admin/queries"
          color="text-red-400"
          loading={statsLoading}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-burgundy hover:bg-burgundy/90 text-white">
            <Link href="/admin/register-requests">Manage Registrations</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/blogs">Review Blogs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/achievements">Review Achievements</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/queries">View Queries</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/broadcast">Send Broadcast</Link>
          </Button>
        </div>
      </div>

      {/* Logout */}
      <div>
        <Button onClick={handleLogout} variant="outline" className="text-gray-600 hover:text-red-600 hover:border-red-300">
          Logout
        </Button>
      </div>
    </div>
  );
}
