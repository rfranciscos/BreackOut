import { Bar } from './Bar';
import { GameArea } from './GameArea';

export class Ball {
  positionX: number;
  positionY: number;
  color: string;
  radius: number;
  initialAngle: number;
  finalAngle: number;
  speedX: number;
  speedY: number;
  gameArea: GameArea;
  player: Bar;

  constructor(
    positionX: number,
    positionY: number,
    color: string,
    radius: number,
    initialAngle: number,
    finalAngle: number,
    gameArea: GameArea,
    player: Bar,
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.color = color;
    this.radius = radius;
    this.initialAngle = initialAngle;
    this.finalAngle = finalAngle;
    this.speedX = 5;
    this.speedY = -5;
    this.gameArea = gameArea;
    this.player = player;
  }

  ballUpdate = (): void => {
    this.gameArea.context.beginPath();
    this.gameArea.context.fillStyle = 'white';
    this.gameArea.context.arcStyle = this.color;
    this.gameArea.context.arc(this.positionX, this.positionY, this.radius, this.initialAngle, this.finalAngle);
    this.gameArea.context.fill();
    this.gameArea.context.stroke();
  };

  newPos = (): void => {
    this.positionX += this.speedX;
    this.positionY += this.speedY;

    if (
      this.positionX + this.speedX > this.gameArea.canvas.width - this.radius ||
      this.positionX + this.speedX < this.radius
    ) {
      this.speedX = -this.speedX;
    }
    if (this.positionY + this.speedY < this.radius) {
      this.speedY = -this.speedY;
    }

    if (
      this.positionX >= this.player.positionX &&
      this.positionX <= this.player.positionX + 20 &&
      this.positionY >= this.player.positionY &&
      this.positionY <= this.player.positionY + 29
    ) {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
    }

    if (
      this.positionX >= this.player.positionX + 20 &&
      this.positionX <= this.player.positionX + 113 &&
      this.positionY >= this.player.positionY &&
      this.positionY <= this.player.positionY + 29
    ) {
      this.speedX = +this.speedX;
      this.speedY = -this.speedY;
    }

    if (
      this.positionX >= this.player.positionX + 113 &&
      this.positionX <= this.player.positionX + 133 &&
      this.positionY >= this.player.positionY &&
      this.positionY <= this.player.positionY + 29
    ) {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
    }
  };
}
