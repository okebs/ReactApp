import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Message from './Message';
import ScannerPage from './components/ScannerPage';
import GeneratorPage from './components/GeneratorPage';
import EncryptionGame from './components/EncryptionGame';
import GreedyTrolls from './components/GreedyTrolls';

function App() {
  return (
    <Router>
      <div>
        <Message />
        <nav>
          <ul>
            <li>
              <Link to="/scanner">Scan QR Code</Link>
            </li>
            <li>
              <Link to="/generator">Generate QR Code</Link>
            </li>
            <li>
              <Link to="/encrypt">Encryption Game (placeholder) </Link>
            </li>
            <li>
            <Link to="/greedy-trolls">Greedy Trolls Game</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/encrypt" element={
            <EncryptionGame
              encryptedSentence="72-11-62-32-43" // Corrected encrypted sentence for "WATER"
              correctSentence="WATER" // For testing purposes
              timeLimit={60} // 1 minute time limit
              imagePath="../assets/cipher8/octagon-cipher.svg" // Replace with your actual image path
            />
          } />
          <Route path="/greedy-trolls" element={<GreedyTrolls />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
