import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { mockData } from './data/mockData';

function App() {
  const [dateRange, setDateRange] = useState('last30days');
  const [platform, setPlatform] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        dateRange={dateRange}
        setDateRange={setDateRange}
        platform={platform}
        setPlatform={setPlatform}
      />
      <Dashboard
        data={mockData}
        dateRange={dateRange}
        platform={platform}
      />
    </div>
  );
}

export default App;
