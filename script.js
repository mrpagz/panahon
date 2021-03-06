
            
//Retrieve item from local storage
var historyArray = JSON.parse(localStorage.getItem("searchHistory")) || [];

//Generates weather of the last city searched
var lastSearched = (historyArray[historyArray.length - 1]);
weatherCall(lastSearched);


//Search button
$("#searchButton").on("click", function (event) {
    event.preventDefault;
    var city = $(this).siblings("input").val();

    //Pushing city into history array
    if (city==="") {
        return;
    } else {
        historyArray.push(city);
        renderHistory();
    }

    weatherCall(city);
});

//Generating history buttons
$(document).on("click", ".list-group-item", function () {
    var city = $(this).text();
    weatherCall(city);
});

function getUVIndex(response) {

    var UVIndex = response.value;
    $("#UVIndexDiv").text("UV Index: ");

    //I need to make a div inside the title div and give it the UV value and the respective class attribute so it doesnt take up the screen
    var UVbutton = $("<p>");
    UVbutton.text(UVIndex);
    $("#UVIndexDiv").append(UVbutton);

}

function getTodaysWeather(response) {
    //Temperature is returned in Kelvin, so here it is converted to Fahrenheit and rounded to the second decimal place.
    var tempKelvin = response.main.temp;
    var tempFahrenheit = ((tempKelvin - 273.15) * 9 / 5 + 32).toFixed(2);
    var date = moment().format("l");

    // Display weather information on the page
    $("#cityName").text("City: " + response.name + " " + date);
    $("#temperature").text("Temperature: " + tempFahrenheit + "°F");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");

}

function getFiveDayForecast(response) {

    //Prevents the boxes from stacking on top of each other. Renders in a completely new row every time.
    $("#fiveDaySection").empty();

    //index will dictate which item from the 5 day json object's list array that we want.
    //dayCount allows us to add a day to the current date, increasing by 1 with each iteration of the loop, to get the dates for the next 5 days.
    var index = 0;
    var dayCount = 1;
    

    for (var i = 0; i < 5; i++) {
        //createForeCastDiv function
        var forecastDiv = $("<div>");
        forecastDiv.addClass("fiveDayForecastDiv");
        $("#fiveDaySection").append(forecastDiv);


        
        var nextDate = moment().add(dayCount, "day");
        nextDate = String(nextDate);

        //Use substring on the nextDate string to grab the relevant data from it.
        var nextDateSubString = nextDate.substring(0, 15);
       

        //Create a header to fill with the date
        var dateHeader = $("<h5>");

        //Append the new h5 tag to the forecast div and update the text within it with the subtring.
        forecastDiv.append(dateHeader);
        dateHeader.text(nextDateSubString);

        //Add 1 to day count to return the subsequent date.
        dayCount++;

        //createIcon
        var weatherIconURL = "http://openweathermap.org/img/w/" + response.list[index].weather[0].icon + ".png";

        var weatherIconImage = $("<img>");
        weatherIconImage.attr("src", weatherIconURL);

        forecastDiv.append(weatherIconImage);


        
        //Get the temp from the JSON object and convert it to Fahrenheit.
        var tempKelvin = response.list[index].main.temp;
        var tempFahrenheit = ((tempKelvin - 273.15) * 9 / 5 + 32).toFixed(2);

        //Create a p tag and fill it with the text and temp.
        var tempP = $("<p>");

        //Append the new p tag to the forecast div and update the text within it with the temperature.
        forecastDiv.append(tempP);
        tempP.text("Temp: " + tempFahrenheit + " °F");

        //Create a p tag and fill it with the text and temp.
        var humidityP = $("<p>");

        //Append the new p tag to the forecast div and update the text within it with the temperature.
        forecastDiv.append(humidityP);
        humidityP.text("Humidity: " + response.list[index].main.humidity + "%");

        index += 8;
    }
};
//AJAX Calls
function weatherCall(city) {
    var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f6f04dedfd17d5950fab75f1f38cb2d3";

    $.ajax({
        url: todayQueryURL,
        method: "GET"
    }).then(function (response) {
        getTodaysWeather(response);

        var lon = JSON.stringify(response.coord.lon);
        var lat = JSON.stringify(response.coord.lat);
        var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=f6f04dedfd17d5950fab75f1f38cb2d3";

        $.ajax({
            url: UVqueryURL,
            method: "GET"
        }).then(function (response) {
            //Passing the ajax response to the getUVIndex call
            getUVIndex(response);
        });
    });

    //5 Day Forecast call and handling
    var fiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=f6f04dedfd17d5950fab75f1f38cb2d3";

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function (response) {
        getFiveDayForecast(response);
    });
}

function renderHistory() {
    $(".list-group").empty();

        for (var i = 0; i < historyArray.length; i++) {
            var recentButton = $("<button class='list-group-item'>").text(historyArray[i]);
            $(".list-group").prepend(recentButton);
        };

    //Storing in local storage
    localStorage.setItem("searchHistory", JSON.stringify(historyArray));

    //Clears input
    $("input").val("");
};

renderHistory();
