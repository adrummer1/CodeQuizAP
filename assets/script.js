var question = document.getElementById("question");
var choice = Array.from(document.getElementsByClassName("choice-ans"));
var timerEl = document.getElementById("timerEl");
var scoreCounter = document.getElementById("scoreCounter");


let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCount = 0;
let availQuestions = [];
var timer;
var timerCount;

let questions =[
    {
        question: "Which of the following is not a primitive data type in JavaScript?",
        choice1: "Number",
        choice2: "String",
        choice3: "Boolean",
        choice4: "Object",
        answer: 4
    },
    {
        question: "What is output of the following code: 'console.log(2 = “2”)'?",
        choice1: "\"" + 4 + "\"",
        choice2: "\"" + 22 +"\"",
        choice3: 4,
        choice4: 22,
        answer: 2
    },
    {
        question: "Which is the correct way to declare a variable in JavaScript?",
        choice1: "var x = 5",
        choice2: "variable x = 5",
        choice3: "x = 5",
        choice4: "let x = 5",
        answer: 4
    },
    {
        question: "What does the 'this' keyword refer to in JavaSript?",
        choice1: "The current function",
        choice2: "The global object",
        choice3: "The object that the function belongs to",
        choice4: "The parent object of the current object",
        answer: 3
    },
]

var point = 1;
var MAX_QUESTIONS = 4;

startGame = () => {
    timerCount = 100;
    score = 0;
    availQuestions = [...questions];
    console.log(availQuestions);
    startTimer();
    getNextQuestion();
};

getNextQuestion = () => {
    if (availQuestions.length === 0 || questionCount >= MAX_QUESTIONS) {
        localStorage.setItem("latestScore", score);
        return window.location.assign("./gameend.html");
    }
    questionCount++;
    var questionIndex = Math.floor(Math.random() * availQuestions.length);
    currentQuestion = availQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choice.forEach(choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availQuestions.splice(questionIndex, 1);

    acceptAnswers = true;
};

var response = document.getElementById("response");
choice.forEach(choice => {
    choice.addEventListener("click", Event => {
        if (!acceptAnswers) return;
        acceptAnswers = false;
        var pickedChoice = Event.target;
        var pickedAns = pickedChoice.dataset["number"];
            if (pickedAns == currentQuestion.answer) {
                var node1 = document.createTextNode("Correct!");
                response.appendChild(node1);
                score++;
                scoreCounter.innerText = score;
            } else {
                var node2 = document.createTextNode("Incorrect");
                response.appendChild(node2);
                timerCount -= 20;
            }

            setTimeout(() => {
                response.innerHTML = "";
                getNextQuestion();
            }, 1000);
    });
})

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
        }
    },1000);
}    
startGame();