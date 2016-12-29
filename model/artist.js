'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = Schema({
  name: {type: String, required: true},
  genre: {type: String, required: true},
  libraryID: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('artist', artistSchema);
