var initials = document.getElementById("initials");
var saveScoreBtn = document.getElementById("savedScore");
var finalScore = document.getElementById("finalScore");
var latestScore = localStorage.getItem("latestScore");

var scores = JSON.parse(localStorage.getItem("scores"));

finalScore.innerText = latestScore;

initials.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !initials.value;
});

// Save user's score to localStorage API
saveScore = (event) => {
    event.preventDefault();

    var score = {
        score: latestScore,
        initials: initials.value
    };
    scores.push(score);
    scores.sort( (a,b) => b.score - a.score);

    localStorage.setItem("scores", JSON.stringify(scores));
    location.assign("/hiscore.html");
};
