import BrickImg from '../public/images/red_Brick.png';
import { Ball } from './Ball';
import { GameArea } from './GameArea';

export class Brick {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  status: boolean;
  image: HTMLImageElement;
  gameArea: GameArea;
  ball: Ball;

  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    status: boolean,
    gameArea: GameArea,
    ball: Ball,
  ) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.status = status;
    this.image = new Image();
    this.image.src = BrickImg;
    this.gameArea = gameArea;
    this.ball = ball;
  }

  update = (): void => {
    const ctx = this.gameArea.context;
    ctx.drawImage(this.image, this.positionX, this.positionY);
  };

  collision = (): void => {
    if (
      this.ball.positionX - this.ball.radius >= this.positionX &&
      this.ball.positionX - this.ball.radius <= this.positionX + 50 &&
      this.ball.positionY + this.ball.radius >= this.positionY &&
      this.ball.positionY + this.ball.radius <= this.positionY + 20
    ) {
      this.ball.speedX = +this.ball.speedX;
      this.ball.speedY = -this.ball.speedY;
      this.status = false;
      // score += 1;
      // collisionEfect.play();
    }
    if (
      this.ball.positionX - this.ball.radius >= this.positionX &&
      this.ball.positionX - this.ball.radius <= this.positionX + 50 &&
      this.ball.positionY - this.ball.radius >= this.positionY &&
      this.ball.positionY - this.ball.radius <= this.positionY + 20
    ) {
      this.ball.speedX = +this.ball.speedX;
      this.ball.speedY = -this.ball.speedY;
      this.status = false;
      // score += 1;
      // collisionEfect.play();
    }
  };
}
