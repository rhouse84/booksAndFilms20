'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();

auth(passport);
app.use(passport.initialize());

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIEKEY]
}));
app.use(cookieParser());

var Author = require('./api/models/authorModel');
var Book = require('./api/models/bookModel');
var Director = require('./api/models/directorModel');
var Film = require('./api/models/filmModel');
var Topic = require('./api/models/topicModel');
var Quote = require('./api/models/quoteModel');

//Connect to mongoose
mongoose.connect(config.getDbConnectionString());
var db = mongoose.connection;

var router = require('./api/routes');
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port ', port);

