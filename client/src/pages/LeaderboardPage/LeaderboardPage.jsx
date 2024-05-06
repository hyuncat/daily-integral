import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Leaderboard from '../../components/Leaderboard/Leaderboard';
import CurrentDate from '../../components/CurrentDate/CurrentDate';

import './LeaderboardPage.css';

function LeaderboardPage() {
  const location = useLocation();
  const answer = location.state?.answer;
  const time = location.state?.time; // get time from location state

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (answer && time !== undefined) {
      // Only add a new entry if there isn't already an entry for 'you'
      if (!leaderboard.some(e => e.username === 'you')) {
        addEntry({ username: 'you', attempts: 1, time });
      }
    }
  }, [answer, time, leaderboard]); // trigger effect whenever 'answer', 'time', or 'leaderboard' changes

  const addEntry = (entry) => {
    setLeaderboard(prevLeaderboard => {
      // Check if an entry for 'you' already exists
      if (prevLeaderboard.some(e => e.username === 'you')) {
        return prevLeaderboard;
      }
  
      const newLeaderboard = [...prevLeaderboard, entry];
      newLeaderboard.sort((a, b) => a.attempts - b.attempts || a.time - b.time);
      return newLeaderboard;
    });
  };

  const handleLogin = (username) => {
    setLeaderboard(prevLeaderboard => {
      const newLeaderboard = prevLeaderboard.map(entry => 
        entry.username === 'you' ? { ...entry, username: username } : entry
      );
      return newLeaderboard;
    });
  };

  return (
    <div className="leaderboard-page">
      <div className='page-heading-container'>
        <h1 className='page-heading'>leaderboard</h1>
      </div>
      <CurrentDate style={{ fontSize: '.5em' }}/>
      <Leaderboard leaderboard={leaderboard} />
      {/* Add your login/registration form here and pass handleLogin as a prop */}
    </div>
  );
}

export default LeaderboardPage;