"use client"

import React, { useState } from 'react';

const MatchesPage = () => {
  const sampleMatches = [
    { id: 1, player1: 'Player A', player2: 'Auguste TANGUY', score: '3-0', rating: 903 },
    { id: 2, player1: 'Player C', player2: 'Player D', score: '3-1', rating: 850 },
    { id: 3, player1: 'Player E', player2: 'Player F', score: '3-1', rating: 870 }
  ];

  const [matches] = useState(sampleMatches);

  return (
    <div style={styles.container}>
      <h1>Liste des Matchs</h1>
      <ul style={styles.list}>
        {matches.map(match => (
          <li key={match.id} style={styles.listItem}>
            <div style={styles.card}>
              <div style={styles.icon}>V</div>
              <div style={styles.info}>
                <p style={styles.name}>{match.player2}</p>
                <p style={styles.score}>{match.score}</p>
              </div>
              <div style={styles.rating}>{match.rating}</div>
              <div style={styles.coef}>+4</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  listItem: {
    marginBottom: '10px'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#f9f9f9'
  },
  icon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#9acd32',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  info: {
    flex: 1,
    marginLeft: '10px'
  },
  name: {
    margin: 0,
    fontWeight: 'bold'
  },
  score: {
    margin: 0,
    color: '#888'
  },
  rating: {
    backgroundColor: '#ffeb3b',
    padding: '5px 10px',
    borderRadius: '5px',
    fontWeight: 'bold'
  },
  coef: {
    marginLeft: '10px',
    color: '#ccc'
  }
};

export default MatchesPage;
