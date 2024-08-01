import { useFormCreateManySlots } from '@locospace/forms/src/createSlots'
import { useMutation } from '@apollo/client'
import {
  CreateManySlotsDocument,
  namedOperations,
  SlotType,
} from '@locospace/network/src/gql/generated'
import { Button } from '../atoms/Button'
import { useState } from 'react'
import { Dialog } from '../atoms/Dialog'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlSelect } from '../atoms/HtmlSelect'
import { HtmlInput } from '../atoms/HtmlInput'
import { toast } from '../molecules/Toast'

export const CreateManySlotsDialog = ({ garageId }: { garageId: number }) => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCreateManySlots()

  const [createManySlots, { loading, data, error }] = useMutation(
    CreateManySlotsDocument,
    {
      refetchQueries: [namedOperations.Query.Garages],
      onCompleted(data, clientOptions) {
        setOpen(false)
        toast('Slots created successfully.')
      },
      onError(error, clientOptions) {
        toast('Action failed.')
      },
    },
  )

  return (
    <>
      <Button
        variant="text"
        size="none"
        onClick={() => setOpen(false)}
        className="w-16 h-10 border-2 group border-primary"
      >
        <div className="transition-transform duration-300 group-hover:scale-150">
          +
        </div>
      </Button>
      <Dialog open={open} setOpen={setOpen} title="Create slots">
        <Form
          onSubmit={handleSubmit(async ({ count, ...data }) => {
            await createManySlots({
              variables: {
                count,
                createSlotInput: { ...data, garageId },
              },
            })
          })}
        >
          <div className="grid grid-cols-2 gap-2">
            <HtmlLabel title="Slot type" error={errors.type?.toString()}>
              <HtmlSelect placeholder="Slot type" {...register('type')}>
                {Object.values(SlotType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </HtmlLabel>
            <HtmlLabel title="Price/hr" error={errors.pricePerHour?.message}>
              <HtmlInput
                type="number"
                placeholder="Price per hour"
                {...register(`pricePerHour`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Number of slots" error={errors.count?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the number of slots"
                {...register(`count`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Length" error={errors.length?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the length in ft"
                {...register('length', {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Width" error={errors.width?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the width in ft"
                {...register(`width`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Height" error={errors.height?.message}>
              <HtmlInput
                type="number"
                placeholder="Enter the height in ft"
                {...register(`height`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </Form>
      </Dialog>
    </>
  )
}
