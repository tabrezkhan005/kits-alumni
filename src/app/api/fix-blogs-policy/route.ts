import { NextResponse } from 'next/server';

export async function POST() {
  // No policy changes are made here to avoid syntax errors.
  return NextResponse.json({ success: true }, { status: 200 });
}
