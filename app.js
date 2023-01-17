// This is the first section which is all about npm node package manager, initializing it then installing necessary packages


// // This part is requiring part
// const superheroes = require("superheroes");
// const supervillains = require("supervillains");
// const catName = require("cat-names");
// const superb = require("superb");
//
//
//
// // This part is using part
//
// const mySh = superheroes.random();
// const mySV = supervillains.random();
// const catname = catName.random();
// const superword = superb.random();
//
// console.log("my superhero is " +  mySh);
// console.log("my supervillain is " + mySV);
// console.log("here is random cat name: "   + catname);
// console.log("The word of the day : " + superword);


//THE ABOVE CODE IS ALL ABOUT NPM, HOW TO INITIALIZE, INSTALL AND FINALLY USE THEM


//The following section will be how to use api(api endpoint, path, parameter and authentication)

//requireing express,bodyParser,https

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

// using express() and bodyParse
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Static file using

app.use(express.static(__dirname+ "/public"));

//This is the section of app.get which is used to send the response to the client when they see the root server

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
})


//Below is app.post section where we can get input from client server and use api key to fetch the data related to the
// input we get from clients

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
