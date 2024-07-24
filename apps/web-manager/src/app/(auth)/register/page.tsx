import { AuthLayout } from '@locospace/ui/src/components/molecules/AuthLayout'
import { RegisterForm } from '@locospace/ui/src/components/templates/RegisterForm'

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  )
}
