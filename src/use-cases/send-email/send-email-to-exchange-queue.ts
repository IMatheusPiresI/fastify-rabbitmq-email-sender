import { MessageQueueManager } from '../../lib/rabbitmq'
import { EMAIL_QUEUE_INFO, EMAIL_TYPE } from './constants'

interface SendEmailToExchangeQueueRequest {
  type: EMAIL_TYPE
  to: string
  subject: string
  info: {
    empresa: string
    linkAcao: string
    nomeCliente: string
  }
}

interface SendEmailToExchangeQueueResponse {
  message: string
}

export class SendEmailToExchangeQueue {
  messageQueueManager: MessageQueueManager

  constructor(messageQueueManager: MessageQueueManager) {
    this.messageQueueManager = messageQueueManager
  }

  async execute({
    type,
    to,
    subject,
    info,
  }: SendEmailToExchangeQueueRequest): Promise<SendEmailToExchangeQueueResponse> {
    await this.messageQueueManager.connect()
    await this.messageQueueManager.sendMessageToExchange(
      EMAIL_QUEUE_INFO[type].exchange,
      EMAIL_QUEUE_INFO[type].routingKey,
      {
        type,
        data: {
          to,
          subject,
          info,
        },
      }
    )

    await this.messageQueueManager.closeConnection()

    return {
      message: 'Email sent to exchange queue',
    }
  }
}
