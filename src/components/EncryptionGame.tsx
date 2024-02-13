import React, { useState } from 'react';

const octagon = ['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR', 'STU', 'VWX'];

const findCharInOctagon = (char: string): { groupIndex: number; position: number } => {
  for (let i = 0; i < octagon.length; i++) {
    const position = octagon[i].indexOf(char);
    if (position !== -1) {
      // The position within a group starts from 1
      return { groupIndex: i, position: position + 1 };
    }
  }
  return { groupIndex: -1, position: -1 }; // Char not found
};

const encryptMessage = (message: string): string => {
  let encryptedMessage: string[] = [];
  let currentGroupIndex = 0; // 'ABC' is at index 0

  for (const char of message.toUpperCase()) {
    const { groupIndex, position } = findCharInOctagon(char);

    if (groupIndex !== -1) {
      let rotations = (groupIndex - currentGroupIndex + octagon.length) % octagon.length;
      // Concatenate rotations and position into a single string
      encryptedMessage.push(`${rotations}${position}`);
      currentGroupIndex = groupIndex;
    } else {
      encryptedMessage.push(`00`);
    }
  }

  return encryptedMessage.join('-'); // Ensure the joining character is a hyphen
};
  

const EncryptionGame = () => {
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState('');

  const handleEncrypt = () => {
    const result = encryptMessage(message);
    setEncrypted(result);
  };

  return (
    <div>
      <h2>Encryption Game</h2>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Enter message to encrypt" 
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <p>Encrypted Message: {encrypted}</p>
    </div>
  );
};

// Front-end code to send the score to the back end
/*
const submitScore = async (score, userId) => {
    try {
      const response = await fetch('https://yourapi.com/submit-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // if using tokens for auth
        },
        body: JSON.stringify({ score, userId })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Score submitted:', result);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  }; */
  

export default EncryptionGame;
