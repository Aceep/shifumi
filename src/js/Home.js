import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import panel from '../images/panel.png';
import '../css/Home.css';
import { useColor } from './ColorContext';

function Home({ onResetStats }) {
  const navigate = useNavigate();
  const { setBackgroundColor, setEarnedRewards } = useColor(); // Removed backgroundColor
  const [showSettings, setShowSettings] = useState(false);

  const handleButtonClick = (event) => {
    const buttonId = event.target.id;
    switch (buttonId) {
      case 'button-1':
        navigate('/game');
        break;
      case 'button-2':
        navigate('/reward');
        break;
      case 'button-3':
        setShowSettings(true);
        break;
      default:
        break;
    }
  };

  const handleChangeColor = (color) => {
    // Check if the reward has been earned before
    const currentRewards = JSON.parse(localStorage.getItem('earnedRewards')) || [];
    if (!currentRewards.includes('changeColor')) {
      // Update rewards
      setEarnedRewards('changeColor');
    }

    // Update the background color
    setBackgroundColor(color);
    setShowSettings(false);
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <img src={panel} alt="Menu" />
        <button className="overlay-button" onClick={handleButtonClick} id="button-1">
          Shifumi
        </button>
        <button className="overlay-button" onClick={handleButtonClick} id="button-2">
          Rewards
        </button>
        <button className="overlay-button" onClick={handleButtonClick} id="button-3">
          Settings
        </button>
      </div>
      <div className="rules-container">
        <h3>Game Rules</h3>
        <p>1. Choose rock, paper, or scissors.</p>
        <p>2. The computer will also make a choice.</p>
        <p>3. Rock beats scissors, scissors beat paper, and paper beats rock.</p>
        <p>4. The winner is determined based on these rules.</p>
      </div>
      {showSettings && (
        <div className="settings-popup">
          <div className="settings-popup-content">
            <h3>Settings</h3>
            <button onClick={onResetStats}>Reset Game Stats</button>
            <div>
              <h4>Change Background Color:</h4>
              <button onClick={() => handleChangeColor('rgba(0, 0, 0, 0.5)')}>Default Color</button>
              <button onClick={() => handleChangeColor('lightblue')}>Light Blue</button>
              <button onClick={() => handleChangeColor('lightgray')}>Light Gray</button>
            </div>
            <button onClick={() => setShowSettings(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
