import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Metadata } from 'next';
import { Hero } from '@/components/layout/hero';
import { Trophy, ArrowRight } from 'lucide-react';
import { AchievementsList } from '@/components/layout/achievements-list';
import Link from 'next/link';

// TypeScript type
type Achievement = {
  id: string;
  name: string;
  title: string;
  description: string;
  date: string;
  status: string;
  category?: string;
  image?: string;
};

export const metadata: Metadata = {
  title: "Student & Alumni Achievements | KITS CSM",
  description: "Celebrating the excellence and professional success of the KITS Computer Science & Machine Learning community.",
};

async function getApprovedAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabaseAdmin
    .from('achievements')
    .select('*')
    .eq('status', 'approved')
    .order('date', { ascending: false });

  if (error) return [];
  
  return (data || []).map((ach, index) => ({
    ...ach,
    category: ach.category || ['Technical Excellence', 'Research Award', 'Placement Success', 'Innovation'][index % 4],
    image: ach.image || `https://images.unsplash.com/photo-1523240715630-19d7bb1d33ed?q=80&w=800&auto=format&fit=crop`
  }));
}

export default async function AchievementsPage() {
  const achievements = await getApprovedAchievements();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero 
        title="Celebrating Excellence"
        subtitle="Our students and alumni consistently push the boundaries of technology. Explore the accolades and professional milestones of the KITS CSM community."
        variant="excellence"
      />

      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-navy mb-4">Hall of Fame</h2>
            <div className="w-20 h-1 bg-gold rounded-full"></div>
          </div>
          <div className="mt-6 md:mt-0 flex gap-8">
             <div className="text-center">
                <p className="text-3xl font-space-grotesk font-bold text-navy">50+</p>
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Global Awards</p>
             </div>
             <div className="text-center">
                <p className="text-3xl font-space-grotesk font-bold text-navy">200+</p>
                <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Success Stories</p>
             </div>
          </div>
        </div>

        {achievements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                <Trophy className="w-10 h-10 text-gray-200" />
             </div>
             <h3 className="text-xl font-bold text-navy">No achievements yet</h3>
             <p className="text-gray-500">The hall of fame is waiting for its first legends.</p>
          </div>
        ) : (
          <AchievementsList achievements={achievements} />
        )}
      </section>

      {/* Recognition CTA */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block">Be Recognized</span>
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-10 max-w-3xl mx-auto">
              Share your <span className="text-gold">success</span> with the community
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-12 font-medium">
              We take pride in every milestone our students and alumni achieve. Your success story inspires the next generation of engineers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/student-dashboard/achievements">
                  <button className="px-10 py-5 bg-gold text-navy font-bold rounded-full hover:bg-white transition-all shadow-2xl shadow-gold/20 flex items-center gap-3">
                      SUBMIT YOUR ACHIEVEMENT
                      <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
            </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </section>
    </main>
  );
}
