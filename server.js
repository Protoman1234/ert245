#!/usr/bin/env node
'use strict'
//const compression = require('compression')
const express = require('express')
const app = express()
const authenticate = require('./src/authenticate')
const params = require('./src/params')
const proxy = require('./src/proxy')

const PORT = 8080
//app.use(compression())
app.enable('trust proxy')
app.get('/', authenticate, params, proxy)
app.get('/favicon.ico', (req, res) => res.status(204).end())
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
