let tempTeleport = [];

function genLevel(Cube) {
  for (let y = 0; y < gh / Cube; y++) {
    for (let x = 0; x < gw / Cube; x++) {
      let div = document.createElement("div");
      div.classList.add("box");

      if (x === 7 && y === 3) div.classList.add("snake-gen-point");
      if (x === 6 && y === 3) div.classList.add("snake-gen-point");
      if (x === 5 && y === 3) div.classList.add("snake-gen-point");
      if (x === 4 && y === 3) div.classList.add("snake-gen-point");

      div.setAttribute("data-x",x);
      div.setAttribute("data-y",y);
      area.append(div);
    }
  }
}
genLevel(CELL)

let keyPress = false;
let tempLevel = [];
let tempLevelSave = {};

document.addEventListener("keydown",(e) => {
  if (e.keyCode === 17) keyPress = true;
});

document.addEventListener("keyup",(e) => {
  if (e.keyCode === 17) keyPress = false;
});

document.addEventListener("mousedown",(e) => {
  //e.preventDefault();
  keyPress = true;
});

document.addEventListener("mouseup",(e) => {
  keyPress = false;
});

area.addEventListener("mouseover",(e) => {
  if (e.target.classList.contains("box") && keyPress) {
    mouseOverBox(e);
  }
});
area.addEventListener("click",(e) => {
  if (e.target.classList.contains("box")) {
    mouseOverBox(e);
  }
});

genBtn.addEventListener("click",generate);
rstBtn.addEventListener("click",resetGenerator);

function mouseOverBox(e) {
  if (e.target.classList.contains("snake-gen-point")) return;
  if (impTeleport.checked) {
    if (!e.target.classList.contains("teleport")) {
      e.target.classList.add("teleport");
    } else {
      e.target.classList.remove("black");
    }

    if (tempTeleport.length < 2) {
      tempTeleport.push({
        x: e.target.getAttribute("data-x"),
        y: e.target.getAttribute("data-y"),
      });
    } else {
      let boxes = area.querySelectorAll(".box");
      boxes.forEach((el) => {
        if (el.getAttribute("data-x") === tempTeleport[0].x && el.getAttribute("data-y") === tempTeleport[0].y) el.classList.remove("teleport");
      });

      tempTeleport.shift();
      tempTeleport.push({
        x: e.target.getAttribute("data-x"),
        y: e.target.getAttribute("data-y"),
      });
    }
  } else {
    if (!e.target.classList.contains("black")) {
      e.target.classList.add("black");
    } else {
      e.target.classList.remove("black");
    }
  }
}

function generate() {
  let boxes = area.querySelectorAll(".box");
  boxes.forEach((el) => {
    if (el.classList.contains("teleport")) {
      el.classList.remove("black");
      tempLevel.push({
        x: +el.getAttribute("data-x"),
        y: +el.getAttribute("data-y"),
        status: "teleport",
      });
    }
  });

  boxes.forEach((el) => {
    if (el.classList.contains("black")) {
      tempLevel.push({
        x: +el.getAttribute("data-x"),
        y: +el.getAttribute("data-y"),
      });
    }
  });
  resetGame();
  if (tempLevel.length === 0) {
    tempLevel = [
      { x: -1,y: -1 },
      { x: -2,y: -2 },
    ];
  }
  MAPS.level1 = tempLevel;

  document.querySelector(".generator").style.display = "none";
  tempLevel = [];

  appleGenerate();
}

function resetGenerator() {
  let boxes = area.querySelectorAll(".box");
  boxes.forEach((el) => {
    if (el.classList.contains("black") || el.classList.contains("teleport")) {
      el.classList.remove("black");
      el.classList.remove("teleport");
    }
  });
  impTeleport.checked = false;
}

function bigWorldOn() {
  area.innerHTML = ''
  CELL = 10
  APPLE.radius = CELL / 2

  genLevel(CELL)

  area.style.gridTemplateColumns = "repeat(80, 10px)";
  document.querySelectorAll('.box').forEach(el => {
    el.style.width = "10px";
    el.style.height = "10px";
  })
}

function bigWorldOff() {
  area.innerHTML = ''
  CELL = 20
  APPLE.radius = CELL / 2

  genLevel(CELL)

  area.style.gridTemplateColumns = "repeat(40, 20px)";
  document.querySelectorAll('.box').forEach(el => {
    el.style.width = "20px";
    el.style.height = "20px";
  })
}

function saveLevelStart() {
  let boxes = area.querySelectorAll(".box");
  boxes.forEach((el) => {
    if (el.classList.contains("teleport")) {
      el.classList.remove("black");
      tempLevel.push({
        x: +el.getAttribute("data-x"),
        y: +el.getAttribute("data-y"),
        status: "teleport",
      });
    }
  });

  boxes.forEach((el) => {
    if (el.classList.contains("black")) {
      tempLevel.push({
        x: +el.getAttribute("data-x"),
        y: +el.getAttribute("data-y"),
      });
    }
  });

  if (tempLevel.length === 0) {
    tempLevel = [
      { x: -1,y: -1 },
      { x: -2,y: -2 },
    ];
  }

  saveLevelScreen.style.display = 'flex'




  let jsonLevel = JSON.stringify(tempLevel)

  localStorage.setItem('Level-Name',jsonLevel)
  console.log(tempLevel)

  saveLevelsOut.innerHTML = 'jsonLevel'


  tempLevel = []
}




function saveLevelEnd() {
  let levelName = document.querySelector('#save-level-name-input').value
  tempLevelSave = {
    Name: levelName,
    Level: tempLevel
  }


  saveLevelScreen.style.display = 'flex'
}





document.querySelector('#save-level-name-btn').onclick = () => {
  console.log(levelName)
  saveLevelScreen.style.display = 'none'
}

saveLevelBtn.addEventListener('click',saveLevelStart)

bigWorldCheck.addEventListener('input',() => bigWorldCheck.checked ? bigWorldOn() : bigWorldOff())

// Integration

document.querySelector(".generator-close").addEventListener("click",() => document.querySelector(".generator").style.display = "none");
