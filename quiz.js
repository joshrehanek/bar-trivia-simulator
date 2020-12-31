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

    //Api requests
    async function sendApiRequest() {
        // possible toggle inputs to change api request for question type
        let response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`);
        let data = await response.json();
        questions = [...data.results];
        generateQuestion();
    }

    function generateQuestion() {
        console.log(questionIndex, questions.length)

     if (questionIndex === questions.length) {
        endGame ();
     }

        answerZoneEl.empty();
        rightWrongEl.empty();

        let currentQuestion = questions[questionIndex];
        correctAnswer = currentQuestion.correct_answer;
        console.log(currentQuestion);

        questionNumberEl.text(`Question: ${questionIndex + 1} / 10`)
        scoreEl.text(`Score: ${score}`);
        questionEl.text(`Question: ${currentQuestion.question}`);
        categoryEl.text(`Category: ${currentQuestion.category}`);

        const questionChoices = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
        // shuffle array randomly\
        const randomQuestionChoices = questionChoices.sort(() => Math.random() - 0.5);
        console.log(randomQuestionChoices);
        randomQuestionChoices.forEach(function (value) {
            let tempBtn = $('<button>').text(value).val(value).addClass('hollow button').click(validateAnswer);
            answerZoneEl.append(tempBtn);
        })

    }

    function validateAnswer() {
        const userChoice = $(this).val();
        console.log(userChoice, correctAnswer);
        if (userChoice === correctAnswer) {
            score++;
            rightWrongEl.text(`RIGHT`);
        } else {
            rightWrongEl.text(`WRONG: Answer is ${correctAnswer}`);
        }
        questionIndex++;
        setTimeout(function () {
            //calls sendApiRequest function
            generateQuestion();
        }, 1000)

    }

    function endGame () {
        //stores score in localStorage
        localStorage.setItem('mostRecentScore', score);
        //send user to end-game.html page
        return window.location.assign("./end-game.html");
        

    }
    sendApiRequest();

    //regex to remove weird text in questions
})
