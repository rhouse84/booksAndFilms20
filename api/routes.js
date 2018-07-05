'use strict';
const express = require('express');
require('dotenv').config();
const router = express.Router();
const cors = require('cors');
const GoogleSignIn = require('google-sign-in');
const project = new GoogleSignIn.Project(process.env.CLIENTID);

const author = require('./controllers/authorController');
const book = require('./controllers/bookController');
const director = require('./controllers/directorController');
const film = require('./controllers/filmController');
const topic = require('./controllers/topicController');
const quote = require('./controllers/quoteController');

// Unprotected routes

router.get('/api/authors', author.getAuthors);
router.get('/api/authors/:_id', author.getAuthor);
router.get('/api/authorSearch/:_search', author.searchAuthors);
router.get('/api/books', book.getBooks);
router.get('/api/bookSearch/:_search', book.searchBooks);
router.get('/api/books/:_id', book.getBook);
router.get('/api/booksByAuthor/:_authorId', book.getBooksByAuthor);
router.get('/api/directors', director.getDirectors);
router.get('/api/directors/:_id', director.getDirector);
router.get('/api/directorSearch/:_search', director.searchDirectors);
router.get('/api/films', film.getFilms);
router.get('/api/filmSearch/:_search', film.searchFilms);
router.get('/api/films/:_id', film.getFilm);
router.get('/api/filmsByDirector/:_directorId', film.getFilmsByDirector);
router.get('/api/topics', topic.getTopics);
router.get('/api/topicSearch/:_search', topic.searchTopics);
router.get('/api/topics/:_id', topic.getTopic);
router.get('/api/quotes', quote.getQuotes);
router.get('/api/quotes/:_id', quote.getQuote);
router.get('/api/quotesByBook/:_bookId', quote.getQuotesByBook);
router.get('/api/quotesByFilm/:_filmId', quote.getQuotesByFilm);

router.get('/error', (req, res) => {

    res.json('Error route');

});

// For the routes below, we will verify they have a valid token

router.use(function(req, res, next) {

	// Grab the token off the head: 
	const token = req.headers['token'];

    project.verifyToken(token).then((jsonData) => {
        next();
    }, (error) => {
        console.log('Error! ', error.message);
        res.redirect('/error');
    });

});

// Protected routes

// author routes
router.post('/api/authors', author.addAuthor);
router.put('/api/authors/:_id', author.updateAuthor);
router.delete('/api/authors/:_id', author.removeAuthor);

// book routes
router.post('/api/books', book.addBook);
router.put('/api/books/:_id', book.updateBook);
router.delete('/api/books/:_id', book.removeBook);

// director routes
router.post('/api/directors', director.addDirector);
router.put('/api/directors/:_id', director.updateDirector);
router.delete('/api/directors/:_id', director.removeDirector);

// film routes
router.post('/api/films', film.addFilm);
router.put('/api/films/:_id', film.updateFilm);
router.delete('/api/films/:_id', film.removeFilm);

// topic routes
router.post('/api/topics', topic.addTopic);
router.put('/api/topics/:_id', topic.updateTopic);
router.delete('/api/topics/:_id', topic.removeTopic);

// quote routes
router.post('/api/quotes', quote.addQuote);
router.put('/api/quotes/:_id', quote.updateQuote);
router.delete('/api/quotes/:_id', quote.removeQuote);

module.exports = router;
