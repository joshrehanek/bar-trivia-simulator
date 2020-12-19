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
const searchDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"

$.ajax( {
    url: searchDrinkURL,
    method: "GET"
} ).then( function ( response ) {

    console.log( searchDrinkURL );

    console.log( response );



} );