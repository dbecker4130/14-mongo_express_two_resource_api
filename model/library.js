'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('artist:library');
const Schema = mongoose.Schema;

const Artist = require('./artist.js');

const librarySchema = Schema({
  name: {type: String, required: true},
  timestamp: {type: String, required: true},
  artists: [{type: Schema.Types.ObjectId, ref: 'artist'}]
});

const Library = module.exports = mongoose.model('library, librarySchema');

Library.findByIdAndAddArtist = function(id, artist) {
  debug('findByIdAndAddArtist');

  return Library.findByID(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( library => {
    artist.libraryID = library._id;
    this.tempLibrary = library;
    return new Artist(artist).save();
  })
  .then( artist => {
    this.tempLibrary.notes.push(artist._id);
    this.tempArtist = artist;
    return this.tempLibrary.save();
  })
  .then( () => {
    return this.tempArtist;
  });
};
