import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import UserContext from '../../contexts/UserContext';
import UserEntryContext from '../../contexts/UserEntryContext';

function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let ms = milliseconds % 1000;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  ms = String(ms).padStart(3, '0').slice(0, 2);

  return `${minutes}:${seconds}:${ms}`;
}

function timeToMilliseconds(time) {
  const [minutes, seconds, milliseconds] = time.split(':').map(Number);
  return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const { user } = useContext(UserContext); // get user from UserContext
  const { userEntry } = useContext(UserEntryContext); // get userEntry from UserEntryContext
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetch(`http://localhost:${process.env.REACT_APP_SERVERPORT}/api/users/leaderboard`)
        .then(response => response.json())
        .then(data => {
          setLeaderboard(data);
          setHasFetched(true);
        })
        .catch(error => {
          console.error('Error fetching leaderboard:', error);
        })
        .finally(() => {
          if (userEntry && !user) {
            setLeaderboard(prevLeaderboard => {
              const newUserEntry = {...userEntry, time: userEntry.time};
              return [...prevLeaderboard, newUserEntry];
            });
          }
        });
    }
  }, [userEntry, user, hasFetched]);

  const columns = [
    { field: 'id', headerName: 'rank', width: 90},
    {
      field: 'username',
      headerName: 'username',
      width: 150,
      editable: false,
    },
    {
      field: 'n_attempts',
      headerName: '# attempts',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'time',
      headerName: 'time',
      type: 'number',
      width: 110,
      editable: false,
    }
  ];

  const [sortedLeaderboard, setSortedLeaderboard] = useState([]);

  useEffect(() => {
    const newSortedLeaderboard = [...leaderboard];
    newSortedLeaderboard.sort((a, b) => a.n_attempts - b.n_attempts || a.time - b.time);
    setSortedLeaderboard(newSortedLeaderboard);
  }, [leaderboard]);

  const rows = sortedLeaderboard.map((entry, index) => ({
    id: index + 1,
    username: entry.username,
    n_attempts: entry.n_attempts || entry.attempts, // sorry this is such a bandaid solution
    time: formatTime(entry.time) // use formatTime here
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  );
};

export default Leaderboard;