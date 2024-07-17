import { LoginForm } from '@locospace/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@locospace/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  )
}
