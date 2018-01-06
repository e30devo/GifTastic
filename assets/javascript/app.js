$(document).ready(function() {

var queryPath = "https://api.giphy.com/v1/gifs/search?"
var apiKey = "api_key=pG74Ez5xu2bshU6HguRdNRcvi8FZUh1E"
var topics = ["Taylor Swift", "Bill Murray",]


function renderButtons() {
    for (var i = 0  ; i < topics.length; i++) {
        var topicButton = $("<button>");
        console.log(topicButton);
        topicButton.addClass("button");
        topicButton.attr("data", topics[i]);
        topicButton.text(topics[i]);
        $(".buttons").append(topicButton);
    };
};

renderButtons();

$("button").on("click", function (){
    var searchTopic = "&q=" + $(this).attr("data").replace(/\s+/, "");
    console.log(searchTopic);
    $.ajax({
        url: queryPath + apiKey + searchTopic,
        method: "GET",
    })

    .done(function(response) {
        console.log(response);
        console.log(response.data.length);

        for (var i = 0; i < response.data.length; i++)   {     
        var smallGIF = response.data[[i]].images.original.url;
        console.log(smallGIF);
        $(".main-container").append("<img class=results>");        
        $(".results").attr("src", smallGIF);
        }

// <!-- These are hopefully created dynamically in app.js
//     <div class="results"></div>
// <div class="gif"></div>
// <div class="rating"></div> -->
    }); //.done closer
}); //on.click closer



//  onclick "this" ,query path 
// for loop for div containing div for gif and div for rating, patterned nicely



}); //close for document.ready