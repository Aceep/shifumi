import React from 'react';
import '../css/Reward.css';

// Dynamically import all images from the images folder
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(require.context('../images/rewards', false, /\.(png|jpe?g|svg)$/));

const rewards = [
  { id: 1, imageKey: 'frog.png', description: 'Win your first game', condition: 'firstWin' },
  { id: 2, imageKey: 'lamb.png', description: 'Tie your first game', condition: 'firstTie' },
  { id: 3, imageKey: 'penguin.png', description: 'Lose your first game', condition: 'firstLose' },
  { id: 4, imageKey: 'seal.png', description: 'Win 10 games', condition: 'win10' },
  { id: 5, imageKey: 'tiger.png', description: 'Win 3 games in a row', condition: 'win3InARow' },
  { id: 6, imageKey: 'dog.png', description: 'Lose 15 games', condition: 'lose15' },
  { id: 7, imageKey: 'bird.png', description: 'Change the background color', condition: 'changeColor' },
  { id: 8, imageKey: 'kitten.png', description: 'Reset your scores', condition: 'resetScores' },
  { id: 9, imageKey: 'ladybug.png', description: 'Win 50 games', condition: 'win50' },
];

function Reward({ earnedRewards = [] }) {
  return (
    <div className="reward-container">
      {rewards.map(reward => (
        <div key={reward.id} className="reward-block">
          {earnedRewards.includes(reward.condition) ? (
            <img src={images[reward.imageKey]} alt={`Reward ${reward.id}`} />
          ) : (
            <div className="locked-reward">???</div>
          )}
          <p>{reward.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Reward;
