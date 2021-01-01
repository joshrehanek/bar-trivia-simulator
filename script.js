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

$.ajax( {
    url: randomDrinkURL,
    method: "GET"
} ).then( function ( response ) {

    console.log( randomDrinkURL );

    console.log( response );



} );

// this will be the secondary focus: but will be the search function under the drink cards and will display its results in the 'Highlighted Drink' card.

function classicDrinkButtons() {

let drinkButton = $(this).attr("data-name");
console.log(drinkButton);
const searchDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkButton;

$.ajax( {
    url: searchDrinkURL,
    method: "GET"
} ).then( function ( response ) {
   
    console.log( response );

    let drinksDiv = $(".classic-drinks");
    drinksDiv.empty();
    let name = response.drinks[0].strDrink
    let glass = response.drinks[0].strGlass
    let instructions = response.drinks[0].strInstructions
    let ingredients1 = response.drinks[0].strIngredient1
    let ingredients2 = response.drinks[0].strIngredient2
    let ingredients3 = response.drinks[0].strIngredient3
    let ingredients4 = response.drinks[0].strIngredient4
    if (ingredients4 === null){
        ingredients4 = '';
    }
    let ingredients5 = response.drinks[0].strIngredient5
    if (ingredients5 === null){
        ingredients5 = '';
    }
    let ingredients6 = response.drinks[0].strIngredient6
    if (ingredients6 === null){
        ingredients6 = '';
    }
    console.log(name);
    let drinkName= $("<p>").text(`Name: ${name}`);
    let glassName= $("<p>").text(`Glass: ${glass}`);
    let drinkInstructions = $("<p>").text(`Instructions: ${instructions}`);
    let ingredients = $("<p>").text(`Ingredients: ${ingredients1} ${ingredients2} ${ingredients3} ${ingredients4} ${ingredients5} ${ingredients6}`);

    drinksDiv.append(drinkName, glassName, drinkInstructions, ingredients);
} );
}

$(document).on("click", ".drink", classicDrinkButtons);

// const loadDrankz = async () => {
//             try {
//                 const response = await fetch( searchDrinkURL );
//                 // hpCharacters = await response.json();
//                 displayCharacters( hpCharacters );


//     } catch ( err ) {
//         console.error( err );
//     }
// };
// console.log


// const charactersList = document.getElementById( 'charactersList' );
// const searchBar = document.getElementById( 'searchBar' );
// let hpCharacters = [];

// searchBar.addEventListener( 'keyup', ( e ) => {
//     const searchString = e.target.value.toLowerCase();

//     const filteredCharacters = hpCharacters.filter( ( character ) => {
//         return (
//             character.name.toLowerCase().includes( searchString ) ||
//             character.house.toLowerCase().includes( searchString )
//         );
//     } );
//     displayCharacters( filteredCharacters );
// } );


// const displayCharacters = ( characters ) => {
//     const htmlString = characters
//         .map( ( character ) => {
//             return `
//             <li class="character">
//                 <h2>${character.name}</h2>
//                 <p>House: ${character.house}</p>
//                 <img src="${character.image}"></img>
//             </li>
//         `;
//         } )
//         .join( '' );
//     charactersList.innerHTML = htmlString;
// };

// loadCharacters();