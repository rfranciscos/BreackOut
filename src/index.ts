import { GameArea } from './GameArea';
import { Bar } from './Bar';

const gameArea = new GameArea();

const player = new Bar(350, 600, 100, 10, gameArea);

function updateGameArea() {
  gameArea.clear();
  player.refeshPosition();
  player.setPosition();
}

setInterval(updateGameArea, 20);
gameArea.start();
