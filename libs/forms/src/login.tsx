import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaLogin } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

export type FormTypeLogin = z.infer<typeof formSchemaLogin>

export const useFormLogin = () =>
  useForm<FormTypeLogin>({
    resolver: zodResolver(formSchemaLogin),
  })
