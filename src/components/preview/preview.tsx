import classnames from 'clsx'
import { toClipboard } from 'copee'
import Head from 'next/head'
import Router from 'next/router'
import React, { useContext } from 'react'
import { MdContentCopy, MdDownload } from 'react-icons/md'

import { checkWebpSupport } from '@common/helpers'
import Card from '@components/preview/card'
import toaster from '@components/toaster'
import ConfigContext from '@contexts/ConfigContext'

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

  if (['svg', 'png'].includes(fileType)) {
    const link = document.createElement('a')
    link.download = `${Router.query._name}.${fileType}`
    link.href = getRelativeImageUrl(fileType)
    link.click()
  } else {
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
}

const Preview: React.FC = () => {
  const { config } = useContext(ConfigContext)

  return (
    <section className="mb-3">
      <div
        className={classnames(
          'relative cursor-pointer rounded-lg shadow-2xl overflow-hidden',
          'w-[320px] h-[160px]',
          'min-[384px]:w-[384px] min-[384px]:h-[192px]',
          'min-[400px]:w-[400px] min-[400px]:h-[200px]',
          'min-[480px]:w-[480px] min-[480px]:h-[240px]',
          'min-[640px]:w-[640px] min-[640px]:h-[320px]'
        )}
        onClick={copyImageUrl}
      >
        <div
          className={classnames(
            'origin-top-left',
            'scale-[0.25]',
            'min-[384px]:scale-[0.3]',
            'min-[400px]:scale-[0.3125]',
            'min-[480px]:scale-[0.375]',
            'min-[640px]:scale-[0.5]'
          )}
        >
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
          <Card {...config} />
        </div>
        <img
          className="absolute top-0 left-0 w-full h-full opacity-0"
          alt="Card"
          src={getRelativeImageUrl()}
        />
      </div>
      <div className="card mt-3 mx-auto w-fit bg-neutral shadow-xl">
        <div className="card-body px-3 py-2">
          <div
            className={classnames(
              'flex justify-center items-center content-center gap-2'
            )}
          >
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-primary btn-sm gap-1 uppercase font-bold"
              >
                <MdDownload className="w-5 h-5" />
                Download
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-compact p-2 shadow bg-neutral rounded-box w-52"
              >
                {(checkWebpSupport()
                  ? ['svg', 'png', 'jpeg', 'webp']
                  : ['svg', 'png', 'jpeg']
                ).map((fileType) => (
                  <li key={fileType}>
                    <a
                      className="font-bold gap-2"
                      onClick={handleDownload(fileType)}
                    >
                      <MdDownload className="w-5 h-5" />
                      {`${config.name?.value ?? ''}.${fileType}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="join">
              <button
                className="join-item btn btn-sm gap-2 uppercase font-bold"
                onClick={copyImageUrl}
                type="button"
              >
                <MdContentCopy className="w-4 h-4" />
                Url
              </button>
              <button
                className="join-item btn btn-sm hidden sm:inline-flex uppercase font-bold"
                onClick={copyMarkdown}
              >
                Markdown
              </button>
              <button
                className="join-item btn btn-sm hidden sm:inline-flex uppercase font-bold"
                onClick={copyImageTag}
              >
                {'<img />'}
              </button>
              <button
                className="join-item btn btn-sm gap-2 hidden sm:inline-flex uppercase font-bold"
                onClick={copyOpenGraphTags}
              >
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
