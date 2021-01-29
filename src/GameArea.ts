export class GameArea {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.canvas.padding = 300;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  start = (): void => {
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  };

  clear = (): void => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
}
