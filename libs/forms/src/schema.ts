import { z } from 'zod'

export const formSchemaRegister = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const formSchemaLogin = formSchemaRegister.pick({
  email: true,
  password: true,
})

export type FormTypeLogin = z.infer<typeof formSchemaLogin>
export type FormTypeRegister = z.infer<typeof formSchemaRegister>
