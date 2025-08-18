import { emailTemplate } from '../resources/utils/email-template'
import {
  EMAIL_EXCHANGE,
  EMAIL_ROUTING_KEY,
  EMAIL_TEMPLATE_BY_TYPE,
  EMAIL_TYPE,
  QUEUE_NAME,
} from '../use-cases/send-email/constants'
import { MailSender } from './mail-sender'
import { MessageQueueManager } from './rabbitmq'

interface EmailData {
  to: string
  subject: string
  info: {
    empresa: string
    linkAcao: string
    nomeCliente: string
  }
}

interface EmailMessage {
  type: EMAIL_TYPE
  data: EmailData
}

async function startEmailConsumer() {
  const mqManager = MessageQueueManager.getInstance()
  const mailSender = MailSender.getInstance()
  await mailSender.createTransporter()

  await mqManager.connect()
  await mqManager.receiveMessageFromExchange(
    QUEUE_NAME.EMAIL_QUEUE,
    EMAIL_EXCHANGE.NOTIFICATION_MESSAGES,
    EMAIL_ROUTING_KEY.E_MAIL,
    async (message, channel) => {
      const { type, data } = JSON.parse(message.content.toString()) as EmailMessage

      await mailSender.createTransporter()
      const template = emailTemplate(EMAIL_TEMPLATE_BY_TYPE[type], {
        empresa: data.info.empresa,
        linkAcao: data.info.linkAcao,
        nomeCliente: data.info.nomeCliente,
      })

      await mailSender.sendMail(data.to, data.subject, template)
      channel.ack(message)
    }
  )
}

startEmailConsumer().catch((err) => {
  console.error('❌ Error starting consumer:', err)
})
