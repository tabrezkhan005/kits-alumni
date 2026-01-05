'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus, Search, Filter, MessageSquare, Clock, User, ArrowLeft, TrendingUp, Hash } from 'lucide-react';
import { getStudentSession } from '@/lib/hooks/useStudentAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const session = getStudentSession();
    if (session) {
      const fullName = `${session.firstName || ''} ${session.lastName || ''}`.trim();
      setUserName(fullName && fullName !== '' ? fullName : (session.email || ''));
    }
  }, []);

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
    <div className="min-h-screen bg-white font-inter">
      {/* Hero Header */}
      <div className="bg-navy pt-20 pb-32 relative overflow-hidden">
        {/* Background Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
             >
                <Link href="/student-dashboard" className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform">
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-6">
                  Student & Alumni <span className="text-gold">Forum</span>
                </h1>
                <p className="text-white/60 text-lg font-medium leading-relaxed max-w-2xl">
                  A dedicated space for KITS Computer Science community to collaborate, share knowledge, and solve challenges together.
                </p>
             </motion.div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 -mt-16 pb-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Left - Filters/Topics */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-navy/5">
               <h3 className="text-navy font-space-grotesk font-bold mb-6 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gold" /> Filters
               </h3>
               <div className="space-y-2">
                  {['All Posts', 'Recent', 'Most Answered', 'My Posts'].map((item, i) => (
                    <button 
                      key={item} 
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all",
                        i === 0 ? "bg-navy text-white shadow-lg shadow-navy/20" : "text-gray-500 hover:bg-gray-50 hover:text-navy"
                      )}
                    >
                      {item}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
               <h3 className="text-navy font-space-grotesk font-bold mb-6 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gold" /> Popular Topics
               </h3>
               <div className="flex flex-wrap gap-2">
                  {['AI', 'MLOps', 'Placement', 'Internship', 'Research', 'CampusLife'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500 hover:border-gold hover:text-gold cursor-pointer transition-all">
                      #{tag}
                    </span>
                  ))}
               </div>
            </div>
          </div>

          {/* Main Content - Posts List */}
          <div className="lg:w-2/4 space-y-6">
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-lg shadow-navy/5 flex items-center gap-4">
              <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center text-navy">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Search discussions..." 
                className="flex-1 bg-transparent border-none focus:outline-none text-navy font-medium placeholder:text-gray-400"
              />
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-navy border-t-gold rounded-full animate-spin"></div>
                <p className="mt-4 text-navy font-bold text-sm tracking-widest">LOADING DISCUSSIONS...</p>
              </div>
            ) : hasError ? (
              <div className="bg-red-50 text-red-500 p-10 rounded-[2rem] text-center border border-red-100">
                <p className="font-bold">Failed to load forum posts.</p>
                <Button variant="link" className="text-red-600 mt-2" onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-gray-50 p-16 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                   <MessageSquare className="w-10 h-10 text-gray-300" />
                </div>
                <h4 className="text-navy font-space-grotesk font-bold text-xl mb-2">No discussions yet</h4>
                <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8">Be the first one to start a conversation in the community!</p>
                <Link href="/forum/create">
                   <Button className="bg-navy hover:bg-navy-dark text-white rounded-full px-8 py-6 font-bold">Start a Discussion</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-navy/5 hover:shadow-2xl hover:shadow-navy/10 hover:border-gold/30 transition-all duration-500"
                  >
                    <Link href={`/forum/post/${post.id}`} className="block">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-gold font-bold text-xs">
                          {post.author_id.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-navy font-bold text-sm leading-none mb-1">{post.author_id}</p>
                          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            <Clock className="w-3 h-3 text-gold" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <h2 className="text-2xl font-space-grotesk font-bold text-navy group-hover:text-gold transition-colors duration-300 mb-4 line-clamp-1">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-6">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1.5 text-gray-400">
                             <MessageSquare className="w-4 h-4" />
                             <span className="text-xs font-bold text-navy">View Comments</span>
                          </div>
                        </div>
                        <div className="text-navy font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                          Read Full Thread <ChevronRight className="w-4 h-4 text-gold" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Right - Stats/Trending */}
          <div className="lg:w-1/4 space-y-8">
            <div className="bg-gold p-8 rounded-[2.5rem] shadow-xl shadow-gold/20 relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-navy font-space-grotesk font-bold text-xl mb-4">Start New Thread</h3>
                  <p className="text-navy/70 text-xs font-medium mb-8">Share your questions or insights with 500+ members.</p>
                  <Link href="/forum/create">
                    <Button className="w-full bg-navy text-white rounded-2xl py-6 font-bold shadow-xl shadow-navy/20 hover:scale-[1.02] transition-transform">
                      <MessageSquarePlus className="w-4 h-4 mr-2" /> CREATE POST
                    </Button>
                  </Link>
               </div>
               <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-navy p-8 rounded-[2.5rem] shadow-xl shadow-navy/30">
               <h3 className="text-white font-space-grotesk font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" /> Community Stats
               </h3>
               <div className="space-y-6">
                  <StatItem label="Active Members" value="524" />
                  <StatItem label="Total Threads" value="1,280" />
                  <StatItem label="Replies Today" value="48" />
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fab for creation */}
      <Link href="/forum/create" className="lg:hidden fixed bottom-10 right-10 z-50">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gold text-navy rounded-full shadow-2xl shadow-gold/40 flex items-center justify-center border-4 border-white"
        >
          <MessageSquarePlus className="w-6 h-6" />
        </motion.button>
      </Link>
    </div>
  );
}

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-center justify-between border-b border-white/10 pb-4">
    <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{label}</span>
    <span className="text-gold font-bold font-space-grotesk">{value}</span>
  </div>
);

const ChevronRight = ({ className, textClass }: { className?: string, textClass?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
  </svg>
);
