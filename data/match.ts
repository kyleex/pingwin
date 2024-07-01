"use server";
import { db } from "@/lib/db";

export const getMatchDetailById = async (matchId: number) => {
  try {
    const matchDetail = await db.match.findUnique({ where: { id: matchId } });

    return matchDetail;
  } catch (error) {
    console.error("Error occurred while fetching match detail:", error);
    return null;
  }
};
