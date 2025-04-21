'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface Blog {
  id: string;
  name: string;
  title: string;
  blog: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface BlogListProps {
  blogs: Blog[];
  isAdmin?: boolean;
}

export default function BlogList({ blogs, isAdmin = false }: BlogListProps) {
  const [expandedBlogs, setExpandedBlogs] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateBlogStatus = async (blogId: string, status: string) => {
    setIsLoading((prev) => ({ ...prev, [blogId]: true }));

    const formData = new FormData();
    formData.append('blogId', blogId);
    formData.append('status', status);

    try {
      const response = await fetch('/api/update-blog-status', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update blog status');
      }

      toast.success(`Blog has been ${status === 'approved' ? 'approved' : 'rejected'}`);

      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error updating blog status:', error);
      toast.error(`Failed to ${status === 'approved' ? 'approve' : 'reject'} the blog. Please try again.`);
    } finally {
      setIsLoading((prev) => ({ ...prev, [blogId]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Card key={blog.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{blog.title}</CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  By {blog.name} • {formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })}
                </div>
              </div>
              <Badge
                className={
                  blog.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : blog.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }
              >
                {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className={expandedBlogs[blog.id] ? '' : 'line-clamp-3'}>
              {blog.blog}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-gray-500"
              onClick={() => toggleExpand(blog.id)}
            >
              <EyeIcon className="h-4 w-4 mr-1" />
              {expandedBlogs[blog.id] ? 'Show less' : 'Read more'}
            </Button>

            {isAdmin && blog.status === 'pending' && (
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                  disabled={isLoading[blog.id]}
                  onClick={() => updateBlogStatus(blog.id, 'approved')}
                >
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  disabled={isLoading[blog.id]}
                  onClick={() => updateBlogStatus(blog.id, 'rejected')}
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {blogs.length === 0 && (
        <div className="text-center py-8 text-gray-500">No blogs found.</div>
      )}
    </div>
  );
}
