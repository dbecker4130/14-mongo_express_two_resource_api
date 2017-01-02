'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('artist:library');
const Schema = mongoose.Schema;

const Artist = require('./artist.js');

const librarySchema = Schema({
  name: { type: String, required: true},
  timestamp: { type: Date, required: true},
  artists: [{ type: Schema.Types.ObjectId, ref: 'artist'}]
});

const Library = module.exports = mongoose.model('library', librarySchema);

Library.findByIdAndAddArtist = function(id, artist) {
  debug('findByIdAndAddArtist');
  console.log(id);
  return Library.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( library => {
    console.log(library);
    artist.libraryID = library._id;
    this.tempLibrary = library;
    return new Artist(artist).save();
  })
  .then( artist => {
    this.tempLibrary.artists.push(artist._id);
    this.tempArtist = artist;
    return this.tempLibrary.save();
  })
  .then( () => {
    return this.tempArtist;
  });
};

Library.findByIdAndRemoveArtist = function(id) {
  debug('findByIdAndRemoveArtist');

  return Library.findById(id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( artist => {
    this.tempArtist = artist;
    return Artist.findByIdAndRemove(artist._id);
  })
  .then( () => Library.findById(this.tempArtist.libraryID))
  .then( library => {
    library.artists.splice(library.artists.indexOf(this.tempArtist._id), 1);
    this.tempLibrary = library;
    return this.tempLibrary;
  });

};
