
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Bots from './components/Bots';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bots" element={<Bots />} />
    </Routes>
  );
};

export default App;
