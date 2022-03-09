let score = 0;
let gameOver = true;

startGameScreen.addEventListener("click",() => startGame());
document.addEventListener("keydown",(e) => {
  if (e.keyCode === 13) startGame();
  if (e.keyCode === 82) resetGame();
  if (gameOver === true) {
    return;
  } else {
    if ((e.keyCode === 87 && SNAKE.go !== "down") || (e.keyCode === 38 && SNAKE.go !== "down")) {
      SNAKE.go = "up";
      if (colorsPanelOpen) colorsPanelCloseFunc()
    }
    if ((e.keyCode === 83 && SNAKE.go !== "up") || (e.keyCode === 40 && SNAKE.go !== "up")) {
      SNAKE.go = "down";
      if (colorsPanelOpen) colorsPanelCloseFunc()
    }
    if ((e.keyCode === 68 && SNAKE.go !== "left") || (e.keyCode === 39 && SNAKE.go !== "left")) {
      SNAKE.go = "right";
      if (colorsPanelOpen) colorsPanelCloseFunc()
    }
    if ((e.keyCode === 65 && SNAKE.go !== "right") || (e.keyCode === 37 && SNAKE.go !== "right")) {
      SNAKE.go = "left";
    }
    if (e.keyCode === 32) {
      SNAKE.go = "stop";
      if (colorsPanelOpen) colorsPanelCloseFunc()
    }
  }
});

function drawSnake() {
  ctx.fillStyle = COLORS.snakeHead;
  ctx.strokeStyle = COLORS.snakeStroke;
  for (let i = 0; i < SNAKE.body.length; i++) {
    if (SNAKE.body[i].head !== true) {
      ctx.fillStyle = COLORS.snakeBody;
    }
    ctx.fillRect(SNAKE.body[i].x * CELL,SNAKE.body[i].y * CELL,CELL,CELL);
    if (!colorSnakeBodyStroke.disabled) ctx.strokeRect(SNAKE.body[i].x * CELL,SNAKE.body[i].y * CELL,CELL,CELL);
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

  // столкновение с хвостом
  SNAKE.body.forEach((el,i) => {
    if (SNAKE.body[0].x === el.x && SNAKE.body[0].y === el.y && i !== 0) {
      let point = SNAKE.body.length - i;
      SNAKE.body.splice(i,point);
      score -= point;
      if (score < 0) score = 0;
      scoreOut.innerHTML = score;

      if (life > 0) lostTail();
      if (life === 0) gameOverFunc();
      life--;
      if (life < 0) life = 0;
      lifeOut.innerHTML = life;
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

function lostTail() {
  document.querySelector("#dead-screen").style.display = "flex";
  setInterval(() => (document.querySelector("#dead-screen").style.display = "none"),150);
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
  ctx.strokeStyle = COLORS.appleStroke;

  if (eatForm.checked) {
    ctx.arc(APPLE.x * CELL + CELL / 2,APPLE.y * CELL + CELL / 2,APPLE.radius,0,Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(APPLE.x * CELL,APPLE.y * CELL,CELL,CELL);
  }

  if (!colorAppleStroke.disabled && eatForm.checked) ctx.stroke();
  if (!colorAppleStroke.disabled && !eatForm.checked) ctx.strokeRect(APPLE.x * CELL,APPLE.y * CELL,CELL,CELL);
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
  ctx.strokeStyle = COLORS.teleport;
  for (let i = 0; i < MAPS.level1.length; i++) {
    if (MAPS.level1[i].status !== "teleport") {
      ctx.fillStyle = COLORS.wall;
      if (!colorWallStroke.disabled) ctx.strokeStyle = COLORS.wallStroke;
    }
    ctx.fillRect(MAPS.level1[i].x * CELL,MAPS.level1[i].y * CELL,CELL,CELL);
    if (!colorWallStroke.disabled) ctx.strokeRect(MAPS.level1[i].x * CELL,MAPS.level1[i].y * CELL,CELL,CELL);
  }
}

appleGenerate();

function gameLoop() {
  if (gameOver === true) return;
  cnv.width = cnv.width;
  cnv.style.backgroundColor = COLORS.area

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
  life = 0;
  lifeOut.innerHTML = life;
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
  life = 3;
  lifeOut.innerHTML = life;
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
  document.querySelector("#reset-game").blur();
}

document.querySelector("#level-gen").addEventListener("click",() => {
  document.querySelector(".generator").style.display = "block";
  if (colorsPanelOpen) colorsPanelCloseFunc()
});

document.querySelector("#reset-game").addEventListener("click",() => {
  resetGame()
  if (colorsPanelOpen) colorsPanelCloseFunc()
});
