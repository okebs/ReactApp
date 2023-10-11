import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Message from './Message';
import ScannerPage from './components/ScannerPage';
import GeneratorPage from './components/GeneratorPage';

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
          </ul>
        </nav>
        <Routes>
          <Route path="/scanner" Component={ScannerPage} />
          <Route path="/generator" Component={GeneratorPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
