import { GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { JSX, type ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import { version } from '@/common/helpers'
import Footer from '@/src/components/footer/footer'
import Header from '@/src/components/header/header'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GitHub Socialify',
  description: '💞 Socialify your project. 🌐 Share with the world!',
  applicationName: 'GitHub Socialify',
  keywords: ['github', 'social', 'sharing', 'badges', 'social-image'],
  openGraph: {
    images: [
      {
        url: 'https://socialify.git.ci/wei/socialify/png?description=1&font=Raleway&issues=1&language=1&pattern=Charlie%20Brown&pulls=1&stargazers=1&theme=Light',
        width: 1280,
        height: 640,
        type: 'image/png',
      },
    ],
  },
  appleWebApp: {
    title: 'GitHub Socialify',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta property="x-socialify-version" content={version} />
      </head>
      <body
        className={clsx(
          'flex flex-col min-h-dvh socialify-bg',
          inter.className
        )}
      >
        <Header />
        <main className="flex-1 flex">{children}</main>
        <Footer />
        <Toaster />
      </body>
      {/* Google Tag Manager, env only relevant/accessible to owner, use '' for dev. */}
      <GoogleTagManager gtmId={process.env.GTM_ID || ''} />
    </html>
  )
}
