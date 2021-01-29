import { Ball } from './Ball';
import { Brick } from './Brick';
import { GameArea } from './GameArea';

export class BricksArea {
  width: number;
  height: number;
  padding: number;
  numberOfCollumns: number;
  numberOfRows: number;
  bricks: Brick[];
  gameArea: GameArea;
  ball: Ball;

  constructor(colluns: number, rows: number, gameArea: GameArea, ball: Ball) {
    this.width = 50;
    this.height = 20;
    this.padding = 1;
    this.numberOfCollumns = colluns;
    this.numberOfRows = rows;
    this.bricks = [];
    this.gameArea = gameArea;
    this.ball = ball;
  }

  buildRows = (indexCollumn: number): void => {
    for (let indexRow = 0; indexRow < this.numberOfRows; indexRow += 1) {
      this.bricks.push(
        new Brick(
          indexCollumn * (this.width + this.padding) + 65,
          indexRow * (this.height + this.padding) + 80,
          this.width,
          this.height,
          true,
          this.gameArea,
          this.ball,
        ),
      );
    }
  };

  buildCollumns = (): void => {
    for (let index = 0; index < this.numberOfCollumns; index += 1) {
      this.buildRows(index);
    }
  };

  start = (): void => {
    this.buildCollumns();
  };

  update = (): void => {
    this.bricks.forEach((brick, i) => {
      brick.update();
      brick.collision();
      if (brick.status === false) {
        this.bricks.splice(i, 1);
      }
    });
  };
}
