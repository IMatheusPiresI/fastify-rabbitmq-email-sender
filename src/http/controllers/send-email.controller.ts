import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { sendEmailSchema } from './schemas/send-email.schema'
import { MessageQueueManager } from '../../lib/rabbitmq'
import { SendEmailToExchangeQueue } from '../../use-cases/send-email/send-email-to-exchange-queue'
import { EMAIL_TYPE } from '../../use-cases/send-email/constants'

export const sendEmailTest = async (req: FastifyRequest, res: FastifyReply) => {
  const { to, subject, info } = sendEmailSchema.parse(req.body)
  const messageQueueManager = MessageQueueManager.getInstance()

  try {
    const sendEmailToExchangeQueue = new SendEmailToExchangeQueue(messageQueueManager)
    const { message } = await sendEmailToExchangeQueue.execute({
      type: EMAIL_TYPE.PASSWORD_RESET_EMAIL,
      to,
      subject,
      info,
    })

    res.status(200).send({ message })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error sending email'
    res.status(500).send({ message: errorMessage })
  }
}
