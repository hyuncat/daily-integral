import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Leaderboard = ({ leaderboard }) => {
    const columns = [
    { field: 'id', headerName: 'rank', width: 90},
    {
        field: 'username',
        headerName: 'name',
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
    name: entry.name,
    attempts: entry.attempts,
    time: entry.time
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