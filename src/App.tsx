import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './Home';
import EncryptionGame from './components/EncryptionGame';
import GreedyTrolls from './components/GreedyTrolls';
import BallSortGame from './components/BallSortGame';
import ShapeMatchingGame from './components/ShapeMatchingGame';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encrypt" element={
            <EncryptionGame encryptedSentence="72-11-62-32-43" correctSentence="WATER" timeLimit={60} imagePath="../assets/cipher8/octagon-cipher.svg"/>
          } />
          <Route path="/greedy-trolls" element={<GreedyTrolls />} />
          <Route path="/ball-sort" element={<BallSortGame />} />
          <Route path="/shape-match" element={<ShapeMatchingGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
