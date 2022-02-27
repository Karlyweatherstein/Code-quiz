// Timer start
var counter = 60;

function startTimer(){
    console.log(startTimer)
    
    setInterval(function() {
      counter--;
    if (counter >= 0) {
        span = document.getElementById("timer");
        span.innerHTML = counter;
    }
    else if (counter === 0) {
        alert('Out of time!');
        clearInterval(counter);
    }
    }, 1000);
    console.log(counter)
}

function countdown() {

    startTimer();
};


document.getElementById("start").addEventListener("click", startTimer);

// Timer End

// Game start

var highScore = 0
var name = ""
var startButton = document.getElementById("start")
var nextButton = document.getElementById("next-btn")
var hideExtraInfo = document.getElementById("hide-this")
var scoreArea = document.getElementById("scoreArea")
var questionConEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-button")
var shuffledQuestions, currentQuestionIndex
var highscoreButton = document.getElementById("showScoresButton")
var hideSubmit = document.getElementById("scoreArea")

var highScore = JSON.parse(localStorage.getItem("highscores"))
||[];


// Listens for a click on the start button and also the 'next' button
startButton.addEventListener("click", startGame)
highscoreButton.addEventListener("click", displayScores)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    nextQuestion()
})

// once the start button is selected it hides the instructions and shows the question box layout
function startGame() {
    startButton.classList.add("hide");
    hideExtraInfo.classList.add("hide");
    scoreArea.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random());
    currentQuestionIndex = 0;
    questionConEl.classList.remove("hide");
    nextQuestion()
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsEl.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body)
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectBtn = e.target
    var correct = selectBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(!selectBtn.dataset.correct) {
        counter -= 10
        console.log(counter)
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Try again"
        startButton.classList.remove("hide")
        counter.innerText = "stop"
    }
}



function setStatusClass(element, correct) {
    clearStatusClass(element) 
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
    
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")

}



//End of game
function gameover() {
    clearInterval(counter);
    countdown.innerHTML = "finished";
    displayScores();
    startButton.inner = "Try again";
    startButton.classList.remove("hide")
    counter = 60;
    score = 0;
}

function showResults() {
    finalScore = counter;
    if(finalScore < 0){
        finalScore = 0;
    }
    scoreArea.classList.remove("hide")
    answerButtonsEl.classList.remove("hide");
    username = document.getElementById("initials");
    saveButton = document.getElementById("submitScore")
    username.addEventListener("keyup", function(){
        saveButton.disabled = !username.value;
    });

}

// Submit high score
function submitScores(e){
    var score = {
        score:finalScore,
        name: username.value
    };
    highScore.push(score);
    highScore.sort((a,b) => b.score -a-score);

    localStorage.setItem("highScores", JSON.stringify(highScore));
    displayScores()
}

// function to display the high scores
function displayScores(){
    clearInterval(counter);
    countdown.innerHTML = "";
    questionEl.innerText = "";
    scoreArea.classList.remove("hide");
    var highScoreList = document.getElementById("scoreDisplay");
  
    startButton.classList.remove("hide");
    highscoreButton.classList.add("hide");

    gameover()
};


// Array of my questions and answer choices
var questions = [
    {
        question: "Commonly used data types DO not include:",
        answers: [
            {text: "1. Strings", correct: false},
            {text: "2. Booleans", correct: false},
            {text: "3. Alerts", correct: true},
            {text: "4. Numbers", correct: false},

        ]
    },
    {
        question: "The condition in an if / else statement is enclosed with ______",
        answers: [
            {text: "1. Parenthesis", correct: true},
            {text: "2. Curly brackets", correct: false},
            {text: "3. Quotes", correct: false},
            {text: "4. Square Brackets", correct: false},

        ]
    },
    {
        question: "Arrays in JavaScript can be used to store_____",
        answers: [
            {text: "1. Numbers and strings", correct: false},
            {text: "2. Booleans", correct: false},
            {text: "3. Other arrays", correct: false},
            {text: "4. All of the above", correct: true},

        ]
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: [
            {text: "1. Commas", correct: false},
            {text: "2. Curly brackets", correct: false},
            {text: "3. Quotes", correct: true},
            {text: "4. Parenthesis", correct: false},

        ]
    },


];


// Game end