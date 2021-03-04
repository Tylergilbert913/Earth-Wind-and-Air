// / on click for the city search button
$("#search-button").on("click", function (event) {
    event.preventDefault();

    var city = $("#searchInput").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=941abf696ec63ce79f180b076b8c17c5";
// function that will search through each city anf return a current day forecast
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var hList = JSON.parse(localStorage.getItem("historyList"));
        console.log(response);
        //display weather from response
        showWeather(response);
        fiveDay(city);



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
            var cardBody = $("<div>").addClass("card-body");
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            title.append(image);
            cardBody.append(title, wind, humidity, temp);
            card.append(cardBody);
            $("#current").append(card);

        }
        getUVIndex(response.coord.lat, response.coord.lon);
    });
});

// function for the UV index that has a buttont that will change color as the index goes up and down
function getUVIndex(lat, lon) {
    console.log("Your lat and lon", + lat + lon);

    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=941abf696ec63ce79f180b076b8c17c5&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var uv = $("<p>").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(response.value);

        // change color depending on uv value
        if (response.value < 3) {
            btn.addClass("btn-success");
        }
        else if (response.value < 7) {
            btn.addClass("btn-warning");
        }
        else {
            btn.addClass("btn-dangeresponse");
        }

        $("#current .card-body").append(uv.append(btn));
    });
};


// function for 5-day forecast 

function fiveDay(city) {
    console.log(city);

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=941abf696ec63ce79f180b076b8c17c5";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

// loops through the five-day forecast, had do use 35, because I was getting a return of 40 days
        for (var i = 35; i < response.list.length; i++) {
            console.log("is this working 2:" + city)

            var box = $("<div>").addClass("col-lg-2");
            var card = $("<div>").addClass("card").attr("style", "background-color: rgb(83, 130, 231)");
            var body = $("<div>").addClass("card-body");
            var title = $("<h4>").addClass("card-title");
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
            var city = $("<p>").addClass("card-text").text(response.name);
            var temp = $("<p>").text("Today's temperature; " + response.list[i].main.temp_max);
            var humidity = $("<p>").text("Today's humidity: " + response.list[i].main.humidity + "%");
// appends all to the card-body, then the card its self
            title.append(image, title);
            body.append(card);
            card.append(city, title, temp, humidity);
            box.append(card);
            $("#forecast").append(box);

        }
    });
}


