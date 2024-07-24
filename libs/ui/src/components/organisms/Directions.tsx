import { useDebounce } from '@locospace/util/src/hooks/async'
import { LatLng, LngLatTuple } from '@locospace/util/types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Layer, Source } from 'react-map-gl'

export const Directions = ({
  origin,
  destination,
  sourceId,
  setDistance,
}: {
  origin: LatLng
  destination: Partial<LatLng>
  sourceId: string
  setDistance: (distance?: number) => void
}) => {
  const [coordinates, setCoordinates] = useState<LngLatTuple[]>([])
  const preDistanceRef = useRef<number | undefined>(undefined)
  const prevOriginRef = useRef<LatLng | undefined>(undefined)
  const prevDestinationRef = useRef<Partial<LatLng> | undefined>(undefined)

  const [originDebounced] = useDebounce(origin, 400)
  const [destinationDebounced] = useDebounce(destination, 400)

  useEffect(() => {
    if (
      !originDebounced ||
      !destinationDebounced ||
      (prevOriginRef.current &&
        prevOriginRef.current.lat === originDebounced.lat &&
        prevOriginRef.current.lng === originDebounced.lng &&
        prevDestinationRef.current &&
        prevDestinationRef.current.lat === destinationDebounced.lat &&
        prevDestinationRef.current.lng === destinationDebounced.lng)
    ) {
      return
    }

    prevOriginRef.current = originDebounced
    prevDestinationRef.current = destinationDebounced
    ;(async () => {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${originDebounced.lng},${originDebounced.lat};${destinationDebounced.lng},${destinationDebounced.lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&steps=true&overview=simplified`,
      )

      const data = await response.json()

      console.log(data)

      const coordinates =
        data?.routes[0]?.legs[0]?.steps?.map(
          (step: { maneuver: { location?: any } }) =>
            step.maneuver?.location || [],
        ) || []

      const newDistance = data?.routes?.[0]?.distance || 0

      setCoordinates(coordinates)

      if (newDistance !== preDistanceRef.current && setDistance) {
        setDistance(newDistance)
        preDistanceRef.current = newDistance
      }
    })()
  }, [originDebounced, destinationDebounced])

  const dataOne = useMemo(
    () => ({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    }),
    [coordinates],
  )

  return (
    <Source id={sourceId} type="geojson" data={dataOne}>
      <Layer
        id={sourceId}
        type="line"
        source="my-data"
        paint={{
          'line-color': 'rgb(0,0,0)',
          'line-width': 2,
        }}
      />
    </Source>
  )
}
