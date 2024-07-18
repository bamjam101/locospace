import { SlotType } from '@locospace/network/src/gql/generated'

import { IconBike, IconMotorbike, IconCar, IconTir } from '@tabler/icons-react'

export const IconTypes = {
  [SlotType.Bicycle]: <IconBike className="w-6 h-6 " />,
  [SlotType.Bike]: <IconMotorbike className="w-6 h-6 " />,
  [SlotType.Car]: <IconCar className="w-6 h-6 " />,
  [SlotType.Heavy]: <IconTir className="w-6 h-6 " />,
}
