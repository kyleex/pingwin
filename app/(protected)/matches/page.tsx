"use client"

import { useState, useTransition, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { addMatch } from "@/actions/add-match";
import { useSession } from "next-auth/react";

const AppPage = () => {
  const router = useRouter();
  const session = useSession();

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
      <main className="p-4">
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

        <section className="mb-4">
          <h2 className="text-lg font-bold">Matchs récents</h2>

          {matches.length > 0 && (
            <div className="flex space-x-2">
              {matches.map((match, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-white ${match.winner == session.data?.user.name  ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {match.winner == session.data?.user.name ? 'V' : 'D'} 
                </span>
              ))}
              <button className="px-2 py-1 bg-yellow-500 text-white rounded">+</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default AppPage;
