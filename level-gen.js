chechSavesLevels();

if (localStorage.getItem("save-levels") !== null) deleteAllLevelsBtn.disabled = false;

let tempTeleport = [];

function genLevel(cube) {
  for (let y = 0; y < gh / cube; y++) {
    for (let x = 0; x < gw / cube; x++) {
      let div = document.createElement("div");
      div.classList.add("box");

      if (x === 7 && y === 3) div.classList.add("snake-gen-point");
      if (x === 6 && y === 3) div.classList.add("snake-gen-point");
      if (x === 5 && y === 3) div.classList.add("snake-gen-point");
      if (x === 4 && y === 3) div.classList.add("snake-gen-point");

      div.setAttribute("data-x", x);
      div.setAttribute("data-y", y);
      area.append(div);
    }
  }
}
genLevel(CELL);

let keyPress = false;
let tempLevel = [];
let tempLevelSave = {};
let allLocalSaveLevels = [];

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 17) keyPress = true;
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 17) keyPress = false;
});

document.addEventListener("mousedown", () => (keyPress = true));
document.addEventListener("mouseup", () => (keyPress = false));

area.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("box") && keyPress) mouseOverBox(e);
});

area.addEventListener("click", (e) => {
  if (e.target.classList.contains("box")) mouseOverBox(e);
});

area.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("box")) e.preventDefault();
});

genBtn.addEventListener("click", generate);
rstBtn.addEventListener("click", resetGenerator);

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
      { x: -1, y: -1 },
      { x: -2, y: -2 },
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
  area.innerHTML = "";
  CELL = 10;
  APPLE.radius = CELL / 2;

  genLevel(CELL);

  area.style.gridTemplateColumns = "repeat(80, 10px)";
  document.querySelectorAll(".box").forEach((el) => {
    el.style.width = "10px";
    el.style.height = "10px";
  });
}

function bigWorldOff() {
  area.innerHTML = "";
  CELL = 20;
  APPLE.radius = CELL / 2;

  genLevel(CELL);

  area.style.gridTemplateColumns = "repeat(40, 20px)";
  document.querySelectorAll(".box").forEach((el) => {
    el.style.width = "20px";
    el.style.height = "20px";
  });
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
      { x: -1, y: -1 },
      { x: -2, y: -2 },
    ];
  }

  saveLevelScreen.style.display = "flex";

  let inputName = document.querySelector("#save-level-name-input");

  inputName.addEventListener("input", () => {
    inputName.value !== "" ? (document.querySelector("#save-level-name-btn").disabled = false) : (document.querySelector("#save-level-name-btn").disabled = true);
  });

  inputName.value = "";
  inputName.focus();
}

function saveLevelEnd() {
  allLocalSaveLevels = [];
  let levelName = document.querySelector("#save-level-name-input").value;
  tempLevelSave = {
    name: levelName,
    level: tempLevel,
  };

  if (localStorage.getItem("save-levels") !== null) {
    let savedLevels = JSON.parse(localStorage.getItem("save-levels"));
    savedLevels.forEach((el) => {
      allLocalSaveLevels.push(el);
    });
  }

  allLocalSaveLevels.push(tempLevelSave);

  saveLevelScreen.style.display = "none";

  saveLevelsOut.innerHTML = "";

  allLocalSaveLevels.forEach((el) => {
    let span = document.createElement("span");
    saveLevelsOut.appendChild(span);
    span.classList.add("saved-level");
    span.innerHTML = el.name;
  });

  exportInLocalStorage(allLocalSaveLevels);
  tempLevel = [];

  deleteAllLevelsBtn.disabled = false;
}

function chechSavesLevels() {
  if (localStorage.getItem("save-levels") === null) {
    return;
  } else {
    let savedLevels = JSON.parse(localStorage.getItem("save-levels"));
    savedLevels.forEach((el) => {
      saveLevelsOut.innerHTML += `
      <span class="saved-level">${el.name}</span>
      `;
    });
  }
}

function exportInLocalStorage(obj) {
  localStorage.setItem("save-levels", JSON.stringify(obj));
}

function importInLocalStorage() {
  JSON.parse(localStorage.getItem("Save Levels"));
}

function loadLevelClick(e) {
  if (e.target.classList.contains("saved-level")) {
    let allLevels = JSON.parse(localStorage.getItem("save-levels"));
    let boxes = area.querySelectorAll(".box");

    boxes.forEach((el) => {
      el.classList.remove("teleport");
      el.classList.remove("black");
    });

    tempLoadLevel = [];
    allLevels.forEach((el, i) => {
      if (e.target.innerHTML === el.name) {
        tempLoadLevel = el.level;
      }
    });

    tempLoadLevel.forEach((el) => {
      for (let b = 0; b < boxes.length; b++) {
        if (+boxes[b].getAttribute("data-x") === +el.x && +boxes[b].getAttribute("data-y") === +el.y && el.status === "teleport") {
          boxes[b].classList.add("teleport");
        } else if (+boxes[b].getAttribute("data-x") === +el.x && +boxes[b].getAttribute("data-y") === +el.y) {
          boxes[b].classList.add("black");
        }
      }
    });
  }
}

function deleteAllSavedLevels() {
  if (localStorage.getItem("save-levels") !== null) {
    localStorage.removeItem("save-levels");
    saveLevelsOut.innerHTML = "";
    allLocalSaveLevels = [];
  } else {
    return;
  }
  deleteAllLevelsBtn.disabled = true;
  deleteSelectedLevelsBtn.disabled = true;
}

function deleteSelectedLevels() {
  let selectedLevelsArr = [];
  let selectedLevels = saveLevelsOut.querySelectorAll(".saved-level-checked");
  selectedLevels.forEach((el) => selectedLevelsArr.push(el.innerHTML));

  let localStorageLevels = JSON.parse(localStorage.getItem("save-levels"));
  console.log(selectedLevelsArr);
  console.log(localStorageLevels);

  localStorageLevels.forEach((localName, i) => {
    selectedLevelsArr.forEach((innerName) => {
      if (localName.name === innerName) {
        localStorageLevels.splice(i, 1);
      }
    });
  });

  localStorage.removeItem("save-levels");
  localStorage.setItem("save-levels", JSON.stringify(localStorageLevels));

  saveLevelsOut.innerHTML = "";

  chechSavesLevels();

  if (saveLevelsOut.innerHTML === "") {
    localStorage.removeItem("save-levels");
    deleteAllLevelsBtn.disabled = true;
  }

  deleteSelectedLevelsBtn.disabled = true;

  //console.log(localStorageLevels);
}

function selectedLevels(e) {
  if (e.target.classList.contains("saved-level")) {
    e.preventDefault();
    if (!e.target.classList.contains("saved-level-checked")) {
      e.target.classList.add("saved-level-checked");
    } else {
      e.target.classList.remove("saved-level-checked");
    }
    let selectedLevelsArr = [];
    let selectedLevels = saveLevelsOut.querySelectorAll(".saved-level-checked");
    selectedLevels.forEach((el) => selectedLevelsArr.push(el.innerHTML));
    if (selectedLevelsArr.length === 0) {
      deleteSelectedLevelsBtn.disabled = true;
    } else {
      deleteSelectedLevelsBtn.disabled = false;
    }
  }
}

saveLevelsOut.addEventListener("contextmenu", selectedLevels);
saveLevelsOut.addEventListener("click", loadLevelClick);
deleteSelectedLevelsBtn.addEventListener("click", deleteSelectedLevels);
deleteAllLevelsBtn.addEventListener("click", deleteAllSavedLevels);

document.querySelector("#save-level-name-btn").onclick = () => {
  saveLevelEnd();
};

saveLevelBtn.addEventListener("click", saveLevelStart);

bigWorldCheck.addEventListener("input", () => (bigWorldCheck.checked ? bigWorldOn() : bigWorldOff()));

// Integration

document.querySelector(".generator-close").addEventListener("click", () => (document.querySelector(".generator").style.display = "none"));
document.querySelector("#save-level-close-btn").addEventListener("click", () => (saveLevelScreen.style.display = "none"));
