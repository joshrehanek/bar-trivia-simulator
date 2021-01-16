$(document).ready(function () {
    //DOM Variables
    const scoreEl          = $("#score")
    const categoryEl       = $("#category");
    const questionEl       = $("#question");
    const answerZoneEl     = $("#answer-zone");
    const rightWrongEl     = $("#right-wrong");
    const questionNumberEl = $("#question-number");

    //initial variables
    let questions     = [];
    let score         = 0;
    let questionIndex = 0;
    let correctAnswer;

    //audio variables
    const cheer = new Audio('./Assets/audio/bbc_crowds--ch_07043047.mp3');
    const jeer  = new Audio("./Assets/audio/bbc_crowd-reac_07018034.mp3")
    const DOOM  = new Audio("./Assets/audio/Metal Fingers Special Herbs (Volume 1&2) [FULL ALBUM].mp3")

    //call ApiRequest() function to start 
    sendApiRequest();

    //Api request
    async function sendApiRequest() {
        // set response equal to response from url using fetch method
        let response = await fetch(`https://opentdb.com/api.php?amount=11&type=multiple`);
        // Takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON, which is a JavaScript value of datatype object, string, etc. *** from MDN
        let data = await response.json();
        questions = [...data.results];
        generateQuestion();
    }

    //this function generates the next question
    function generateQuestion() {
        //If we've gone through all the questions, end the game
        if (questionIndex === questions.length) {
            endGame();
        }

        resetQuestionZone();        
        
        let currentQuestion = questions[questionIndex];
        correctAnswer       = fix(currentQuestion.correct_answer);

        questionNumberEl.text(`Question: ${questionIndex + 1} / ${questions.length}`)
        scoreEl         .text(`Score: ${score}`);
        questionEl      .text(`Question: ${fix(currentQuestion.question)}`);
        categoryEl      .text(`Category: ${currentQuestion.category}`);

        let allBtns = createAnswerButtons(currentQuestion)
            .sort(() => Math.random() -.5);

        allBtns.forEach(function(btn) {
            answerZoneEl.append(btn);
        })
    }

    function createAnswerButtons(question) {
        let buttons = []
        question.incorrect_answers.forEach(function (value) {
            let tempBtn = $('<button>')
                .text(fix(value))
                .val(fix(value))
                .addClass('hollow button answer')
                .click(() => validateAnswer(false));
                buttons.push(tempBtn);
        })

        let correctBtn = $('<button>')
            .text(correctAnswer)
            .val(correctAnswer)
            .addClass('hollow button answer')
            .click(() => validateAnswer(true));
        buttons.push(correctBtn);
        return buttons;
    }

    function correctAnswerClicked() {
        score++;
        rightWrongEl.text(`RIGHT`);
        if (cheer.pause) {
            cheer.currentTime = 0;
            cheer.play();
        }
    }

    function inCorrectAnswerClicked() {
        rightWrongEl.text(`WRONG: Answer is ${correctAnswer}`);
        if (jeer.pause) {
            jeer.currentTime = 0;
            jeer.play();
        }
    } 

    //this function validates the users answer
    function validateAnswer(isCorrect) {
        $(".answer").attr("disabled", true)

        if (isCorrect) { 
            correctAnswerClicked(); 
        } else {
            inCorrectAnswerClicked();
        }

        questionIndex++;
        setTimeout(generateQuestion, 3000)
    }

    function fix(str) {
        var txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    function resetQuestionZone() {
        answerZoneEl.empty();
        rightWrongEl.empty();
        cheer.pause();
        jeer .pause();
        cheer.currentTime = 0;
        jeer .currentTime = 0;
    }

    function endGame() {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("./end-game.html");
    }

    $("#jukebox").click(function () {
        if(DOOM.paused) {
            DOOM.play();
        } else {
            DOOM.pause();
        }
    });
})