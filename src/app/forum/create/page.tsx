'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MessageSquarePlus, PenTool, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStudentSession } from '@/lib/hooks/useStudentAuth';

export default function ForumCreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const session = getStudentSession();
    if (session) {
      const fullName = `${session.firstName || ''} ${session.lastName || ''}`.trim();
      setUserName(fullName && fullName !== '' ? fullName : (session.email || ''));
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author_id: userName }),
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
    <div className="min-h-screen bg-white font-inter flex flex-col">
      {/* Mini Hero / Header */}
      <div className="bg-navy pt-24 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/forum" className="inline-flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-[0.3em] mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Discussions
          </Link>
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gold uppercase tracking-widest">Post</span>
             <div className="w-8 h-px bg-white/20"></div>
             <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Share Your Thoughts</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-space-grotesk font-bold text-white max-w-4xl leading-tight">
             Start a New Discussion
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-6 -mt-32 pb-24 relative z-20 flex-1 flex">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
          {/* Form Area */}
          <div className="lg:col-span-8 space-y-10">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-navy/5 border border-gray-100"
             >
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center">
                     <PenTool className="w-6 h-6 text-navy" />
                   </div>
                   <div>
                     <h2 className="text-2xl font-space-grotesk font-bold text-navy">Thread Details</h2>
                     <p className="text-gray-500 text-sm font-medium">Be highly descriptive with your title to get the best responses.</p>
                   </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-4">Title</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-navy font-bold placeholder:text-gray-300 placeholder:font-medium focus:outline-none focus:border-gold focus:bg-white transition-all shadow-sm"
                      placeholder="E.g. What's the best approach to mastering Next.js?"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-navy/40 uppercase tracking-widest ml-4">Content</label>
                    <div className="relative">
                       <textarea
                         className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-6 text-navy font-medium placeholder:text-gray-400 focus:outline-none focus:border-gold focus:bg-white transition-all resize-none min-h-[250px] shadow-sm"
                         placeholder="Explain your topic, question, or finding here in detail..."
                         value={content}
                         onChange={e => setContent(e.target.value)}
                         required
                         maxLength={2000}
                       />
                       <div className="absolute bottom-5 right-6 text-[10px] font-bold text-gray-300 uppercase">
                         {content.length}/2000
                       </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-red-100 flex items-center gap-3">
                       <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                       {error}
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-50 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading || !title.trim() || !content.trim()}
                      className="bg-navy hover:bg-gold hover:text-navy text-white rounded-2xl px-10 py-7 font-bold shadow-xl shadow-navy/10 transition-all flex items-center gap-3"
                    >
                      {isLoading ? 'POSTING...' : 'PUBLISH THREAD'}
                      <MessageSquarePlus className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
             </motion.div>
          </div>

          {/* Sidebar / Recommendations */}
          <div className="lg:col-span-4 space-y-8 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-navy p-10 rounded-[3rem] shadow-2xl shadow-navy/30 relative overflow-hidden group"
            >
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center mb-6">
                     <Hash className="text-navy w-6 h-6" />
                  </div>
                  <h4 className="text-white font-space-grotesk font-bold text-xl mb-4">Posting Rules</h4>
                  <ul className="space-y-4 mb-10">
                     {['Search before posting', 'Keep titles concise', 'Be polite & constructive', 'Formatting matters'].map(item => (
                       <li key={item} className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                          {item}
                       </li>
                     ))}
                  </ul>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mt-4">
                     <p className="text-white/60 text-xs leading-relaxed font-medium">Your account must be logged in as a valid KITS student to post and comment in the community dashboard.</p>
                  </div>
               </div>
               <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
