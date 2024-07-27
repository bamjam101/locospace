import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@locospace/network/src/gql/generated'
import { useEffect } from 'react'
import { GarageMarker } from './GarageMarker'
import { useConvertSearchFormToVariables } from '@locospace/forms/src/adapters/searchFormAdapter'
import { Panel } from '../map/Panel'
import { Loader } from '../../molecules/Loader'

import { IconInfoCircle } from '@tabler/icons-react'

export const ShowGarages = () => {
  const [
    searchGarages,
    { loading: garagesLoading, data, previousData, error },
  ] = useLazyQuery(SearchGaragesDocument)

  const { variables, debouncing } = useConvertSearchFormToVariables()

  useEffect(() => {
    if (variables) {
      searchGarages({ variables })
    }
  }, [searchGarages, variables])

  const garages = data?.searchGarages || previousData?.searchGarages || []
  const loading = debouncing || garagesLoading

  if (error) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>{error.message}</div>
        </div>
      </Panel>
    )
  }
  if (!loading && garages.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    )
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : null}
      {data?.searchGarages.map((garage) => {
        return <GarageMarker key={garage.id} marker={garage} />
      })}
    </>
  )
}