'use client'

import { useQuery } from '@apollo/client'
import { add } from '@locospace/sample-lib'
import { CompaniesDocument } from '@locospace/network/src/gql/generated'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)
  return (
    <section>
      <h1>Home Page</h1>
      <header className="text-center">
        Hello, User{add(1, Math.floor(Math.random() * 10))}
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data?.companies.map((company) => (
              <div key={company.id}>{company.displayName}</div>
            ))}
          </>
        )}
      </main>
    </section>
  )
}
