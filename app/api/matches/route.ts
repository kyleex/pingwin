// app/api/matches/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assure-toi que le chemin est correct

export async function GET(req: NextRequest) {
  const userId = req.headers.get('userId');

  if (userId == null) {
    return NextResponse.json({ error: 'Missing userId header' }, { status: 400 });
  }
  try {
    const matches = await prisma.match.findMany({ where: { userId } });
    if (matches.length === 0) {
      return NextResponse.json({ error: 'No matches found' }, { status: 404 });
    }
    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}
