import { db } from '../main'; // Adjust the path to where your firebase config is
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Player } from '../models/GameSessionModel';
import { GameSession } from '../models/GameSessionModel'; // Adjust the path to your GameSession type

// In your GameSessions service
export const joinGameSession = async (sessionId: string) => {
  const sessionDocRef = doc(db, 'gameSessions', sessionId);

  try {
    // Get the current session data
    const docSnapshot = await getDoc(sessionDocRef);
    if (docSnapshot.exists()) {
      const sessionData = docSnapshot.data();

      // Calculate the next guest number
      const currentPlayers = sessionData.players || {};
      const currentGuestNumbers = Object.keys(currentPlayers)
        .filter(key => key.startsWith('Guest'))
        .map(key => parseInt(key.replace('Guest', ''), 10)); // Extract the number part
      const maxGuestNumber = currentGuestNumbers.length > 0 ? Math.max(...currentGuestNumbers) : 0;
      const nextGuestNumber = maxGuestNumber + 1;

      // Create a new player details object
      const newGuestId = `Guest${nextGuestNumber}`;
      const playerDetails: Player = {
        playerId: newGuestId,
        score: 0,
      };

      // Update the session document with the new player details
      await updateDoc(sessionDocRef, {
        [`players.${newGuestId}`]: playerDetails,
      });

    } else {
      console.error("No such session!");
      throw new Error("No such session!");
    }
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
