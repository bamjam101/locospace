'use client'

import { MyCompanyDocument } from '@locospace/network/src/gql/generated'
import { useQuery } from '@apollo/client'
import { LoaderPanel } from '../molecules/Loader'
import { AlertSection } from '../molecules/AlertSection'
import { ReactNode } from 'react'
import { CreateCompany } from './CreateCompany'

type RenderPropChild = (id: number) => ReactNode

export const IsManager = ({
  children,
}: {
  children: RenderPropChild | ReactNode
}) => {
  const { data, loading } = useQuery(MyCompanyDocument)

  if (loading) {
    return <LoaderPanel text="Loading company..." />
  }

  if (!data?.myCompany)
    return (
      <AlertSection>
        <div>You don&apos;t have a company yet.</div>
        <CreateCompany />
      </AlertSection>
    )

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.myCompany.id)
        : children}
    </>
  )
}
