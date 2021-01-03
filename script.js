// variables
const highScoresListEl = $('#highScoresList');
const highScoresEl = JSON.parse(localStorage.getItem('highScores')) || [];

// Map object holds key-value pairs and remembers the original insertion order of the keys.
// returns list of high scores in the HTML's innertext
highScoresListEl.html(
    highScoresEl.map(score => {
        // uses 'template literal' to return ouput strings with values
        return `<li class='high-score'>${score.name} - ${score.score}</li>`;
    }))

// this random url will be used as the 'Drink of the Hour' card.
const randomDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
// ajax call for randomDrinkURL
$.ajax({
    url: randomDrinkURL,
    method: "GET"
}).then(function (response) {

    // pulling the image from the ajax
    var imgURL = response.drinks[0].strDrinkThumb
    // making an element for the img to append to
    var image = $("<img>").attr("src", imgURL);
    // uses jQuery to grab randomdrinktitle section
    let randomDrinkTitle = $('#randomdrinktitle');
    // pulls drink name
    var randomDrinkName = response.drinks[0].strDrink
    // sets random name var equal to a new line of text displaying the drink name
    var randomName = $("<p>").text(`${randomDrinkName}`);
    // appends randomName to 
    randomDrinkTitle.append(randomName)
    // uses jQuery to grab randomText section
    let randomText = $("#randomText");
    // emptys randomText area
    randomText.empty();
    // pulls glass name
    let glass = response.drinks[0].strGlass
    // pulls instructions
    let instructions = response.drinks[0].strInstructions
    // pulls ingredients
    let ingredients1 = response.drinks[0].strIngredient1
    let ingredients2 = response.drinks[0].strIngredient2
    let ingredients3 = response.drinks[0].strIngredient3
    let ingredients4 = response.drinks[0].strIngredient4
    // displays blank string if ingredient is equal to null
    if (ingredients4 === null) {
        ingredients4 = '';
    }
    let ingredients5 = response.drinks[0].strIngredient5
    if (ingredients5 === null) {
        ingredients5 = '';
    }
    let ingredients6 = response.drinks[0].strIngredient6
    if (ingredients6 === null) {
        ingredients6 = '';
    }
    // glass name appears on a new line
    let glassName = $("<p>").text(`Glass: ${glass}`);
    // instructions appear on a new line
    let drinkInstructions = $("<p>").text(`Instructions: ${instructions}`);
    // ingredients appear on a new line
    let ingredients = $("<p>").text(`Ingredients: ${ingredients1} ${ingredients2} ${ingredients3} ${ingredients4} ${ingredients5} ${ingredients6}`);
    // appends all info to randomText area
    randomText.append(image, glassName, drinkInstructions, ingredients);
});

// this function controls the classic drink btns
function classicDrinkButtons() {
    // set drinkButton equal to data-name
    let drinkButton = $(this).attr("data-name");
    // searchDrinkURL will be called by ajax 
    const searchDrinkURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkButton}`;
    //ajax call for searchDrinkURL
    $.ajax({
        url: searchDrinkURL,
        method: "GET"
    }).then(function (response) {

        // pulling the image from ajax
        var imgURL = response.drinks[0].strDrinkThumb
        // making an element for the img to append to
        var image = $("<img>").attr("src", imgURL);
        // uses jQuery to grab classic-drink-title id
        let classicDrinkTitleEl = $('#classic-drink-title');
        // grabs drink name
        let name = response.drinks[0].strDrink
        // uses jQuery to grab the classic-drinks class
        let drinksDiv = $(".classic-drinks");
        // emptys drinksDiv
        drinksDiv.empty();
        // pulls glass type from ajax  
        let glass = response.drinks[0].strGlass
        // pulls instructions from ajax 
        let instructions = response.drinks[0].strInstructions
        // pulls ingredients from ajax 
        let ingredients1 = response.drinks[0].strIngredient1
        let ingredients2 = response.drinks[0].strIngredient2
        let ingredients3 = response.drinks[0].strIngredient3
        let ingredients4 = response.drinks[0].strIngredient4
        // displays blank string if ingredient is equal to null
        if (ingredients4 === null) {
            ingredients4 = '';
        }
        let ingredients5 = response.drinks[0].strIngredient5
        if (ingredients5 === null) {
            ingredients5 = '';
        }
        let ingredients6 = response.drinks[0].strIngredient6
        if (ingredients6 === null) {
            ingredients6 = '';
        }
        // diplays drink name in classic-drink-title area
        $("#classic-drink-title").text(`Name: ${name}`);
        // creates glass name on new line
        let glassName = $("<p>").text(`Glass: ${glass}`);
        // creates instructions on new line
        let drinkInstructions = $("<p>").text(`Instructions: ${instructions}`);
        // creates ingredients on new line
        let ingredients = $("<p>").text(`Ingredients: ${ingredients1} ${ingredients2} ${ingredients3} ${ingredients4} ${ingredients5} ${ingredients6}`);
        // apppends all info to drinksDiv
        drinksDiv.append(image, glassName, drinkInstructions, ingredients);
    });
}
// on click event for classic drink btns
$(document).on("click", ".drink", classicDrinkButtons);