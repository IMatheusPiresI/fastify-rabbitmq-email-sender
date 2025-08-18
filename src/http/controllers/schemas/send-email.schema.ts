import { z } from 'zod'

export const sendEmailSchema = z.object({
  to: z.string(),
  subject: z.string(),
  info: z.object({
    empresa: z.string(),
    linkAcao: z.string(),
    nomeCliente: z.string(),
  }),
})
