// AREA OF THE GAME
const gameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

// CLASS TO SETUP BALL
class Ball {
  constructor(x, y, color, radius, startAngle, endAngle) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.speedX = 5;
    this.speedY = -5;
  }

  ballUpdate() {
    gameArea.context.beginPath();
    gameArea.context.arcStyle = this.color;
    gameArea.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle
    );
    gameArea.context.stroke();
  }

  newPos(player) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (
      this.x + this.speedX > gameArea.canvas.width - this.radius ||
      this.x + this.speedX < this.radius
    ) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.speedY < this.radius) {
      this.speedY = -this.speedY;
    }

    if (
      this.x >= player.x &&
      this.y === player.y &&
      this.x <= player.x + 100 &&
      this.y === player.y
    ) {
      this.speedX = +this.speedX;
      this.speedY = -this.speedY;
    }
  }
}

// CLASS TO SETUP BRICKS
class BaseElement {
  constructor(x, y, color, width, height, status) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.status = status;
  }

  update() {
    const ctx = gameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collision() {
    if (
      ball.x - ball.radius >= this.x &&
      ball.x - ball.radius <= this.x + 50 &&
      ball.y - ball.radius <= this.y
    ) {
      ball.speedX = +ball.speedX;
      ball.speedY = -ball.speedY;
      this.status = 0;
    }
    if (
      ball.x - ball.radius >= this.x &&
      ball.x - ball.radius <= this.x + 50 &&
      ball.y - ball.radius <= this.y + 20
    ) {
      ball.speedX = +ball.speedX;
      ball.speedY = -ball.speedY;
      this.status = 0;
    }
  }
}

// CLASS TO SETUP BAR
class MovingElement extends BaseElement {
  constructor(x, y, color, width, height) {
    super(x, y, color, width, height);
    this.speedX = 0;
    this.speedY = 0;
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

// BAR-PLAYER
const player = new MovingElement(350, 600, 'black', 100, 10);

const brick = {
  row: 5,
  column: 15,
  width: 50,
  height: 20,
  padding: 1
};

const bricks = [];

console.log(bricks);

for (let c = 0; c < brick.column; c += 1) {
  for (let r = 0; r < brick.row; r += 1) {
    bricks.push(
      new BaseElement(
        c * (brick.width + brick.padding) + 15,
        r * (brick.height + brick.padding) + 30,
        'blue',
        brick.width,
        brick.height,
        1
      )
    );
  }
}

// BALL
const ball = new Ball(400, 500, 'black', 10, 0, 2 * Math.PI);

// BAR MOVIMENTATION
document.onkeydown = e => {
  if (e.keyCode === 37) {
    player.speedX = -5;
  } else if (e.keyCode === 39) {
    player.speedX = 5;
  }
};
document.onkeyup = () => {
  player.speedX = 0;
  player.speedY = 0;
};

// UPDATE GAME AREA
function updateGameArea() {
  gameArea.clear();
  player.update();
  player.newPos();
  ball.ballUpdate();
  ball.newPos(player);
  bricks.forEach(b => {
    b.update();
    b.collision();
  });
  bricks.forEach((b, i) => {
    if (b.status === 0) {
      bricks.splice(i, 1);
    }
  });
}

// START THE GAME
gameArea.start();
