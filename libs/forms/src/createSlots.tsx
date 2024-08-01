import { z } from 'zod'
import { formSchemaCreateSlot } from './createGarages'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export type FormTypeCreateManySlots = z.infer<typeof formSchemaCreateSlot>

export const useFormCreateManySlots = () =>
  useForm<FormTypeCreateManySlots>({
    resolver: zodResolver(formSchemaCreateSlot),
  })
