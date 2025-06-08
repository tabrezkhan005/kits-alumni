import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

// Blog type
interface Blog {
  id: string;
  name: string;
  title: string;
  blog: string;
  created_at: string;
}

export const metadata: Metadata = {
  title: 'Alumni Blogs | AlumniKits',
  description: 'Read approved blogs from our alumni community.',
};

// Server-side data fetching
async function getApprovedBlogs(): Promise<Blog[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from('blogs')
    .select('id, name, title, blog, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    // Log error for debugging
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data || [];
}

export default async function BlogPage() {
  const blogs = await getApprovedBlogs();

  return (
    <main className="container mx-auto px-4 py-10 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Alumni Blogs</h1>
        <p className="text-lg text-gray-600">Stories, experiences, and insights from our alumni community.</p>
      </header>
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p>No approved blogs have been published yet. Check back soon!</p>
        </div>
      ) : (
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow border border-gray-100"
              aria-labelledby={`blog-title-${blog.id}`}
            >
              <header>
                <h2
                  id={`blog-title-${blog.id}`}
                  className="text-2xl font-semibold mb-2 text-burgundy line-clamp-2"
                >
                  {blog.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>By {blog.name}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={blog.created_at} suppressHydrationWarning>
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </header>
              <section className="text-gray-700 line-clamp-6 mb-4">
                {blog.blog}
              </section>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
