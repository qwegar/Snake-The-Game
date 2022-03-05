const scoreOut = document.querySelector("#score"),
  gameOverScreen = document.querySelector(".game-over-screen"),
  gameOverScore = document.querySelector(".score-in-game-over-screen"),
  startGameScreen = document.querySelector(".start-game-screen")

const area = document.querySelector("#area"),
  genBtn = document.querySelector("#gen"),
  saveLevelBtn = document.querySelector("#save-level-btn"),
  loadLevelBtn = document.querySelector("#load-level-btn"),
  rstBtn = document.querySelector("#reset"),
  out = document.querySelector("#out"),
  impTeleport = document.querySelector("#teleport"),
  bigWorldCheck = document.querySelector("#big-world"),
  boxes = area.querySelectorAll(".box"),
  saveLevelsOut = document.querySelector("#save-levels"),
  saveLevelScreen = document.querySelector(".save-level-screen")


const colorsPanel = document.querySelector("#colors")
const colorsPanelBtn = document.querySelector("#color-panel-btn")


const cnv = document.querySelector("#cnv");
const ctx = cnv.getContext("2d");

const gw = (cnv.width = 800);
const gh = (cnv.height = 400);

let CELL = 20;

const SNAKE = {
  body: [
    { x: 7,y: 3,head: true },
    { x: 6,y: 3,head: false },
    { x: 5,y: 3,head: false },
    { x: 4,y: 3,head: false },
  ],
  go: "stop",
};

const COLORS = {
  area: "rgb(190, 190, 190)",
  snakeBody: "#ee3f46",
  snakeHead: "#ea4c89",
  apple: "green",
  wall: "grey",
  teleport: "blue"
}

const MAPS = {
  level1: [
    { x: 29,y: 7,status: "teleport" },
    { x: 4,y: 15,status: "teleport" },
    { x: 20,y: 4 },
    { x: 21,y: 4 },
    { x: 22,y: 4 },
    { x: 23,y: 4 },
    { x: 24,y: 4 },
    { x: 25,y: 4 },
    { x: 26,y: 4 },
    { x: 27,y: 4 },
    { x: 28,y: 4 },
    { x: 29,y: 4 },
    { x: 30,y: 4 },
    { x: 31,y: 4 },
    { x: 32,y: 4 },
    { x: 20,y: 5 },
    { x: 32,y: 5 },
    { x: 20,y: 6 },
    { x: 32,y: 6 },
    { x: 20,y: 7 },
    { x: 32,y: 7 },
    { x: 20,y: 8 },
    { x: 32,y: 8 },
    { x: 20,y: 9 },
    { x: 32,y: 9 },
    { x: 20,y: 10 },
    { x: 32,y: 10 },
    { x: 20,y: 11 },
    { x: 32,y: 11 },
    { x: 20,y: 12 },
    { x: 32,y: 12 },
    { x: 20,y: 13 },
    { x: 32,y: 13 },
    { x: 20,y: 14 },
    { x: 32,y: 14 },
    { x: 20,y: 15 },
    { x: 21,y: 15 },
    { x: 22,y: 15 },
    { x: 23,y: 15 },
    { x: 24,y: 15 },
    { x: 25,y: 15 },
    { x: 26,y: 15 },
    { x: 27,y: 15 },
    { x: 28,y: 15 },
    { x: 29,y: 15 },
    { x: 30,y: 15 },
    { x: 31,y: 15 },
    { x: 32,y: 15 },
  ],
  level2: [
    { x: 1,y: 1,status: "wall" },
    { x: 2,y: 1,status: "wall" },
    { x: 1,y: 2,status: "wall" },
    { x: 2,y: 2,status: "wall" },
    { x: 38,y: 18,status: "wall" },
    { x: 37,y: 18,status: "wall" },
    { x: 38,y: 17,status: "wall" },
    { x: 37,y: 17,status: "wall" },
  ],
};

const APPLE = {
  x: Math.floor(Math.random() * (gw / CELL)),
  y: Math.floor(Math.random() * (gh / CELL)),
  radius: 10
};



const areaColor = document.querySelector('#area-color')
const colorSnakeBody = document.querySelector('#snake-body-color')
const colorSnakeHead = document.querySelector('#snake-head-color')
const colorApple = document.querySelector('#apple-color')
const colorWall = document.querySelector('#wall-color')
const colorTeleport = document.querySelector('#teleport-color')

areaColor.addEventListener('input',() => cnv.style.backgroundColor = areaColor.value)
colorSnakeBody.addEventListener('input',() => COLORS.snakeBody = colorSnakeBody.value)
colorSnakeHead.addEventListener('input',() => COLORS.snakeHead = colorSnakeHead.value)
colorApple.addEventListener('input',() => COLORS.apple = colorApple.value)
colorWall.addEventListener('input',() => COLORS.wall = colorWall.value)
colorTeleport.addEventListener('input',() => COLORS.teleport = colorTeleport.value)

let colorsPanelOpen = false
colorsPanelBtn.addEventListener('click',() => {
  if (!colorsPanelOpen) {
    colorsPanel.classList.add('colors-control-open')
    colorsPanelOpen = true
  } else {
    colorsPanel.classList.remove('colors-control-open')
    colorsPanelOpen = false
  }
})