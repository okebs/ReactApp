// function Home() {
//     const name = 'Sam';
//     return <h1>Welcome back, {name}</h1>;
// }

// export default Home;
import React, { useState } from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import styles from './Styling/Home.module.css';

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
            <h1>Welcome back</h1>
            <h2>Which game would you like to play?</h2>
        </div>
        <div className={styles.gameButtons}> {/* Make sure to use this class for the container of the buttons */}
            {Object.keys(gameLinks).map((game) => (
              <button
                key={game}
                onClick={() => handleGameSelection(game as GameKey)}
                className={`${styles.button} ${styles[game]}`} // Here we dynamically assign the specific class for each game
              >
                {game}
              </button>
            ))}
        </div>
      {selectedGame && <QRCodeGenerator link={selectedGame} />}
    </div>
  );
}

export default Home;
