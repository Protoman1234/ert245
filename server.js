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

app.use(compression({
 level: 9,
threshold: 0
}))
app.enable('trust proxy');
app.get('/', authenticate, params, proxy);
app.get('/favicon.ico', (req, res) => res.status(204).end());

const options = {

  // Add your SSL key and certificate here
// **optional** SPDY-specific options
        spdy: {
            protocols: ['h2', 'spdy/3.1', 'http/1.1'],
            ssl: false,
            plain: false,
            connection: {
                windowSize: 1024 * 1024, // Server's window size
                // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
                // helpful for best performance behind SSL offload.
                autoSpdy31: true
            }
}
};
spdy.createServer(options, app).listen(PORT, () => console.log(`Listening on ${PORT}`));
