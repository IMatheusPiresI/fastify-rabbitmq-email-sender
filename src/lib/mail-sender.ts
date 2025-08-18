import nodemailer, { Transporter } from 'nodemailer'
import { _env } from '../env'

export class MailSender {
  private static instance: MailSender
  private transporter: Transporter | null = null

  private constructor() {}

  public static getInstance(): MailSender {
    if (!MailSender.instance) {
      MailSender.instance = new MailSender()
    }
    return MailSender.instance
  }

  async createTransporter() {
    this.transporter = nodemailer.createTransport({
      host: _env.MAIL_HOST,
      port: _env.MAIL_PORT,
      secure: false,
      from: _env.MAIL_FROM,
      auth: {
        user: _env.MAIL_USER,
        pass: _env.MAIL_PASSWORD,
      },
    })
  }

  async sendMail(to: string, subject: string, html: string) {
    if (!this.transporter) {
      throw new Error('Transporter not created')
    }

    await this.transporter.sendMail({
      to,
      subject,
      html,
    })
  }
}
