"use client"

import { z } from "zod";
import { useState, useTransition } from "react"; // Importing useTransition from react for transitions.

  import { useRouter } from 'next/navigation';
import { addMatchSchema } from '@/schemas';
import { addMatch } from "@/actions/add-match";
// import Header from "@/components/elements/header/header";

const AppPage = () => {
  const router = useRouter();

  // Données d'exemple pour les matchs
  const sampleMatches = [
    { id: 1, player1: 'Player A', player2: 'Auguste TANGUY', score: '3-0', result: 'V' },
    { id: 2, player1: 'Player C', player2: 'Player D', score: '3-1', result: 'V' },
    { id: 3, player1: 'Player E', player2: 'Player F', score: '3-1', result: 'V' }
  ];

  // États pour gérer les matchs et les entrées utilisateur
  const [matches, setMatches] = useState(sampleMatches);
  const [opponentPlayerName, setopponentPlayerName] = useState('');
  const [playerSets, setplayerSets] = useState('');
  const [opponentSets, setopponentSets] = useState('');

  const [error, setError] = useState<string | undefined>(""); // Initializing an error state.
  const [success, setSuccess] = useState<string | undefined>(""); // Initializing an error state.
  const [isPending, startTransition] = useTransition(); // Initializing a transition.

  const handleAddMatch = () => {
    const values = {
      opponentPlayerName,
      playerSets: parseInt(playerSets),
      opponentSets: parseInt(opponentSets)
    };

    setError(""); // Resetting the error state.
    setSuccess(""); // Resetting the success state.

    startTransition(() => {
      addMatch(values) // Calling the login action with the form data.
        .then((data?) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  // // Fonction pour ajouter un nouveau match
  // const handleAddMatch = () => {
  //   if (playerAScore && playerBScore && opponent) {
  //     const result = parseInt(playerAScore) > parseInt(playerBScore) ? 'V' : 'D';
  //     setMatches([...matches, { id: matches.length + 1, player1: 'Player A', player2: opponent, score: `${playerAScore}-${playerBScore}`, result }]);
  //     setPlayerAScore('');
  //     setPlayerBScore('');
  //     setOpponent('');
  //   }
  // };

  return (
    <>
      {/* <Header /> */}
      <main className="p-4">
        {/* Section pour ajouter un nouveau match */}
        <section className="mb-4">
          <h2 className="text-lg font-bold">Ajouter une nouvelle partie</h2>
          <div className="bg-gray-100 p-4 rounded shadow">
            <p>Analysez votre partie avec des statistiques !</p>
            <div className="flex space-x-2 mt-2">
              <input
                type="number"
                value={playerSets}
                onChange={(e) => setplayerSets(e.target.value)}
                placeholder="Score Joueur A"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={opponentSets}
                onChange={(e) => setopponentSets(e.target.value)}
                placeholder="Score Joueur B"
                className="p-2 border rounded"
              />
              <input
                type="text"
                value={opponentPlayerName}
                onChange={(e) => setopponentPlayerName(e.target.value)}
                placeholder="Adversaire"
                className="p-2 border rounded"
              />
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded"
                onClick={handleAddMatch}
              >
                Ajouter une partie
              </button>
            </div>
          </div>
        </section>

        {/* Section pour afficher les matchs récents */}
        <section className="mb-4">
          <h2 className="text-lg font-bold">Matchs récents</h2>

          {matches.length > 0 && (
            <div className="flex space-x-2">
              {matches.map((match, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-white ${match.result === 'V' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {match.result === 'V' ? 'A' : 'U'}
                </span>
              ))}
              <button className="px-2 py-1 bg-yellow-500 text-white rounded">+</button>
            </div>
          )}
        </section>

        {/* Section pour afficher les catégories */}
        <section className="mb-4">
          <h2 className="text-lg font-bold">Catégories</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Répéter ce bloc pour chaque catégorie */}
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
            {/* ... autres catégories */}
          </div>
        </section>

        {/* Section pour afficher les classements des joueurs */}
        <section className="mb-4">
          <h2 className="text-lg font-bold">Classements des joueurs</h2>
          <div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold">Top</span>
              <span>John</span>
              <span>1850 pts</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold">Alice</span>
              <span>Markus</span>
              <span>1720 pts</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold">Sophi</span>
              <span>Oliver</span>
              <span>1560 pts</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold">Vous</span>
              <span>Vos parties</span>
              <span>420 pts</span>
            </div>
            <button className="px-4 py-2 bg-gray-800 text-white rounded">Détails</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default AppPage;
