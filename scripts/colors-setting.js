areaColor.value = COLORS.area;
colorSnakeBody.value = COLORS.snakeBody;
colorSnakeHead.value = COLORS.snakeHead;
colorApple.value = COLORS.apple;
colorWall.value = COLORS.wall;
colorTeleport.value = COLORS.teleport;
colorSnakeBodyStroke.value = COLORS.snakeStroke;
colorAppleStroke.value = COLORS.appleStroke;
colorWallStroke.value = COLORS.wallStroke;

areaColor.addEventListener("input",() => (COLORS.area = areaColor.value));
colorSnakeBody.addEventListener("input",() => (COLORS.snakeBody = colorSnakeBody.value));
colorSnakeHead.addEventListener("input",() => (COLORS.snakeHead = colorSnakeHead.value));
colorApple.addEventListener("input",() => (COLORS.apple = colorApple.value));
colorWall.addEventListener("input",() => (COLORS.wall = colorWall.value));
colorTeleport.addEventListener("input",() => (COLORS.teleport = colorTeleport.value));
colorSnakeBodyStroke.addEventListener("input",() => (COLORS.snakeStroke = colorSnakeBodyStroke.value));
colorAppleStroke.addEventListener("input",() => (COLORS.appleStroke = colorAppleStroke.value));
colorWallStroke.addEventListener("input",() => (COLORS.wallStroke = colorWallStroke.value));

let colorsPanelOpen = false;
colorsPanelBtn.addEventListener("click",() => {
  if (!colorsPanelOpen) {
    colorsPanelOpenFunc()
  } else {
    colorsPanelCloseFunc()
  }
});

function colorsPanelOpenFunc() {
  colorsPanel.classList.add("colors-control-open");
  colorsPanelOpen = true;
  colorsPanelBtn.blur();
}

function colorsPanelCloseFunc() {
  colorsPanel.classList.remove("colors-control-open");
  colorsPanelOpen = false;
  colorsPanelBtn.blur();
}

function strokeOnOff(input,element) {
  if (input.checked) {
    element.parentElement.classList.remove("disabled");
    element.disabled = false;
  } else {
    element.parentElement.classList.add("disabled");
    element.disabled = true;
  }
}

function selectThemeColors() {
  if (colorThemeInput.value === 'neo') {
    COLORS.apple = "#000000"
    COLORS.appleStroke = "#00ff00"
    COLORS.area = "#000000"
    COLORS.snakeBody = "#000000"
    COLORS.snakeHead = "#000000"
    COLORS.snakeStroke = "#c8ff00"
    COLORS.teleport = "#1b00e6"
    COLORS.wall = "#000000"
    COLORS.wallStroke = "#ffffff"

    appleStrokeCheckbox.checked = true
    snakeBodyStrokeCheckbox.checked = true
    wallStrokeCheckbox.checked = true

    colorSnakeBodyStroke.disabled = false
    colorAppleStroke.disabled = false
    colorWallStroke.disabled = false

    colorSnakeBodyStroke.parentElement.classList.remove("disabled")
    colorAppleStroke.parentElement.classList.remove("disabled")
    colorWallStroke.parentElement.classList.remove("disabled")

    eatForm.checked = false
  }

  if (colorThemeInput.value === 'one') {
    COLORS.apple = "#008000"
    COLORS.appleStroke = "#005100"
    COLORS.area = "#372e51"
    COLORS.snakeBody = "#ee3f46"
    COLORS.snakeHead = "#ea4c89"
    COLORS.snakeStroke = "#bd0000"
    COLORS.teleport = "#0000ff"
    COLORS.wall = "#808080"
    COLORS.wallStroke = "#5c5c5c"

    appleStrokeCheckbox.checked = false
    snakeBodyStrokeCheckbox.checked = false
    wallStrokeCheckbox.checked = false

    colorSnakeBodyStroke.disabled = true
    colorAppleStroke.disabled = true
    colorWallStroke.disabled = true

    colorSnakeBodyStroke.parentElement.classList.add("disabled")
    colorAppleStroke.parentElement.classList.add("disabled")
    colorWallStroke.parentElement.classList.add("disabled")

    eatForm.checked = false
  }

  if (colorThemeInput.value === 'wth') {
    COLORS.apple = "#f4712a"
    COLORS.appleStroke = "#005100"
    COLORS.area = "#ffffff"
    COLORS.snakeBody = "#d4d4d4"
    COLORS.snakeHead = "#b5b5b5"
    COLORS.snakeStroke = "#bd0000"
    COLORS.teleport = "#6dd2df"
    COLORS.wall = "#a6a6a6"
    COLORS.wallStroke = "#5c5c5c"

    appleStrokeCheckbox.checked = false
    snakeBodyStrokeCheckbox.checked = false
    wallStrokeCheckbox.checked = false

    colorSnakeBodyStroke.disabled = true
    colorAppleStroke.disabled = true
    colorWallStroke.disabled = true

    colorSnakeBodyStroke.parentElement.classList.add("disabled")
    colorAppleStroke.parentElement.classList.add("disabled")
    colorWallStroke.parentElement.classList.add("disabled")

    eatForm.checked = true
  }

  if (colorThemeInput.value === 'glo') {
    COLORS.apple = "#f0f42a"
    COLORS.appleStroke = "#005100"
    COLORS.area = "#ffc0cd"
    COLORS.snakeBody = "#f50ad9"
    COLORS.snakeHead = "#cb01f4"
    COLORS.snakeStroke = "#bd0000"
    COLORS.teleport = "#ff1a1a"
    COLORS.wall = "#046daf"
    COLORS.wallStroke = "#00d9ff"

    appleStrokeCheckbox.checked = false
    snakeBodyStrokeCheckbox.checked = false
    wallStrokeCheckbox.checked = true

    colorSnakeBodyStroke.disabled = true
    colorAppleStroke.disabled = true
    colorWallStroke.disabled = false

    colorSnakeBodyStroke.parentElement.classList.add("disabled")
    colorAppleStroke.parentElement.classList.add("disabled")
    colorWallStroke.parentElement.classList.remove("disabled")

    eatForm.checked = true
  }

  if (colorThemeInput.value === 'ngh') {
    COLORS.apple = "#ff8614"
    COLORS.appleStroke = "#00ff00"
    COLORS.area = "#000000"
    COLORS.snakeBody = "#d1d1d1"
    COLORS.snakeHead = "#b5b5b5"
    COLORS.snakeStroke = "#c8ff00"
    COLORS.teleport = "#c13ea4"
    COLORS.wall = "#a8320b"
    COLORS.wallStroke = "#000000"

    appleStrokeCheckbox.checked = false
    snakeBodyStrokeCheckbox.checked = false
    wallStrokeCheckbox.checked = true

    colorSnakeBodyStroke.disabled = true
    colorAppleStroke.disabled = true
    colorWallStroke.disabled = false

    colorSnakeBodyStroke.parentElement.classList.add("disabled")
    colorAppleStroke.parentElement.classList.add("disabled")
    colorWallStroke.parentElement.classList.remove("disabled")

    eatForm.checked = true
  }

  if (colorThemeInput.value === 'pur') {
    COLORS.apple = "#bd1aea"
    COLORS.appleStroke = "#000000"
    COLORS.area = "#bb00e0"
    COLORS.snakeBody = "#7b1cba"
    COLORS.snakeHead = "#6c0481"
    COLORS.snakeStroke = "#bd0000"
    COLORS.teleport = "#a00352"
    COLORS.wall = "#060b93"
    COLORS.wallStroke = "#00d9ff"

    appleStrokeCheckbox.checked = true
    snakeBodyStrokeCheckbox.checked = false
    wallStrokeCheckbox.checked = false

    colorSnakeBodyStroke.disabled = true
    colorAppleStroke.disabled = false
    colorWallStroke.disabled = true

    colorSnakeBodyStroke.parentElement.classList.add("disabled")
    colorAppleStroke.parentElement.classList.remove("disabled")
    colorWallStroke.parentElement.classList.add("disabled")

    eatForm.checked = false
  }

  areaColor.value = COLORS.area
  colorSnakeBody.value = COLORS.snakeBody
  colorSnakeHead.value = COLORS.snakeHead
  colorSnakeBodyStroke.value = COLORS.snakeStroke
  colorAppleStroke.value = COLORS.appleStroke
  colorApple.value = COLORS.apple
  colorWall.value = COLORS.wall
  colorWallStroke.value = COLORS.wallStroke
  colorTeleport.value = COLORS.teleport

  colorThemeInput.blur()
}

let colorThemeInput = document.querySelector('#color-theme')
colorThemeInput.addEventListener('input',selectThemeColors)
snakeBodyStrokeCheckbox.addEventListener("input",() => strokeOnOff(snakeBodyStrokeCheckbox,colorSnakeBodyStroke));
wallStrokeCheckbox.addEventListener("input",() => strokeOnOff(wallStrokeCheckbox,colorWallStroke));
