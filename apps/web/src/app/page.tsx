'use client'

import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@locospace/network/src/gql/generated'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@locospace/ui/src/components/atoms/Button'
import Link from 'next/link'

export default function Home() {
  // const { data, loading } = useQuery(CompaniesDocument)

  const { data: sessionData, status } = useSession()
  return (
    <main>
      {sessionData?.user?.uid ? (
        <Button onClick={() => signOut()}>Sign Out</Button>
      ) : (
        <Link href={'/login'}>Login</Link>
      )}
    </main>
  )
}
