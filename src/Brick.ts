import BrickImg from '../public/images/red_Brick.png';
import { GameArea } from './GameArea';

export class Brick {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  status: boolean;
  image: HTMLImageElement;
  gameArea: GameArea;

  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number,
    status: boolean,
    gameArea: GameArea,
  ) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.status = status;
    this.image = new Image();
    this.image.src = BrickImg;
    this.gameArea = gameArea;
  }

  update = (): void => {
    const ctx = this.gameArea.context;
    ctx.drawImage(this.image, this.positionX, this.positionY);
  };
}
