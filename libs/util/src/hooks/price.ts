import { useWatch } from 'react-hook-form'
import { FormTypeBookSlot } from '@locospace/forms/src/bookSlot'
import { useState, useEffect } from 'react'
import { differenceInTime } from '../date'
import { VALET_CHARGE_PER_METER } from '../constants'
export type TotalPriceType = {
  pricePerHour?: number
}

export const useTotalPrice = ({ pricePerHour }: TotalPriceType) => {
  const { startTime, endTime, valet } = useWatch<FormTypeBookSlot>()

  const [parkingCharge, setParkingCharge] = useState(0)
  const [valetChargePickup, setValetChargePickup] = useState(0)
  const [valetChargeDropoff, setValetChargeDropof] = useState(0)

  useEffect(() => {
    if (!startTime || !endTime) return
    if (!pricePerHour) return

    const differeceInMilliseconds = differenceInTime({
      startTime,
      endTime,
    })
    const differenceInHours = differeceInMilliseconds / (60 * 60 * 1000)

    const parkingCharge = Math.floor((pricePerHour || 0) + differenceInHours)

    setParkingCharge(parkingCharge)
  }, [pricePerHour, startTime, endTime])

  useEffect(() => {
    const pickupCharge = valet?.pickupInfo?.distance
      ? valet?.pickupInfo?.distance * VALET_CHARGE_PER_METER
      : 0
    const dropOfCharge = valet?.dropofInfo?.distance
      ? valet?.dropofInfo?.distance * VALET_CHARGE_PER_METER
      : 0

    setValetChargePickup(Math.floor(pickupCharge))
    setValetChargeDropof(
      Math.floor(valet?.differentLocations ? dropOfCharge : pickupCharge),
    )
  }, [valet])

  return {
    parkingCharge,
    valetChargePickup,
    valetChargeDropoff,
  }
}
