import { SlotType } from '@locospace/network/src/gql/generated'
import { z } from 'zod'
import { isEndTimeValid, isStartTimeValid } from './util'
import { DefaultValues, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'

export const locationInfo = z.object({
  lat: z.number(),
  lng: z.number(),
  distance: z.number().optional(),
  notes: z.string().optional(),
})

export const formSchemaValet = z.object({
  pickupInfo: locationInfo,
  dropofInfo: locationInfo,
  differentLocations: z.boolean().optional(),
})

export const formSchemaBookSlot = z
  .object({
    startTime: z.string(),
    endTime: z.string(),
    vehicleNumber: z.string().min(1, { message: 'Vehicle number is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    type: z.nativeEnum(SlotType, {
      required_error: 'Slot type is required',
    }),
    valet: formSchemaValet.optional(),
  })
  .refine(({ startTime }) => isStartTimeValid(startTime), {
    message: 'Start time should be greater than current time',
    path: ['startTime'],
  })
  .refine(({ endTime, startTime }) => isEndTimeValid({ endTime, startTime }), {
    message: 'End time should be greater than start time',
    path: ['endTime'],
  })

export type FormTypeBookSlot = z.infer<typeof formSchemaBookSlot>

export const FormProviderBookSlot = ({
  children,
  defaultValues,
}: {
  children: ReactNode
  defaultValues: DefaultValues<FormTypeBookSlot>
}) => {
  const methods = useForm<FormTypeBookSlot>({
    resolver: zodResolver(formSchemaBookSlot),
    defaultValues,
    mode: 'onChange',
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
