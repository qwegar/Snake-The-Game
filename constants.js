// Status Bar

const scoreOut = document.querySelector("#score");
const lifeOut = document.querySelector("#life");
const colorsPanelBtn = document.querySelector("#color-panel-btn");

// Screens

const gameOverScreen = document.querySelector(".game-over-screen");
const gameOverScore = document.querySelector(".score-in-game-over-screen");
const startGameScreen = document.querySelector(".start-game-screen");

// Colors Settings

const areaColor = document.querySelector("#area-color");
const colorSnakeBody = document.querySelector("#snake-body-color");
const colorSnakeBodyStroke = document.querySelector("#snake-body-stroke-color");
const colorSnakeHead = document.querySelector("#snake-head-color");
const colorAppleStroke = document.querySelector("#apple-stroke-color");
const colorApple = document.querySelector("#apple-color");
const colorWall = document.querySelector("#wall-color");
const colorWallStroke = document.querySelector("#wall-stroke-color");
const colorTeleport = document.querySelector("#teleport-color");

const appleStrokeCheckbox = document.querySelector("#apple-stroke");
const snakeBodyStrokeCheckbox = document.querySelector("#snake-body-stroke");
const wallStrokeCheckbox = document.querySelector("#wall-stroke");

const eatForm = document.querySelector("#eat-form");

const colorsPanel = document.querySelector("#colors");

appleStrokeCheckbox.addEventListener("input", () => strokeOnOff(appleStrokeCheckbox, colorAppleStroke));

// Generator Levels

const area = document.querySelector("#area");
const genBtn = document.querySelector("#gen");
const saveLevelBtn = document.querySelector("#save-level-btn");
const deleteSelectedLevelsBtn = document.querySelector("#delete-selected-levels-btn");
const deleteAllLevelsBtn = document.querySelector("#delete-all-levels-btn");
const rstBtn = document.querySelector("#reset");
const out = document.querySelector("#out");
const impTeleport = document.querySelector("#teleport");
const bigWorldCheck = document.querySelector("#big-world");
const boxes = area.querySelectorAll(".box");
const saveLevelScreen = document.querySelector(".save-level-screen");

let saveLevelsOut = document.querySelector("#save-levels-out");

// Game

const cnv = document.querySelector("#cnv");
const ctx = cnv.getContext("2d");

const gw = (cnv.width = 800);
const gh = (cnv.height = 400);

let CELL = 20;
let life = 3;

const SNAKE = {
  body: [
    { x: 7, y: 3, head: true },
    { x: 6, y: 3, head: false },
    { x: 5, y: 3, head: false },
    { x: 4, y: 3, head: false },
  ],
  go: "stop",
};

const COLORS = {
  area: "#372e51",
  snakeBody: "#ee3f46",
  snakeHead: "#ea4c89",
  apple: "#008000",
  wall: "#808080",
  teleport: "#0000ff",
  snakeStroke: "#bd0000",
  appleStroke: "#005100",
  wallStroke: "#5c5c5c",
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
  radius: 10,
};
