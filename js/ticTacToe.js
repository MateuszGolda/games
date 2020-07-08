const status = document.querySelector(".turn");
const reset = document.querySelector(".reset");
const cells = document.querySelectorAll(".cell");

const xSymbol = "×";
const oSymbol = "○";

let isGameLive = true;
let isNextX = true;
let winner = null;

// const letterToSymbol = (letter) => letter === "X" ? xSymbol : oSymbol;
function letterToSymbol(letter) {
    return letter === "X" ? xSymbol : oSymbol;
}

const handleWin = (letter) => {
    isGameLive = false;
    winner = letter;
    winner === "X" ? status.innerHTML = `<span>${letterToSymbol(winner)} is winner!</span>`: 
                     status.innerHTML = `<span>${letterToSymbol(winner)} is winner!</span>`;
}

const checkGameStatus = () => {
    const topLeft = cells[0].classList[1];
    const topMiddle = cells[1].classList[1];
    const topRight = cells[2].classList[1];
    const middleLeft = cells[3].classList[1];
    const middleMiddle = cells[4].classList[1];
    const middleRight = cells[5].classList[1];
    const bottomLeft = cells[6].classList[1];
    const bottomMiddle = cells[7].classList[1];
    const bottomRight = cells[8].classList[1];

    if (topLeft && topLeft === topMiddle && topLeft === topRight) {   
        handleWin(topLeft);
        topHorizontal();
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
        middleHorizontal();
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        bottomHorizontal();
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        leftVertical();
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        middleVertical();
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        rightVertical();
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
        diagonalFromTopLeft();
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
        diagonalFromTopRight();
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle &&
               middleRight && bottomLeft && bottomMiddle && bottomRight) {
        isGameLive = false;
        status.innerHTML = "<span>Tied!</span>";
    } else {
        isNextX = !isNextX;
        isNextX ? status.innerHTML = `Current turn: <strong>${xSymbol}</strong>`: status.innerHTML = `Current turn: <strong>${oSymbol}</strong>`;
    }
}

const resetButton = (e) => {
    isGameLive = true;
    isNextX = true;
    winner = null;
    status.innerHTML = `Current turn:  ${xSymbol}`;
    for (const cell of cells) {
        cell.classList.remove("X");
        cell.classList.remove("O");
        cell.classList.remove("win");
    }
}

// const cellClick = (e) => {
function cellClick(e) {
    if (!isGameLive || e.target.classList[1] === "X" || e.target.classList[1] === "O") {
        return;
    }
    isNextX ? (e.target.classList.add("X"), checkGameStatus()) : (e.target.classList.add("O"), checkGameStatus());
    console.log(isGameLive);
}

reset.addEventListener("click", resetButton);

for (const cell of cells) {
    cell.addEventListener('click', cellClick);
}

function topHorizontal() {
    cells[0].classList.add("win");
    cells[1].classList.add("win");
    cells[2].classList.add("win");
}

function middleHorizontal() {
    cells[3].classList.add("win");
    cells[4].classList.add("win");
    cells[5].classList.add("win");
}

function bottomHorizontal() {
    cells[6].classList.add("win");
    cells[7].classList.add("win");
    cells[8].classList.add("win");
}

function leftVertical() {
    cells[0].classList.add("win");
    cells[3].classList.add("win");
    cells[6].classList.add("win");
}

function middleVertical() {
    cells[1].classList.add("win");
    cells[4].classList.add("win");
    cells[7].classList.add("win");
}

function rightVertical() {
    cells[2].classList.add("win");
    cells[5].classList.add("win");
    cells[8].classList.add("win");
}

function diagonalFromTopLeft() {
    cells[0].classList.add("win");
    cells[4].classList.add("win");
    cells[8].classList.add("win");
}

function diagonalFromTopRight() {
    cells[2].classList.add("win");
    cells[4].classList.add("win");
    cells[6].classList.add("win");
}