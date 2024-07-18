import { FormTypeSearchGarages } from '@locospace/forms/src/searchGarages'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '../../atoms/Button'

import { IconFilter } from '@tabler/icons-react'
import { PulsingDot } from '../../atoms/Dot'

export const FilterSidebar = () => {
  const [open, setOpen] = useState(false)
  const {
    register,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchGarages>()

  return (
    <>
      <Button onClick={() => setOpen((state) => !state)}>
        <IconFilter className="stroke-1.5 text-black" />
        {dirtyFields.length ? <PulsingDot /> : null}
      </Button>
    </>
  )
}
