var weather = require("./weather.js")
var http = require("http");


//Print out Error Messages
function printError(error) {
  console.error(error.message);
}

function getZip(zip) {  
  //Connect to the API of zipcode URL ("http://api.zippopotam.us/us/")
  var request = http.get("http://api.zippopotam.us/us/" + zip, function(response){
    var body = "";
      //Read the data
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function(){
      if(response.statusCode === 200){
        try{
          //Parse the data 
          var zipData = JSON.parse(body);
          //Print the data 
          weather.get(zipData.places[0]['latitude'], zipData.places[0]['longitude'], zipData.places[0]["place name"]);

        }catch(error){
          //Parse Error
          printError(error);
        }
      }else {
      //Status Code Error
        printError({message: "There was an error getting the zipcode information " + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      } 
    })
     //Connection Error
    request.on("error", printError)
  }); 
  } 
 


 module.exports.get = getZip;


