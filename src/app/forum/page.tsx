'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus, Search, Filter, MessageSquare, Clock, TrendingUp, Hash, ChevronRight, X } from 'lucide-react';
import { getStudentSession } from '@/lib/hooks/useStudentAuth';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Hero } from '@/components/layout/hero';
import { ForumStats } from '@/components/forum/ForumStats';
import { ForumFeatures } from '@/components/forum/ForumFeatures';
import { ForumGuidelines } from '@/components/forum/ForumGuidelines';

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
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-inter">
      <Hero
        title="Community Forum"
        subtitle="A dedicated space for KITS Computer Science community to collaborate, share knowledge, and solve challenges together."
        variant="forum"
      />

      <main className="container mx-auto px-4 sm:px-6 pt-8 pb-24 relative z-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-navy font-semibold shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Mobile Backdrop */}
        {showSidebar && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Left - Filters/Topics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn(
              "lg:w-1/4 space-y-6",
              showSidebar
                ? "fixed lg:relative inset-y-0 left-0 w-80 lg:w-auto bg-white lg:bg-transparent p-6 lg:p-0 z-50 lg:z-auto overflow-y-auto"
                : "hidden lg:block"
            )}
          >
            {/* Mobile Close Button */}
            {showSidebar && (
              <div className="lg:hidden flex justify-end mb-4">
                <button
                  onClick={() => setShowSidebar(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-lg"
                >
                  <h3 className="text-navy font-space-grotesk font-bold mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <Filter className="w-4 h-4 text-gold" /> Filters
                  </h3>
                  <div className="space-y-2">
                    {['All Posts', 'Recent', 'Most Answered', 'My Posts'].map((item, i) => (
                      <button
                        key={item}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all",
                          i === 0 ? "bg-navy text-white shadow-md" : "text-gray-600 hover:bg-gray-50 hover:text-navy"
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-100"
                >
                  <h3 className="text-navy font-space-grotesk font-bold mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <Hash className="w-4 h-4 text-gold" /> Popular Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['AI', 'MLOps', 'Placement', 'Internship', 'Research', 'CampusLife'].map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-gold hover:text-gold cursor-pointer transition-all">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

          {/* Main Content - Posts List */}
          <div className="flex-1 lg:w-2/4 space-y-6">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-md flex items-center gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navy/5 rounded-xl flex items-center justify-center text-navy flex-shrink-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none focus:outline-none text-navy font-medium placeholder:text-gray-400 text-sm sm:text-base"
              />
            </motion.div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-navy border-t-gold rounded-full animate-spin"></div>
                <p className="mt-4 text-navy font-bold text-xs sm:text-sm tracking-wide uppercase">Loading Discussions...</p>
              </div>
            ) : hasError ? (
              <div className="bg-red-50 text-red-600 p-6 sm:p-10 rounded-2xl text-center border border-red-100">
                <p className="font-bold text-sm sm:text-base">Failed to load forum posts.</p>
                <Button variant="link" className="text-red-600 mt-2 text-sm" onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="bg-gray-50 p-8 sm:p-16 rounded-2xl text-center border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
                </div>
                <h4 className="text-navy font-space-grotesk font-bold text-lg sm:text-xl mb-2">No discussions found</h4>
                <p className="text-gray-500 text-xs sm:text-sm max-w-xs mx-auto mb-6 sm:mb-8">
                  {searchQuery ? 'Try a different search term' : 'Be the first one to start a conversation in the community!'}
                </p>
                {!searchQuery && (
                  <Link href="/forum/create">
                    <Button className="bg-navy hover:bg-gold hover:text-navy text-white rounded-full px-6 sm:px-10 py-4 sm:py-6 font-bold shadow-lg transition-all text-sm sm:text-base">
                      Start a Discussion
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-gold/30 transition-all duration-300"
                  >
                    <Link href={`/forum/post/${post.id}`} className="block">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navy rounded-xl flex items-center justify-center text-gold font-bold text-xs shadow-md flex-shrink-0">
                          {post.author_id.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-navy font-bold text-xs sm:text-sm leading-none mb-1 truncate">{post.author_id}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                            <Clock className="w-3 h-3 text-gold flex-shrink-0" />
                            <span className="truncate">{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <h2 className="text-lg sm:text-xl md:text-2xl font-space-grotesk font-bold text-navy group-hover:text-gold transition-colors duration-300 mb-3 sm:mb-4 line-clamp-2 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed mb-4 sm:mb-6 font-medium">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-gray-400">
                          <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs font-semibold uppercase tracking-wide text-navy/40">View Thread</span>
                        </div>
                        <div className="text-navy font-bold text-xs uppercase tracking-wide flex items-center gap-1 sm:gap-2 group-hover:gap-3 transition-all group-hover:text-gold">
                          <span className="hidden sm:inline">Join Discussion</span>
                          <span className="sm:hidden">View</span>
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Right - Stats/Trending */}
          <div className="lg:w-1/4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gold p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h3 className="text-navy font-space-grotesk font-bold text-lg sm:text-xl mb-3 leading-tight">Start New Thread</h3>
                <p className="text-navy/70 text-xs font-semibold uppercase tracking-wide mb-6 sm:mb-8">Connect with 500+ members.</p>
                <Link href="/forum/create">
                  <Button className="w-full bg-navy text-white rounded-xl py-4 sm:py-6 font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base">
                    <MessageSquarePlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    <span className="hidden sm:inline">CREATE POST</span>
                    <span className="sm:hidden">CREATE</span>
                  </Button>
                </Link>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-navy p-6 sm:p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-white font-space-grotesk font-bold mb-6 flex items-center gap-2 text-sm sm:text-base">
                <TrendingUp className="w-4 h-4 text-gold" /> Community Stats
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <StatItem label="Active Members" value="524" />
                <StatItem label="Total Threads" value="1,280" />
                <StatItem label="Replies Today" value="48" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Forum Sections */}
      <ForumStats />
      <ForumFeatures />
      <ForumGuidelines />

      {/* Mobile Fab for creation */}
      <Link href="/forum/create" className="lg:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-gold text-navy rounded-full shadow-2xl shadow-gold/40 flex items-center justify-center border-4 border-white"
        >
          <MessageSquarePlus className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.button>
      </Link>
    </div>
  );
}

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-3 sm:pb-4">
    <span className="text-white/40 text-xs font-semibold uppercase tracking-wide">{label}</span>
    <span className="text-gold font-bold font-space-grotesk text-base sm:text-lg">{value}</span>
  </div>
);
