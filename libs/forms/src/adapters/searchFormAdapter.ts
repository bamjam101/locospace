import { SearchGaragesQueryVariables } from '@locospace/network/src/gql/generated'
import { FormTypeSearchGarages } from '../searchGarages'
import { useState, useEffect } from 'react'
import {
  FieldNamesMarkedBoolean,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { useDebounce } from '@locospace/util/src/hooks/async'
import { intFilter } from './util'

type FormData = Partial<
  Pick<
    FormTypeSearchGarages,
    | 'endTime'
    | 'startTime'
    | 'height'
    | 'length'
    | 'width'
    | 'pricePerHour'
    | 'types'
    | 'locationFilter'
    | 'skip'
    | 'take'
  >
>

export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] =
    useState<SearchGaragesQueryVariables | null>(null)

  const {
    formState: { dirtyFields, errors },
    watch,
  } = useFormContext<FormTypeSearchGarages>()

  const formData = useWatch<FormTypeSearchGarages>()

  const [debouncedFormData, { debouncing }] = useDebounce(formData, 300)

  const hasErrors = Object.keys(errors).length !== 0

  useEffect(() => {
    const {
      endTime = '',
      startTime = '',
      locationFilter: locationBounds,
      length,
      width,
      height,
      pricePerHour,
      types,
      skip,
      take,
    } = debouncedFormData

    if (!startTime || !endTime || !locationBounds) {
      return
    }

    const { ne_lat = 0, ne_lng = 0, sw_lat = 0, sw_lng = 0 } = locationBounds
    const slotsFilter = createSlotsFilter(dirtyFields, {
      length,
      width,
      height,
      pricePerHour,
      types,
    })

    const garagesFilter = createGaragesFilter(dirtyFields, {
      skip,
      take,
    })

    setVariables({
      dateFilter: {
        start: startTime,
        end: endTime,
      },
      locationFilter: { ne_lat, ne_lng, sw_lat, sw_lng },
      ...(Object.keys(slotsFilter).length && { slotsFilter }),
      ...(Object.keys(garagesFilter).length && { garagesFilter }),
    })
  }, [debouncedFormData])

  return {
    variables: hasErrors ? null : variables,
    debouncing,
  }
}

export const createSlotsFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarages>,
  formData: FormData,
) => {
  const length = dirtyFields.length && intFilter(formData.length)
  const width = dirtyFields.width && intFilter(formData.width)
  const height = dirtyFields.height && intFilter(formData.height)
  const pricePerHour =
    dirtyFields.pricePerHour && intFilter(formData.pricePerHour)
  const type = dirtyFields.types && { in: formData.types }

  return {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
    ...(pricePerHour && { pricePerHour }),
    ...(type && { type }),
  }
}

export const createGaragesFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarages>,
  formData: FormData,
) => {
  const skip = (dirtyFields.skip && formData.skip) || 0
  const take = (dirtyFields.take && formData.take) || 10

  return {
    ...(skip && { skip }),
    ...(take && { take }),
  }
}
