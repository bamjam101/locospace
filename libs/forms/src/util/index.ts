import { FormTypeSearchGarages } from '../searchGarages'

export const isStartTimeValid = (startTime: string) => {
  const startDate = new Date(startTime)

  return startDate > new Date()
}

export const isEndTimeValid = ({
  startTime,
  endTime,
}: {
  startTime: string
  endTime: string
}) => {
  const endDate = new Date(endTime)
  const startDate = new Date(startTime)

  return endDate > startDate
}
