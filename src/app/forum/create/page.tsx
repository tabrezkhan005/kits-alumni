'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getStudentSession } from '@/lib/hooks/useStudentAuth';

function getCurrentUserEmail() {
  const session = getStudentSession();
  return session?.email || '';
}

export default function ForumCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const userEmail = getCurrentUserEmail();
    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author_id: userEmail }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create post');
      } else {
        router.push('/forum');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col items-center py-0">
      <div className="w-full max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Create New Post</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6 border border-blue-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              maxLength={2000}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-blue-700 hover:bg-blue-800 text-white">
              {isLoading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
