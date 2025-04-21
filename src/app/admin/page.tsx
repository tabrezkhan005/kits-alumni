"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlusIcon, TrophyIcon, CalendarIcon, BookOpenIcon, QuestionMarkCircleIcon, CogIcon } from "@heroicons/react/24/outline";

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

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Welcome to the KITS College admin portal. Manage student registrations, events, and more.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Registration Requests"
          value={8}
          icon={UserPlusIcon}
          href="/admin/register-requests"
          color="text-blue-500"
        />
        <StatCard
          title="Achievements"
          value={24}
          icon={TrophyIcon}
          href="/admin/achievements"
          color="text-yellow-500"
        />
        <StatCard
          title="Upcoming Events"
          value={3}
          icon={CalendarIcon}
          href="/admin/events"
          color="text-green-500"
        />
        <StatCard
          title="Student Blogs"
          value={15}
          icon={BookOpenIcon}
          href="/admin/blogs"
          color="text-purple-500"
        />
        <StatCard
          title="Open Queries"
          value={12}
          icon={QuestionMarkCircleIcon}
          href="/admin/queries"
          color="text-red-500"
        />
        <StatCard
          title="System Settings"
          value={4}
          icon={CogIcon}
          href="/admin/settings"
          color="text-gray-500"
        />
      </div>

      {/* Recent Activity */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions from the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/img/default-avatar.png"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">User_{i} requested registration approval</p>
                    <p className="text-xs text-gray-500">{i} hour{i !== 1 ? 's' : ''} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
