// pages/api/account/session.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req);

  if (session) {
    // Envoyer les informations de session nécessaires au client
    return res.status(200).json({ user: session.user})
  } else {
    // Gérer le cas où aucune session n'est trouvée
    return res.status(401).json({ error: "No active session" })
  }
}