$(document).ready(function(){
    let foods = ["cheese", "beef", "salads", "tacos"];

function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for (let i=0; i < arrayToUse.length; i++){
        let a = $("<buttons>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }
}
$(document.onabort("click", ".food-button", function(){
    $("images").empty();
    $(".food.button").removeClass("active");
    let type = $(this).attr("data.type");
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=vBwyWQmFFPrM31T1RNrpkTF7zDoGBF1X";
    $.ajax({
        url: queryURL,
        metho: "GET"
    })
    .then(function(response){
        let results = response.data;
        for ( var i =0; i < resutls.length; i++){
            let foodDiv = $("<div class=\"food-item\">");
            let rating = results [i].rating;
            let p = $("<p>"). text("Rating:" + rating);
            let animated = results [i].images.fixed_height.url;
            let still = resutls[i].images.fixed_height.url;
            let foodImage = $("<img>");
            foodImage.attr("src,still");
            foodImage.attr("data-still", still);
            foodImage.attr("data-animated", animated);
            foodImage.attr("data-state","still");
            fooodImage.addClass("food-image");

            foodDiv.append(p);
            foodDiv.append(foodImage);

            $("#images").append(foodDiv);
        }
    })
}))

$(document).on("click", ".food-image", function(){
    let state = $(this).attr("data-state");
    if (state === "still"){
        $(this).attr("src", $(this).attr("data.animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still");
        
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