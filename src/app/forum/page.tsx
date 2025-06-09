'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';
import { getStudentSession } from '@/lib/hooks/useStudentAuth';

function getCurrentUserEmail() {
  const session = getStudentSession();
  return session?.email || '';
}

// Type definitions
interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const userEmail = getCurrentUserEmail();

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setHasError(false);
      try {
        const res = await fetch('/api/forum/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col items-center py-0">
      <header className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight mb-2">🎓 Student Forum</h1>
        <p className="text-gray-600 text-center max-w-xl mb-4">A place for students to share ideas, ask questions, and connect with peers. Be respectful and help each other grow!</p>
      </header>
      <main className="w-full max-w-3xl mx-auto px-4 flex-1">
        {isLoading && <div className="text-center py-12 text-blue-700 font-medium">Loading posts...</div>}
        {hasError && <div className="text-center text-red-500 py-12">Failed to load posts.</div>}
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition border border-blue-100">
              <Link href={`/forum/post/${post.id}`} className="block">
                <div className="font-semibold text-xl text-blue-800 mb-1 line-clamp-1">{post.title}</div>
                <div className="text-sm text-gray-500 mb-2">
                  by <span className="font-medium text-blue-700">{post.author_id}</span> • {new Date(post.created_at).toLocaleString()}
                </div>
                <div className="text-gray-700 line-clamp-2 mb-2">{post.content}</div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Comments: --</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Link href="/forum/create" className="fixed bottom-8 right-8 z-50">
        <Button size="lg" className="rounded-full shadow-lg bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 flex items-center gap-2">
          <MessageSquarePlus className="w-5 h-5" /> New Post
        </Button>
      </Link>
    </div>
  );
}
