export class GameArea {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  /**
   *
   */
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
  }

  //   start = () => {
  //     this.canvas.width = 800;
  //     this.canvas.height = 800;
  //     this.canvas.padding = 300;
  //     // this.context = this.canvas.getContext('2d');
  //     // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  //   };
}
