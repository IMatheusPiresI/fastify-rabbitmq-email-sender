import { FastifyInstance } from 'fastify'
import { sendEmailTest } from './send-email.controller'

export const appRoutes = (app: FastifyInstance) => {
  app.post('/send-email', sendEmailTest)
}
