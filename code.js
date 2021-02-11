// / on click for the city search button
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
            var uvi = $("<p>").addClass("card-text").text("The UV Index is: 4.53")
            var temp = $("<p>").addClass("card-text").text("The temperature is: " + response.main.temp);
            var cardBody = $("<div>").addClass("card-body");
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            // appends all elements to html
            title.append(image);
            cardBody.append(title, wind, humidity, uvi, temp);
            card.append(cardBody);
            $("#current").append(card);

        }
        uvIndex(lat, lon);
    });
});



function uvIndex(lat, lon) {
    console.log("how much" + lat + lon);
}


var queryURL = "https://api.openweathermap.org/data/2.5/uvi?&latq=" + lat + "&lon" + lon + "&apikey=941abf696ec63ce79f180b076b8c17c5";

$.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {
    console.log("is this working for me: " + response);

    var uvi = $("<p>").addClass("card-text").text("The UV Index is: " + response.current.uvi);

    $("#current").append(uvi);
});








function fiveDay(city) {
    console.log(city);

   

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=941abf696ec63ce79f180b076b8c17c5";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
      

        for (var i = 35; i < response.list.length; i++) {
            console.log("is this working:" + city)

            var box = $("<div>").addClass("col-lg-2");
            var card = $("<div>").addClass("card").attr("style", "background-color: rgb(83, 130, 231)");
            var body = $("<div>").addClass("card-body");
            var title = $("<h4>").addClass("card-title");
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
            var city = $("<p>").addClass("card-text").text(response.name);
            var temp = $("<p>").text("Today's temperature; " + response.list[i].main.temp_max);
            var humidity = $("<p>").text("Today's humidity: " + response.list[i].main.humidity + "%");

           title.append(image, title);
           body.append(card);
           card.append(city, title, temp, humidity);
           box.append(card); 
           $("#forecast").append(box);
           
        }
    });
}


//5) IF the "one call API " does not return UVI info, then we will need yet another ajax call to get that information