'use strict';

const express = require('express');
const debug = require('debug')('artist:server');


const app = express();
const PORT = 3000;



app.listen(PORT, () => {
  debug(`server live on: ${PORT}`);
});
