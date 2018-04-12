'use strict';
const express = require('express');
const passport = require('passport');
const auth = require('../auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
require('dotenv').config();
var router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email']   
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}),
(req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
});

//not working. need to figure this out
//can i somehow programattically logout of google? Not sure. 
router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

//temporary until we get a front end
//router.get('/', function(req, res) {
router.use(function(req, res, next) {
	if (req.session.token) {
		res.cookie('token', req.session.token);

		var currentUserEmail = req.session.passport.user.profile.emails[0].value;
		if (currentUserEmail === process.env.OWNEREMAIL) {
			global.readOnly = false;
		} else {
			global.readOnly = true;
		}
		//res.json({
        //    status: 'session cookie set',
        //    name: req.session.passport.user.profile.name.givenName
		//});
        next();
	} else {
		res.redirect('/auth/google');
	}
});

var author = require('./controllers/authorController');
var book = require('./controllers/bookController');
var director = require('./controllers/directorController');
var film = require('./controllers/filmController');
var topic = require('./controllers/topicController');
var quote = require('./controllers/quoteController');

// author routes
router.get('/api/authors', author.getAuthors);
router.post('/api/authors', author.addAuthor);
router.get('/api/authors/:_id', author.getAuthor);
router.put('/api/authors/:_id', author.updateAuthor);
router.delete('/api/authors/:_id', author.removeAuthor);

// book routes
router.get('/api/books', book.getBooks);
router.post('/api/books', book.addBook);
router.get('/api/books/:_id', book.getBook);
router.put('/api/books/:_id', book.updateBook);
router.delete('/api/books/:_id', book.removeBook);
router.get('/api/booksByAuthor/:_authorId', book.getBooksByAuthor);

// director routes
router.get('/api/directors', director.getDirectors);
router.post('/api/directors', director.addDirector);
router.get('/api/directors/:_id', director.getDirector);
router.put('/api/directors/:_id', director.updateDirector);
router.delete('/api/directors/:_id', director.removeDirector);

// film routes
router.get('/api/films', film.getFilms);
router.post('/api/films', film.addFilm);
router.get('/api/films/:_id', film.getFilm);
router.put('/api/films/:_id', film.updateFilm);
router.delete('/api/films/:_id', film.removeFilm);
router.get('/api/filmsByDirector/:_directorId', film.getFilmsByDirector);

// topic routes
router.get('/api/topics', topic.getTopics);
router.post('/api/topics', topic.addTopic);
router.get('/api/topics/:_id', topic.getTopic);
router.put('/api/topics/:_id', topic.updateTopic);
router.delete('/api/topics/:_id', topic.removeTopic);

// quote routes
router.get('/api/quotes', quote.getQuotes);
router.post('/api/quotes', quote.addQuote);
router.get('/api/quotes/:_id', quote.getQuote);
router.put('/api/quotes/:_id', quote.updateQuote);
router.delete('/api/quotes/:_id', quote.removeQuote);
router.get('/api/quotesByBook/:_bookId', quote.getQuotesByBook);
router.get('/api/quotesByFilm/:_filmId', quote.getQuotesByFilm);

module.exports = router;