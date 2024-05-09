import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // import useNavigate
import { Button } from 'react-bootstrap';

import UserContext from '../../contexts/UserContext';
import UserEntryContext from '../../contexts/UserEntryContext';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import CurrentDate from '../../components/CurrentDate/CurrentDate';

import './LeaderboardPage.css';

function LeaderboardPage() {
  const location = useLocation();
  const navigate = useNavigate(); // get the navigate function
  const answer = location.state?.answer;
  const time = location.state?.time; // get time from location state
  const n_attempts = location.state?.n_attempts; // get attempts from location state

  const { user } = useContext(UserContext); // get user from UserContext
  const { userEntry, setUserEntry } = useContext(UserEntryContext); // get userEntry and setUserEntry from UserEntryContext

  useEffect(() => {
    if (answer && time !== undefined) {
      setUserEntry({ username: 'you', attempts: n_attempts+1, time });
    }
  }, [answer, time, n_attempts]); // trigger effect whenever 'answer', 'time', or 'n_attempts' changes

  const handleLogin = () => {
    if (userEntry && !user) {
      navigate('/login'); // navigate to the login page
    }
  };

  return (
    <div className="leaderboard-page">
      <div className='page-heading-container'>
        <h1 className='page-heading'>leaderboard</h1>
      </div>
      {/* If user is not logged in and there is a user entry, render a button */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <CurrentDate style={{ fontSize: '.5em' }}/>
        {!user && userEntry && (
          <Button onClick={handleLogin} variant="secondary" style={{height: '60%', marginTop: '3px'}}>login to post score</Button>
        )}
      </div>
      
      <Leaderboard />
      {/* Add your login/registration form here and pass handleLogin as a prop */}
    </div>
  );
}

export default LeaderboardPage;