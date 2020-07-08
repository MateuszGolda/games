let remainingTime = 59;
let timer;
let playerPoints = 0;
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

function overMouseColorChange(event, borderDefaultColor="green",
            borderActiveColor="red", backgroundDefaultColor="#d9d9d9",
            backgroundActiveColor="#1aff1a") {
    let button = event.target;
    if (button.classList.toggle("active")) {
        button.style.borderColor=borderActiveColor;
        button.style.backgroundColor=backgroundActiveColor;
    } else {
        button.style.borderColor=borderDefaultColor;
        button.style.backgroundColor=backgroundDefaultColor;
    }
}

function loadQuestionsFromFile() {
    // TODO load data from file
    questions = [{question:"How many legs does a horse have?", answer:"4", falseAnswer:["2", "1", "3"]},
            {question:"What color is a bumble bee?", answer:"yellow-black",
                    falseAnswer:["yellow-white", "brown-yellow", "green-yellow"]},
            {question:"When was Java created?", answer:"1995", falseAnswer:["1987", "2003", "2016"]}];
}

function validateCurrentAnswer(element) {
    if (element.classList.contains("answer")) {
        playerPoints += 10;
        alert("rightAnswer");
    } else {
        playerPoints -= 5;
        alert("falseAnswer");
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
            currentAnswer = event.target.value;
            validateCurrentAnswer(event.target);
            loadNextQuestion();
        });
        button.onmouseover = button.onmouseout = () => overMouseColorChange(event,
                "black", "black", "#ecd9c6");
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

function handleTimeEnd() {
    clearInterval(timer);
}

function countSecondDown() {
    remainingTime--;
    divContent.querySelector("div.timer p").innerHTML = remainingTime;
    if (remainingTime===0) handleTimeEnd();
}

function setTimer() {
    timer = setInterval(countSecondDown, 1000)
}

function deleteStartScreenElements() {
    document.querySelectorAll("div.content *").forEach(element => element.remove());
}


function startGame() {
    deleteStartScreenElements();
    setTimer();
    loadGameElements();
}

function main() {
    let startButton = document.getElementById("startButton")
    startButton.onmouseover = startButton.onmouseout = overMouseColorChange;
    startButton.addEventListener("click", startGame);
}

main();