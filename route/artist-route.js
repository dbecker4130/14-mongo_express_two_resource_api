'use strict';

const Router = require('express').Router;

const jsonParser = require('body-parser').json();
const Library = require('../model/library.js');

const artistRouter = module.exports = new Router();

artistRouter.post('api/library/:libraryID/artist', jsonParser, function(req, res, next) {
  Library.findByIdAndAddArtist(req.params.libraryID, req.body)
  .then( artist => res.json(artist))
  .catch(next);
});
