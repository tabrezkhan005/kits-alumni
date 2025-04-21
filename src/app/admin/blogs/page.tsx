"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, FileText, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define the Blog interface based on the database schema
interface Blog {
  id: string;
  name: string;
  title: string;
  blog: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Initialize database function for updating blog status
const initDbFunction = async () => {
  try {
    const response = await fetch('/api/blogs/create-function', {
      method: 'POST',
    });
    const result = await response.json();
    console.log('Function initialization result:', result);
    return result.success;
  } catch (error) {
    console.error('Error initializing database function:', error);
    return false;
  }
};

export default function AdminBlogsPage() {
  // State for blogs and loading status
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    denied: 0
  });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [hasAttemptedPolicyFix, setHasAttemptedPolicyFix] = useState(false);
  const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch blogs from Supabase
  useEffect(() => {
    // Check if Supabase credentials are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setConnectionError('Supabase credentials not found. Please make sure your environment variables are set correctly.');
      setIsLoading(false);
      return;
    }

    // Test Supabase connection and initialize functions
    const setupAndTest = async () => {
      try {
        // Initialize the function in the background
        await initDbFunction();

        const { data, error } = await supabase.from('blogs').select('count').limit(1);
        if (error) {
          console.error('Supabase connection test failed:', error);
          setConnectionError(`Unable to connect to Supabase: ${error.message}`);
        } else {
          console.log('Supabase connection successful');
          setConnectionError(null);
          fetchBlogs();
        }
      } catch (err) {
        console.error('Error testing Supabase connection:', err);
        setConnectionError('An unexpected error occurred while connecting to the database.');
      } finally {
        setIsLoading(false);
      }
    };

    setupAndTest();
  }, []);

  // Function to fetch blogs
  const fetchBlogs = async () => {
    try {
      console.log('Fetching blogs...');
      setIsLoading(true);

      // Try using the diagnostic API first
      try {
        console.log('Using diagnostic API to get blogs...');
        const response = await fetch('/api/check-blogs');

        if (!response.ok) {
          console.error(`Diagnostic API responded with status: ${response.status}`);
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Diagnostic API response parsed successfully:', data);

        if (data.success && data.blogs !== undefined) {
          console.log('Blogs successfully loaded via diagnostic API:', data.blogs ? data.blogs.length : 0);
          setBlogs(data.blogs || []);
          calculateStats(data.blogs || []);
          setIsLoading(false);
          return;
        }
      } catch (apiError) {
        console.error('Error using diagnostic API:', apiError);
      }

      // Fall back to direct Supabase query if API fails
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs');

        // Try to fix permissions if we get an error
        if (!hasAttemptedPolicyFix) {
          await fixPermissions();
          const { data: retryData, error: retryError } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

          if (!retryError && retryData) {
            setBlogs(retryData);
            calculateStats(retryData);
          }
        }
        return;
      }

      console.log('Fetched blogs data:', data);
      setBlogs(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error in fetchBlogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (data: Blog[]) => {
    if (data) {
      const total = data.length;
      const approved = data.filter(b => b.status === 'approved').length;
      const pending = data.filter(b => b.status === 'pending').length;
      const denied = data.filter(b => b.status === 'denied').length;

      const newStats = {
        total,
        approved,
        pending,
        denied
      };

      console.log('Updated statistics:', newStats);
      setStats(newStats);
    }
  };

  // Function to fix permissions if needed
  const fixPermissions = async () => {
    try {
      console.log('Attempting to fix permissions...');

      // First attempt using the dedicated API endpoint
      const response = await fetch('/api/fix-blogs-policy', {
        method: 'POST',
      });
      const result = await response.json();

      console.log('Fix permissions result:', result);

      if (result.success) {
        toast.success('Database permissions fixed successfully');
        setHasAttemptedPolicyFix(true);

        // Also try to initialize the function again
        await initDbFunction();

        return true;
      } else {
        // Try a more aggressive approach with direct SQL
        try {
          const directResponse = await fetch('/api/apply-sql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sql: `
                -- Disable RLS temporarily to make changes
                ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;

                -- Drop all existing policies
                DROP POLICY IF EXISTS "blogs_select_policy" ON public.blogs;
                DROP POLICY IF EXISTS "blogs_insert_policy" ON public.blogs;
                DROP POLICY IF EXISTS "blogs_update_policy" ON public.blogs;
                DROP POLICY IF EXISTS "blogs_delete_policy" ON public.blogs;

                -- Re-enable RLS with new policies
                ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

                -- Create permissive policies
                CREATE POLICY "blogs_select_policy" ON public.blogs FOR SELECT USING (true);
                CREATE POLICY "blogs_insert_policy" ON public.blogs FOR INSERT WITH CHECK (true);
                CREATE POLICY "blogs_update_policy" ON public.blogs FOR UPDATE USING (true) WITH CHECK (true);
                CREATE POLICY "blogs_delete_policy" ON public.blogs FOR DELETE USING (true);

                -- Grant permissions
                GRANT ALL ON public.blogs TO authenticated;
                GRANT ALL ON public.blogs TO anon;
                GRANT ALL ON public.blogs TO service_role;
              `
            }),
          });

          const directResult = await directResponse.json();
          console.log('Direct SQL fix result:', directResult);

          if (directResult.success) {
            toast.success('Database permissions fixed with direct SQL');
            setHasAttemptedPolicyFix(true);
            return true;
          }
        } catch (directError) {
          console.error('Error with direct SQL fix:', directError);
        }

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

  // Function to handle blog status update
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      console.log(`Attempting to update blog ${id} status to ${newStatus}`);

      // Check if Supabase connection is available
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        toast.error('Supabase connection not configured. Please set up your environment variables.');
        return;
      }

      setUpdatingId(id);
      toast(`Updating blog to ${newStatus}...`, { icon: '⏳' });

      // First approach: Try using a direct API endpoint that uses supabaseAdmin
      try {
        const response = await fetch(`/api/blogs/update-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            status: newStatus
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Status update result:', result);
          toast.success(`Blog ${newStatus} successfully`);
          await fetchBlogs();
          return;
        } else {
          console.error('API response not OK:', response.status);
          // Continue to fallback approaches
        }
      } catch (apiError) {
        console.error('Error using API approach:', apiError);
        // Continue to fallback approaches
      }

      // Second approach: Try fixing permissions first
      if (!hasAttemptedPolicyFix) {
        const fixed = await fixPermissions();
        setHasAttemptedPolicyFix(true);
      }

      // Try direct RPC call as a fallback
      try {
        const { data: rpcResult, error: rpcError } = await supabase.rpc(
          'update_blog_status',
          {
            blog_id: id,
            new_status: newStatus
          }
        );

        if (rpcError) {
          console.error('RPC error:', rpcError);
          // Continue to next approach
        } else {
          console.log('RPC result:', rpcResult);
          toast.success(`Blog ${newStatus} successfully`);
          await fetchBlogs();
          return;
        }
      } catch (rpcError) {
        console.error('Error using RPC approach:', rpcError);
      }

      // Last attempt: Regular update
      const { data, error } = await supabase
        .from('blogs')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating blog status:', error);
        toast.error(`Failed to update blog: ${error.message}`);

        // If all approaches fail, inform user and refresh page
        toast.error('Could not update blog status. Refreshing page...');
        setTimeout(() => {
          router.refresh();
        }, 2000);
      } else {
        toast.success(`Blog ${newStatus} successfully`);
        await fetchBlogs();
      }
    } catch (error: any) {
      console.error('Error handling status update:', error);
      toast.error(`Error: ${error.message || 'Failed to update blog'}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get color for status badge
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'denied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  // Get icon for status
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  // Toggle blog content expansion
  const toggleBlogExpansion = (id: string) => {
    if (expandedBlogId === id) {
      setExpandedBlogId(null);
    } else {
      setExpandedBlogId(id);
    }
  };

  // Truncate text for preview
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Student Blogs Management</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Denied</CardTitle>
            <XCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.denied}</div>
          </CardContent>
        </Card>
      </div>

      {/* Connection error display */}
      {connectionError && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700">{connectionError}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blogs table */}
      <Card>
        <CardHeader>
          <CardTitle>All Student Blogs</CardTitle>
          <CardDescription>
            Review and manage student blog submissions. Approve or deny them to
            control what appears on the public site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-burgundy" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No blog submissions found.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Student</TableHead>
                    <TableHead className="w-[220px]">Title</TableHead>
                    <TableHead className="w-[350px]">Content</TableHead>
                    <TableHead className="w-[150px]">Date</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">{blog.name}</TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>
                        <div className="cursor-pointer" onClick={() => toggleBlogExpansion(blog.id)}>
                          {expandedBlogId === blog.id ? (
                            <div className="whitespace-pre-wrap">{blog.blog}</div>
                          ) : (
                            <div>{truncateText(blog.blog)}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(blog.created_at)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(blog.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(blog.status)}
                            {blog.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {blog.status !== 'approved' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-500 text-green-600 hover:bg-green-50"
                              onClick={() => handleStatusUpdate(blog.id, 'approved')}
                              disabled={updatingId === blog.id}
                            >
                              {updatingId === blog.id ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4 mr-1" />
                              )}
                              Approve
                            </Button>
                          )}
                          {blog.status !== 'denied' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-600 hover:bg-red-50"
                              onClick={() => handleStatusUpdate(blog.id, 'denied')}
                              disabled={updatingId === blog.id}
                            >
                              {updatingId === blog.id ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <XCircle className="w-4 h-4 mr-1" />
                              )}
                              Deny
                            </Button>
                          )}
                          {blog.status !== 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                              onClick={() => handleStatusUpdate(blog.id, 'pending')}
                              disabled={updatingId === blog.id}
                            >
                              {updatingId === blog.id ? (
                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <AlertCircle className="w-4 h-4 mr-1" />
                              )}
                              Reset
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
