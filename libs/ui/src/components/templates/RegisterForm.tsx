'use client'

import { Role } from '@locospace/util/types'
import { useFormRegister } from '@locospace/forms/src/register'

import { useMutation } from '@apollo/client'
import { RegisterWithCredentialsDocument } from '@locospace/network/src/gql/generated'
import { Form } from '../atoms/Form'

import { Button } from '../atoms/Button'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'

import Link from 'next/link'
import { signIn } from 'next-auth/react'

export interface ISignupFormProps {
  className?: string
  role?: Role
}

export const RegisterForm = ({ className, role }: ISignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const [registerWithCredentials, { loading, data }] = useMutation(
    RegisterWithCredentialsDocument,
  )

  return (
    <Form
      onSubmit={handleSubmit(async (formData) => {
        const { data, errors } = await registerWithCredentials({
          variables: {
            registerWithCredentialsInput: formData,
          },
        })

        if (errors) {
          alert(errors)
        }

        if (data) {
          alert(`User ${data.registerWithCredentials.uid} created. 🎆`)

          signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: '/',
          })
        }
      })}
    >
      <HtmlLabel title="Display Name" error={errors.email?.message} optional>
        <HtmlInput
          className={`text-black`}
          {...register('name')}
          placeholder="Enter your name."
        />
      </HtmlLabel>
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className={`text-black`}
          {...register('email')}
          placeholder="Email"
        />
      </HtmlLabel>
      <HtmlLabel title="Password" optional error={errors.password?.message}>
        <HtmlInput
          className={`text-black`}
          type="password"
          {...register('password')}
          placeholder="********"
        />
      </HtmlLabel>

      {Object.keys(errors).length ? (
        <div className="text-xs text-gray-600">
          Please fix the abote {Object.keys(errors).length} errors
        </div>
      ) : null}

      <Button type="submit">Register</Button>

      <div className="mt-4 text-sm">
        Already have an locospace account?
        <br />
        <Link
          href={'/login'}
          className="font-bold underline underline-offset-4"
        >
          Login
        </Link>{' '}
        now.
      </div>
    </Form>
  )
}
