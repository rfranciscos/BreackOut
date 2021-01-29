import { GameArea } from './GameArea';
import { Bar } from './Bar';

const gameArea = new GameArea();

const player = new Bar(350, 600, 100, 10, gameArea);

function updateGameArea() {
  gameArea.clear();
  player.refeshPosition();
  player.setPosition();
}

document.onkeydown = (ev) => {
  if (ev.key === 'ArrowLeft') {
    player.leftMotion();
  }
  if (ev.key === 'ArrowRight') {
    player.rightMotion();
  }
};

document.onkeyup = (ev) => {
  if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
    player.stopMotion();
  }
};

setInterval(updateGameArea, 20);
gameArea.start();
