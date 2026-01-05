'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getStudentSession } from '@/lib/hooks/useStudentAuth';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageSquare, User, Clock, Send, Hash, Share2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const session = getStudentSession();
    if (session) {
      const fullName = `${session.firstName || ''} ${session.lastName || ''}`.trim();
      setUserName(fullName && fullName !== '' ? fullName : (session.email || ''));
    }
  }, []);

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
    if (!comment.trim()) return;
    
    setIsCommenting(true);
    setCommentError('');
    try {
      const res = await fetch(`/api/forum/post/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment, author_id: userName }),
      });
      if (!res.ok) {
        const data = await res.json();
        setCommentError(data.error || 'Failed to add comment');
      } else {
        setComment('');
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
    <div className="min-h-screen bg-white font-inter">
      {/* Mini Hero / Header */}
      <div className="bg-navy pt-24 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/forum" className="inline-flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-[0.3em] mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Discussions
          </Link>
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gold uppercase tracking-widest">General</span>
             <div className="w-8 h-px bg-white/20"></div>
             <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Discussion Thread</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white max-w-4xl leading-tight">
             {post ? post.title : 'Loading thread...'}
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-6 -mt-32 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Post Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {isLoading ? (
              <div className="bg-white p-16 rounded-[3rem] shadow-2xl shadow-navy/5 border border-gray-100 flex flex-col items-center justify-center">
                 <div className="w-12 h-12 border-4 border-navy border-t-gold rounded-full animate-spin"></div>
              </div>
            ) : post ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-navy/5 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center text-gold font-bold text-sm shadow-xl">
                        {post.author_id.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                         <p className="text-navy font-bold text-sm leading-none mb-2">{post.author_id}</p>
                         <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5 text-gold" />
                            {new Date(post.created_at).toLocaleString()}
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-navy/5 hover:text-navy transition-all">
                         <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-navy/5 hover:text-navy transition-all">
                         <MoreHorizontal className="w-4 h-4" />
                      </button>
                   </div>
                </div>

                <div className="prose prose-navy max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed font-medium whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                <div className="mt-16 pt-10 border-t border-gray-50 flex flex-wrap gap-3">
                   {['AI', 'Research', 'Discussion'].map(tag => (
                     <span key={tag} className="px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-100">
                        #{tag}
                     </span>
                   ))}
                </div>
              </motion.div>
            ) : (
              <div className="bg-red-50 p-10 rounded-[3rem] text-center border border-red-100 text-red-500 font-bold">
                 Thread not found.
              </div>
            )}

            {/* Comments Section */}
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-space-grotesk font-bold text-navy flex items-center gap-3">
                     <MessageSquare className="w-6 h-6 text-gold" /> Community Replies
                  </h3>
                  <span className="px-4 py-1.5 bg-navy/5 rounded-full text-[10px] font-bold text-navy uppercase tracking-widest border border-navy/10">
                     {comments.length} Comments
                  </span>
               </div>

               {/* New Comment Input */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-navy/5 border border-gray-100"
               >
                  <form onSubmit={handleCommentSubmit} className="space-y-6">
                     <div className="relative">
                        <textarea
                          className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-8 py-6 text-navy font-medium placeholder:text-gray-400 focus:outline-none focus:border-gold focus:bg-white transition-all resize-none min-h-[120px]"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          required
                          maxLength={1000}
                          placeholder="Contribute your thoughts to this discussion..."
                        />
                        <div className="absolute bottom-4 right-6 text-[10px] font-bold text-gray-300 uppercase">
                           {comment.length}/1000
                        </div>
                     </div>
                     {commentError && <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest px-4">{commentError}</div>}
                     <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={isCommenting || !comment.trim()} 
                          className="bg-navy hover:bg-gold hover:text-navy text-white rounded-2xl px-10 py-7 font-bold shadow-2xl shadow-navy/10 transition-all flex items-center gap-3"
                        >
                          {isCommenting ? 'POSTING...' : 'POST REPLY'}
                          <Send className="w-4 h-4" />
                        </Button>
                     </div>
                  </form>
               </motion.div>

               {/* Comments List */}
               <div className="space-y-6">
                  <AnimatePresence>
                     {comments.map((c, index) => (
                       <motion.div 
                         key={c.id}
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: index * 0.1 }}
                         className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-lg shadow-navy/5 group hover:border-gold/20 transition-all"
                       >
                          <div className="flex items-center justify-between mb-6">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-navy font-bold text-xs group-hover:bg-gold transition-all">
                                   {c.author_id.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                   <p className="text-navy font-bold text-xs">{c.author_id}</p>
                                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(c.created_at).toLocaleDateString()}</p>
                                </div>
                             </div>
                          </div>
                          <p className="text-gray-500 text-sm font-medium leading-relaxed mb-0">
                             {c.content}
                          </p>
                       </motion.div>
                     ))}
                  </AnimatePresence>

                  {comments.length === 0 && !isLoading && (
                    <div className="bg-gray-50 p-16 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                       <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">No replies yet. Be the first to join the conversation!</p>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Sidebar / Recommendations */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-navy p-10 rounded-[3rem] shadow-2xl shadow-navy/30 relative overflow-hidden group"
            >
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center mb-6">
                     <Hash className="text-navy w-6 h-6" />
                  </div>
                  <h4 className="text-white font-space-grotesk font-bold text-xl mb-4">Forum Guidelines</h4>
                  <ul className="space-y-4 mb-10">
                     {['Be respectful', 'Stay on topic', 'No spamming', 'Share knowledge'].map(item => (
                       <li key={item} className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                          {item}
                       </li>
                     ))}
                  </ul>
                  <Link href="/forum">
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl py-7 font-bold transition-all">
                       VIEW ALL TOPICS
                    </Button>
                  </Link>
               </div>
               <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
