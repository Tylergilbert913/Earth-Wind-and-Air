// $(document).ready(function() {
//     $("#search-button").on("click", function() {
//         var inputSearch = $("#search-value").val();
//     }
// });


 var inputSearch = $("#search-value").val();
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + inputSearch +"&apikey=941abf696ec63ce79f180b076b8c17c5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
    });



    // var queryURL = "https://www.omdbapi.com/?t=" + inputSearch + "&apikey=trilogy";

    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });



    // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });