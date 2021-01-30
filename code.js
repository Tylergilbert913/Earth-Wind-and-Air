$("#search-button").on("click", function (event) {
  event.preventDefault();

  var city = $("#search-value").val();

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&apikey=941abf696ec63ce79f180b076b8c17c5";

  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var hList = JSON.parse(localStorage.getItem("historyList")) || [];
    console.log(response);
    //display weather from response
    showWeather(response);

    //push to history
    if (hList === null) {
      hList = [];
    }

    hList.push(city);
    localStorage.setItem("historyList", JSON.stringify(hList));
    console.log("Your cities selections: " + hList);
    cityList(hList);
 
  });
});

//Things we need now:
//1) a function that will take in our array of city names and loop through it to create the history section of our HTML
function cityList(hList) {
  $("#cityDump").empty();
  for (var i = 0; i < hList.length; i++) {
    var cities = $("<button>");
    cities.addClass("list");
    cities.attr("data-name", hList[i]);
    cities.text(hList[i]);
    $("#cityDump").append(cities);
  }
}

//2) a function that will use our response from openweathermap to create the "current weather" section of our HTML
function showWeather(response) {
  console.log(response);
  var title = $("<h3>");
  var card = $("<div>");
  var wind = $("<p>");
  var humidity = $("<p>");
  var temp = $("<p>");
  var cardBody = $("<div>");
  var image = $("<img>");
}
//3) check the "one call API" to see if it contains UVI info. If so, we can use that for both UVI and 5 day forecast
//4) another ajax call (this can also be in a function) to get the 5 day forecast info from a different endpoint
//5) IF the "one call API " does not return UVI info, then we will need yet another ajax call to get that information
