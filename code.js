// on click for the city search button
$("#search-button").on("click", function (event) {
    event.preventDefault();

    var city = $("#searchInput").val();

    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&apikey=941abf696ec63ce79f180b076b8c17c5";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var hList = JSON.parse(localStorage.getItem("historyList"));
        console.log(response);
        //display weather from response
        showWeather(response);

        //push to history
        if (hList === null) {
            hList = [];
        }
        // the city, along with the data are pushed to the localStorage
        hList.push(city);
        localStorage.setItem("historyList", JSON.stringify(hList));
        console.log("Your cities selections: " + hList);
        cityList(hList);



        // function looping through the search buttons array
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

        // function that takes in data from the weather API to create a current day forecast
        function showWeather(response) {

            var title = $("<h2>").addClass("card-title").text(response.name);
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind speed is: " + response.wind.speed + " MPH");
            var humidity = $("<p>").addClass("card-text").text("The humidity is: " + response.main.humidity + " %");
            var temp = $("<p>").addClass("card-text").text("The temperature is: " + response.main.temp);
            var uvIndex = $("<p>").addClass("card-text").text("The UV Index is:");
            var cardBody = $("<div>").addClass("card-body");
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            // appends all elements to html
            title.append(image);
            cardBody.append(title, wind, humidity, temp, uvIndex);
            card.append(cardBody);
            $("#current").append(card);
        }
    });
});



//3) check the "one call API" to see if it contains UVI info. If so, we can use that for both UVI and 5 day forecast
//4) another ajax call (this can also be in a function) to get the 5 day forecast info from a different endpoint
//5) IF the "one call API " does not return UVI info, then we will need yet another ajax call to get that information