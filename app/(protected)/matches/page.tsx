"use client"

import { useState, useTransition, useEffect } from "react";
import { useRouter } from 'next/navigation';
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
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";



const AppPage = () => {
  const router = useRouter();
  const session = useSession();
  

  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const
 
  type SheetSide = (typeof SHEET_SIDES)[2]

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/api/matches', {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setMatches(data))
      .catch(error => console.error('Error fetching matches:', error));
  }, []);

  const [opponentPlayerName, setopponentPlayerName] = useState('');
  const [playerSets, setplayerSets] = useState('');
  const [opponentSets, setopponentSets] = useState('');

  const [error, setError] = useState<string | undefined>(""); 
  const [success, setSuccess] = useState<string | undefined>(""); 
  const [isPending, startTransition] = useTransition(); 

  const handleAddMatch = () => {
    const values = {
      opponentPlayerName,
      playerSets: parseInt(playerSets),
      opponentSets: parseInt(opponentSets)
    };

    setError(""); 
    setSuccess(""); 

    startTransition(() => {
      addMatch(values)
        .then((data?) => {
          setError(data?.error);
          setSuccess(data?.success);
          if (data?.success) {
            fetch('/api/matches')
              .then(response => response.json())
              .then(data => setMatches(data))
              .catch(error => console.error('Error fetching matches:', error));
          }
        });
    });
  };

  return (
    <>
      <main className="flex flex-col gap-y-5 w-fit">
        <h2 className="text-lg font-bold my-3">Historique des parties jouées</h2>
        <section>
          <Card>
            <CardContent className="flex flex-row gap-x-3 pt-6 w-fit">
              <img
                src="/versus.svg"
                alt="versus-icon"
                className="w-7 h-7 shrink-0"
              />
              <span className="flex flex-col w-fit">
                <span>
                  <p className="font-bold text-lg leaning-6 w-fit">Ajouter une nouvelle partie</p>
                  <p className="font-medium text-sm mt-1">Analysez votre partie avec des statistiques !</p>
                </span>
                <span className="grid grid-cols-2 gap-2 mt-3.5">
                  <Sheet key="top">
                    <SheetTrigger asChild>
                      <Button variant="default" className="leaning-5 font-medium w-fit">Ajouter une partie</Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="absolute">
                      <SheetHeader>
                        <SheetTitle>Ajouter une partie</SheetTitle>
                        {/* <SheetDescription>
                          Make changes to your profile here. Click save when you're done.
                        </SheetDescription> */}
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">
                            Adversaire
                          </Label>
                          <Input type="text" value={opponentPlayerName} onChange={(e) => setopponentPlayerName(e.target.value)} className="col-span-3" placeholder="Prénom NOM" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Ton nombre de set gagné ou perdu
                          </Label>
                          <Input type="number" value={playerSets} onChange={(e) => setplayerSets(e.target.value)} placeholder="0" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">
                            Set Adversaire
                          </Label>
                          <Input type="number" value={opponentSets} onChange={(e) => setopponentSets(e.target.value)} placeholder="0" className="col-span-3"/>
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit" onClick={handleAddMatch}>Envoyer</Button>
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
          {matches.length > 0 && (
            <div>
              {matches.filter(match => match.userId === session.data?.user.id).map((match, index) => (
                <div>
                  <Link href={`/matches/${match.id}`}>
                    {/* <p>22/03/2024  •  Amical</p> */}
                    {/* <Separator></Separator> */}
                    <Card className="flex items-center my-2 cursor-pointer">
                        <CardContent className="p-4 flex flex-row items-center w-full">
                          <span key={index} className={`flex justify-center items-center size-10 rounded text-white grow-0 ${match.winner == session.data?.user.name  ? 'bg-dark-sea-green' : 'bg-fire-opal'} text-2xl font-bold mr-5`}>{match.winner == session.data?.user.name ? 'V' : 'D'}</span>
                          <div className="flex flex-col grow">
                            <span className="flex flex-row gap-x-4 items-center">
                              <p className="font-bold text-base">{match.player2}</p>
                              <p className="flex justify-center items-center h-fit px-2 py-0.5 rounded-full text-black bg-primary font-bold text-xs">900</p>
                            </span>
                            <p className=" font-thin text-s text-gray-400">{match.score}</p>
                          </div>
                          <span className={`
                            flex justify-center items-center h-fit px-4 py-0.5 rounded-full
                            text-white font-bold text-s ${match.winner == session.data?.user.name  ? 'bg-dark-sea-green' : 'bg-fire-opal'}`}
                          >
                            {match.winner == session.data?.user.name  ? '+' : '-'}
                            0
                          </span>
                        </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default AppPage;
