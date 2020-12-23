//document ready
$(document).ready(function () {

    let gameZoneEl = $('#game-zone');
    let answerZoneEl = $('answer-zone');
    let rightWrongEl = $('right-wrong');
    let choiceContainers = $('choice-container');

    console.log("ready!");

    //start function
    window.onload = sendApiRequest();

    //Api requests
    async function sendApiRequest() {
        let response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
        console.log(response)
        let data = await response.json()
        console.log(data)
        useApiData(data)
    }
    //Pull data from API
    function useApiData(data) {
        const category = data.results[0].category;
        const question = data.results[0].question;
        console.log(category)
        $("#category").text(`Category: ${category}`)
        $("#question").text(`Question: ${question}`)

        //Answer randomization
        array.forEach(element => {
            
        });
        const answerChoices = [...response.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            response.correct_answer
        );



        // // function to validate answers
        // function validateAnswer() {
        //     //if the value of answer does not match the answer listed in the questions objects...
        //     if (this.value !== questions[questionIndex].answer) {
        //         //subtract 10 seconds from secondsLeft
        //         secondsLeft -= 10;
        //         //display "WRONG" in right-wrong div
        //         rightWrongEl.textContent = "WRONG";
        //         //if the value does match...
        //     } else {
        //         //displat "RIGHT" in the right-wrong div
        //         rightWrongEl.textContent = "RIGHT";
        //     }
        //     //add 1 to questionIndex
        //     questionIndex++;
            //setTimeout for 1 second after each question is answered

            //     function quiz(){
            //         fetch(
            //             'https://opentdb.com/api.php?amount=10&type=multiple'
            //         )
            //             .then((response) => {
            //                 return response.json();
            //             })
            //             .then((response) => {
            //                 console.log(response);
            //                 questions = response.results.map((response) => {
            //                     const formattedQuestion = {
            //                         question: response.question,
            //                     };



            //                     answerChoices.forEach((choice, index) => {
            //                         formattedQuestion['choice' + (index + 1)] = choice;

            //                     });

            //                     return formattedQuestion;
            //                 });
            //                 startGame();
            //             })
            //             .catch((err) => {
            //                 console.error(err);
            //             });
            //         }
            // });


            // currentQuestion.choices.forEach((answer) => {
            //     //creates a variable element called tempBtn that is a button
            //     let tempBtn = document.createElement("button");
            //     //makes the text content of button an answer from my object array
            //     tempBtn.textContent = answer;
            //     //sets tempBtn value to answer
            //     tempBtn.setAttribute('value', answer);
            //     //sets tempBtn class to 'button-choice'
            //     tempBtn.setAttribute('class', 'button-choice');
            //     //when tempBtn is clicked validateAnswer function is triggered
            //     tempBtn.onclick = validateAnswer;
            //     //appends each answer in the form of 'tempBtn' to my answer-zone
            //     answerZoneEl.appendChild(tempBtn);
            // });
        }


    })