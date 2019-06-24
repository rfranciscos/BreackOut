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
  },
};

class baseElement {
  constructor(x, y, color, width, height) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  update() {
    const ctx = gameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class movingElement extends baseElement {
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

class Ball {
  constructor(x, y, color, radius, startAngle, endAngle) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.speedX = 4;
    this.speedY = -4;
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

  newPos() {
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
      this.y >= player.y &&
      this.x <= player.x + 100 &&
      this.y >= player.y
    ) {
      this.speedX = +this.speedX;
      this.speedY = -this.speedY;
    }
  }
}

// BAR-PLAYER
const player = new movingElement(350, 600, 'black', 100, 10);

//BALL
const ball = new Ball(400, 500, 'black', 10, 0, 2 * Math.PI);

let brick = {
  row: 3,
  column: 9,
  width: 50,
  height: 20,
  padding: 1
};

let bricks = [];

for (let c = 0; c < brick.column; c++) {
  for (let r = 0; r < brick.row; r++) {
    bricks.push({
      x: c * (brick.width + brick.padding),
      y: r * (brick.height + brick.padding),
      status: 1
    });
  }
}

function drawBricks() {
  bricks.forEach(brick => {
    if (bricks.status) {
      new Component(50, 20, 'yellow', brick.width, brick.height);
    }
  });
}

console.log(bricks);

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

// UPDATE
function updateGameArea() {
  gameArea.clear();
  player.update();
  player.newPos();
  ball.ballUpdate();
  ball.newPos();
}

// START THE GAME
gameArea.start();
