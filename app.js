const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
  
});

app.post("/", (req, res) => {
    
    const query = req.body.cityName;
    const apiKey = "440ed6085accc3edc88538b4ff5ff495";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The tempearature in " + query + " is " + temperature + " degrees celcius</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });

});











app.listen(3000, function() {
    console.log("server is running on port 3000");
});