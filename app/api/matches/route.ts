// app/api/matches/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assure-toi que le chemin est correct

export async function GET(req: NextRequest) {
  try {
    const matches = await prisma.match.findMany();
    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}
