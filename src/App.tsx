import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './Home';
// import ScannerPage from './components/ScannerPage';
// import GeneratorPage from './components/GeneratorPage';
import EncryptionGame from './components/EncryptionGame';
import GreedyTrolls from './components/GreedyTrolls';
import BallSortGame from './components/BallSortGame';
import ShapeMatchingGame from './components/ShapeMatchingGame';

function App() {
  return (
    <Router>
      <div>
        <Home />
        <nav>
          <ul>
            {/* <li>
              <Link to="/scanner">Scan QR Code</Link>
            </li> */}
            {/* <li>
              <Link to="/generator">Generate QR Code</Link>
            </li>
            <li>
              <Link to="/encrypt">Encryption Game (placeholder) </Link>
            </li>
            <li>
            <Link to="/greedy-trolls">Greedy Trolls Game</Link>
            </li>
            <li>
            <Link to="/ball-sort">Ball Sort Game </Link>
            </li>
            <li>
              <Link to="/shape-match">Shape Matching Game</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          {/* <Route path="/scanner" element={<ScannerPage />} /> */}
          {/* <Route path="/generator" element={<GeneratorPage />} /> */}
          <Route path="/encrypt" element={
            <EncryptionGame
              encryptedSentence="72-11-62-32-43" // Corrected encrypted sentence for "WATER"
              correctSentence="WATER" // For testing purposes
              timeLimit={60} // 1 minute time limit
              imagePath="../assets/cipher8/octagon-cipher.svg" // Replace with your actual image path
            />
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
