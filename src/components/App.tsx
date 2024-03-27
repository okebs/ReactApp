import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import Home from './Home';
import EncryptionGame from './EncryptionGame';
import GreedyTrolls from './GreedyTrolls';
import BallSortGame from './BallSortGame';
import ShapeMatchingGame from './ShapeMatchingGame';
import GameSession from '../components/SessionPage';
import { createNewGameSession } from '../services/GameSessions';

function App() {
  return (
    <Router>
      <div>
        {/* Here's an example of how you might use handleCreateGameSession in your UI */}
        {/* <button onClick={() => handleCreateGameSession('encrypt', 'teacher1')}>
        Create Game Session for Encryption Game </button> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game-session/:sessionId" element={<GameSession />} />
          <Route path="/encrypt" element={
            <EncryptionGame encryptedSentence="72-11-62-32-43" correctSentence="WATER" timeLimit={60} imagePath="../assets/cipher8/octagon-cipher.svg"/>
          } />
          <Route path="/greedyTrolls" element={<GreedyTrolls />} />
          <Route path="/ballSort" element={<BallSortGame />} />
          <Route path="/shapeMatch" element={<ShapeMatchingGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
