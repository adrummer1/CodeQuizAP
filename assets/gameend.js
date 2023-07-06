var initials = document.getElementById("initials");
var saveScoreBtn = document.getElementById("savedScore");
var finalScore = document.getElementById("finalScore");
var latestScore = localStorage.getItem("latestScore");

finalScore.innerText = latestScore;

initials.addEventListener("keyup", () => {
    console.log(initials.value);
    saveScoreBtn = !initials.value;
});

saveScore = (event) => {
    event.preventDefault();
};