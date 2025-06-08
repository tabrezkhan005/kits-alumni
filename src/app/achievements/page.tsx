import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Image from 'next/image';

// TypeScript type for clarity (optional)
type Achievement = {
  id: string;
  name: string;
  title: string;
  description: string;
  date: string;
  status: string;
};

/**
 * Fetches all approved achievements from Supabase
 */
async function getApprovedAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabaseAdmin
    .from('achievements')
    .select('*')
    .eq('status', 'approved')
    .order('date', { ascending: false });

  if (error) throw new Error(error.message);
  // If data is null, return empty array
  return data ?? [];
}

export default async function AchievementsPage() {
  let achievements: Achievement[] = [];
  try {
    achievements = await getApprovedAchievements();
  } catch (error: any) {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Achievements</h1>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error.message || 'Failed to load achievements.'}</div>
      </main>
    );
  }

  if (!achievements.length) {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Achievements</h1>
        <div className="text-gray-500">No achievements found yet.</div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Achievements</h1>
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((ach) => (
          <article
            key={ach.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col overflow-hidden border border-gray-100"
            tabIndex={0}
            aria-label={`Achievement: ${ach.title}`}
          >
            <div className="relative h-48 w-full bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Achievement placeholder"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </div>
            <div className="flex-1 flex flex-col p-5">
              <h2 className="text-xl font-semibold mb-1 text-gray-900 truncate" title={ach.title || ''}>{ach.title || 'Untitled'}</h2>
              <p className="text-gray-700 mb-2 line-clamp-2" title={ach.description || ''}>{ach.description || 'No description.'}</p>
              <div className="mt-auto flex flex-col gap-1">
                <span className="text-sm text-gray-500">By <span className="font-medium text-gray-800">{ach.name || 'Unknown'}</span></span>
                <span className="text-xs text-gray-400">{ach.date ? new Date(ach.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : 'No date'}</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
