"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getMatchDetailById } from "@/data/match";

const MatchDetailPage = () => {
  const pathname = usePathname();
  const matchId = pathname.split("/").pop() || ""; // Ensure matchId is always defined

  const [match, setMatch] = useState<{
    id: number;
    player1: string;
    player2: string;
    score: string;
    winner: string;
    userId: string;
    createdAt: Date;
  } | null>(null); // Provide a default value for match

  useEffect(() => {
    const fetchMatchDetail = async () => {
      const matchDetail = await getMatchDetailById(Number(matchId));

      setMatch(matchDetail);
    };

    fetchMatchDetail();
  }, [matchId]);

  return (
    <div>
      <h1>Match Detail Page</h1>
      <p>Match ID: {matchId}</p>
      <p>Match: {JSON.stringify(match)}</p>
    </div>
  );
};

export default MatchDetailPage;
