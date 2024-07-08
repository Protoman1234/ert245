#!/usr/bin/env node
'use strict'

const fastify = require("fastify")({ logger: true })
const authenticate = require('./src/authenticate')
const params = require('./src/params')
const proxy = require('./src/proxy')

const PORT = process.env.PORT || 8080

fastify.enable('trust proxy')

fastify.get('/', authenticate, params, proxy)
fastify.get('/favicon.ico', (req, res) => res.status(204).end())
fastify.listen(PORT);
