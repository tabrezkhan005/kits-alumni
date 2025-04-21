'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';

interface BlogFormProps {
  studentName: string;
  onBlogSubmitted?: () => void; // Callback for when blog is submitted
}

export default function BlogForm({ studentName, onBlogSubmitted }: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [attempts, setAttempts] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setAttempts([]);

    try {
      console.log('Submitting blog for:', studentName);
      console.log('Title:', title);
      console.log('Content length:', content.length);

      // Log submission attempt
      const log = (method: string, success: boolean, error?: any) => {
        const message = `${method}: ${success ? 'Success' : 'Failed'}${error ? ` - ${error.message || JSON.stringify(error)}` : ''}`;
        setAttempts(prev => [...prev, message]);
        console.log(message);
      };

      // Method 1: Try API route first
      let success = false;

      try {
        const formData = new FormData();
        formData.append('name', studentName);
        formData.append('title', title);
        formData.append('blog', content);

        console.log('Submitting via API route...');
        const response = await fetch('/api/blogs', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          log('API route', true);
          success = true;

          // Successfully submitted, handle success and return early
          setMessage({
            text: 'Blog submitted successfully! It will be reviewed by an administrator.',
            type: 'success'
          });

          // Clear form fields
          setTitle('');
          setContent('');

          // Notify parent component that a blog was submitted
          if (onBlogSubmitted) {
            onBlogSubmitted();
          }

          return; // Return early after successful submission
        } else {
          log('API route', false, data.error || 'Response not OK');
        }
      } catch (apiError) {
        log('API route', false, apiError);
      }

      // Method 2: Try RPC method if API failed
      if (!success) {
        try {
          console.log('Trying RPC method...');
          const { data: rpcData, error: rpcError } = await supabase.rpc(
            'add_student_blog',
            {
              _name: studentName,
              _title: title,
              _blog: content
            }
          );

          if (!rpcError) {
            log('RPC method', true);
            success = true;

            // Successfully submitted, handle success and return early
            setMessage({
              text: 'Blog submitted successfully! It will be reviewed by an administrator.',
              type: 'success'
            });

            // Clear form fields
            setTitle('');
            setContent('');

            // Notify parent component that a blog was submitted
            if (onBlogSubmitted) {
              onBlogSubmitted();
            }

            return; // Return early after successful submission
          } else {
            log('RPC method', false, rpcError);
          }
        } catch (rpcError) {
          log('RPC method', false, rpcError);
        }
      }

      // Method 3: Last resort - direct SQL insert
      if (!success) {
        try {
          console.log('Trying direct SQL insert...');
          const directResponse = await fetch('/api/direct-blog-add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: studentName,
              title: title,
              blog: content
            }),
          });

          const directData = await directResponse.json();

          if (directResponse.ok) {
            log('Direct SQL insert', true);
            success = true;

            // Successfully submitted, handle success and return early
            setMessage({
              text: 'Blog submitted successfully! It will be reviewed by an administrator.',
              type: 'success'
            });

            // Clear form fields
            setTitle('');
            setContent('');

            // Notify parent component that a blog was submitted
            if (onBlogSubmitted) {
              onBlogSubmitted();
            }

            return; // Return early after successful submission
          } else {
            log('Direct SQL insert', false, directData.error || 'Response not OK');
          }
        } catch (directError) {
          log('Direct SQL insert', false, directError);
        }
      }

      if (!success) {
        throw new Error('All blog submission methods failed');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      setMessage({
        text: 'Failed to submit blog. Please check the submission details and try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}

          {message.type === 'error' && attempts.length > 0 && (
            <div className="mt-2 text-xs">
              <p className="font-semibold">Submission attempts:</p>
              <ul className="list-disc pl-5 mt-1">
                {attempts.map((attempt, i) => (
                  <li key={i}>{attempt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="blog" className="block text-sm font-medium text-gray-700 mb-1">
          Blog
        </label>
        <Textarea
          id="blog"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          required
          rows={5}
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-burgundy hover:bg-burgundy/90 text-white"
      >
        {isSubmitting ? 'Uploading...' : 'Upload Blog'}
      </Button>
    </form>
  );
}
