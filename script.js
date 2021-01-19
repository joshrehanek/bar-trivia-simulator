$(document).ready(function () {
    randomDrink();

    function randomDrink() {
        // this random url will be used as the 'Drink of the Hour' card.
        const randomDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic"
        // ajax call for randomDrinkURL
        $.ajax({
            url: randomDrinkURL,
            method: "GET"
        }).then(function (response) {
            const drink = response.drinks[0];
            // uses jQuery to grab randomdrinktitle section
            let randomDrinkTitle = $('#randomdrinktitle');
            // uses jQuery to grab randomText section
            let randomText = $("#randomText");
            
            // pulling the image from the ajax
            var imgURL = drink.strDrinkThumb
            // making an element for the img to append to
            var image = $("<img>").attr("src", imgURL);
            // pulls drink name
            var randomDrinkName = drink.strDrink
            // sets random name var equal to a new line of text displaying the drink name
            var randomName = $("<p>").text(`${randomDrinkName}`);
            // appends randomName to 
            randomDrinkTitle.append(randomName)
            // emptys randomText area
            randomText.empty();
            // pulls glass name
            let glass = drink.strGlass
            // pulls instructions
            let instructions = drink.strInstructions
            // pulls ingredients
            let ingredients1 = drink.strIngredient1
            let ingredients2 = drink.strIngredient2
            let ingredients3 = drink.strIngredient3
            if (ingredients3 === null) {
                ingredients3 = '';
            }
            let ingredients4 = drink.strIngredient4
            // displays blank string if ingredient is equal to null
            if (ingredients4 === null) {
                ingredients4 = '';
            }
            let ingredients5 = drink.strIngredient5
            if (ingredients5 === null) {
                ingredients5 = '';
            }
            let ingredients6 = drink.strIngredient6
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
            randomText.append(image, glassName, ingredients, drinkInstructions);
        });
    }

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
            const drink = response.drinks[0];
            // pulling the image from ajax
            var imgURL = drink.strDrinkThumb
            // making an element for the img to append to
            var image = $("<img>").attr("src", imgURL);
            // uses jQuery to grab classic-drink-title id
            let classicDrinkTitleEl = $('#classic-drink-title');
            // grabs drink name
            let name = drink.strDrink
            // uses jQuery to grab the classic-drinks class
            let drinksDiv = $(".classic-drinks");
            // emptys drinksDiv
            drinksDiv.empty();
            // pulls glass type from ajax  
            let glass = drink.strGlass
            // pulls instructions from ajax 
            let instructions = drink.strInstructions
            // pulls ingredients from ajax 
            let ingredients1 = drink.strIngredient1
            let ingredients2 = drink.strIngredient2
            let ingredients3 = drink.strIngredient3
            let ingredients4 = drink.strIngredient4
            // displays blank string if ingredient is equal to null
            if (ingredients4 === null) {
                ingredients4 = '';
            }
            let ingredients5 = drink.strIngredient5
            if (ingredients5 === null) {
                ingredients5 = '';
            }
            let ingredients6 = drink.strIngredient6
            if (ingredients6 === null) {
                ingredients6 = '';
            }
            // diplays drink name in classic-drink-title area
            $("#classic-drink-title").text(`${name}`);
            // creates glass name on new line
            let glassName = $("<p>").text(`Glass: ${glass}`);
            // creates instructions on new line
            let drinkInstructions = $("<p>").text(`Instructions: ${instructions}`);
            // creates ingredients on new line
            let ingredients = $("<p>").text(`Ingredients: ${ingredients1} ${ingredients2} ${ingredients3} ${ingredients4} ${ingredients5} ${ingredients6}`);
            // apppends all info to drinksDiv
            drinksDiv.append(image, glassName, ingredients, drinkInstructions);
        });
    }
    // on click event for classic drink btns
    $(document).on("click", ".drink", classicDrinkButtons);

})