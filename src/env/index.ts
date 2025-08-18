import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_FROM: z.string(),
})

export const _env = envSchema.parse(process.env)
