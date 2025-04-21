"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { TrophyIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";

// Log the Supabase client to check if it's initialized correctly
console.log('Supabase client:', supabase);

// Define the Achievement interface based on the database schema
interface Achievement {
  id: string;
  name: string;
  subject: string;
  description: string;
  date: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function Achievements() {
  // State for achievements and loading status
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    competitionWins: 0,
    researchPublications: 0,
    sportsMedals: 0,
    approved: 0,
    pending: 0,
    denied: 0
  });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [hasAttemptedPolicyFix, setHasAttemptedPolicyFix] = useState(false);

  // Fetch achievements from Supabase
  useEffect(() => {
    // Check if Supabase credentials are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setConnectionError('Supabase credentials not found. Please make sure your environment variables are set correctly.');
      setIsLoading(false);
      return;
    }

    // Test supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('achievements').select('count').limit(1);
        if (error) {
          console.error('Supabase connection test failed:', error);
          setConnectionError(`Unable to connect to Supabase: ${error.message}`);
        } else {
          console.log('Supabase connection successful');
          setConnectionError(null);
          fetchAchievements();
        }
      } catch (err) {
        console.error('Error testing Supabase connection:', err);
        setConnectionError('An unexpected error occurred while connecting to the database.');
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  // Function to fetch achievements
  const fetchAchievements = async () => {
    try {
      console.log('Fetching achievements...');
      setIsLoading(true);

      // Fetch all achievements ordered by date descending
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching achievements:', error);
        toast?.error('Failed to load achievements');
        return;
      }

      console.log('Fetched achievements data:', data);
      setAchievements(data || []);

      // Calculate statistics
      if (data) {
        const total = data.length;
        const competitionWins = data.filter(a => a.type === 'Competition wins').length;
        const researchPublications = data.filter(a => a.type === 'Research Publications').length;
        const sportsMedals = data.filter(a => a.type === 'Sports Medal').length;
        const approved = data.filter(a => a.status === 'approved').length;
        const pending = data.filter(a => a.status === 'pending').length;
        const denied = data.filter(a => a.status === 'denied').length;

        const newStats = {
          total,
          competitionWins,
          researchPublications,
          sportsMedals,
          approved,
          pending,
          denied
        };

        console.log('Updated statistics:', newStats);
        setStats(newStats);
      }
    } catch (error) {
      console.error('Error in fetchAchievements:', error);
      toast?.error('Failed to load achievements');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fix permissions if needed
  const fixPermissions = async () => {
    try {
      console.log('Attempting to fix permissions...');
      const response = await fetch('/api/fix-achievements-policy');
      const result = await response.json();

      console.log('Fix permissions result:', result);

      if (result.success) {
        toast.success('Database permissions fixed successfully');
        setHasAttemptedPolicyFix(true);
        return true;
      } else {
        toast.error(`Failed to fix permissions: ${result.error}`);
        setHasAttemptedPolicyFix(true);
        return false;
      }
    } catch (error) {
      console.error('Error fixing permissions:', error);
      toast.error('Could not fix permissions due to an error');
      setHasAttemptedPolicyFix(true);
      return false;
    }
  };

  // Function to handle achievement status update
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      console.log(`Attempting to update achievement ${id} status to ${newStatus}`);

      // Check if Supabase connection is available
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        toast.error('Supabase connection not configured. Please set up your environment variables.');
        return;
      }

      setUpdatingId(id);
      toast(`Updating achievement to ${newStatus}...`, { icon: '⏳' });

      // Try using the service role via API endpoint for direct update
      // This bypasses any client-side permissions issues
      try {
        const response = await fetch(`/api/update-achievement-status?id=${id}&status=${newStatus}`);
        if (response.ok) {
          console.log('Achievement updated via API');
          toast.success(`Achievement ${newStatus} successfully`);

          // Refresh data after successful update
          await fetchAchievements();
          return;
        }
      } catch (apiError) {
        console.error('Error updating via API:', apiError);
        // Fall back to client-side update if API fails
      }

      // Client-side update (fallback)
      const { data, error } = await supabase
        .from('achievements')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating achievement status:', error);

        // If permission error, try to fix it
        if (error.code === '42501' && !hasAttemptedPolicyFix) {
          toast('Fixing database permissions...', { icon: '🔧' });
          const fixed = await fixPermissions();
          if (fixed) {
            // Retry the update after fixing permissions
            return handleStatusUpdate(id, newStatus);
          }
        }

        toast.error(`Failed to update status: ${error.message}`);
        return;
      }

      console.log('Update successful with client-side code');
      toast.success(`Achievement ${newStatus} successfully`);

      // Refresh the entire data from Supabase to ensure UI is in sync
      await fetchAchievements();

    } catch (error) {
      console.error('Error in handleStatusUpdate:', error);
      toast.error('An unexpected error occurred while updating');
    } finally {
      setUpdatingId(null);
    }
  };

  // Function to get status color for badges
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

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-700" />;
      case 'denied':
        return <XCircle className="h-4 w-4 text-red-700" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-700" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Achievements</h1>
          <p className="text-gray-500 mt-2">
            Manage and showcase student accomplishments
          </p>
        </div>
      </div>

      {connectionError ? (
        <Card className="p-8 text-center bg-red-50">
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Database Connection Error</h3>
            <p className="text-red-600 mt-2 max-w-md mx-auto">
              {connectionError}
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded-md text-left text-sm">
              <p className="font-semibold mb-2">Troubleshooting steps:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Check that you have a .env.local file with Supabase credentials</li>
                <li>Verify that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set</li>
                <li>Restart the development server after updating environment variables</li>
              </ol>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements Overview</CardTitle>
              <CardDescription>Statistics for all achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-gray-500">Total Achievements</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{stats.competitionWins}</div>
                  <div className="text-sm text-gray-500">Competition Wins</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{stats.researchPublications}</div>
                  <div className="text-sm text-gray-500">Research Publications</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{stats.sportsMedals}</div>
                  <div className="text-sm text-gray-500">Sports Medals</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">{stats.approved}</div>
                  <div className="text-sm text-green-700">Approved</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
                  <div className="text-sm text-yellow-700">Pending</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">{stats.denied}</div>
                  <div className="text-sm text-red-700">Denied</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-burgundy animate-spin" />
              <span className="ml-2 text-lg text-gray-600">Loading achievements...</span>
            </div>
          ) : achievements.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <TrophyIcon className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No achievements found</h3>
                <p className="text-gray-500 mt-1">
                  Start by adding student achievements to showcase their accomplishments.
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{achievement.subject}</CardTitle>
                      <div className="flex items-center">
                        {getStatusIcon(achievement.status)}
                        <span className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(achievement.status)}`}>
                          {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <CardDescription>{new Date(achievement.date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-3">
                      <div className="relative h-8 w-8 mr-3 overflow-hidden rounded-full bg-gray-100">
                        <Image
                          src="/img/default-avatar.png"
                          alt={achievement.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{achievement.name}</div>
                        <div className="text-xs text-gray-500">{achievement.type}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>

                    {/* Only show action buttons if status is pending */}
                    {achievement.status === 'pending' && (
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            console.log('Approve button clicked for achievement:', achievement.id);
                            handleStatusUpdate(achievement.id, 'approved');
                          }}
                          disabled={updatingId === achievement.id}
                          className="flex items-center px-2 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 disabled:opacity-50"
                        >
                          {updatingId === achievement.id ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            console.log('Deny button clicked for achievement:', achievement.id);
                            handleStatusUpdate(achievement.id, 'denied');
                          }}
                          disabled={updatingId === achievement.id}
                          className="flex items-center px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
                        >
                          {updatingId === achievement.id ? (
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          Deny
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
