import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

// fonts
import '../fonts/DigitalDisplayRegular-ODEO.ttf';

import Navbar from './Navbar/Navbar';

import HomePage from '../pages/HomePage/HomePage';
import DailyIntegralPage from '../pages/DailyIntegralPage/DailyIntegralPage';
import LeaderboardPage from '../pages/LeaderboardPage/LeaderboardPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import LoginPage from '../pages/LoginPage/LoginPage';


function App() {
  const [showModal, setShowModal] = useState(false)
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/daily-integral" element={<DailyIntegralPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
