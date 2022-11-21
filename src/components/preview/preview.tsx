import React, { useContext } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { toClipboard } from 'copee'
import { MdContentCopy, MdDownload } from 'react-icons/md'

import toaster from '../toaster'

import ConfigContext from '../../contexts/ConfigContext'
import { checkWebpSupport } from '../../../common/helpers'
import Card from './card'

const getRelativeImageUrl = (format = 'image') => {
  const [path, query] = Router.asPath.split('?')
  return `${path}/${format}${query ? `?${query}` : ''}`
}

const getImageUrl = (format = 'image') => {
  return `${window.location.protocol}//${
    window.location.host
  }${getRelativeImageUrl(format)}`
}

const copyImageUrl = () => {
  const screenshotImageUrl = getImageUrl()
  const success = toClipboard(screenshotImageUrl)
  if (success) {
    toaster.success('Copied image url to clipboard')
  } else {
    window.open(screenshotImageUrl, '_blank')
  }
}

const copyMarkdown = () => {
  const screenshotImageUrl = getImageUrl()
  const ogTag = `![${Router.query._name}](${screenshotImageUrl})`
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied markdown to clipboard')
  }
}

const copyImageTag = () => {
  const screenshotImageUrl = getImageUrl()
  const ogTag = `<img src="${screenshotImageUrl}" alt="${Router.query._name}" width="640" height="320" />`
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied image tag to clipboard')
  }
}

const copyOpenGraphTags = () => {
  const ogTag = `
<meta property="og:image" content="${getImageUrl('png')}" />
<meta property="og:image:width" content="1280" />
<meta property="og:image:height" content="640" />
  `.trim()
  const success = toClipboard(ogTag)
  if (success) {
    toaster.success('Copied open graph tags to clipboard')
  }
}

const handleDownload = (fileType: string) => async () => {
  toaster.info('Downloading...')

  try {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1280
      canvas.height = 640
      const context = canvas.getContext('2d')
      if (context && img) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL(`image/${fileType}`)
        const link = document.createElement('a')
        link.download = `${Router.query._name}.${fileType}`
        link.href = dataUrl
        link.click()
      }
    }
    img.src = getRelativeImageUrl()
  } catch (error) {
    toaster.error('Download failed: Please use a modern browser.')
    console.error(error)
  }
}

const Preview: React.FC = () => {
  const { config } = useContext(ConfigContext)

  return (
    <section className="mb-8">
      <div
        className="relative w-[640px] max-w-[95vw] cursor-pointer rounded-lg shadow-2xl overflow-hidden"
        onClick={copyImageUrl}>
        <Head>
          <link
            href={`https://fonts.googleapis.com/css2?family=Jost:wght@400&display=swap`}
            rel="stylesheet"
            key="preview-card-fonts-1"
          />
          <link
            href={`https://fonts.googleapis.com/css2?family=${config.font}:wght@200;400;500&display=swap`}
            rel="stylesheet"
            key="preview-card-fonts-2"
          />
        </Head>
        <svg
          className="w-full"
          viewBox="0 0 1280 640"
          xmlns="http://www.w3.org/2000/svg">
          <foreignObject x="0" y="0" width="1280" height="640">
            <Card {...config} />
          </foreignObject>
        </svg>
        <img
          className="absolute top-0 left-0 w-full h-full opacity-0"
          alt="Card"
          src={getRelativeImageUrl()}
        />
      </div>
      <div className="card mt-4 mx-auto w-fit bg-base-100 shadow-xl">
        <div className="card-body px-3 py-2">
          <div className="flex justify-center content-center gap-2">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-primary btn-sm gap-2">
                <MdDownload className="w-5 h-5" />
                Download
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-52">
                {(checkWebpSupport()
                  ? ['png', 'jpeg', 'webp']
                  : ['png', 'jpeg']
                ).map((fileType) => (
                  <li key={fileType}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="font-bold gap-2"
                      onClick={handleDownload(fileType)}>
                      <MdDownload className="w-5 h-5" />
                      {`${config.name?.value ?? ''}.${fileType}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="btn-group">
              <button className="btn btn-sm gap-2" onClick={copyImageUrl}>
                <MdContentCopy className="w-4 h-4" />
                Url
              </button>
              <button
                className="btn btn-sm hidden sm:inline-flex"
                onClick={copyMarkdown}>
                Markdown
              </button>
              <button
                className="btn btn-sm hidden sm:inline-flex"
                onClick={copyImageTag}>
                {'<img />'}
              </button>
              <button
                className="btn btn-sm gap-2 hidden sm:inline-flex"
                onClick={copyOpenGraphTags}>
                Open Graph
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Preview
