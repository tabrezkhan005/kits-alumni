'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getStudentSession } from '@/lib/hooks/useStudentAuth';

function getCurrentUserEmail() {
  const session = getStudentSession();
  return session?.email || '';
}

interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
}

interface Comment {
  id: string;
  content: string;
  author_id: string;
  created_at: string;
}

export default function ForumPostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [comment, setComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentError, setCommentError] = useState('');
  const userEmail = getCurrentUserEmail();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setHasError(false);
      try {
        const res = await fetch(`/api/forum/post/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        setPost(data.post);
        setComments(data.comments || []);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsCommenting(true);
    setCommentError('');
    try {
      const res = await fetch(`/api/forum/post/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment, author_id: userEmail }),
      });
      if (!res.ok) {
        const data = await res.json();
        setCommentError(data.error || 'Failed to add comment');
      } else {
        setComment('');
        // Refresh comments
        const data = await res.json();
        setComments(data.comments);
      }
    } catch (err) {
      setCommentError('Network error');
    } finally {
      setIsCommenting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col items-center py-0">
      <div className="w-full max-w-2xl mx-auto px-4 py-10">
        {isLoading ? (
          <div className="text-center py-12 text-blue-700 font-medium">Loading...</div>
        ) : hasError || !post ? (
          <div className="text-center text-red-500 py-12">Failed to load post.</div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-blue-100">
              <h1 className="text-2xl font-bold text-blue-900 mb-2">{post.title}</h1>
              <div className="text-sm text-gray-500 mb-4">
                by <span className="font-medium text-blue-700">{post.author_id}</span> • {new Date(post.created_at).toLocaleString()}
              </div>
              <div className="text-gray-800 mb-2 whitespace-pre-line">{post.content}</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-blue-100 mb-8">
              <h2 className="text-lg font-semibold text-blue-800 mb-4">Comments</h2>
              <ul className="space-y-4 mb-6">
                {comments.length === 0 && <li className="text-gray-400">No comments yet.</li>}
                {comments.map((c) => (
                  <li key={c.id} className="border-b border-gray-100 pb-2">
                    <div className="text-sm text-gray-700 mb-1">{c.content}</div>
                    <div className="text-xs text-gray-400">by {c.author_id} • {new Date(c.created_at).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  required
                  maxLength={1000}
                  placeholder="Add a comment..."
                />
                {commentError && <div className="text-red-500 text-sm">{commentError}</div>}
                <div className="flex justify-end">
                  <Button type="submit" disabled={isCommenting || !comment.trim()} className="bg-blue-700 hover:bg-blue-800 text-white">
                    {isCommenting ? 'Posting...' : 'Post Comment'}
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
