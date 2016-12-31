'use strict';

const Router = require('express').Router;

const jsonParser = require('body-parser').json();
const Library = require('../model/library.js');
const Artist = require('../model/artist.js');
const createError = require('http-errors');

const artistRouter = module.exports = new Router();

artistRouter.post('/api/library/:libraryID/artist', jsonParser, function(req, res, next) {
  Library.findByIdAndAddArtist(req.params.libraryID, req.body)
  .then( artist => res.json(artist))
  .catch(next);
});

artistRouter.get('/api/artist/:id', function(req, res, next) {
  Artist.findByID(req.params.id)
  .then( artist => res.json(artist))
  .catch( err => next(createError(404, err.message)));
});

artistRouter.put('/api/artist/:id', jsonParser, function(req, res, next) {
  Artist.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then( artist => res.json(artist))
  .catch(next);
});

artistRouter.delete('api/artist/:id', function(req, res, next) {
  Library.findByIdAndRemoveArtist(req.params.id)
  .then( () => res.status(204).send())
  .catch(next);
});
