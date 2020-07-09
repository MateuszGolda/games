let durationOfGame = 10;
let remainingTime = 0;
let timer;
let playerPoints;
let questions;
let divContent = document.querySelector("div.content");

let timerHtmlElement = `
    <div class="timer">
        <p>${remainingTime}</p>
    </div>
`;

let quizHtmlTemplate = `
    <div class="quiz-content">
        <div class="question">
            <p class="question">question</p>
        </div>
        <div class="answers">
            <button type="button" id="firstAnswer">First Answer</button>
            <button type="button" id="secondAnswer">Second Answer</button>
            <button type="button" id="thirdAnswer">Third Answer</button>
            <button type="button" id="fourthAnswer">Fourth Answer</button>
        </div>
    </div>
`;

let endScreenHtml = `
    <h1 class="endScreen">Good job!</h1>
    <p></p>
    <button type="button" id="restartGame">Restart</button>
    <button type="button" id="goMainMenu">Go back</button>
`;

function setColorChangeOnButton(button, borderDefaultColor="green",
            borderActiveColor="red", backgroundDefaultColor="#d9d9d9",
            backgroundActiveColor="#40c300") {
    button.onmouseover = button.onmouseout =
            () => overMouseColorChange(button, borderDefaultColor,
            borderActiveColor, backgroundDefaultColor, backgroundActiveColor);
}

function overMouseColorChange(button, borderDefaultColor,
            borderActiveColor, backgroundDefaultColor, backgroundActiveColor) {
    if (button.classList.toggle("active")) {
        button.style.borderColor=borderActiveColor;
        button.style.backgroundColor=backgroundActiveColor;
    } else {
        button.style.borderColor=borderDefaultColor;
        button.style.backgroundColor=backgroundDefaultColor;
    }
}

function loadQuestionsFromFile() {
    let http = new XMLHttpRequest();
    http.open("GET", "data/quizQuestions.json", false);
    http.send();
    if(http.readyState === 4 && http.status === 200) {
        questions = (JSON.parse(http.response).allQuestions);
    } else {
        alert("Content has not been loaded... Please refresh the page!")
    }
}

function answerIsCorrect(answer) {
    return answer.classList.contains("answer");
}

function validateCurrentAnswer(currentAnswerButton) {
    if (answerIsCorrect(currentAnswerButton)) {
        playerPoints += 10;
    } else {
        playerPoints -= 5;
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function loadNextQuestion() {
    let randomIndex = Math.floor(Math.random() * questions.length);
    let questionObject = questions[randomIndex];
    divContent.querySelector("div.quiz-content div.question p").innerText = questionObject.question;
    let buttons = divContent.querySelectorAll("div.quiz-content div.answers button");
    let answers = shuffleArray([questionObject.answer, questionObject.falseAnswer[0],
            questionObject.falseAnswer[1], questionObject.falseAnswer[2]]);
    let index = 0;
    buttons.forEach(b => {
        b.innerText = answers[index];
        if (b.innerText === questionObject.answer) b.classList.toggle("answer", true);
        else b.classList.toggle("answer", false);
        index++
    })
}

function addButtonsEventsListeners() {
    divContent.querySelectorAll("div.quiz-content div.answers button").forEach(
            button => {
        button.addEventListener("click", (event) => {
            validateCurrentAnswer(event.target);
            loadNextQuestion();
        });
        setColorChangeOnButton(button, "black", "black", "#4eabc1");
    });
}

function loadQuizTemplate() {
    divContent.insertAdjacentHTML("afterbegin", quizHtmlTemplate);
}

function addTimerOnWindow() {
    divContent.insertAdjacentHTML("beforeend", timerHtmlElement);
}

function loadGameElements() {
    addTimerOnWindow();
    loadQuizTemplate();
    addButtonsEventsListeners();
    loadQuestionsFromFile();
    loadNextQuestion();
}

function setProperButtonsEvents(startGameButton, goBackButton) {
    setColorChangeOnButton(startGameButton);
    startGameButton.onclick = startGame;
    setColorChangeOnButton(goBackButton);
    goBackButton.onclick = () => parent.location="index.html";
}

function handleTimeEnd() {
    clearInterval(timer);
    deleteDivContentElements();
    divContent.innerHTML = endScreenHtml;
    divContent.querySelector("p").innerText = `Your score: ${playerPoints}`;
    setProperButtonsEvents(divContent.querySelector("button#restartGame"),
            divContent.querySelector("button#goMainMenu"));
}

function countSecondDown() {
    remainingTime--;
    divContent.querySelector("div.timer p").innerHTML = remainingTime;
    if (remainingTime===0) handleTimeEnd();
}

function setTimer() {
    remainingTime = durationOfGame + 1;
    countSecondDown();
    timer = setInterval(countSecondDown, 1000)
}

function deleteDivContentElements() {
    divContent.querySelectorAll("*").forEach(element => element.remove());
}


function startGame() {
    playerPoints = 0;
    deleteDivContentElements();
    loadGameElements();
    setTimer();
}

function main() {
    setProperButtonsEvents(divContent.querySelector("button#startButton"),
                divContent.querySelector("button#goMainMenu"));
}

main();