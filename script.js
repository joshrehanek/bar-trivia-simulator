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

// const loadDrankz = async () => {
//             try {
//                 const response = await fetch( searchDrinkURL );
//                 // hpCharacters = await response.json();
//                 displayCharacters( hpCharacters );


//     } catch ( err ) {
//         console.error( err );
//     }
// };
console.log


const charactersList = document.getElementById( 'charactersList' );
const searchBar = document.getElementById( 'searchBar' );
let hpCharacters = [];

searchBar.addEventListener( 'keyup', ( e ) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter( ( character ) => {
        return (
            character.name.toLowerCase().includes( searchString ) ||
            character.house.toLowerCase().includes( searchString )
        );
    } );
    displayCharacters( filteredCharacters );
} );


const displayCharacters = ( characters ) => {
    const htmlString = characters
        .map( ( character ) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        } )
        .join( '' );
    charactersList.innerHTML = htmlString;
};

loadCharacters();