areaColor.value = COLORS.area;
colorSnakeBody.value = COLORS.snakeBody;
colorSnakeHead.value = COLORS.snakeHead;
colorApple.value = COLORS.apple;
colorWall.value = COLORS.wall;
colorTeleport.value = COLORS.teleport;
colorSnakeBodyStroke.value = COLORS.snakeStroke;
colorAppleStroke.value = COLORS.appleStroke;
colorWallStroke.value = COLORS.wallStroke;

areaColor.addEventListener("input", () => (cnv.style.backgroundColor = areaColor.value));
colorSnakeBody.addEventListener("input", () => (COLORS.snakeBody = colorSnakeBody.value));
colorSnakeHead.addEventListener("input", () => (COLORS.snakeHead = colorSnakeHead.value));
colorApple.addEventListener("input", () => (COLORS.apple = colorApple.value));
colorWall.addEventListener("input", () => (COLORS.wall = colorWall.value));
colorTeleport.addEventListener("input", () => (COLORS.teleport = colorTeleport.value));
colorSnakeBodyStroke.addEventListener("input", () => (COLORS.snakeStroke = colorSnakeBodyStroke.value));
colorAppleStroke.addEventListener("input", () => (COLORS.appleStroke = colorAppleStroke.value));
colorWallStroke.addEventListener("input", () => (COLORS.wallStroke = colorWallStroke.value));

let colorsPanelOpen = false;
colorsPanelBtn.addEventListener("click", () => {
  if (!colorsPanelOpen) {
    colorsPanel.classList.add("colors-control-open");
    colorsPanelOpen = true;
  } else {
    colorsPanel.classList.remove("colors-control-open");
    colorsPanelOpen = false;
  }
  colorsPanelBtn.blur();
});

function strokeOnOff(input, element) {
  if (input.checked) {
    element.parentElement.classList.remove("disabled");
    element.disabled = false;
  } else {
    element.parentElement.classList.add("disabled");
    element.disabled = true;
  }
}

snakeBodyStrokeCheckbox.addEventListener("input", () => strokeOnOff(snakeBodyStrokeCheckbox, colorSnakeBodyStroke));
wallStrokeCheckbox.addEventListener("input", () => strokeOnOff(wallStrokeCheckbox, colorWallStroke));
