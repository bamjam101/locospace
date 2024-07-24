'use client'

import { IsLoggedIn } from '@locospace/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@locospace/ui/src/components/organisms/IsManager'
import { ListGarages } from '@locospace/ui/src/components/organisms/ListGarages'

export default function ManagerHomePage() {
  return (
    <IsLoggedIn>
      <IsManager>
        {(companyId) => <ListGarages companyId={companyId} />}
      </IsManager>
    </IsLoggedIn>
  )
}
