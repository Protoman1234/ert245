#!/usr/bin/env node
'use strict'

const fastify = require("fastify")({ logger: true })
const authenticate = require('./src/authenticate')
const params = require('./src/params')
const proxy = require('./src/proxy')

const PORT = process.env.PORT || 8080



fastify.get('/', authenticate, params, proxy)
fastify.get('/favicon.ico', async(req, reply) =>{
  return "Hello, World!"
})

fastify.listen(PORT, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Fastify app listening at ${address}`)
})
