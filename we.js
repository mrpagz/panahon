
    // Here we are building the URL we need to query the database
    

    // Here we run our AJAX call to the OpenWeatherMap API

    var cities = ["New York City", "Jersey City", "Buffalo City", "Niagara Falls City"];

    function cityWeatherInfo() {

      var city = $(this).attr("data-city");
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      city + "&appid=f6f04dedfd17d5950fab75f1f38cb2d3";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        // console.log(queryURL);

        // Log the resulting object
        // console.log(queryURL);

        var cityDiv = $("<div class='city'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          cityDiv.append(pOne);

          // Storing the release year
          var released = response.Released;

          var pTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
          movieDiv.append(pTwo);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
          movieDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          movieDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);

        // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);
        
        // // Convert the temp to fahrenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // // add temp content to html
        // $(".temp").text("Temperature (K) " + response.main.temp);
        // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Temperature (F): " + tempF);
    });
  }