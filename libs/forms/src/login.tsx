import { useForm } from 'react-hook-form'
import { formSchemaLogin, FormTypeLogin } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useFormLogin = () =>
  useForm<FormTypeLogin>({
    resolver: zodResolver(formSchemaLogin),
  })
