import React from 'react';

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full py-6 bg-white shadow-sm border-b flex items-center justify-center">
        <h1 className="text-2xl font-bold tracking-tight text-burgundy">KITS Students Forum</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-2">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
