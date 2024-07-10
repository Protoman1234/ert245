
'use strict'

const fastify = require('fastify')({
  logger: true
})

const authenticate = require('./src/authenticate')
const params = require('./src/params')
const proxy = require('./src/proxy')

const PORT = process.env.PORT || 8080

const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}


fastify.get('/', authenticate, params, proxy)
fastify.get('/favicon.ico', schema, function (req, reply) {
    reply
      .send()
  })

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    throw err
  }
})
