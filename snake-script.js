let score = 0;
let gameOver = true;

startGameScreen.addEventListener('click',() => startGame())
document.addEventListener("keydown",(e) => {
  //e.preventDefault();
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
  ctx.fillStyle = COLORS.snakeHead;
  //ctx.strokeStyle = "#ee3f46";
  for (let i = 0; i < SNAKE.body.length; i++) {
    if (SNAKE.body[i].head !== true) {
      ctx.fillStyle = COLORS.snakeBody;
      //ctx.strokeStyle = "#ea4c89";
    }
    ctx.fillRect(SNAKE.body[i].x * CELL,SNAKE.body[i].y * CELL,CELL,CELL);
    ctx.strokeRect(SNAKE.body[i].x * CELL,SNAKE.body[i].y * CELL,CELL,CELL);
  }
}

function snakeStep() {
  if (SNAKE.go === "stop") return;
  let tempX = SNAKE.body[0].x;
  let tempY = SNAKE.body[0].y;

  let tempBody = { x: tempX,y: tempY,head: true };

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

  SNAKE.body.forEach((el,i) => {
    if (SNAKE.body[0].x === el.x && SNAKE.body[0].y === el.y && i !== 0) {
      let point = SNAKE.body.length - i;
      SNAKE.body.splice(i,point);
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
  ctx.fillStyle = COLORS.apple;
  //ctx.fillRect(APPLE.x * CELL,APPLE.y * CELL,CELL,CELL);
  ctx.arc((APPLE.x * CELL) + (CELL / 2),(APPLE.y * CELL) + (CELL / 2),APPLE.radius,0,Math.PI * 2)
  //ctx.arc(150,75,50,0,2 * Math.PI,false)
  ctx.fill()
}

function snakeEat() {
  if (SNAKE.body[0].x === APPLE.x && SNAKE.body[0].y === APPLE.y) {
    score++;
    scoreOut.innerHTML = score;
    appleGenerate();
    SNAKE.body.push({ x: APPLE.x,y: APPLE.y,head: false });
  }
}

function drawLevel() {
  ctx.fillStyle = COLORS.teleport;
  for (let i = 0; i < MAPS.level1.length; i++) {
    if (MAPS.level1[i].status !== "teleport") {
      ctx.fillStyle = COLORS.wall;
    }
    ctx.fillRect(MAPS.level1[i].x * CELL,MAPS.level1[i].y * CELL,CELL,CELL);
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
},150);

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
    { x: 7,y: 3,head: true },
    { x: 6,y: 3,head: false },
    { x: 5,y: 3,head: false },
    { x: 4,y: 3,head: false },
  ];
  SNAKE.go = "stop";
  appleGenerate();
  gameOver = false;
  gameOverScreen.style.display = "none";
}

document.querySelector("#level-gen").addEventListener("click",() => {
  document.querySelector(".generator").style.display = "block";
});

document.querySelector("#reset-game").addEventListener("click",resetGame);
