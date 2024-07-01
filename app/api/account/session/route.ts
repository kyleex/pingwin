// pages/api/account/session.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from "next-auth/react";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getSession(req);

  if (session) {
    // Envoyer les informations de session nécessaires au client
    return NextResponse.json({ user: session.user}, { status: 200 })
  } else {
    // Gérer le cas où aucune session n'est trouvée
    return NextResponse.json({ error: "No active session" }, { status: 401 })
  }
}