// variables
const usernameEl = $('#username');
const finalScoreEl = $('#finalScore')[0];
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScoreEl.innerText = `Score: ${mostRecentScore} points`;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// function to save high score when event is triggered
saveHighScore = e => {
    // e.preventDefault();

// score Object
    const score = {
        score: mostRecentScore,
        name: usernameEl.val()
    };
// pushes score to high score array
    highScores.push(score);
// sorts highscores
    highScores.sort( (a,b) => b.score - a.score);
// saves top 10 high scores
    highScores.splice(10);
// updates highscores in local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
// send user to highscores page after save button is clicked
    return window.location.assign("./high-scores.html");
};