import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen, MessageSquare, Heart } from 'lucide-react';
import { Hero } from '@/components/layout/hero';
import { AnimatedContribution } from '@/components/blog/animated-contribution';

// Blog type
interface Blog {
  id: string;
  name: string;
  title: string;
  blog: string;
  created_at: string;
  category?: string;
  image?: string;
}

export const metadata: Metadata = {
  title: 'Alumni Insight Blogs | KITS CSM',
  description: 'Explore technical insights, alumni experiences, and academic stories from the KITS Computer Science & Machine Learning community.',
};

// Server-side data fetching using admin client for better reliability
async function getApprovedBlogs(): Promise<Blog[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .select('id, name, title, blog, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error.message || JSON.stringify(error));
      return [];
    }
    
    // Add mock categories and images for a better UI since real data might lack them
    return (data || []).map((blog, index) => ({
      ...blog,
      category: ['Technology', 'Career', 'Academic', 'Machine Learning'][index % 4],
      image: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop`
    }));
  } catch (err: any) {
    console.error('Fetch exception in getApprovedBlogs:', err.message || err);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getApprovedBlogs();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero 
        title="Alumni Insights & Stories"
        subtitle="Discover a wealth of knowledge, professional experiences, and technical insights shared by the KITS Computer Science & Machine Learning alumni community."
        variant="entropy"
      />

      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-space-grotesk font-bold text-navy">Latest Publications</h2>
                <div className="h-1 w-20 bg-gold mt-2 rounded-full"></div>
              </div>
              <div className="hidden sm:flex gap-2">
                <span className="px-4 py-1.5 rounded-full bg-navy/5 text-navy text-xs font-bold border border-navy/10 cursor-pointer hover:bg-navy hover:text-white transition-all">All</span>
                <span className="px-4 py-1.5 rounded-full bg-white text-gray-500 text-xs font-bold border border-gray-100 cursor-pointer hover:border-gold hover:text-gold transition-all">Tech</span>
                <span className="px-4 py-1.5 rounded-full bg-white text-gray-500 text-xs font-bold border border-gray-100 cursor-pointer hover:border-gold hover:text-gold transition-all">Career</span>
              </div>
            </div>

            {blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-navy/40" />
                </div>
                <h3 className="text-xl font-bold text-navy">No stories yet</h3>
                <p className="text-gray-500">The alumni community is currently drafting new insights.</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {blogs.map((blog, index) => (
                  <article
                    key={blog.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-navy/10 hover:shadow-2xl hover:shadow-navy/5 transition-all duration-500 flex flex-col md:flex-row"
                  >
                    {/* Blog Image */}
                    <div className="md:w-1/3 relative overflow-hidden h-64 md:h-auto">
                      <Image 
                        src={blog.image || '/img/blog-placeholder.jpg'} 
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-navy shadow-sm uppercase tracking-widest border border-navy/5">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="md:w-2/3 p-8 flex flex-col">
                      <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 mb-4 uppercase tracking-tighter">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gold" />
                          <span className="text-navy">{blog.name}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          <time dateTime={blog.created_at}>
                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>

                      <h3 className="text-2xl font-space-grotesk font-bold text-navy group-hover:text-gold transition-colors duration-300 mb-4 line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-6">
                        {blog.blog}
                      </p>

                      <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <Link 
                          href={`/blog/${blog.id}`} 
                          className="flex items-center gap-2 text-navy font-bold text-xs group/link"
                        >
                          READ FULL STORY
                          <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center group-hover/link:bg-gold transition-all duration-300">
                            <ArrowRight className="w-3 h-3 group-hover/link:text-navy transition-colors" />
                          </div>
                        </Link>
                        
                        <div className="flex items-center gap-4">
                           <button className="flex items-center gap-1.5 text-gray-400 hover:text-gold transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-[10px] font-bold">24</span>
                           </button>
                           <button className="flex items-center gap-1.5 text-gray-400 hover:text-gold transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-[10px] font-bold">8</span>
                           </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-10">
            {/* Search */}
            <div className="bg-navy p-8 rounded-[2rem] shadow-xl shadow-navy/20">
              <h4 className="text-white font-space-grotesk font-bold mb-4">Search Stories</h4>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Keywords..."
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
              <h4 className="text-navy font-space-grotesk font-bold mb-6 flex items-center gap-2">
                Trending Topics
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Artificial Intelligence', 'Cybersecurity', 'Cloud Computing', 'Web Development', 'Career Growth', 'MLOps', 'Data Science'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[11px] font-bold text-gray-500 hover:border-gold hover:text-gold hover:shadow-sm cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="relative group overflow-hidden bg-gold p-8 rounded-[2rem] shadow-xl shadow-gold/20">
              <div className="relative z-10">
                <h4 className="text-navy font-space-grotesk font-bold mb-2">Weekly Newsletter</h4>
                <p className="text-navy/70 text-xs font-medium mb-6">Get the latest alumni insights delivered to your inbox.</p>
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full bg-white/90 rounded-2xl px-5 py-3 text-sm text-navy placeholder:text-navy/40 focus:outline-none mb-3"
                />
                <button className="w-full bg-navy text-white py-3 rounded-2xl text-xs font-bold hover:bg-navy-dark transition-all shadow-lg shadow-navy/10">
                  SUBSCRIBE NOW
                </button>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contribution CTA */}
      <AnimatedContribution />
    </main>
  );
}
