import React, { useState, useEffect } from 'react';
import styles from '../Styling/EncryptionGame.module.css';

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

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setIsGameOver(true);
    }
  }, [timer]);

  const checkSolution = (): void => {
    if (userInput.toLowerCase() === correctSentence.toLowerCase()) {
      alert('Correct!');
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
      {isGameOver && <p>Time's up! The correct sentence was: {correctSentence}</p>}
    </div>
  );
};

export default EncryptionGame;
