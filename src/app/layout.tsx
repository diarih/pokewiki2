import Providers from '@/utils/lib/Providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { FavProvider } from '@/context/FavContext'
import Navbar from './components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PokeWiki',
  description: 'Find Your Perfect Pokemon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.className}`}>
        <FavProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </FavProvider>
      </body>
    </html>
  )
}
