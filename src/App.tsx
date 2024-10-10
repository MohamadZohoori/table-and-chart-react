import React, { useState } from 'react';
import './App.css';
import SimpleBarChart from './components/SimpleBarChart';
import TableComponent from './components/TableComponent';
import { Button } from '@mui/material';

const App: React.FC = () => {
  const [showChart, setShowChart] = useState(true);

  return (
    <div className={`min-h-screen flex flex-col ${showChart ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      <div className="flex justify-between items-start w-full max-w-4xl p-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowChart((prev) => !prev)}
          className="relative mb-4"
        >
          {showChart ? 'Show Table' : 'Show Bar Chart'}
        </Button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        {showChart ? (
          <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-semibold mb-8">Chart title number one</h1>
            <SimpleBarChart />
          </div>
        ) : (
          <TableComponent />
        )}
      </div>
    </div>
  );
};

export default App;
