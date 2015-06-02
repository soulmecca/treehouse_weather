var https = require("https");


//print out Message
function printMessage(city, temp, summary) {
  var message = " Current temperature for " + city + " is " + temp + " and it is " + summary;
  console.log(message);

}

//Print out Error Messages
function printError(error) {
  console.error(error.message);
}

function getWeather(latitude, longitude, city) {  
  //Connenction to the API of weather URL (http//api.forecast.io/forecast/APIKEY/LATITUDE, LONGITUDE)

  var apikey = your apikey;
  
  request = https.get("https://api.forecast.io/forecast/" + apikey + "/" + latitude + "," + longitude, function(response) {

    var body = "";
    //Read data
    response.on('data', function(chunk){
    body += chunk;
    });
    //Parse the data
    response.on('end', function(){
      if(response.statusCode === 200){
        try{
          var weatherData = JSON.parse(body);
          //Print the data
          printMessage(city, weatherData.currently.temperature, weatherData.minutely.summary);
          
        }catch(error){
          //Parse Error
          printError({message: "There was an error parsing the forecast data - " + error});
        }
      }else {
      //Status Code Error
        printError({message: "There was an error getting the profile for " +  ". (" + http.STATUS_CODES[response.statusCOde] + ")"});
      } 
    })
     //Connection Error
      request.on("error", printError)
  });
};
 


module.exports.get = getWeather;
