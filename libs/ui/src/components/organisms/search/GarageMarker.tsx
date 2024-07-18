import { useState } from 'react'
import { SearchGaragesQuery } from '@locospace/network/src/gql/generated'
import { useKeypress } from '@locospace/util/src/hooks/keys'
import { Dialog } from '../../atoms/Dialog'
import { MapMarker } from '../map/MapMarker'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { FormProviderBookSlot } from '@locospace/forms/src/bookSlot'

import { useWatch } from 'react-hook-form'
import { BookSlotPopup } from '../BookSlotPopup'
import { FormTypeSearchGarages } from '@locospace/forms/src/searchGarages'

export const GarageMarker = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number]
}) => {
  const { startTime, endTime } = useWatch<FormTypeSearchGarages>()

  const [showPopup, setShowPopup] = useState(false)
  useKeypress(['Escape'], () => setShowPopup(false))

  if (!marker.address?.lat || !marker.address?.lng) return null

  return (
    <>
      <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookSlot defaultValues={{ startTime, endTime }}>
          <BookSlotPopup garage={marker} />
        </FormProviderBookSlot>
      </Dialog>

      <MapMarker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e: any) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        <ParkingIcon />
      </MapMarker>
    </>
  )
}
