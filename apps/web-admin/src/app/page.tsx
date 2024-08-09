'use client'

import { IsAdmin } from '@locospace/ui/src/components/organisms/IsAdmin'
import { AdminHome } from '@locospace/ui/src/components/templates/AdminHome'

export default function Home() {
  return (
    <main>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </main>
  )
}
