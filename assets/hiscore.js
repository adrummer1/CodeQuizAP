// get hiScoreList by element id
var hiScoresList = document.getElementById("hiScoresList");

// parse score data from string to object
var hiScores = JSON.parse(localStorage.getItem("scores"));

// Display list of high scores and display initials with the score using the map function.
hiScoresList.innerHTML = hiScores.map(score => {
    // jQuery that sets the list data
    return `<li class="hi-score">${score.initials}: ${score.score}</li>`;
})

// Print initials and score so that each list item is on one line
.join("");
