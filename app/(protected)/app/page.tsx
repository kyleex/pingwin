"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addMatch } from "@/actions/add-match";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Header from "@/components/layout/header";
import FooterNavigation from "@/components/layout/footer-nav";

const AppPage = () => {
  const router = useRouter();
  const session = useSession();

  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

  type SheetSide = (typeof SHEET_SIDES)[2];

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/api/matches", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMatches(data))
      .catch((error) => console.error("Error fetching matches:", error));
  }, []);

  const [opponentPlayerName, setopponentPlayerName] = useState("");
  const [playerSets, setplayerSets] = useState("");
  const [opponentSets, setopponentSets] = useState("");

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
            .then((data) => setMatches(data))
            .catch((error) => console.error("Error fetching matches:", error));
        }
      });
    });
  };

  return (
    <>
      <header className="px-4 w-full">
        <Header />
      </header>

      <main className="flex flex-col grow overflow-auto mt-4 px-6">
        <section className="w-full md:max-w-md lg:max-w-md xl:max-w-md">
          <Card>
            <CardContent className="flex flex-row gap-x-3 pt-6">
              <img
                src="/versus.svg"
                alt="Pingwins logo"
                className="w-7 h-7 shrink-0"
              />
              <span className="flex flex-col">
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
                        className="leaning-5 font-medium shrink-0 w-fit"
                      >
                        Ajouter une partie
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="fixed">
                      <SheetHeader>
                        <SheetTitle>Ajouter une partie</SheetTitle>
                        {/* <SheetDescription>
                          Make changes to your profile here. Click save when you're done.
                        </SheetDescription> */}
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Adversaire</Label>
                          <Input
                            type="text"
                            value={opponentPlayerName}
                            onChange={(e) =>
                              setopponentPlayerName(e.target.value)
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
                            onChange={(e) => setplayerSets(e.target.value)}
                            placeholder="0"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Set Adversaire</Label>
                          <Input
                            type="number"
                            value={opponentSets}
                            onChange={(e) => setopponentSets(e.target.value)}
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

        <section className="mb-4">
          <h2 className="text-lg font-bold">Matchs récents</h2>

          {matches.length > 0 && (
            <div className="flex space-x-2">
              {matches.map((match, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-white ${
                    match?.winner == session.data?.user.name
                      ? "bg-dark-sea-green"
                      : "bg-fire-opal"
                  }`}
                >
                  {match?.winner == session.data?.user.name ? "V" : "D"}
                </span>
              ))}
              <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                +
              </button>
            </div>
          )}
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold">Catégories</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-md font-semibold">Matchs</h3>
              <p>5 Nouveaux</p>
              <p>/24 Matchs</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-md font-semibold">Emails</h3>
              <p>2 Nouveaux</p>
              <p>/18 Emails</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full">
        <FooterNavigation />
      </footer>
    </>
  );
};

export default AppPage;
