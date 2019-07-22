const request = require('request-promise');
const API_KEY = '173d7fff69093e3a53b629a7ff3ca781';

//https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=173d7fff69093e3a53b629a7ff3ca781&units=imperial

class Weather {
    static retriveByCity(city,callback) {
        request({
            uri:`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`,
            json: true
        }).then(function(res){
            callback(res);
        }).catch(function(err){
            console.log(`OpenWeatherMap Error: ${err}`);
            callback({error: 'Could not reach OpenWeatherMap API!'});
        });
    }
}

module.exports = Weather; 