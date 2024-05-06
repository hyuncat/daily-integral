import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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

const Leaderboard = ({ leaderboard }) => {
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