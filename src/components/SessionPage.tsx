import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../main'; // Adjust the path to your Firebase configuration file
import { doc, onSnapshot } from 'firebase/firestore';
import { joinGameSession } from '../services/GameSessions';
import styles from '../Styling/SessionPage.module.css';

const SessionPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams(); // This will get the sessionId from the URL
  const [gameId, setGameId] = useState('');
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    if (!sessionId) {
      // If there is no session ID, we can redirect back to the home page or handle the error as needed
      navigate('/');
      return;
    }

    const joinSession = async () => {
      try {
        const newPlayerId = await joinGameSession(sessionId);
        setPlayerId(newPlayerId); // Schedule state update
        console.log("New player ID: ", newPlayerId); // Logs correct value
    
        // Now we use newPlayerId directly to navigate
        if (newPlayerId) {
          const sessionDocRef = doc(db, 'gameSessions', sessionId);
          const unsubscribe = onSnapshot(sessionDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              setGameId(data.gameId);
    
              if (data.state === 'active') {
                navigate(`/${data.gameId}`, { state: { sessionId, playerId: newPlayerId } });
              }
            } else {
              console.error('Session does not exist!');
              navigate('/');
            }
          });
    
          return () => unsubscribe(); // Cleanup on unmount
        }
    
      } catch (error) {
        console.error('Error joining session:', error);
        navigate('/');
      }
    };
    
    joinSession();    
  }, [sessionId, navigate]);

  return (
    <div className={styles.homeContainer}>
      <h1>Game Session: {gameId}</h1>
      <h2>You are {playerId}</h2>
      <h3>Waiting for teacher to begin game...</h3>
    </div>
  );
};

export default SessionPage;
