$(document).ready(function() {

var queryPath = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "api_key=pG74Ez5xu2bshU6HguRdNRcvi8FZUh1E";
var topics = ["Taylor Swift", "Bill Murray", "Aaron Rodgers", "Jennifer Aniston", "Brad Pitt"];
var limitReq = "&limit=10";
var rating = "&rating=g"

function renderButtons() {
    for (var i = 0  ; i < topics.length; i++) {
        var topicButton = $("<button>");        
        topicButton.addClass("button");
        topicButton.attr("data", topics[i]);
        topicButton.text(topics[i]);
        $(".buttons").append(topicButton);
    };
};

renderButtons();

$("button").on("click", function (){
    $(".main-container").empty();
    var searchTopic = "&q=" + $(this).attr("data").replace(/\s/, "+");
    console.log(searchTopic);
    $.ajax({
        url: queryPath + apiKey + searchTopic + limitReq + rating,
        method: "GET",
    })

    .done(function(response) {
        console.log(response);
        console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++)   {     
        var smallGIF = response.data[i].images.original.url;
        var staticGIF = response.data[i].images.original_still.url;
        console.log(smallGIF);
        var gifContainer = $("<div>");
        var gifImage = $("<img>");
        var ratingContainer = $("<div>");
        gifContainer.addClass("sub-container");        
        gifImage.addClass("results");
        gifImage.attr("data", smallGIF);
        gifImage.attr("src", staticGIF);
        ratingContainer.addClass("ratingContainer")
        ratingContainer.text("Rating: " + response.data[i].rating)            
        $(gifContainer).append(gifImage);
        $(gifContainer).append(ratingContainer); 
        $(".main-container").append(gifContainer);
        } //for loop closer
        
        $("img").on("click", function() {
            var src = $(this).attr("src");
            var data = $(this).attr("data");
            $(this).attr("data", data.replace(data, src));
            $(this).attr("src", src.replace(src, data));

        }); //img on.click closer       
    }); //.done closer
}); //button on.click closer


}); //close for document.ready