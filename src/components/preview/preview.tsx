import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { toClipboard } from 'copee'
import { Space, Button, notification } from 'antd'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'

import ConfigContext from '../../contexts/ConfigContext'

import Card from './card'

const Preview: React.FC = () => {
  const router = useRouter() || { query: {}, asPath: '' }
  const { config } = useContext(ConfigContext)

  const [path, query] = router.asPath.split('?')
  const fileType = config.fileType.toLowerCase()
  const relativeImageUrl = `${path}/${fileType}${query ? `?${query}` : ''}`

  const getImageUrl = (): string => {
    return `${window.location.protocol}//${window.location.host}${relativeImageUrl}`
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
    const ogTag = `![${config.name}](${screenshotImageUrl})`
    const success = toClipboard(ogTag)
    if (success) {
      notification.success({
        message: 'Success',
        description: 'Copied markdown to clipboard'
      })
    }
  }

  const copyOpenGraphTag = () => {
    const screenshotImageUrl = getImageUrl()
    const ogTag = `<meta property="og:image" content="${screenshotImageUrl}" />`
    const success = toClipboard(ogTag)
    if (success) {
      notification.success({
        message: 'Success',
        description: 'Copied meta tag to clipboard'
      })
    }
  }

  return (
    <section>
      <div className="preview-card-wrapper" onClick={copyImageUrl}>
        <link
          href={`https://fonts.googleapis.com/css2?family=${config.font}:wght@200;400;500&display=swap`}
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.6/devicon.min.css"
        />
        <Card {...config} />
        <img
          className="preview-image-wrapper"
          alt="Card"
          src={relativeImageUrl}
        />
      </div>
      <div className="preview-download-wrapper">
        <Space>
          <Button
            icon={<DownloadOutlined />}
            type="primary"
            href={relativeImageUrl}
            download={`${router.query._owner}-${router.query._name}.${fileType}`}>
            Download
          </Button>
          <Button icon={<CopyOutlined />} type="default" onClick={copyImageUrl}>
            Image url
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
            onClick={copyOpenGraphTag}>
            Meta tag
          </Button>
        </Space>
      </div>

      <style jsx>{`
        section {
          margin-bottom: 30px;
        }

        .preview-card-wrapper {
          position: relative;
          width: fit-content;
          margin: 0 auto;
          cursor: pointer;
        }

        .preview-card-wrapper .preview-image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          opacity: 0;
        }

        .preview-card-wrapper > :global(.card-svg-wrapper) {
          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
          border-radius: 5px;
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

          .preview-card-wrapper > :global(.card-svg-wrapper) {
            transform: scale(0.75);
            transform-origin: top left;
          }
        }

        @media (max-width: 480px) {
          .preview-card-wrapper {
            width: 400px;
            height: 200px;
          }

          .preview-card-wrapper > :global(.card-svg-wrapper) {
            transform: scale(0.625);
            transform-origin: top left;
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

          .preview-card-wrapper > :global(.card-svg-wrapper) {
            transform: scale(0.5);
            transform-origin: top left;
          }
        }
      `}</style>
    </section>
  )
}

export default Preview
