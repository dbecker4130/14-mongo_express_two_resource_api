'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('artist:server');

const libraryRouter = require('./route/library-route.js');
const artistRouter = require('./route/artist-route.js');
const errors = require('.lib/error-middleware.js');

const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost/artist';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(libraryRouter);
app.use(artistRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server live on: ${PORT}`);
});
