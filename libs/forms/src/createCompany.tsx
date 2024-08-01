import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const formschemaCreateCompany = z.object({
  displayName: z.string().min(1, { message: 'Company name is required' }),
  description: z.string(),
  managerId: z.string().min(1, { message: 'Manager ID is required' }),
  managerName: z.string().optional().nullable(),
})

export type FormTypeCreateCompany = z.infer<typeof formschemaCreateCompany>

export const useFormCreateCompany = () =>
  useForm<FormTypeCreateCompany>({
    resolver: zodResolver(formschemaCreateCompany),
  })
