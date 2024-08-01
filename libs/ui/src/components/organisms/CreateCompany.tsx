import { useFormCreateCompany } from '@locospace/forms/src/createCompany'
import { useEffect, useState } from 'react'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlTextArea } from '../atoms/HtmlTextArea'
import { useSession } from 'next-auth/react'
import { toast } from '../molecules/Toast'
import { useMutation } from '@apollo/client'
import {
  CreateCompanyDocument,
  namedOperations,
} from '@locospace/network/src/gql/generated'

export const CreateCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormCreateCompany()

  const session = useSession()
  const uid = session?.data?.user?.uid
  const name = session?.data?.user?.name

  useEffect(() => {
    if (uid) {
      setValue('managerId', uid)
    }
    if (name) {
      setValue('managerName', name)
    }
  }, [uid, name])

  const [open, setOpen] = useState(false)

  const [createCompany, { loading, error }] = useMutation(
    CreateCompanyDocument,
    {
      onCompleted: () => {
        toast('Company created successfully')
        setOpen(false)
      },
      onError: () => {
        toast('Failed to create company')
      },
    },
  )

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Company</Button>

      <Dialog open={open} setOpen={setOpen} title="Create company">
        <Form
          onSubmit={handleSubmit(async (data) => {
            try {
              await createCompany({
                variables: {
                  createCompanyInput: data,
                },
                awaitRefetchQueries: true,
                refetchQueries: [namedOperations.Query.myCompany],
              })
            } catch (error) {
              console.error(error)
              toast('Failed to create company')
            }
          })}
        >
          <HtmlLabel title="Company name" error={errors.displayName?.message}>
            <HtmlInput
              placeholder="Company name"
              {...register('displayName')}
            />
          </HtmlLabel>
          <HtmlLabel title="Description" error={errors.description?.message}>
            <HtmlTextArea
              placeholder="Describe your parking company"
              {...register('description')}
            />
          </HtmlLabel>
          <HtmlLabel title="Manager ID" error={errors.managerId?.message}>
            <HtmlInput
              readOnly
              placeholder="Manager ID"
              {...register('managerId')}
            />
          </HtmlLabel>
          <HtmlLabel title="Manager name" error={errors.managerName?.message}>
            <HtmlInput
              placeholder="Manager name"
              {...register('managerName')}
            />
          </HtmlLabel>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
