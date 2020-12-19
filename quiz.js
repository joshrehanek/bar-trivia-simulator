//document ready
$( document ).ready(function() {
    console.log( "ready!" );

//start function
window.onload = sendApiRequest

//Api requests
async function sendApiRequest (){
    let response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}
//Pull data from API
function useApiData (data){
    const category = data.results[0].category;
    const question = data.results[0].category;
    console.log(category)
    $("#category").text(`Category: ${category}`)
    $("#question").text(question)
}
});