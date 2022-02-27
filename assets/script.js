// Timer start
function startTimer(){
    console.log(startTimer)
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
    console.log(counter)
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


// Listens for a click on the start button and also the 'next' button
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    nextQuestion()
})

// once the start button is selected it hides the instructions and shows the question box layout
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

// Subtract 10 seconds for every wrong answer

function timerPenalty() {
   if(answer === correct) {
    window.alert("You dont lose time");
    
   } else {
    window.alert("You lose 10 seconds haha");
    startTimer.counter -= 10;
   }
   
   timerPenalty()

}

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