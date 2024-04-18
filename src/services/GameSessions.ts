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
        timeStarted: null, // Initially null, will be set when the game starts
        timeFinished: null,
        duration: null
      };

      // Update the session document with the new player details
      await updateDoc(sessionDocRef, {
        [`players.${newGuestId}`]: playerDetails,
      });

      return newGuestId;
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

export const markGameStart = async (sessionId: string, playerId: string) => {
  const sessionDocRef = doc(db, 'gameSessions', sessionId);
  const currentTime = Date.now();

  await updateDoc(sessionDocRef, {
    [`players.${playerId}.timeStarted`]: currentTime,
  });

  console.log("Start")
};

export const markGameFinish = async (sessionId: string, playerId: string) => {
  const sessionDocRef = doc(db, 'gameSessions', sessionId);
  const currentTime = Date.now();

  const sessionDoc = await getDoc(sessionDocRef);
  if (sessionDoc.exists()) {
    const player = sessionDoc.data().players[playerId];
    if(player.timeStarted) {
      const durationMs = currentTime - player.timeStarted;
      const durationSeconds = Math.floor(durationMs / 1000);
      const minutes = Math.floor(durationSeconds / 60);
      const seconds = durationSeconds % 60; 

      await updateDoc(sessionDocRef, {
        [`players.${playerId}.timeFinished`]: currentTime,
        [`players.${playerId}.duration`]: durationSeconds, // Store duration in seconds for easier calculations later
      });

      //console.log(`Time Started: ${player.timeStarted} and Current Time: ${currentTime}`);
      console.log(`Player ${playerId} finished in ${durationSeconds} second(s)`);

      localStorage.setItem('gameFinished', JSON.stringify({
        playerId: playerId,
        time: `${minutes} minute(s) and ${seconds} second(s)`
      }));

      //alert(`Player ${playerId} finished in ${minutes} minute(s) and ${seconds} second(s)`);
    }
  }
};

