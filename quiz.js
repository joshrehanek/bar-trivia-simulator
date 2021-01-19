$(document).ready(function () {

    //DOM Variables
    const scoreEl = $("#score")
    const categoryEl = $("#category");
    const questionEl = $("#question");
    const answerZoneEl = $("#answer-zone");
    const rightWrongEl = $("#right-wrong");
    const questionNumberEl = $("#question-number");

    //initial variables
    let questions = [];
    let score = 0;
    let questionIndex = 0;
    let correctAnswer;

    //audio variables

    //crowd cheer sound
    const cheer = new Audio('./Assets/audio/bbc_crowds--ch_07043047.mp3');
    //crow jeer sound
    const jeer = new Audio("./Assets/audio/bbc_crowd-reac_07018034.mp3")
    // MF DOOM backtrack
    const DOOM = new Audio("./Assets/audio/Metal Fingers Special Herbs (Volume 1&2) [FULL ALBUM].mp3")

    //Api request
    async function sendApiRequest() {
        // set response equal to response from url using fetch method
        let response = await fetch(`https://opentdb.com/api.php?amount=1&type=multiple`);
        // Takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON, which is a JavaScript value of datatype object, string, etc. *** from MDN
        let data = await response.json();
        //set questions equal to all returned data using the spread operator
        questions = [...data.results];
        //call generateQuestion function
        generateQuestion();
        console.log(questions)
    }
    //this function generates new questions
    function generateQuestion() {

        //if statement to call endGame function once questions.length is reached
        if (questionIndex === questions.length) {
            endGame();
        }

        //emptys answer buttons
        answerZoneEl.empty();
        //emptys right/wrong area
        rightWrongEl.empty();

        cheer.pause();
        jeer.pause();
        function fix (errorString){
            if(errorString.includes("&#039;")){
                console.log("its in there")
            }
            else {(errorString.includes("&#039;"))
                    console.log("its not there")
            }
            while(errorString.includes("&#039;")){
                errorString = errorString.replace("&#039;", "\'")
                }
            while(errorString.includes("&quot;")){
                errorString = errorString.replace("&quot;","\"")
                }
            while(errorString.includes("&amp;")){
                errorString = errorString.replace("&amp;","&")
            }
            while(errorString.includes("&Uuml;")){
                errorString = errorString.replace("&Uuml;","Ü")
            }    
            while(errorString.includes("&eacute;")){
                errorString = errorString.replace("&eacute;","é")
            }        
            return errorString
        }
        //sets currentQuestion equal to questions index
        let currentQuestion = questions[questionIndex];
        //set correctAnswer equal to the correct answer of the current question
        correctAnswer = currentQuestion.correct_answer;
        //tells user what question number they are on
        questionNumberEl.text(`Question: ${questionIndex + 1} / 10`)
        //tells user score
        scoreEl.text(`Score: ${score}`);
        //shows user the current question after a fix
        let fixedCurrentQuestion = fix(currentQuestion.question)
        questionEl.text(`Question: ${fixedCurrentQuestion}`);
        //shows user what category the current question is from
        categoryEl.text(`Category: ${currentQuestion.category}`);
        //sets up array of all possible answer choices using the spread operator for incorrect answers
        console.log(currentQuestion.incorrect_answers)
        for (var i = 0; i < 2; i++) {
            currentQuestion.incorrect_answers[i] = fix(currentQuestion.incorrect_answers[i]);
          }
        // let fixedIncorrectAnswers = fix(currentQuestion.incorrect_answers)
        let fixedCorrectAnswer = fix(currentQuestion.correct_answer)
        let questionChoices = [...currentQuestion.incorrect_answers, fixedCorrectAnswer]
        //shuffle array randomly
        let randomQuestionChoices = questionChoices.sort(() => Math.random() - 0.5);
        //creates a temporary btn for each of the choices and adds them to the answer zone; using jQuery adds text, value, class, & onclick event to each btn
        randomQuestionChoices.forEach(function (value) {
            let tempBtn = $('<button>').text(value).val(value).addClass('hollow button answer').click(validateAnswer);
            answerZoneEl.append(tempBtn);
        })

    }
    //this fnction validates the users answer
    function validateAnswer() {
        //set userChoice to the value of the btn the user clicked
        const userChoice = $(this).val();
        $(".answer").attr("disabled", true)
        //if user chooses the correct answer the score goes up 1 and "RIGHT" appears in the right/wrong div
        if (userChoice === correctAnswer) {
            score++;
            rightWrongEl.text(`RIGHT`);
            if (cheer.pause) {
                cheer.currentTime = 0;
                cheer.play();
            }
            //if user is wrong "WRONG" apers in the right/wrong div along with the correct answer
        } else {
            rightWrongEl.text(`WRONG: Answer is ${correctAnswer}`);
            if (jeer.pause) {
                jeer.currentTime = 0;
                jeer.play();
            }
        }
        //question index increases by 1
        questionIndex++;
        //setTimeout function to allow 1 second before generating a new question
        setTimeout(function () {
            //calls sendApiRequest function
            generateQuestion();

        }, 3000)

    }
    //this function is for when the game is over
    function endGame() {
        //stores score in localStorage
        localStorage.setItem('mostRecentScore', score);
        //send user to end-game.html page
        return window.location.assign("./end-game.html");


    }

    //this on click event turns the jukebox on and off
    $("#jukebox").click(function () {
        DOOM.play();
        if (DOOM.play) {
            $("#jukebox").click(function (){
                DOOM.pause();
            })
        } else if(DOOM.paused) {
            $("#jukebox").click(function (){
                DOOM.play();
        })
        }
    });



    //call ApiRequest() function
    sendApiRequest();


})