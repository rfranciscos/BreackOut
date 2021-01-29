import { GameArea } from './GameArea';
import BarImg from '../public/images/breakout_sprites.png';

export class Bar {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  speedX: number;
  speedY: number;
  image: HTMLImageElement;
  gameArea: GameArea;

  constructor(positionX: number, positionY: number, width: number, height: number, gameArea: GameArea) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.speedX = 0;
    this.speedY = 0;
    this.image = new Image();
    this.image.src = BarImg;
    this.gameArea = gameArea;
  }

  refeshPosition = (): void => {
    const ctx = this.gameArea.context;
    ctx.drawImage(this.image, this.positionX, this.positionY);
  };

  setPosition = (): void => {
    this.positionX += this.speedX;
    this.positionY += this.speedY;
  };

  leftMotion = (): void => {
    this.speedX = -8;
  };

  rightMotion = (): void => {
    this.speedX = 8;
  };

  stopMotion = (): void => {
    this.speedX = 0;
  };
}
