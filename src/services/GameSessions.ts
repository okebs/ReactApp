import { db } from '../main'; // Adjust the path to where your firebase config is
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { Player } from '../models/GameSessionModel';
import { GameSession } from '../models/GameSessionModel'; // Adjust the path to your GameSession type

// In your GameSessions service
export const joinGameSession = async (sessionId: string, playerDetails: Player) => {
  const sessionDocRef = doc(db, 'gameSessions', sessionId);

  try {
    await updateDoc(sessionDocRef, {
      [`players.${playerDetails.playerId}`]: playerDetails // Assuming you have a unique 'id' for each player
    });
  } catch (error) {
    console.error("Error joining game session:", error);
    throw new Error(`Error joining game session: ${error}`);
  }
};


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
