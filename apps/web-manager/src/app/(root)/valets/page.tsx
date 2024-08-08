import { ManageValets } from '@locospace/ui/src/components/templates/ManageValets'
import { IsLoggedIn } from '@locospace/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  )
}
