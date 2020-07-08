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
    winner === "X" ? status.innerHTML = `${letterToSymbol(winner)} has won!`: 
                     status.innerHTML = `${letterToSymbol(winner)} has won!`;
}

const checkGameStatus = () => {
    const topLeft = cells[0].classList[2];
    const topMiddle = cells[1].classList[2];
    const topRight = cells[2].classList[2];
    const middleLeft = cells[3].classList[2];
    const middleMiddle = cells[4].classList[2];
    const middleRight = cells[5].classList[2];
    const bottomLeft = cells[6].classList[2];
    const bottomMiddle = cells[7].classList[2];
    const bottomRight = cells[8].classList[2];

    // console.log(topLeft,topMiddle,topRight,middleLeft,middleMiddle,middleRight,bottomLeft,bottomMiddle,bottomRight);
    //check winner
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {   
        handleWin(topLeft);
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle &&
               middleRight && bottomLeft && bottomMiddle && bottomRight) {
        isGameLive = false;
        status.innerHTML = "TIED!";
    }
    // } else {
    //     isNextX = !isNextX;
    //     isNextX ? status.innerHTML = `Current turn: ${xSymbol}`: status.innerHTML = `Current turn ${oSymbol}`;
    // }
}


const handleReset = (e) => {
    console.log(e);
}

// const handleCellClick = (e) => {
function handleCellClick(e) {
    const location = e.target.classList[1];
    if (e.target.classList[2] === "X" || e.target.classList[2] === "O") {
        return;
    }
    isNextX ? (e.target.classList.add("X"), checkGameStatus(), isNextX = !isNextX) : (e.target.classList.add("O"), checkGameStatus(), isNextX = !isNextX);
}

reset.addEventListener("click", handleReset);

for (const cell of cells) {
    cell.addEventListener('click', handleCellClick);
}