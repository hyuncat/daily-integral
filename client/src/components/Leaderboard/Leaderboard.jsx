import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

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

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const { userEntry } = useContext(UserEntryContext); // get userEntry from UserEntryContext

  axios.get(`http://localhost:${process.env.REACT_APP_SERVERPORT}/api/users/leaderboard`, { timeout: 5000 }) // 5 seconds timeout
  .then(response => {
    const data = response.data;
    if (userEntry) {
      data.push(userEntry);
      data.sort((a, b) => a.attempts - b.attempts || a.time - b.time);
    }
    setLeaderboard(data);
  })
  .catch(error => {
    console.error('Error fetching leaderboard:', error);
    if (userEntry) {
      setLeaderboard([userEntry]);
    }
  });

  const columns = [
    { field: 'id', headerName: 'rank', width: 90},
    {
      field: 'username',
      headerName: 'username',
      width: 150,
      editable: false,
    },
    {
      field: 'attempts',
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

  const rows = leaderboard.map((entry, index) => ({
    id: index + 1,
    username: entry.username,
    attempts: entry.attempts,
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