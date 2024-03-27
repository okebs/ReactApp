import { db } from '../main'; // Adjust the path to where your firebase config is
import { collection, addDoc } from 'firebase/firestore';
import { GameSession } from '../models/GameSessionModel'; // Adjust the path to your GameSession type

export const createNewGameSession = async (gameId: string, teacherId: string) => {
  console.log(`Attempting to create session for game: ${gameId} by teacher: ${teacherId}`);
  try {
    const gameSession = {
      gameId,
      teacherId,
      players: {},
      state: 'waiting',
      currentChallenge: {},
    };
    
    const docRef = await addDoc(collection(db, 'gameSessions'), gameSession);
    console.log(`Document written with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document: ${error}`);
    throw new Error(`Error creating game session: ${error}`);
  }
};
