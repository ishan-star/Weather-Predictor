//jshint esversion:6

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));




app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html");


 app.post("/",function(req,res){
     
    const query = req.body.cityName;
 const appid = "476d93a45374157988f02b3366fee9dc";
 const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid +"&units=metric ";
 https.get(url,function(response){
     console.log(response.statusCode);
     response.on("data",function(data){
      const weatherdata = JSON.parse(data);
      const Temperature = weatherdata.main.temp;
      const weatherdes = weatherdata.weather[0].description;

      const icon = weatherdata.weather[0].icon;

      const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      
      res.write("<h1>Temperature in " + query +" is " + Temperature + " degree celsius</h1>");

      res.write("<p>The weather is currently " + weatherdes + "</p>");

      res.write("<img src="+ imageUrl+">");

      res.send();

     });

 });

 });
});







app.listen(3000,function(){
   console.log("Server is running on port 3000");
});
