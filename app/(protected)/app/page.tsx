"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import Header from "@/components/elements/header/header";

const AppPage = () => {
  const router = useRouter();

  const sampleMatches = [
    { id: 1, player1: 'Player A', player2: 'Auguste TANGUY', score: '3-0', rating: 903, result: 'V' },
    { id: 2, player1: 'Player C', player2: 'Player D', score: '3-1', rating: 850, result: 'V' },
    { id: 3, player1: 'Player E', player2: 'Player F', score: '3-1', rating: 870, result: 'V' }
  ];

  const [matches, setMatches] = useState(sampleMatches);
  const [playerAScore, setPlayerAScore] = useState('');
  const [playerBScore, setPlayerBScore] = useState('');
  const [opponent, setOpponent] = useState('');

  const handleAddMatch = () => {
    if (playerAScore && playerBScore && opponent) {
      const result = parseInt(playerAScore) > parseInt(playerBScore) ? 'V' : 'D';
      setMatches([...matches, { id: matches.length + 1, player1: 'Player A', player2: opponent, score: `${playerAScore}-${playerBScore}`, rating: Math.floor(Math.random() * 1000), result }]);
      setPlayerAScore('');
      setPlayerBScore('');
      setOpponent('');
    }
  };

  return (
    <>
      {/* <Header /> */}
      <main className="p-4">
        <section className="mb-4">
          <h2 className="text-lg font-bold">Ajouter une nouvelle partie</h2>
          <div className="bg-gray-100 p-4 rounded shadow">
            <p>Analysez votre partie avec des statistiques !</p>
            <div className="flex space-x-2 mt-2">
              <input
                type="number"
                value={playerAScore}
                onChange={(e) => setPlayerAScore(e.target.value)}
                placeholder="Score Joueur A"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={playerBScore}
                onChange={(e) => setPlayerBScore(e.target.value)}
                placeholder="Score Joueur B"
                className="p-2 border rounded"
              />
              <input
                type="text"
                value={opponent}
                onChange={(e) => setOpponent(e.target.value)}
                placeholder="Opponent"
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
        <section className="mb-4">
          <h2 className="text-lg font-bold">Recent matches</h2>
          {matches.length > 0 && (
            <div className="flex space-x-2">
              {matches.map((match, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-white ${match.result === 'V' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {match.result}
                </span>
              ))}
              <button className="px-2 py-1 bg-yellow-500 text-white rounded">+</button>
            </div>
          )}
        </section>
        <section className="mb-4">
          <h2 className="text-lg font-bold">Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Repeat this block for each category */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-md font-semibold">Matches</h3>
              <p>5 New</p>
              <p>/24 Matches</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-md font-semibold">Email</h3>
              <p>2 New</p>
              <p>/18 Matches</p>
            </div>
            {/* ... other categories */}
          </div>
        </section>
        <section className="mb-4">
          <h2 className="text-lg font-bold">Player rankings</h2>
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
              <span className="font-semibold">Your</span>
              <span>Your games</span>
              <span>420 pts</span>
            </div>
            <button className="px-4 py-2 bg-gray-800 text-white rounded">Details</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default AppPage;
