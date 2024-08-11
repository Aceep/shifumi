import React, { createContext, useState, useContext, useEffect } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState(() => {
    return localStorage.getItem('backgroundColor') || 'rgba(0, 0, 0, 0.5)';
  });

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    localStorage.setItem('backgroundColor', backgroundColor);
  }, [backgroundColor]);

  const setEarnedRewards = (reward) => {
    const currentRewards = JSON.parse(localStorage.getItem('earnedRewards')) || [];
    if (!currentRewards.includes(reward)) {
      localStorage.setItem('earnedRewards', JSON.stringify([...currentRewards, reward]));
    }
  };

  return (
    <ColorContext.Provider value={{ backgroundColor, setBackgroundColor, setEarnedRewards }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
