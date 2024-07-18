import { useForm } from 'react-hook-form'
import { formSchemaRegister, FormTypeRegister } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(formSchemaRegister),
  })
