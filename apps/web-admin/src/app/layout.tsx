import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@locospace/ui/src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

import { ApolloProvider } from '@locospace/network/src/config/apollo'
import { SessionProvider } from '@locospace/ui/src/components/molecules/SessionProvider'

export const metadata: Metadata = {
  title: 'Locospace | Home',
  description: 'Locospace for all your parking needs.',
}

import { Header } from '@locospace/ui/src/components/organisms/Header'
import { ToastContainer } from '@locospace/ui/src/components/molecules/Toast'
import { Container } from '@locospace/ui/src/components/atoms/Container'
import { MenuItem } from '@locospace/util/types'

const MENUITEMS: MenuItem[] = [
  { label: 'Garages', href: '/' },
  { label: 'Admins', href: '/manage-admins' },
  { label: 'Settings', href: '/settings' },
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
            <Header menuItems={MENUITEMS} />
            <Container>{children}</Container>
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
