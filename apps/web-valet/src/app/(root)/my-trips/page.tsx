'use client'
import { IsLoggedIn } from '@locospace/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@locospace/ui/src/components/organisms/IsValet'
import { ValetTrips } from '@locospace/ui/src/components/templates/ValetTrips'

export default function Page() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetTrips uid={uid} />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  )
}
