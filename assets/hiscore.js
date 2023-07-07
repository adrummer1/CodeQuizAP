var hiScoresList = document.getElementById("hiScoresList");
var hiScores = JSON.parse(localStorage.getItem("scores")) || [];

// Display list of high scores
hiScoresList.innerHTML = hiScores.map(score => {
    return `<li class="hi-score">${score.initials}: ${score.score}</li>`;
})
.join("");
