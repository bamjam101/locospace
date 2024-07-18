import { Button } from '../atoms/Button'
import { signOut } from 'next-auth/react'

import { IconDoorExit } from '@tabler/icons-react'

export const LogoutButton = () => {
  return (
    <Button variant="outlined" onClick={() => signOut()} className="flex gap-2">
      <IconDoorExit aria-label="Log Out" />
      <span className="hidden sm:block">Logout</span>
    </Button>
  )
}
