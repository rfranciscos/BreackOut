import { Ball } from './Ball';
import { Bar } from './Bar';
import { BricksArea } from './BricksArea';
import { GameArea } from './GameArea';

export class Game {
  ball: Ball;
  gameArea: GameArea;
  player: Bar;
  bricksArea: BricksArea;
  interval: NodeJS.Timeout;
  lifes: number;
  gameOverEfect: HTMLAudioElement;
  LevelUpEfect: HTMLAudioElement;
  score: number;
  level: number;

  constructor(ball: Ball, gameArea: GameArea, player: Bar, bricksArea: BricksArea) {
    this.ball = ball;
    this.gameArea = gameArea;
    this.player = player;
    this.bricksArea = bricksArea;
    this.interval = setInterval(this.update, 20);
    this.lifes = 3;
    this.gameOverEfect = document.createElement('audio');
    this.gameOverEfect.src = 'sounds/gameOver.wav';
    this.LevelUpEfect = document.createElement('audio');
    this.LevelUpEfect.src = 'sounds/levelUp.wav';
    this.score = 0;
    this.level = 0;
  }

  gameOver = (): void => {
    if (this.ball.positionY >= this.gameArea.canvas.height) {
      this.lifes -= 1;
      this.ball.positionY = 200;
      this.ball.positionX = 400;
      if (this.lifes === 0) {
        clearInterval(this.interval);
        this.gameArea.context.font = '50px Ariel';
        this.gameArea.context.fillText('GAME OVER', 250, 450);
        this.gameOverEfect.play();

        // Render button
        this.gameArea.context.fillStyle = 'red';
        this.gameArea.context.fillRect(350, 500, 100, 40);
        this.gameArea.context.font = '20px Ariel';
        this.gameArea.context.fillStyle = 'white';
        this.gameArea.context.fillText('RESTART', 358, 525);
      }
    }
  };

  infoBar = (): void => {
    this.gameArea.context.font = '18px serif';
    this.gameArea.context.fillStyle = 'white';
    this.gameArea.context.fillText('SCORE: ' + this.score, 350, 50);
    this.gameArea.context.fillText('LEVEL: ' + this.level, 550, 50);
    this.gameArea.context.fillText('LIVES: ' + this.lifes, 50, 50);
  };

  update = (): void => {
    this.gameArea.clear();
    this.player.refeshPosition();
    this.player.setPosition();
    this.bricksArea.update();
    this.ball.ballUpdate();
    this.ball.newPos();
    this.gameOver();
    this.infoBar();
  };

  start = (): void => {
    this.interval;
    this.gameArea.start();
    this.bricksArea.start();
  };
}
