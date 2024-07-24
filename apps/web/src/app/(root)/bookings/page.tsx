import { ListCustomerBookings } from '@locospace/ui/src/components/templates/ListCustomerBookings'
import { IsLoggedIn } from '@locospace/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  )
}
