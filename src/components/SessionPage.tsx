import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../main'; // Adjust the path to your Firebase configuration file
import { doc, onSnapshot } from 'firebase/firestore';
import styles from '../Styling/SessionPage.module.css';

const GameSessionPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams(); // This will get the sessionId from the URL
  const [playersCount, setPlayersCount] = useState(0);
  const [gameId, setGameId] = useState('');

  useEffect(() => {
    if (!sessionId) {
      // If there is no session ID, we can redirect back to the home page or handle the error as needed
      navigate('/');
      return;
    }

    const sessionDocRef = doc(db, 'gameSessions', sessionId);
    const unsubscribe = onSnapshot(sessionDocRef, (docSnapshot) => {
      if (!docSnapshot.exists()) {
        console.error('Session does not exist!');
        navigate('/');
        return;
      }

      const data = docSnapshot.data();
      setGameId(data.gameId); // You can use this to display which game is being played
      //setPlayersCount(Object.keys(data.players || {}).length);

      if (data.state === 'active') {
        navigate(`/${data.gameId}`); // Redirect to the game component
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [sessionId, navigate]);

  return (
    <div className={styles.homeContainer}>
      <h1>Game Session: {gameId}</h1>
      <h2>Waiting for teacher to begin game...</h2>
      {/* <p>Players connected: {playersCount}</p> */}
    </div>
  );
};

export default GameSessionPage;
