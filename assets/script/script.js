// Initial Data

const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

let board = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};

let player = "";

let result = "";

let playing = false;

// Functions

reset = () => {
  result = "";
  let random = Math.floor(Math.random() * 2);
  player = random === 0 ? "X" : "O";
  for (let i in board) {
    board[i] = "";
  }
  playing = true;
  renderBoard();
  renderInfo();
};

renderBoard = () => {
  for (let i in board) {
    let item = qS(`[data-item=${i}]`);
    item.innerHTML = board[i];
  }
  checkGame();
};

renderInfo = () => {
  qS(".infocorpo.vez").innerHTML = player;
  qS(".infocorpo.resultado").innerHTML = result;
};

itemClick = (event) => {
  let item = event.target.getAttribute("data-item");
  if (playing && board[item] === "") {
    board[item] = player;
    renderBoard();
    togglePlayer();
  }
};

togglePlayer = () => {
  player = player === "X" ? "O" : "X";
  renderInfo();
};

checkGame = () => {
  if (checkWinnerFor("X")) {
    result = "Vencedor: 'X'";
    playing = false;
  } else if (checkWinnerFor("O")) {
    result = "Vencedor: 'O'";
    playing = false;
  } else if (isFull()) {
    result = "Empate";
    playing = false;
  }
};

checkWinnerFor = (player) => {
  let possibilities = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",
    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",
    "a1,b2,c3",
    "a3,b2,c1",
  ];
  for (let y in possibilities) {
    let pArray = possibilities[y].split(",");
    let win = pArray.every((option) => board[option] === player);
    if (win) {
      return true;
    }
  }
  return false;
};

isFull = () => {
  for (let i in board) {
    if (board[i] === "") {
      return false;
    }
  }
  return true;
};

// Events

qS(".reset").addEventListener("click", reset);
qSAll("[data-item]").forEach((item) => {
  item.addEventListener("click", itemClick);
});

// Start Game

reset();
