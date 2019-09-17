console.log("hey it worked");

var somethingArray = ["Drake", "Eminem", "Coheed and Cambria", "The killers", "Bright Eyes", "The Postal Service"];
function renderButtons() {
    console.log(somethingArray);
    $(".row2").empty();
    for (var i = 0; i < somethingArray.length; i++) {
        var button = $("<button>");
        button.addClass("somethingButton");
        button.attr("data-something", somethingArray[i]);
        button.text(somethingArray[i]);

        $(".row2").append(button);
    }
}
$("#add-something").on("click", function (event) {


    event.preventDefault();
    var something = $("#something-input").val().trim();
    somethingArray.push(something);
    $("#something-input").val("");
    renderButtons();
});

function fetchSomthingGifs() {
    var somethingName = $(this).attr("data-something");
    var somethingStr = somethingName.split("").join("+");

    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q=" + somethingStr + "&limit=15&offset=0&rating=G&lang=en";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=039e302706e04dc9935175cd77b88df2&q=" + somethingStr + "&limit=25&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(results) {
        var dataArray = results.data;
        $(".row3").empty();
        for(var i=0; i < dataArray.length; i++){

            var newDiv = $("<div>");
            newDiv.addCLass("somethingGif");
            var newRating = $("<h2>").html("Rating:" + dataArray[i].rating);
            newDiv.append(newRating);
            var img =$("<img>");
            img.attr("src", dataArray[i].images.fixed_height_stil.url);
            img.attr("data-still", dataArray[i].images.fixed_height_still.url);
            img.attr("data-animate", dataArray[i].images.fixed_height.url);
            img.attr("data-state", "still");
            newDiv.append(img);
            $(".row3").append(newDiv);
        }
    });
}
function animateGifs() {
    var state = $(this).find("img").attr("data-state");
    if (state === "still")
    {
        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    }
    else{
        $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        $(this).find("Img").attr("data-state", "still");
    }
}
$(document).ready(function(){
    renderButtons();
});
$(document).on("click", ".somethingButoon", fetchSomthingGifs);
$(document).on("click", ".somethingGif", animateGifs);