const status = document.querySelector(".turn");
const reset = document.querySelector(".reset");
const cells = document.querySelectorAll(".cell");
const back = document.querySelector(".back");

const xSymbol = "×";
const oSymbol = "○";

let isGameLive = true;
let isNextX = true;
let winner = null;

reset.addEventListener("click", resetButton);


for (const cell of cells) {
    cell.addEventListener('click', cellClick);
}

function letterToSymbol(letter) {
    return letter === "X" ? xSymbol : oSymbol;
}

function handleWin (letter) {
    isGameLive = false;
    winner = letter;
    winner === "X" ? status.innerHTML = `<span>${letterToSymbol(winner)} is winner!</span>`: 
                     status.innerHTML = `<span>${letterToSymbol(winner)} is winner!</span>`;
}

function checkGameStatus() {
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
        addWin(0, 1, 2);
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
        addWin(3, 4, 5);
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        addWin(6, 7, 8);
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        addWin(0, 3, 6);
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        addWin(1, 4, 7);
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        addWin(2, 5, 8);
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
        addWin(0, 4, 8);
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
        addWin(2, 4, 6);
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle &&
               middleRight && bottomLeft && bottomMiddle && bottomRight) {
        isGameLive = false;
        status.innerHTML = "<span>Tied!</span>";
    } else {
        isNextX = !isNextX;
        isNextX ? status.innerHTML = `Current turn: <strong>${xSymbol}</strong>`: status.innerHTML = `Current turn: <strong>${oSymbol}</strong>`;
    }
}

function resetButton(e) {
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
}

function addWin(...indexes) {
    indexes.forEach(index => {cells[index].classList.add("win")});
}
