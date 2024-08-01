import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@locospace/ui/src/app/globals.css'

import { Header } from '@locospace/ui/src/components/organisms/Header'
import { ToastContainer } from '@locospace/ui/src/components/molecules/Toast'
import { Container } from '@locospace/ui/src/components/atoms/Container'
import { ApolloProvider } from '@locospace/network/src/config/apollo'
import { SessionProvider } from '@locospace/ui/src/components/molecules/SessionProvider'

import { MenuItem } from '@locospace/util/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Locospace | Manager',
  description: 'Locospace for all your parking needs.',
}

const MENUITEMS: MenuItem[] = [
  { label: 'New Garage', href: '/createGarage' },
  { label: 'Valets', href: '/valets' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body className={`${inter.className} bg-gray-25`}>
            <Header type="manager" menuItems={MENUITEMS} />
            <Container>{children}</Container>
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
