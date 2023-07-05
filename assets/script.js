var question = document.getElementById("question");
var choice = Array.from(document.getElementsByClassName("choice-ans"));
console.log(choice);

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCount = 0;
let availQuestions = [];

let questions =[
    {
        question: "Which of the following is not a primitive data type in JavaScript?",
        choice1: "Number",
        choice2: "String",
        choice3: "Boolean",
        choice4: "Object",
        answer: 1
    },
    {
        question: "What is output of the following code: 'console.log(2 = “2”)'?",
        choice1: "4",
        choice2: "22",
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

var CORRECT_POINTS = 10;
var MAX_QUESTIONS = 4;

startGame = () => {
    questionCount = 0;
    score = 0;
    availQuestions = [...questions];
    console.log(availQuestions);
    getNextQuestion();
};

getNextQuestion = () => {
    if (availQuestions.length === 0 || questionCount >= MAX_QUESTIONS) {
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

choice.forEach(choice => {
    choice.addEventListener("click", Event => {
        if (!acceptAnswers) return;
        acceptAnswers = false;
        var pickedChoice = Event.target;
        var pickedAns = pickedChoice.dataset["number"];
        console.log(pickedAns);
        getNextQuestion();
    })
}
    
    )

startGame();