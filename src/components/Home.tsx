import React, { useState, useEffect } from 'react';
import QRCodeGenerator from './QRCodeGenerator';
import styles from '../Styling/Home.module.css';
import { db } from '../main';
import { doc, updateDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { createNewGameSession } from '../services/GameSessions';
import { Link, useNavigate } from 'react-router-dom';

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
    //const [selectedGame, setSelectedGame] = useState<string>('');
    const [sessionLink, setSessionLink] = useState<string>(''); // Add state to manage session link
    const [sessionId, setSessionId] = useState<string>('');
    const [playerCount, setPlayerCount] = useState<number>(0);
    const [sessionDocRef, setSessionDocRef] = useState(null);
    const navigate = useNavigate(); // Use navigate hook for redirection

    const subscribeToSession = (sessionId: string) => {
      const sessionDocRef = doc(db, 'gameSessions', sessionId);
  
      // This will create a real-time subscription to the Firestore document
      const unsubscribe = onSnapshot(sessionDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          // Assuming 'players' is an object where keys are player IDs
          setPlayerCount(Object.keys(data.players || {}).length);
        } else {
          console.log('No such document!');
        }
      });
  
      // Optional: Return the unsubscribe function so you can call it when the component unmounts
      return unsubscribe;
    };

    
  // useEffect(() => {
  //   let unsubscribe: Unsubscribe | null = null;

  //   // Subscribe to session if a session ID is available
  //   if (sessionId && playerDetails) {
  //     joinGameSession(sessionId, playerDetails).catch((error) => {
  //       console.error(error);
  //       // Alert the user or handle the error appropriately in the UI
  //     });
  //   }

  //   // Clean up the subscription when the component unmounts or sessionId changes
  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, [sessionId]);
  
    const handleCreateGameSession = async (gameId: GameKey) => {
      console.log(`Creating session for game: ${gameId}, teacher: teacher1`);
      try {
        const sessionId = await createNewGameSession(gameId, 'teacher1'); // Replace 'teacher1' with actual teacher identifier
        console.log(`Session Link: ${sessionId}`);
        if (sessionId) {
          const gameSessionLink = `${window.location.origin}/game-session/${sessionId}`;
          setSessionId(sessionId);
          setSessionLink(gameSessionLink);
          console.log(`Session Link: ${gameSessionLink}`);
          //navigate(`/game-session/${sessionId}`); // Uncomment this line if you want to navigate to the game session after creation
        }  
        else {
          console.error('Failed to create game session.');
        }
      } 
      catch (error) {
        console.error('Failed to create game session:', error);
        }
    };
  
    const handleGameSelection = async (game: GameKey) => {
      //setSelectedGame(gameLinks[game]);
      console.log(`Game selected: ${game}`);
      await handleCreateGameSession(game).catch((error) => {
        console.error('Error in handleGameSelection:', error);
      });
    };

    const startGame = async (sessionId: string) => {
      // Ensure that 'sessionId' is not undefined or an empty string
      if (!sessionId) {
        console.error('No session ID provided');
        return;
      }
    
      // Logic to update the Firestore document state to 'active'
      try {
        const sessionDocRef = doc(db, 'gameSessions', sessionId);
        await updateDoc(sessionDocRef, {
          state: 'active',
        });
        alert('Game started');
        // You might want to handle navigation to the game or other UI updates here
      } catch (error) {
        console.error('Error starting the game:', error);
      }
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
          {sessionLink && (
            <>
              <QRCodeGenerator link={sessionLink} />
              {/* Display the clickable link below the QR code for testing purposes */}
              <div className={styles.testLinkContainer}>
                <a href={sessionLink} className={styles.testLink} target="_blank" rel="noopener noreferrer">
                  Join Game session
                </a>
                <button onClick={() => startGame(sessionId)}>Start Game</button>
                {/* <h3>Player Count: {playerCount}</h3> */}
              </div>
            </>
            )}
        </div>
      );
    }
  

export default Home;
