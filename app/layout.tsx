import { GoogleTagManager } from '@next/third-parties/google'
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
  manifest: '/manifest.json',
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
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  // The following settings breaks mobile view, use with caution.
  // initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="minimal-ui" />
        <meta property="x-socialify-version" content={version} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/logo192.png" />
      </head>
      <body
        className={`${inter.className} flex flex-col min-h-screen socialify-bg`}
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
