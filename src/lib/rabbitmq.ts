import amqplib, { Channel, ChannelModel, ConsumeMessage } from 'amqplib'

export class MessageQueueManager {
  private static instance: MessageQueueManager
  private connection: ChannelModel | null = null
  private channel: Channel | null = null
  private readonly url: string = 'amqp://admin:admin@localhost:5672'

  private constructor() {}

  public static getInstance(): MessageQueueManager {
    if (!MessageQueueManager.instance) {
      MessageQueueManager.instance = new MessageQueueManager()
    }
    return MessageQueueManager.instance
  }

  async connect() {
    try {
      this.connection = await amqplib.connect(this.url)
      this.channel = await this.connection.createChannel()
      console.log('✅ Connected to RabbitMQ')
    } catch (err) {
      console.error('❌ RabbitMQ connection error:', err)
    }
  }

  async registerQueue(queue: string) {
    if (!this.channel) throw new Error('Channel not initialized')
    await this.channel.assertQueue(queue, { durable: true })
  }

  async sendMessage(queue: string, message: string) {
    if (!this.channel) throw new Error('Channel not initialized')

    this.channel.sendToQueue(queue, Buffer.from(message))
  }

  async consumeMessage(queue: string) {
    if (!this.channel) throw new Error('Channel not initialized')
    try {
      await this.channel.prefetch(1)

      await this.channel.consume(queue, async (message) => {
        if (message) {
          await new Promise((r) => setTimeout(r, 2000))
          this.channel!.ack(message)
        }
      })
    } catch (err) {
      console.error('❌ RabbitMQ consume error:', err)
    }
  }

  private async registerExchange(exchange: string) {
    if (!this.channel) throw new Error('Channel not initialized')

    await this.channel.assertExchange(exchange, 'direct', { durable: true })
  }

  async sendMessageToExchange<T>(
    exchange: string,
    routingKey: string,
    message: {
      type: string
      data: T
    }
  ) {
    if (!this.channel) throw new Error('Channel not initialized')
    await this.registerExchange(exchange)
    this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)))
  }

  async receiveMessageFromExchange(
    queueName: string,
    exchange: string,
    routingKey: string,
    callback: (message: ConsumeMessage, channel: Channel) => void
  ) {
    if (!this.channel) throw new Error('Channel not initialized')
    await this.channel.assertQueue(queueName)
    await this.channel.bindQueue(queueName, exchange, routingKey)

    await this.channel.consume(queueName, (message) => {
      if (message) {
        callback(message, this.channel!)
      }
    })
  }

  async closeConnection() {
    await this.channel?.close()
    await this.connection?.close()
  }
}
