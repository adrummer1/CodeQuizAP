// Set global variables
var question = document.getElementById("question");
var choice = Array.from(document.getElementsByClassName("choice-ans"));
var timerEl = document.getElementById("timerEl");
var scoreCounter = document.getElementById("scoreCounter");
var initials = document.getElementById("initials");
var saveScoreBtn = document.getElementById("savedScore");
var finalScore = document.getElementById("finalScore");
var currentQuestion = {};
var acceptAnswers = false;
var score = 0;
var questionCount = 0;
let availQuestions = [];
var timer;
var timerCount;

// Function to set which div section displays for the user using jQuery
function showPage(className) {
    $(".page").hide();
    $(className).show();
}

showPage(".start");

$(".btn-start").click(function () {
    showPage(".question");
})

// Setting data array for the four question in the quiz and an answer value that is a number.
var questions = [
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

// Set the point value to one and the maximum questions for the Next Question function
var point = 1;
var maxQuestions = 4;

// Start game also starts timer and loads new question function
 function startGame () {
    timerCount = 100;
    score = 0;
    availQuestions = [...questions];
    console.log(availQuestions);
    startTimer();
    getNextQuestion();
};

// Gets new question after answer submitted. If the user gets through all four questions before the time ends take them to the quizend section.
function getNextQuestion () {
    if (availQuestions.length === 0 || questionCount >= maxQuestions) {
        localStorage.setItem("latestScore", score);
        return showPage(".quizend");
    }
    // Iterates through the questions displays questions at random
    questionCount++;
    var questionIndex = Math.floor(Math.random() * availQuestions.length);
    currentQuestion = availQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choice.forEach(choice => {
        // Set new variable for number that will relect the number assigned to the correct answer.
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    // Replaces one question with another available question from the question indexes.
    availQuestions.splice(questionIndex, 1);

    // Change acceptAnswer variable to true when a user selects a choice.
    acceptAnswers = true;
};

// Adds correct or incorrect response depending on the user's answer
// Sets new variable for response by getting the response element
var response = document.getElementById("response");
// This is an event function for when the user selects an answer it displays text below the question if the answer is correct on incorrect.
choice.forEach(choice => {
    choice.addEventListener("click", Event => {
        // If no choices are made this ends the function and returns a boolean of false.
        if (!acceptAnswers) return;
        acceptAnswers = false;
        // Target the responses based on the number corresponding to the answer for each question.
        var pickedChoice = Event.target;
        var pickedAns = pickedChoice.dataset["number"];
            // If the user chooses the correct answer return text Correct.
            if (pickedAns == currentQuestion.answer) {
                var node1 = document.createTextNode("Correct!");
                response.appendChild(node1);
                score++;
                scoreCounter.innerText = score;
            // If the user chooses any other answer return text Incorrect and reduce the timer count by 20 seconds.
            } else {
                var node2 = document.createTextNode("Incorrect");
                response.appendChild(node2);
                timerCount -= 20;
            }

            // Set a brief one second pause that will remove the response text and take the user to the next question.
            setTimeout( () => {
                response.innerHTML = "";
                getNextQuestion();
            }, 1000);
    });
})

// Start timer and take user to the gameend section if timer run to zero
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            showPage(".quizend")
        }
    },1000);
}    

// Parse the score data to a js object and retrieve it from localStorage 
var scores = JSON.parse(localStorage.getItem("scores")) || [];

// Print the latest score to the finalScore element
var latestScore = localStorage.getItem("latestScore");
finalScore.innerText = latestScore;

//
initials.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !initials.value;
});

// Save user's score and initials to localStorage when submitted and take user to the hiscore page.
function saveScore (event) {
    event.preventDefault();

    var score = {
        score: latestScore,
        initials: initials.value
    };
    scores.push(score);
    scores.sort( (a,b) => b.score - a.score);

    localStorage.setItem("scores", JSON.stringify(scores));
    location.assign("./hiscore.html");
};

// Call the startGame function.
startGame();