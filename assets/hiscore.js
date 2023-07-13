// get hiScoreList by element id
var hiScoresList = document.getElementById("hiScoresList") || [];

// parse score data from string to object
var hiScores = JSON.parse(localStorage.getItem("scores"));
console.log(hiScores)

// Display list of scores.
// Using the map method to iterate through localStorage array.
hiScoresList.innerHTML = hiScores.map(score => {
// jQuery that sets a new unordered list with localStorage data.
    return `<li class="hi-score">${score.initials}: ${score.score}</li>`;
})

// // Print initials and score so that each list item is on one line.
.join("");

