$(document).ready(function () {
    randomDrink();
    // on click event for classic drink btns
    $(document).on("click", ".drink", classicDrinkButtons);

    function randomDrink() {
        // this random url will be used as the 'Drink of the Hour' card.
        const randomDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic"
        // ajax call for randomDrinkURL
        $.ajax({
            url: randomDrinkURL,
            method: "GET"
        }).then(function (response) {
            displayDrink(response.drinks[0], $('#randomdrinktitle'), $("#randomText"));
        });
    }

    // this function controls the classic drink btns
    function classicDrinkButtons() {
        const searchDrinkURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${$(this).attr("data-name")}`;
        $.ajax({
            url: searchDrinkURL,
            method: "GET"
        }).then(function (response) {
            // Remove the existing drink that's selected, and add the new one
            $("#classic-drink-title").empty();
            $(".classic-drinks").empty();
            displayDrink(response.drinks[0], $("#classic-drink-title"), $(".classic-drinks"));
        });
    }

    /*
        Both the random drink and the classic drinks have a lot of shared behavior.
        this 'displayDrink' method encapsulates that. From what was previously here,
        all we need are the 2 DOM elements for the drink title, and the drink description
        area where the picture, ingredients, glass, and instructions display.
    */
    function displayDrink(drink, titleElement, descriptionElement) {
        let ingredientsList = getIngredients(drink);
        
        const ingredientStr = ingredientsList
            // .map(x => x.measure == null ? '' x.measure + x.ingredient) // If we want the measurement
            .map(x => x.ingredient)
            .join(" ");
        
        let randomName        = $("<p>").text(`${drink.strDrink}`);
        let ingredients       = $("<p>").text(`Ingredients: ${ingredientStr}`);
        let glassName         = $("<p>").text(`Glass: ${drink.strGlass}`);
        let drinkInstructions = $("<p>").text(`Instructions: ${drink.strInstructions}`);
        var image             = $("<img>").attr("src", drink.strDrinkThumb);

        titleElement      .append(randomName);
        descriptionElement.append(image, glassName, ingredients, drinkInstructions);
    }

    function getIngredients(drink) {
        let ingredientsList = [];
        var i;
        for(i = 1; i <= 15; i++) {
            // The API doesn't return a json list, so we have to do this nonsense
            // to keep the ingredients in line with the measurements
            var recipe = {
                ingredient: drink["strIngredient" + i],
                measure:    drink["strMeasure"    + i]
            }

            if(recipe.ingredient != null)
                ingredientsList.push(recipe);
        }
        return ingredientsList;
    }
})