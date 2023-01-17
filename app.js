
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname+ "/public"));



app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
})




app.post("/", function(req, res){
const input = req.body.cityName;
const apiKey = "b96b2bef848cde7dc869a98a2756d272";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + apiKey + "&units=" + unit + "";
https.get(url, function(response){
  console.log(response.statusCode);
  response.on("data", function(data){
    const WeatherData = JSON.parse(data);
    const temperature = WeatherData.main.temp;
    const humidity = WeatherData.main.humidity;
    res.write("<h1> The Temperature of " + input + " at this time  is " + temperature + " degree celcius"+ "</h1>");
    res.write("<h1> The humidity of " + input + " is " + humidity + "</h1>");
    res.send();
  })
})
})






//This is where we create server on port 3000 and our computer act as server, if the code(app.js ) is not running on terminal it will
// not work on clients web browser

app.listen(3000,function(){
  console.log("The server is running on 3000 port");
})
