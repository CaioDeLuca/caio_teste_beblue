var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

var Spotify = require('spotify-finder');
const clientSpotfy = new Spotify({
    consumer: {
      key: 'key', // from v2.1.0 is required
      secret: 'secret key' // from v2.1.0 is required
    }
});

module.exports = function() {
    
    var app = express();
    
    app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	
    app.get('/', function(req, res){
	    res.status(200).send("Bem vindo API - Teste Beblue...");
	});

	app.clientSpotfy = clientSpotfy;

	// handle errors
	app.use(function(err, req, res, next) {
		
	    if(err.status == 404)
	       res.status(404).json({message: "Not found"});
	    else 
	        res.json(err);
	});

    consign()
	.include('routs')
    .then('database')
	.then('models')
    .into(app);

    return app;
}