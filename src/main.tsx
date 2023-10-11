import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' //main component
import './index.css'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';

// Initialize Firebase with your project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa8W_-2hRnHKAhg2q6wXWJH8DoI0iQ0Bg",
  authDomain: "react-app-v1-968d3.firebaseapp.com",
  projectId: "react-app-v1-968d3",
  storageBucket: "react-app-v1-968d3.appspot.com",
  messagingSenderId: "946996284914",
  appId: "1:946996284914:web:46814e9db680bc27632f6b",
  measurementId: "G-8Y0R04BBN1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
