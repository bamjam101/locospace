import { SlotType } from '@locospace/network/src/gql/generated'

import { z } from 'zod'
import { toLocalISOString } from '@locospace/util/src/date'
import { ReactNode } from 'react'
import { DefaultValues, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const minMaxTuple = z.tuple([z.number(), z.number()])

export const formSchemaSearchGarages = z.object({
  startTime: z.string(),
  endTime: z.string(),

  locationFilter: z.object({
    ne_lat: z.number().optional(),
    ne_lng: z.number().optional(),
    sw_lat: z.number().optional(),
    sw_lng: z.number().optional(),
  }),

  type: z.nativeEnum(SlotType).array(),

  pricePerHour: minMaxTuple.optional(),
  height: minMaxTuple.optional(),
  width: minMaxTuple.optional(),
  length: minMaxTuple.optional(),

  skip: z.number().optional(),
  take: z.number().optional(),
})

export type FormTypeSearchGarages = z.infer<typeof formSchemaSearchGarages>

const isStartTimeValid = (data: FormTypeSearchGarages) => {
  const startDate = new Date(data.startTime)

  return startDate > new Date()
}

const isEndTimeValid = (data: FormTypeSearchGarages) => {
  const endDate = new Date(data.endTime)
  const startDate = new Date(data.startTime)

  return endDate > startDate
}

formSchemaSearchGarages
  .refine(isStartTimeValid, {
    message: 'Start time must be in the future',
    path: ['startTime'],
  })
  .refine(isEndTimeValid, {
    message: 'End time must be after start time',
    path: ['endTime'],
  })

export const getCurrentTimeAndOneHourLater = () => {
  const startTime = new Date()
  startTime.setMinutes(startTime.getMinutes() + 5)

  const endTime = new Date(startTime)
  endTime.setHours(endTime.getHours() + 1)

  return {
    startTime: toLocalISOString(startTime).slice(0, 16),
    endTime: toLocalISOString(endTime).slice(0, 16),
  }
}

export const AllSlotTypes = [
  SlotType.Bicycle,
  SlotType.Car,
  SlotType.Bike,
  SlotType.Heavy,
]

export const formDefaultValueSearchGarages: DefaultValues<FormTypeSearchGarages> =
  {
    pricePerHour: [0, 200],
    width: [0, 20],
    height: [0, 100],
    length: [0, 100],
    type: AllSlotTypes.sort(),
  }

export const FormProviderSearchGarages = ({
  children,
}: {
  children: ReactNode
}) => {
  const { startTime, endTime } = getCurrentTimeAndOneHourLater()

  const methods = useForm<FormTypeSearchGarages>({
    resolver: zodResolver(formSchemaSearchGarages),
    defaultValues: {
      ...formDefaultValueSearchGarages,
      startTime,
      endTime,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
