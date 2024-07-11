'use strict'
const compression = require('compression');
const express = require('express');
const app = express();
const authenticate = require('./src/authenticate');
const params = require('./src/params');
const proxy = require('./src/proxy');


const PORT = 8080;

app.set('etag', false);

app.disable('etag');


app.use(compression({
  level: 9,
  threshold: 0
}))
app.disable('trust proxy');
app.get('/', authenticate, params, proxy);
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.listen(PORT, () => console.log(`Worker ${process.pid}: Listening on ${PORT}`));
