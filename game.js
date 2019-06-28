let score = 0;
let level = 1;
let speedBall = (level * 5) / 2;
let lifes = 3;
const collisionEfect = document.createElement('audio');
collisionEfect.src = 'sounds/collision.wav';

const gameOverEfect = document.createElement('audio');
gameOverEfect.src = 'sounds/gameOver.wav';

const LevelUpEfect = document.createElement('audio');
LevelUpEfect.src = 'sounds/levelUp.wav';

// AREA OF THE GAME
const gameArea = {
  canvas: document.createElement('canvas'),
  start() {
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.canvas.padding = 300;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[2]);
    this.interval = setInterval(updateGameArea, 20);
  },

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  score() {
    points = score;
    this.context.font = '18px serif';
    this.context.fillStyle = 'white';
    this.context.fillText('SCORE: ' + points, 350, 50);
    this.context.fillText('LEVEL: ' + level, 550, 50);
    this.context.fillText('LIVES: ' + lifes, 50, 50);
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
    gameArea.context.fillStyle = 'white';
    gameArea.context.arcStyle = this.color;
    gameArea.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
    );
    gameArea.context.fill();
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
      this.x <= player.x + 20 &&
      this.y >= player.y &&
      this.y <= player.y + 29
    ) {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
    }

    if (
      this.x >= player.x + 20 &&
      this.x <= player.x + 113 &&
      this.y >= player.y &&
      this.y <= player.y + 29
    ) {
      this.speedX = +this.speedX;
      this.speedY = -this.speedY;
    }

    if (
      this.x >= player.x + 113 &&
      this.x <= player.x + 133 &&
      this.y >= player.y &&
      this.y <= player.y + 29
    ) {
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;
    }
  }

  gameOver() {
    if (this.y >= gameArea.canvas.height) {
      lifes -= 1;
      this.y = 200;
      this.x = 400;
      if (lifes === 0) {
        clearInterval(gameArea.interval);
        gameArea.context.font = '50px Ariel';
        gameArea.context.fillText('GAME OVER', 250, 450);
        gameOverEfect.play();

        // Render button
        gameArea.context.fillStyle = 'red';
        gameArea.context.fillRect(350, 500, 100, 40);
        gameArea.context.font = '20px Ariel';
        gameArea.context.fillStyle = 'white';
        gameArea.context.fillText('RESTART', 358, 525);
      }
    }
  }
}

// CLASS TO SETUP BRICKS
class BaseElement {
  constructor(x, y, width, height, status) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.status = status;
    this.Image = new Image();
    this.Image.src = 'images/red_Brick.png';
  }

  update() {
    const ctx = gameArea.context;
    ctx.drawImage(this.Image, this.x, this.y);
  }

  collision() {
    if (
      ball.x - ball.radius >= this.x &&
      ball.x - ball.radius <= this.x + 50 &&
      ball.y + ball.radius >= this.y &&
      ball.y + ball.radius <= this.y + 20
    ) {
      ball.speedX = +ball.speedX;
      ball.speedY = -ball.speedY;
      this.status = 0;
      score += 1;
      collisionEfect.play();
    }
    if (
      ball.x - ball.radius >= this.x &&
      ball.x - ball.radius <= this.x + 50 &&
      ball.y - ball.radius >= this.y &&
      ball.y - ball.radius <= this.y + 20
    ) {
      ball.speedX = +ball.speedX;
      ball.speedY = -ball.speedY;
      this.status = 0;
      score += 1;
      collisionEfect.play();
    }
  }
}

// CLASS TO SETUP BAR
class MovingElement {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.Image = new Image();
    this.Image.src = './images/breakout_sprites.png';
  }

  update() {
    const ctx = gameArea.context;
    ctx.drawImage(this.Image, this.x, this.y);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

// BAR-PLAYER
const player = new MovingElement(350, 600, 100, 10);

let brick = {
  row: level,
  column: 13,
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
        c * (brick.width + brick.padding) + 65,
        r * (brick.height + brick.padding) + 80,
        brick.width,
        brick.height,
        1
      )
    );
  }
}

function levelMap() {
  if (bricks.length === 0) {
    level += 1;
    LevelUpEfect.play();
    if (ball.speedX < 0) {
      ball.speedX += -2;
    } else {
      ball.speedY += 2;
    }
    for (let c = 0; c < brick.column; c += 1) {
      for (let r = 0; r < level; r += 1) {
        bricks.push(
          new BaseElement(
            c * (brick.width + brick.padding) + 65,
            r * (brick.height + brick.padding) + 80,
            brick.width,
            brick.height,
            1
          )
        );
      }
    }
  }
}

// BALL
const ball = new Ball(400, 500, 'black', 10, 0, 2 * Math.PI);

// BAR MOVIMENTATION
document.onkeydown = e => {
  if (e.keyCode === 37) {
    player.speedX = -8;
  } else if (e.keyCode === 39) {
    player.speedX = 8;
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
  // player.makeBase();
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
  ball.gameOver();
  gameArea.score();
  levelMap();
}

// START THE GAME
gameArea.start();
