import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'

import { HOST_PREFIX } from '../common/helpers'

import '../styles/global.css'

import FooterElement from '../src/components/footer/footer'
import HeaderElement from '../src/components/header/header'

const GoogleTagManager = () => {
  if (process.env.GTM_ID) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.GTM_ID}');
          `}
        </Script>
      </>
    )
  }

  return (
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
      `}
    </Script>
  )
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimal-ui,maximum-scale=1,user-scalable=no"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="💞 Socialify your project. 🌐 Share with the world!"
        />
        <meta
          property="og:image"
          content={`${HOST_PREFIX}/assets/socialify.png`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <link rel="apple-touch-icon" href="/assets/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>GitHub Socialify</title>
        {GoogleTagManager()}
      </Head>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#231e43] via-[#191630] to-[#15103e]">
        <HeaderElement />
        <div className="flex-1 flex">
          <Component {...pageProps} />
        </div>
        <FooterElement />
        <Toaster />
      </div>
    </>
  )
}
