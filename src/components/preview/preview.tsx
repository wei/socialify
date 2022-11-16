import React, { useContext } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { toClipboard } from 'copee'
import { Space, Button, notification, Dropdown, Menu } from 'antd'
import { DownOutlined, DownloadOutlined, CopyOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'

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
    notification.success({
      message: 'Success',
      description: 'Copied image url to clipboard'
    })
  } else {
    window.open(screenshotImageUrl, '_blank')
  }
}

const copyMarkdown = () => {
  const screenshotImageUrl = getImageUrl()
  const ogTag = `![${Router.query._name}](${screenshotImageUrl})`
  const success = toClipboard(ogTag)
  if (success) {
    notification.success({
      message: 'Success',
      description: 'Copied markdown to clipboard'
    })
  }
}

const copyImageTag = () => {
  const screenshotImageUrl = getImageUrl()
  const ogTag = `<img src="${screenshotImageUrl}" alt="${Router.query._name}" width="640" height="320" />`
  const success = toClipboard(ogTag)
  if (success) {
    notification.success({
      message: 'Success',
      description: 'Copied image tag to clipboard'
    })
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
    notification.success({
      message: 'Success',
      description: 'Copied Open Graph tags to clipboard'
    })
  }
}

const handleDownload = async (e: MenuInfo) => {
  try {
    const { key: fileType } = e
    const imageResponse = await fetch(getRelativeImageUrl())
    if (!imageResponse.ok) throw Error('Failed to fetch image')
    const imageSVGString = await imageResponse.text()

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
    img.src = `data:image/svg+xml,${encodeURIComponent(imageSVGString)}`
  } catch (error) {
    console.error(error)
    notification.error({
      message: 'Download failed',
      description: 'Please use a modern browser.'
    })
  }
}

const Preview: React.FC = () => {
  const { config } = useContext(ConfigContext)

  const downloadMenu = (
    <Menu onClick={handleDownload}>
      {(checkWebpSupport() ? ['png', 'jpeg', 'webp'] : ['png', 'jpeg']).map(
        (fileType) => (
          <Menu.Item key={fileType} icon={<DownloadOutlined />}>
            {`Download ${fileType}`}
          </Menu.Item>
        )
      )}
    </Menu>
  )

  return (
    <section>
      <div className="preview-card-wrapper" onClick={copyImageUrl}>
        <div className="preview-card">
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
        <img className="preview-image" alt="Card" src={getRelativeImageUrl()} />
      </div>
      <div className="preview-download-wrapper">
        <Space>
          <Dropdown overlay={downloadMenu} trigger={['click']}>
            <Button type="primary">
              Download <DownOutlined />
            </Button>
          </Dropdown>
          <Button icon={<CopyOutlined />} type="default" onClick={copyImageUrl}>
            Url
          </Button>
          <Button
            className="hide-on-mobile"
            icon={<CopyOutlined />}
            type="default"
            onClick={copyMarkdown}>
            Markdown
          </Button>
          <Button
            className="hide-on-mobile"
            icon={<CopyOutlined />}
            type="default"
            onClick={copyImageTag}>
            {`<img />`}
          </Button>
          <Button
            className="hide-on-mobile"
            icon={<CopyOutlined />}
            type="default"
            onClick={copyOpenGraphTags}>
            Open Graph
          </Button>
        </Space>
      </div>

      <style jsx>{`
        section {
          margin-bottom: 30px;
        }

        .preview-card-wrapper {
          position: relative;
          width: 640px;
          height: 320px;
          margin: 0 auto;
          cursor: pointer;
          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
          border-radius: 5px;
          overflow: hidden;
        }

        .preview-card-wrapper > div.preview-card {
          transform: scale(0.5);
          transform-origin: top left;
        }

        .preview-card-wrapper > img.preview-image {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
        }

        .preview-download-wrapper {
          text-align: center;
          margin-top: 15px;
        }

        @media (max-width: 640px) {
          .preview-card-wrapper {
            width: 480px;
            height: 240px;
          }

          .preview-card-wrapper > div.preview-card {
            transform: scale(0.375);
          }
        }

        @media (max-width: 480px) {
          .preview-card-wrapper {
            width: 400px;
            height: 200px;
          }

          .preview-card-wrapper > div.preview-card {
            transform: scale(0.3125);
          }

          section :global(.hide-on-mobile) {
            display: none;
          }
        }

        @media (max-width: 375px) {
          .preview-card-wrapper {
            width: 320px;
            height: 160px;
          }

          .preview-card-wrapper > div.preview-card {
            transform: scale(0.25);
          }
        }
      `}</style>
    </section>
  )
}

export default Preview
