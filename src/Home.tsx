import React, { useState } from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import styles from './Styling/Home.module.css';
import { Link } from 'react-router-dom';

// Define a type for your game keys
type GameKey = 'encrypt' | 'greedyTrolls' | 'ballSort' | 'shapeMatch'; // Add all game keys here

type GameLinks = {
  [key in GameKey]: string;
};

const gameLinks: GameLinks = {
  encrypt: 'http://localhost:5173/encrypt',
  greedyTrolls: 'http://localhost:5173/greedy-trolls',
  ballSort: 'http://localhost:5173/ball-sort',
  shapeMatch: 'http://localhost:5173/shape-match'
  // Add all other game links here
};

function Home() {
    const [selectedGame, setSelectedGame] = useState<string>('');
  
    const handleGameSelection = (game: GameKey) => {
      setSelectedGame(gameLinks[game]);
    };
  
    return (
        <div className={styles.homeContainer}>
          <div className={styles.welcomeText}>
            <h1>Welcome</h1>
            <h2>Which game would you like to play?</h2>
          </div>
          <div className={styles.gameButtons}>
            {Object.keys(gameLinks).map((game) => (
              <button
                key={game}
                onClick={() => handleGameSelection(game as GameKey)}
                className={`${styles.button} ${styles[game]}`}
              >
                {game.charAt(0).toUpperCase() + game.slice(1)}
              </button>
            ))}
          </div>
          {selectedGame && (
            <>
                <QRCodeGenerator link={selectedGame} />
                {/* Display the clickable link below the QR code for testing purposes */}
                <div className={styles.testLinkContainer}>
                <Link to={selectedGame.replace('http://localhost:5173', '')} className={styles.testLink}>
                    Test Link: {selectedGame}
                </Link>
                </div>
            </>
            )}
        </div>
      );
    }
  

export default Home;
