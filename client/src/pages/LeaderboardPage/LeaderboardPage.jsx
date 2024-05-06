import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Leaderboard from '../../components/Leaderboard/Leaderboard';
import CurrentDate from '../../components/CurrentDate/CurrentDate';

import './LeaderboardPage.css';

function LeaderboardPage() {
  const location = useLocation();
  const answer = location.state?.answer;

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (answer) {
      addEntry({ name: 'You', attempts: answer.attempts, time: answer.time });
    }
  }, [answer]); // trigger effect whenever 'answer' changes

  const addEntry = (entry) => {
    setLeaderboard(prevLeaderboard => {
      const newLeaderboard = [...prevLeaderboard, entry];
      newLeaderboard.sort((a, b) => a.attempts - b.attempts || a.time - b.time);
      return newLeaderboard;
    });
  };

  const handleLogin = (username) => {
    setLeaderboard(prevLeaderboard => {
      const newLeaderboard = prevLeaderboard.map(entry => 
        entry.name === 'You' ? { ...entry, name: username } : entry
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