
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Apps from './pages/Apps';
import DiscordBots from './pages/DiscordBots';

const App: React.FC = () => {
  // Use basename only in production to match GitHub Pages deployment
  const basename = import.meta.env.PROD ? '/Bagginsite' : '/';
  
  return (
    <Router basename={basename}>
      <div className="min-h-screen bg-discord-darker">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/discord-bots" element={<DiscordBots />} />
        </Routes>
        <footer className="text-center py-6 text-sm text-discord-gray border-t border-discord-dark">
          <p>&copy; 2025 Baggins. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
