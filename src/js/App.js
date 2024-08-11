import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../css/App.css';
import Home from './Home';
import ShifumiGame from './ShifumiGame';
import Reward from './Reward';
import { ColorProvider, useColor } from './ColorContext';

var changes = 0;

function AppContent() {
  const { backgroundColor } = useColor();
  const [earnedRewards, setEarnedRewards] = useState([]);
  const [stats, setStats] = useState({ played: 0, won: 0, tied: 0, lost: 0 });
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;

    // Load rewards and stats from localStorage when the app loads
    const savedRewards = JSON.parse(localStorage.getItem('earnedRewards')) || [];
    setEarnedRewards(savedRewards);

    const savedStats = JSON.parse(localStorage.getItem('shifumiStats')) || {
      played: 0,
      won: 0,
      tied: 0,
      lost: 0,
    };
    setStats(savedStats);
  }, [backgroundColor]);

  const handleUpdateRewards = useCallback((newReward) => {
    setEarnedRewards(prevRewards => {
      const updatedRewards = [...prevRewards, newReward];
      localStorage.setItem('earnedRewards', JSON.stringify(updatedRewards));
      return updatedRewards;
    });
  }, []);

  const handleUpdateStats = useCallback((newStats) => {
    setStats(newStats);
    localStorage.setItem('shifumiStats', JSON.stringify(newStats));
  }, []);

  const handleBackgroundColorChange = useCallback(() => {
    console.log(backgroundColor);
    console.log(changes);
    if (backgroundColor !== 'rgb(0, 0, 0, 0.5)' && changes === 0) {
      handleUpdateRewards('changeBackground');
    }
  }, [backgroundColor, handleUpdateRewards]);

  const handleResetStats = useCallback(() => {
    if (!resetDone) {
      handleUpdateRewards('resetScores');
      setResetDone(true);
    }
    const resetStats = {
      played: 0,
      won: 0,
      tied: 0,
      lost: 0,
    };
    setStats(resetStats);
    localStorage.setItem('shifumiStats', JSON.stringify(resetStats));
  }, [handleUpdateRewards, resetDone]);

  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/" className="title">Shifumi</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/"
            element={<Home
              onResetStats={handleResetStats}
              onBackgroundColourChange={handleBackgroundColorChange}/>} />
          <Route
            path="/game"
            element={
              <ShifumiGame
                onUpdateRewards={handleUpdateRewards}
                stats={stats}
                onUpdateStats={handleUpdateStats}
              />
            }
          />
          <Route path="/reward" element={<Reward earnedRewards={earnedRewards} />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ColorProvider>
      <Router>
        <AppContent />
      </Router>
    </ColorProvider>
  );
}

export default App;
