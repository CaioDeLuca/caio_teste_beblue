
process.env.NODE_ENV = 'test';

app = require('../express-config/custom-express')();
request = require('supertest')(app);