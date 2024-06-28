/* eslint-disable camelcase */
import type { Metadata } from 'next'
import { type_second } from '@/functions/fonts'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'
import { UserContextProvider } from '@/contexts/user-context'
import { userGet } from '@/actions/user-get'

export const metadata: Metadata = {
  title: 'Dogs 2.0',
  description: 'Rede social para cachorros.',
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  const { data: user } = await userGet()

  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>
        <UserContextProvider user={user}>
          <div className="App">
            <Header />
            <main className="AppBody">{children}</main>
            <div>{modal}</div>
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  )
}
