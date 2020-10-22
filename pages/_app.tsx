import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Layout } from 'antd'

import '../src/index.css'

import HeaderElement from '../src/components/header/header'
import FooterElement from '../src/components/footer/footer'
const { Footer, Content } = Layout

const GoogleTagManager = () => {
  if (process.env.GTM_ID) {
    return (
      <>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.GTM_ID}');`
          }}
        />
      </>
    )
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}`
      }}
    />
  )
}

export default class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props

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
            content="Socialify your project. Share with the world!"
          />
          <meta
            property="og:image"
            content="https://socialify.git.ci/wei/socialify/png?theme=Dark&language=1&owner=0&description=1&pattern=Charlie+Brown&issues=1&pulls=1&font=Inter&logo=https%3A%2F%2Fgist.githack.com%2Fwei%2F13e3f6e161cb1d0709abd847102dc80c%2Fraw%2Fmlh-white-square.svg"
          />
          <link rel="apple-touch-icon" href="/assets/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <title>GitHub Socialify</title>
          {GoogleTagManager()}
        </Head>
        <HeaderElement />
        <Content>
          <Component {...pageProps} />
        </Content>
        <Footer className="footer">
          <FooterElement />
        </Footer>
      </>
    )
  }
}
