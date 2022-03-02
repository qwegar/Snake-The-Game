const scoreOut = document.querySelector("#score");
const gameOverScreen = document.querySelector(".game-over-screen");
const gameOverScore = document.querySelector(".score-in-game-over-screen");
const startGameScreen = document.querySelector(".start-game-screen");

const cnv = document.querySelector("#cnv");
const ctx = cnv.getContext("2d");

const gw = (cnv.width = 800);
const gh = (cnv.height = 400);

const CELL = 20;

const SNAKE = {
  body: [
    { x: 7, y: 3, head: true },
    { x: 6, y: 3, head: false },
    { x: 5, y: 3, head: false },
    { x: 4, y: 3, head: false },
  ],
  go: "stop",
};

const MAPS = {
  level1: [
    { x: 29, y: 7, status: "teleport" },
    { x: 4, y: 15, status: "teleport" },
    { x: 20, y: 4 },
    { x: 21, y: 4 },
    { x: 22, y: 4 },
    { x: 23, y: 4 },
    { x: 24, y: 4 },
    { x: 25, y: 4 },
    { x: 26, y: 4 },
    { x: 27, y: 4 },
    { x: 28, y: 4 },
    { x: 29, y: 4 },
    { x: 30, y: 4 },
    { x: 31, y: 4 },
    { x: 32, y: 4 },
    { x: 20, y: 5 },
    { x: 32, y: 5 },
    { x: 20, y: 6 },
    { x: 32, y: 6 },
    { x: 20, y: 7 },
    { x: 32, y: 7 },
    { x: 20, y: 8 },
    { x: 32, y: 8 },
    { x: 20, y: 9 },
    { x: 32, y: 9 },
    { x: 20, y: 10 },
    { x: 32, y: 10 },
    { x: 20, y: 11 },
    { x: 32, y: 11 },
    { x: 20, y: 12 },
    { x: 32, y: 12 },
    { x: 20, y: 13 },
    { x: 32, y: 13 },
    { x: 20, y: 14 },
    { x: 32, y: 14 },
    { x: 20, y: 15 },
    { x: 21, y: 15 },
    { x: 22, y: 15 },
    { x: 23, y: 15 },
    { x: 24, y: 15 },
    { x: 25, y: 15 },
    { x: 26, y: 15 },
    { x: 27, y: 15 },
    { x: 28, y: 15 },
    { x: 29, y: 15 },
    { x: 30, y: 15 },
    { x: 31, y: 15 },
    { x: 32, y: 15 },
  ],
  level2: [
    { x: 1, y: 1, status: "wall" },
    { x: 2, y: 1, status: "wall" },
    { x: 1, y: 2, status: "wall" },
    { x: 2, y: 2, status: "wall" },
    { x: 38, y: 18, status: "wall" },
    { x: 37, y: 18, status: "wall" },
    { x: 38, y: 17, status: "wall" },
    { x: 37, y: 17, status: "wall" },
  ],
};

const APPLE = {
  x: Math.floor(Math.random() * (gw / CELL)),
  y: Math.floor(Math.random() * (gh / CELL)),
};

let score = 0;
let gameOver = true;

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) startGame();
  if (e.keyCode === 82) resetGame();
  if (gameOver === true) {
    return;
  } else {
    if (e.keyCode === 87 && SNAKE.go !== "down") SNAKE.go = "up";
    if (e.keyCode === 83 && SNAKE.go !== "up") SNAKE.go = "down";
    if (e.keyCode === 68 && SNAKE.go !== "left") SNAKE.go = "right";
    if (e.keyCode === 65 && SNAKE.go !== "right") SNAKE.go = "left";
    if (e.keyCode === 32) SNAKE.go = "stop";
  }
});

function drawSnake() {
  ctx.fillStyle = "grey";
  ctx.strokeStyle = "grey";
  for (let i = 0; i < SNAKE.body.length; i++) {
    if (SNAKE.body[i].head !== true) {
      ctx.fillStyle = "red";
      ctx.strokeStyle = "#e30000";
    }
    ctx.fillRect(SNAKE.body[i].x * CELL, SNAKE.body[i].y * CELL, CELL, CELL);
    ctx.strokeRect(SNAKE.body[i].x * CELL, SNAKE.body[i].y * CELL, CELL, CELL);
  }
}

function snakeStep() {
  if (SNAKE.go === "stop") return;
  let tempX = SNAKE.body[0].x;
  let tempY = SNAKE.body[0].y;

  let tempBody = { x: tempX, y: tempY, head: true };

  if (SNAKE.go === "right") tempBody.x++;
  if (SNAKE.go === "left") tempBody.x--;
  if (SNAKE.go === "down") tempBody.y++;
  if (SNAKE.go === "up") tempBody.y--;

  SNAKE.body.forEach((el) => (el.head = false));

  SNAKE.body.pop();
  SNAKE.body.unshift(tempBody);

  SNAKE.body[0].head = true;
}

function snakeCollision() {
  // границы поля
  SNAKE.body.forEach((el) => {
    if (el.x * CELL >= gw) el.x = 0;
    if (el.x < 0) el.x = gw / CELL - 1;
    if (el.y * CELL >= gh) el.y = 0;
    if (el.y < 0) el.y = gh / CELL - 1;
  });

  SNAKE.body.forEach((el, i) => {
    if (SNAKE.body[0].x === el.x && SNAKE.body[0].y === el.y && i !== 0) {
      let point = SNAKE.body.length - i;
      SNAKE.body.splice(i, point);
      score -= point;
      if (score < 0) score = 0;
      scoreOut.innerHTML = score;
    }
  });

  // столкновение со стеной
  for (let i = 0; i < MAPS.level1.length; i++) {
    if (SNAKE.body[0].x === MAPS.level1[i].x && SNAKE.body[0].y === MAPS.level1[i].y && MAPS.level1[i].status !== "teleport") {
      gameOverFunc();
    }
  }

  // телепортация
  if (MAPS.level1[0].status === "teleport" && MAPS.level1[1].status === "teleport") {
    for (let i = 0; i < SNAKE.body.length; i++) {
      if (SNAKE.body[i].x === MAPS.level1[0].x && SNAKE.body[i].y === MAPS.level1[0].y) {
        SNAKE.body[i].x = MAPS.level1[1].x;
        SNAKE.body[i].y = MAPS.level1[1].y;
      } else if (SNAKE.body[i].x === MAPS.level1[1].x && SNAKE.body[i].y === MAPS.level1[1].y) {
        SNAKE.body[i].x = MAPS.level1[0].x;
        SNAKE.body[i].y = MAPS.level1[0].y;
      }
    }
  }
}

function appleGenerate() {
  APPLE.x = Math.floor(Math.random() * (gw / CELL));
  APPLE.y = Math.floor(Math.random() * (gh / CELL));

  for (let i = 0; i < SNAKE.body.length; i++) {
    if (SNAKE.body[i].x === APPLE.x && SNAKE.body[i].y === APPLE.y) {
      appleGenerate();
    }
  }

  for (let i = 0; i < MAPS.level1.length; i++) {
    if (MAPS.level1[i].x === APPLE.x && MAPS.level1[i].y === APPLE.y) {
      appleGenerate();
    }
  }
}

function drawApple() {
  ctx.fillStyle = "green";
  ctx.fillRect(APPLE.x * CELL, APPLE.y * CELL, CELL, CELL);
}

function snakeEat() {
  if (SNAKE.body[0].x === APPLE.x && SNAKE.body[0].y === APPLE.y) {
    score++;
    scoreOut.innerHTML = score;
    appleGenerate();
    SNAKE.body.push({ x: APPLE.x, y: APPLE.y, head: false });
  }
}

function drawLevel() {
  ctx.fillStyle = "blue";
  for (let i = 0; i < MAPS.level1.length; i++) {
    if (MAPS.level1[i].status !== "teleport") {
      ctx.fillStyle = "grey";
    }
    ctx.fillRect(MAPS.level1[i].x * CELL, MAPS.level1[i].y * CELL, CELL, CELL);
  }
}

appleGenerate();
function gameLoop() {
  if (gameOver === true) return;
  cnv.width = cnv.width;

  snakeStep();
  snakeCollision();
  drawLevel();
  drawSnake();
  snakeEat();
  drawApple();
}

setInterval(() => {
  gameLoop();
}, 150);

function gameOverFunc() {
  SNAKE.go = "stop";
  gameOver = true;
  gameOverScreen.style.display = "flex";
  gameOverScore.innerHTML = "Score: " + score;
}

function startGame() {
  startGameScreen.style.display = "none";
  gameOver = false;
}

function resetGame() {
  score = 0;
  scoreOut.innerHTML = score;
  SNAKE.body = [
    { x: 7, y: 3, head: true },
    { x: 6, y: 3, head: false },
    { x: 5, y: 3, head: false },
    { x: 4, y: 3, head: false },
  ];
  SNAKE.go = "stop";
  appleGenerate();
  gameOver = false;
  gameOverScreen.style.display = "none";
}

document.querySelector("#level-gen").addEventListener("click", () => {
  document.querySelector(".generator").style.display = "block";
});

document.querySelector("#reset-game").addEventListener("click", resetGame);
