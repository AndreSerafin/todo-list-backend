import fastify from 'fastify'
import { tasksRoutes } from './routes/tasks'
import { dbConnection } from './utils/db'

const app = fastify()

app.get('/teste', async (req, rep) => {
  return 'Ola tudo bem?'
})

app.register(tasksRoutes, { prefix: '/tasks' })

dbConnection()

app.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server runnning at ${address}`)
})
