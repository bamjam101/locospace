'use client'

import { useFormLogin } from '@locospace/forms/src/login'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface ILoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { replace } = useRouter()

  const [loading, setLoading] = useState(false)

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data

        setLoading(true)

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.ok) {
          replace('/')
        }

        if (result?.error) {
          alert('Login failed')
        }

        setLoading(false)
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className={`text-black`}
          {...register('email')}
          placeholder="Email"
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className={`text-black`}
          type="password"
          {...register('password')}
          placeholder="********"
        />
      </HtmlLabel>

      <Button type="submit" loading={loading}>
        Submit
      </Button>

      <div className="mt-4 text-sm">
        Do not have an locospace account?
        <br />
        <Link
          href={'/register'}
          className="font-bold underline underline-offset-4"
        >
          Create one
        </Link>{' '}
        now.
      </div>
    </Form>
  )
}
