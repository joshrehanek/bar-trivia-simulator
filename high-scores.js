$(document).ready(function () {

    // variables
    const highScoresListEl = $('#highScoresList');
    //retrives highScores from local storage
    const highScoresEl = JSON.parse(localStorage.getItem('highScores')) || [];

    // Map object holds key-value pairs and remembers the original insertion order of the keys.
    // returns list of high scores in the HTML's innertext
    highScoresListEl.html(
        highScoresEl.map(score => {
            // uses 'template literal' to return ouput strings with values
            return `<li class='high-score'>${score.name} - ${score.score}</li>`;
        }))

})