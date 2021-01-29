import { GameArea } from './GameArea';
import { Bar } from './Bar';
import { BricksArea } from './BricksArea';

const gameArea = new GameArea();

const player = new Bar(350, 600, 100, 10, gameArea);

const bricksArea = new BricksArea(13, 6, gameArea);

function updateGameArea() {
  gameArea.clear();
  player.refeshPosition();
  player.setPosition();
  bricksArea.update();
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
bricksArea.start();
