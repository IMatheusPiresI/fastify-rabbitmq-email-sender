import Fastify from 'fastify'
import { appRoutes } from './http/controllers/routes'

const app = Fastify({ logger: true })

app.register(appRoutes)

export default app
