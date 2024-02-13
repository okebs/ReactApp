import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Message from './Message';
import ScannerPage from './components/ScannerPage';
import GeneratorPage from './components/GeneratorPage';
import EncryptionGame from './components/EncryptionGame';

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
          </ul>
        </nav>
        <Routes>
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/encrypt" element={<EncryptionGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
