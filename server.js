
'use strict'

const app = require('fastify')({
  logger: true
})

const authenticate = require('./src/authenticate')
const params = require('./src/params')
const proxy = require('./src/proxy')

const PORT = process.env.PORT || 8080


app.get('/', authenticate, params, proxy)
app.get('/favicon.ico', (req, res) => {
  res.send()
});

try {
app.listen(PORT);
} catch(error) {
  app.log.error(error);
  process.exit(1)
}
