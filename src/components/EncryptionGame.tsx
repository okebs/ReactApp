import React, { useState, useEffect } from 'react';
import styles from '../Styling/EncryptionGame.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { markGameStart, markGameFinish } from '../services/GameSessions';

// Define types for the component props
type EncryptionGameProps = {
  encryptedSentence: string;
  correctSentence: string;
  timeLimit: number;
  imagePath: string;
};

const EncryptionGame: React.FC<EncryptionGameProps> = ({ encryptedSentence, correctSentence, timeLimit, imagePath }) => {
  const [userInput, setUserInput] = useState<string>('');
  const [timer, setTimer] = useState<number>(timeLimit);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const location = useLocation();
  const { sessionId, playerId } = location.state || {};

  useEffect(() => {
    let intervalId: number; // Correctly type intervalId as a number
  
    if (!isGameOver) {
      if (sessionId && playerId) {
        markGameStart(sessionId, playerId);
      }
  
      if (timer > 0) {
        intervalId = window.setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else {
        setIsGameOver(true);
      }
    }
  
    // Clean up the interval on unmount or if the game is over
    return () => {
      window.clearInterval(intervalId);
    };
  }, [timer, sessionId, playerId, isGameOver]);
  
  

  const checkSolution = (): void => {
    if (userInput.toLowerCase() === correctSentence.toLowerCase()) {
      if (sessionId && playerId) markGameFinish(sessionId, playerId); 
      alert('Correct!');
      setIsGameOver(true);
    } else {
      alert('Incorrect, try again!');
    }
    setUserInput(''); // Reset input field
  };

  return (
    <div className={styles.homeContainer}>
      <h2>Decryption Challenge</h2>
      <img src={imagePath} alt="Octagon Cipher" />
      <p>Encrypted: {encryptedSentence}</p>
      <p>Time Remaining: {timer}</p>
      <input 
        type="text" 
        value={userInput} 
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter deciphered sentence"
        disabled={isGameOver}
      />
      <button onClick={checkSolution} disabled={isGameOver}>
        Submit
      </button>
      {isGameOver && <p>The correct sentence was: {correctSentence}</p>}
    </div>
  );
};

export default EncryptionGame;
