// Timer start
function startTimer(){
    var counter = 60;
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
  }
function countdown() {
    startTimer();
};

document.getElementById("start").addEventListener("click", startTimer);

// Timer End

// Game start

var highScore = ""
var startButton = document.getElementById("start")
var nextButton = document.getElementById("next-btn")
var hideExtraInfo = document.getElementById("hide-this")
var questionConEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-button")
var shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    nextQuestion()
})


function startGame() {
    startButton.classList.add("hide")
    hideExtraInfo.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random())
    currentQuestionIndex = 0
    questionConEl.classList.remove("hide")
    nextQuestion()
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add("hide")
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
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Try again"
        startButton.classList.remove("hide")
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

var questions = [
    {
        question: "Commonly used data types DO not include:",
        answers: [
            {text: "1. Strings", correct: false},
            {text: "2. Booleans", correct: false},
            {text: "3. Alerts", correct: true},
            {text: "4. Numbers", correct: false},

        ]
    }
]