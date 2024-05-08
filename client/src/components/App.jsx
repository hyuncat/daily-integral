import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts (store user login and answer input)
import UserContext from '../contexts/UserContext';
import UserEntryContext from '../contexts/UserEntryContext';

// CSS and fonts
import './App.css';
import '../fonts/DigitalDisplayRegular-ODEO.ttf';

// Components and pages
import Navbar from './Navbar/Navbar';

import HomePage from '../pages/HomePage/HomePage';
import DailyIntegralPage from '../pages/DailyIntegralPage/DailyIntegralPage';
import LeaderboardPage from '../pages/LeaderboardPage/LeaderboardPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import AuthPage from '../pages/AuthPage/AuthPage';

function App() {
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState(null);
  const [userEntry, setUserEntry] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <UserEntryContext.Provider value={{ userEntry, setUserEntry }}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/daily-integral" element={<DailyIntegralPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
      </Router>
    </UserEntryContext.Provider>
    </UserContext.Provider>
  );
}

export default App;