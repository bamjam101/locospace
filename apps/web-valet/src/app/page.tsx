'use client'

import { IsLoggedIn } from '@locospace/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@locospace/ui/src/components/organisms/IsValet'
import { ValetHome } from '@locospace/ui/src/components/templates/ValetHome'
export default function Home() {
  return (
    <IsLoggedIn>
      {(uid) => (
        <IsValet uid={uid}>
          <ValetHome />
        </IsValet>
      )}
    </IsLoggedIn>
  )
}
