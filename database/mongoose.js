//Set up mongoose connection
const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {

	mongoose.connect(config.get('banco.url'), {
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: true
	});

	mongoose.Promise = global.Promise;

	mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

	return mongoose;
}