"use client";

import { useSession } from "next-auth/react";
import { useState, useTransition, useEffect } from "react";
import { addMatch } from "@/actions/add-match";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import FooterNavigation from "@/components/layout/footer-nav";
import Header from "@/components/layout/header";

type Match = {
  id: string;
  player2: string;
  score: string;
  winner: string;
};

const MatchesPage = () => {
  const session = useSession();
  const [matches, setMatches] = useState<Match[]>([]);

  const [opponentPlayerName, setOpponentPlayerName] = useState("");
  const [playerSets, setPlayerSets] = useState("");
  const [opponentSets, setOpponentSets] = useState("");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const handleAddMatch = () => {
    const values = {
      opponentPlayerName,
      playerSets: parseInt(playerSets),
      opponentSets: parseInt(opponentSets),
    };

    setError("");
    setSuccess("");

    startTransition(() => {
      addMatch(values).then((data?) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          fetch("/api/matches")
            .then((response) => response.json())
            .then((data: Match[]) => setMatches(data))
            .catch((error) => console.error("Error fetching matches:", error));
        }
      });
    });
  };

  useEffect(() => {
    fetch("/api/matches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        userId: session.data?.user.id,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Match[]) => setMatches(data))
      .catch((error) => console.error("Error fetching matches:", error));
  }, [session.data]);

  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
  type SheetSide = (typeof SHEET_SIDES)[2];

  return (
    <>
      <header className="w-full px-4">
        <Header />
      </header>

      <main className="flex flex-col grow overflow-auto gap-y-3 w-fit mt-4">
        <section className="flex w-fit mx-5">
          <Card>
            <CardContent className="flex flex-row gap-x-3 pt-6 w-fit">
              <img
                src="/versus.svg"
                alt="versus-icon"
                className="w-7 h-7 shrink-0"
              />
              <span className="flex flex-col w-fit">
                <span>
                  <p className="font-bold text-lg leaning-6 w-fit">
                    Ajouter une nouvelle partie
                  </p>
                  <p className="font-medium text-sm mt-1">
                    Analysez votre partie avec des statistiques !
                  </p>
                </span>
                <span className="grid grid-cols-2 gap-2 mt-3.5">
                  <Sheet key="top">
                    <SheetTrigger asChild>
                      <Button
                        variant="default"
                        className="leaning-5 font-medium w-fit"
                      >
                        Ajouter une partie
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="absolute">
                      <SheetHeader>
                        <SheetTitle>Ajouter une partie</SheetTitle>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Adversaire</Label>
                          <Input
                            type="text"
                            value={opponentPlayerName}
                            onChange={(e) =>
                              setOpponentPlayerName(e.target.value)
                            }
                            className="col-span-3"
                            placeholder="Prénom NOM"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Ton nombre de set gagné ou perdu
                          </Label>
                          <Input
                            type="number"
                            value={playerSets}
                            onChange={(e) => setPlayerSets(e.target.value)}
                            placeholder="0"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Set Adversaire</Label>
                          <Input
                            type="number"
                            value={opponentSets}
                            onChange={(e) => setOpponentSets(e.target.value)}
                            placeholder="0"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit" onClick={handleAddMatch}>
                            Envoyer
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </span>
              </span>
            </CardContent>
          </Card>
        </section>

        <section className="mb-4 w-full px-5 overflow-srcoll">
          <div>
            {matches.length > 0 && (
              <div>
                {matches.map((match: Match) => (
                  <div key={match.id}>
                    <Link href={`/matches/${match.id}`}>
                      <li key={match.id} className="list-none my-4">
                        <Card className="flex items-center my-2 cursor-pointer">
                          <CardContent className="p-4 flex flex-row items-center w-full">
                            <span
                              className={`flex justify-center items-center size-10 rounded text-white grow-0 ${match.winner == session.data?.user.name
                                  ? "bg-dark-sea-green"
                                  : "bg-fire-opal"
                              } text-2xl font-bold mr-5`}
                            >
                              {match.winner == session.data?.user.name
                                ? "V"
                                : "D"}
                            </span>
                            <div className="flex flex-col grow">
                              <span className="flex flex-row gap-x-4 items-center">
                                <p className="font-bold text-base">
                                  {match.player2}
                                </p>
                                <p className="flex justify-center items-center h-fit px-2 py-0.5 rounded-full text-black bg-primary font-bold text-xs">
                                  900
                                </p>
                              </span>
                              <p className=" font-thin text-s text-gray-400">
                                {match.score}
                              </p>
                            </div>
                            <span
                              className={`
                                  flex justify-center items-center h-fit px-4 py-0.5 rounded-full
                                  text-white font-bold text-s ${
                                    match.winner == session.data?.user.name
                                      ? "bg-dark-sea-green"
                                      : "bg-fire-opal"
                                  }`}
                            >
                              {match.winner == session.data?.user.name
                                ? "+"
                                : "-"}
                              0
                            </span>
                          </CardContent>
                        </Card>
                      </li>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="fixed w-full bottom-0">
        <FooterNavigation />
      </footer>
    </>
  );
};

export default MatchesPage;