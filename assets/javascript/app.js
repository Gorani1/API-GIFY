$(document).ready(function(){
    var foods = ["cheese", "beef", "salads", "tacos"];

function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    console.log (arrayToUse)
    console.log (areaToAddTo)
    for (let i=0; i < arrayToUse.length; i++){
        var a = $("<button>");
        a.addClass(classToAdd);
        console.log(classToAdd)
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }
}
$(document).on ("click", ".food-button", function(){
    $("images").empty();
    $(".food.button").removeClass("active");
    let type = $(this).attr("data-type");
    console.log(this)
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=vBwyWQmFFPrM31T1RNrpkTF7zDoGBF1X&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        var results = response.data;
        console.log (results)
        for ( var i =0; i < results.length; i++){
            let foodDiv = $("<div class=\"food-item\">");
            let rating = results[i].rating;
            let p = $("<p>"). text("Rating:" + rating);
            let animated = results[i].images.fixed_height.url;
            let still = results[i].images.fixed_height_still.url;
            let foodImage = $("<img>");
            foodImage.attr("src",still);
            foodImage.attr("data-still", still);
            foodImage.attr("data-animate", animated);
            foodImage.attr("data-state",still);
            foodImage.addClass("food-image");

            foodDiv.append(p);
            foodDiv.append(foodImage);

            $("#images").append(foodDiv);
        }
    })
})

$(document).on("click", ".food-image", function(){
    let state = $(this).attr("data-state");
    console.log(state)
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        
    }
});
$("#add-food").on("click", function(event){
    event.preventDefault();
    let newFood = $("input").eq(0).val();

    if (newFood.length > 2){
        foods.push(newFood);
    }

    populateButtons(foods, "food-button", "#food-buttons");
    
})
populateButtons(foods, "food-button", "#food-buttons");
})