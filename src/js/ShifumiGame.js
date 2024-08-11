import React, { useState } from 'react';
import '../css/ShifumiGame.css';
import rockImage from '../images/rock.png';
import paperImage from '../images/paper.png';
import scissorsImage from '../images/scissors.png';

const choices = [
  { name: 'rock', image: rockImage },
  { name: 'paper', image: paperImage },
  { name: 'scissors', image: scissorsImage },
];

const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)].name;

const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return "It's a tie!";
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'You win!';
  }
  return 'You lose!';
};

function ShifumiGame({ stats, onUpdateStats, onUpdateRewards }) {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);

  const handlePlayerChoice = (choice) => {
    const computerChoice = getRandomChoice();
    const result = determineWinner(choice, computerChoice);

    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(result);

    const updatedStats = { ...stats };
    updatedStats.played += 1;

    if (result === 'You lose!' || result === "It's a tie!") {
        setCurrentStreak(0);
    } else if (result === 'You win!') {
        setCurrentStreak(prevStreak => prevStreak + 1);
    }

    if (result === 'You win!') {
      updatedStats.won += 1;
      if (currentStreak + 1 === 3) {
        onUpdateRewards('win3InARow');
        setPopupMessage('Congratulations! You won 3 games in a row!');
      }
      if (updatedStats.won === 1) {
        onUpdateRewards('firstWin');
        setPopupMessage('Congratulations! You won your first game!');
      } else if (updatedStats.won === 10) {
        onUpdateRewards('win10');
        setPopupMessage('You won 10 games! Keep going!');
      } else if (updatedStats.won === 50) {
        onUpdateRewards('win50');
        setPopupMessage('You won 50 games! You are a champion!');
      }
    } else if (result === 'You lose!') {
      updatedStats.lost += 1;

      if (updatedStats.lost === 1) {
        onUpdateRewards('firstLose');
        setPopupMessage('Too bad! You lost your first game.');
      } else if (updatedStats.lost === 15) {
        onUpdateRewards('lose15');
        setPopupMessage('You lost 15 games! Keep going!');
      }
    } else {
      updatedStats.tied += 1;

      if (updatedStats.tied === 1) {
        onUpdateRewards('firstTie');
        setPopupMessage('It\'s a tie! Nice game!');
      }
    }

    onUpdateStats(updatedStats); // Update stats in the parent component
  };

  const closePopup = () => setPopupMessage('');

  return (
    <div className="ShifumiGame">
      <h2>Play Shifumi</h2>
      <div className="choices">
        {choices.map((choice) => (
          <div key={choice.name} className="choice-container">
            <button onClick={() => handlePlayerChoice(choice.name)}>
              <img src={choice.image} alt={choice.name} />
            </button>
            <p>{choice.name.charAt(0).toUpperCase() + choice.name.slice(1)}</p>
          </div>
        ))}
      </div>
      {playerChoice && (
        <div className="result">
          <p>You chose: {playerChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>{result}</p>
        </div>
      )}
      <div className="stats-panel">
        <h3>Game Statistics</h3>
        <p>Games Played: {stats.played}</p>
        <p>Games Won: {stats.won}</p>
        <p>Games Tied: {stats.tied}</p>
        <p>Games Lost: {stats.lost}</p>
      </div>
      {popupMessage && (
        <div className="popup">
          <div className="popup-content">
            <h3>{popupMessage}</h3>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShifumiGame;
