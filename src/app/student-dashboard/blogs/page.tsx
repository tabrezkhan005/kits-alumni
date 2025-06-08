"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogForm from "@/components/ui/BlogForm";
import { getStudentSession } from "@/lib/hooks/useStudentAuth";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FileText } from "lucide-react";

// Define the blog interface
interface Blog {
  id: string;
  name: string;
  title: string;
  blog: string;
  status: string;
  created_at: string;
}

export default function StudentBlogsPage() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Check authentication and load blogs on component mount
  useEffect(() => {
    const checkAuth = () => {
      const studentData = getStudentSession();
      console.log('Student session data:', studentData);

      if (!studentData) {
        // Redirect to login if no session found
        console.log('No student session found, redirecting to login');
        router.push('/login');
        return;
      }

      setStudent(studentData);
      loadStudentBlogs(studentData);

      // Attempt to fix the blogs policy by running the migration
      // This is a one-time operation that ensures the table is properly set up
      fixBlogsPolicyIfNeeded();
    };

    checkAuth();
  }, [router]);

  // Load student blogs from Supabase
  const loadStudentBlogs = async (studentData: any) => {
    setLoading(true);
    try {
      const fullName = `${studentData.firstName} ${studentData.lastName}`;
      console.log('Fetching blogs for:', fullName);

      // Try the most reliable method first - our diagnostic API
      try {
        console.log('Using diagnostic API to get blogs...');
        const response = await fetch(`/api/check-blogs?name=${encodeURIComponent(fullName)}`);

        if (!response.ok) {
          console.error(`Diagnostic API responded with status: ${response.status}`);
          throw new Error(`API responded with status: ${response.status}`);
        }

        // Parse the response carefully
        let data;
        try {
          const textData = await response.text();
          console.log('API response text length:', textData.length);

          if (!textData || textData.trim() === '') {
            console.error('Empty response from diagnostic API');
            throw new Error('Empty response from API');
          }

          data = JSON.parse(textData);
          console.log('Parsed diagnostic data:', data);
        } catch (parseError) {
          console.error('Failed to parse diagnostic API response:', parseError);
          throw parseError;
        }

        if (!data) {
          console.error('No data returned from diagnostic API');
          throw new Error('No data returned from API');
        }

        console.log('Diagnostic API response parsed successfully:', data);

        // Even if blogs array is empty, as long as the API was successful, we should use the data
        if (data.success && data.blogs !== undefined) {
          console.log('Blogs successfully loaded via diagnostic API:', data.blogs ? data.blogs.length : 0);
          setBlogs(data.blogs || []);
          setLoading(false);
          return;
        } else {
          console.error('Diagnostic API returned invalid blogs data:', data);
          if (data.error) {
            throw new Error(data.error);
          } else {
            throw new Error('Invalid blog data structure returned');
          }
        }
      } catch (apiError) {
        console.error('Error using diagnostic API:', apiError);
      }

      // Method 1: Try direct query
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('name', fullName)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading blogs with direct query:', error);

        // Method 2: Fall back to RPC function if direct query fails
        try {
          console.log('Trying RPC function to get blogs...');
          const { data: rpcData, error: rpcError } = await supabase.rpc(
            'get_student_blogs',
            { _student_name: fullName }
          );

          if (rpcError) {
            console.error('RPC error when loading blogs:', rpcError);
            setBlogs([]);
            return;
          }

          console.log('Blogs loaded via RPC:', rpcData?.length || 0);
          setBlogs(rpcData || []);
        } catch (rpcError) {
          console.error('Failed to load blogs via RPC:', rpcError);
          setBlogs([]);
        }
        return;
      }

      console.log('Blogs loaded via direct query:', data?.length || 0);
      setBlogs(data || []);
    } catch (error) {
      console.error('Error in loadStudentBlogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fix blogs policy if needed by running migration
  const fixBlogsPolicyIfNeeded = async () => {
    try {
      // Only run this in development environment
      if (process.env.NODE_ENV === 'development') {
        const response = await fetch('/api/fix-blogs-policy', {
          method: 'POST',
        });

        if (response.ok) {
          console.log('Blogs policy fixed or already correct');
        }
      }
    } catch (error) {
      console.error('Error fixing blogs policy:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle manual refresh of blogs with more robust error handling
  const handleRefreshBlogs = async () => {
    if (student) {
      console.log('Manually refreshing blogs...');

      // Remove duplicate blogs before refreshing
      try {
        await fetch('/api/remove-duplicate-blogs', { method: 'POST' });
      } catch (err) {
        console.error('Failed to remove duplicate blogs:', err);
      }

      // Try to fix any policy issues first
      try {
        const fixResponse = await fetch('/api/fix-blogs-policy', {
          method: 'POST',
        });

        if (fixResponse.ok) {
          console.log('Successfully fixed blog policies');
        } else {
          console.error('Failed to fix blog policies');
        }
      } catch (fixError) {
        console.error('Error fixing blog policies:', fixError);
      }

      // Load the blogs after policy fix
      loadStudentBlogs(student);
    }
  };

  // Add debug info component for easier troubleshooting
  const DebugInfo = () => {
    const [debugVisible, setDebugVisible] = useState(false);
    const [debugData, setDebugData] = useState<any>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isMigrating, setIsMigrating] = useState(false);

    const checkDiagnostics = async () => {
      try {
        const fullName = `${student.firstName} ${student.lastName}`;
        const response = await fetch(`/api/check-blogs?name=${encodeURIComponent(fullName)}`);

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        console.log('Diagnostic API response:', data);
        setDebugData(data);

        // Update the blogs state regardless of whether blogs were found
        // This ensures we show an empty state correctly when no blogs exist
        if (data.success && data.blogs !== undefined) {
          setBlogs(data.blogs || []);
        }

        setDebugVisible(true);
      } catch (error) {
        console.error('Error fetching diagnostics:', error);
        setDebugData({ error: 'Failed to load diagnostics' });
        setDebugVisible(true);
      }
    };

    const resetBlogsTable = async () => {
      if (!confirm('Warning: This will completely reset the blogs table and delete ALL blog posts. Are you sure?')) {
        return;
      }

      setIsResetting(true);
      try {
        const response = await fetch('/api/reset-blogs-table', {
          method: 'POST'
        });

        const data = await response.json();

        if (response.ok) {
          alert('Blogs table reset successful. Please refresh the page to see changes.');
          // Refresh diagnostics
          checkDiagnostics();
          // Reload blogs
          if (student) {
            loadStudentBlogs(student);
          }
        } else {
          alert(`Reset failed: ${data.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error resetting blogs table:', error);
        alert('Error resetting blogs table. Check console for details.');
      } finally {
        setIsResetting(false);
      }
    };

    const runDatabaseMigrations = async () => {
      setIsMigrating(true);
      try {
        const response = await fetch('/api/run-migration', {
          method: 'POST'
        });

        const data = await response.json();

        if (response.ok && data.success) {
          alert('Database migrations completed successfully! The blog submission should work now.');
          checkDiagnostics();
          if (student) {
            loadStudentBlogs(student);
          }
        } else {
          alert(`Migration failed: ${data.message || 'Unknown error'}`);
          console.error('Migration results:', data.results);
        }
      } catch (error) {
        console.error('Error running migrations:', error);
        alert('Error running database migrations. Check console for details.');
      } finally {
        setIsMigrating(false);
      }
    };

    return (
      <div className="mt-4">
        <button
          className="text-sm text-gray-500 hover:text-burgundy underline"
          onClick={checkDiagnostics}
        >
          Show diagnostics
        </button>

        {debugVisible && debugData && (
          <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200 text-xs overflow-auto">
            <div className="flex justify-between">
              <h4 className="font-bold">Diagnostics</h4>
              <button
                className="text-gray-500 hover:text-burgundy"
                onClick={() => setDebugVisible(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-2 space-y-2">
              <p>Table exists: {debugData.table_exists ? 'Yes' : 'No'}</p>
              <p>Total blogs in system: {debugData.total_blogs || 0}</p>
              <p>Blogs for this student: {debugData.blogs?.length || 0}</p>
              {debugData.blogs && debugData.blogs.length > 0 ? (
                <div>
                  <p className="font-semibold">Student's blogs:</p>
                  <ul className="pl-4 list-disc">
                    {debugData.blogs.map((blog: any, i: number) => (
                      <li key={i}>"{blog.title}" - {blog.status} - {new Date(blog.created_at).toLocaleString()}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      if (debugData.blogs && debugData.blogs.length > 0) {
                        setBlogs(debugData.blogs);
                      }
                    }}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Load these blogs directly
                  </button>
                </div>
              ) : (
                <p>No blogs found for this student.</p>
              )}
              {debugData.error && (
                <div className="text-red-500">
                  Error: {debugData.error}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-bold text-blue-600 mb-2">Fix Database Issues</h4>
                <button
                  onClick={runDatabaseMigrations}
                  disabled={isMigrating}
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-2 py-1 rounded text-xs mr-2"
                >
                  {isMigrating ? 'Running Migrations...' : 'Run Database Migrations (Fix Blog Submission)'}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-bold text-red-600">Dangerous Actions</h4>
                <p className="text-xs text-gray-500 mb-2">Use these options with caution</p>
                <button
                  onClick={resetBlogsTable}
                  disabled={isResetting}
                  className="bg-red-100 text-red-800 hover:bg-red-200 px-2 py-1 rounded text-xs"
                >
                  {isResetting ? 'Resetting...' : 'Reset Blogs Table (Delete All Blogs)'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
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

  const studentName = `${student.firstName} ${student.lastName}`;
  console.log('Rendering blogs page for student:', studentName);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <FileText size={28} className="text-burgundy mr-3" />
          <h1 className="text-3xl font-bold">Student Blogs</h1>
        </div>
        <button
          className="text-sm text-gray-600 hover:text-burgundy flex items-center"
          onClick={handleRefreshBlogs}
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c-4.97 0-9-4.03-9-9m9 9a9 9 0 009-9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl">My Blog Posts</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {blogs.length === 0 ? (
                <div className="text-gray-500 py-4">
                  <p>You haven't created any blogs yet.</p>
                  <DebugInfo />
                </div>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-lg">{blog.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            blog.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : blog.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">
                          Posted on {formatDate(blog.created_at)}
                        </p>
                        <p className="line-clamp-3 text-gray-700">{blog.blog}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card className="mb-8">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl">Create New Blog</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <BlogForm
                studentName={studentName}
                onBlogSubmitted={() => {
                  // Refresh the blog list when a new blog is submitted
                  if (student) {
                    loadStudentBlogs(student);
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
