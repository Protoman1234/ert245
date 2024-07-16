'use strict'
const compression = require('compression');
const express = require('express');
const app = express();
const authenticate = require('./src/authenticate');
const params = require('./src/params');
const proxy = require('./src/proxy');
const spdy = require('spdy');
const fs = require('fs');

const PORT = 8080;

app.use(compression());
app.enable('trust proxy');
app.get('/', authenticate, params, proxy);
app.get('/favicon.ico', (req, res) => res.status(204).end());

spdy.createServer(app.listen(PORT, () => console.log(`Listening on ${PORT}`));
