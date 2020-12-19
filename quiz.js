//document ready
$(document).ready(function () {
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
    }

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
});