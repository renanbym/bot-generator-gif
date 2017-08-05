const config = require('./config.json');
const request = require('request');

module.exports = {
    getAnyGif: ( callback ) => {
        request({
            uri: "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key="+config.giphy+"&limit=1",
            method: 'GET'
        },  (error, response, body) =>  {
            if (!error && response.statusCode == 200) {
                callback( error, body );
            }
        });
    }

}
