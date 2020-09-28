import React, { useContext } from 'react'
import { toClipboard } from 'copee'
import { Space, Button, notification } from 'antd'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'

import ConfigContext from '../../contexts/ConfigContext'

import Card from './card'

import './preview.css'

const Preview: React.FC = () => {
  const { config } = useContext(ConfigContext)
  const fileType = config.fileType.toLowerCase()

  const screenshotImageURL = new URL(window.location.href)
  screenshotImageURL.pathname += `/${fileType}`
  const screenshotImageUrl = screenshotImageURL.href

  const copyImageUrl = () => {
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
    <section className="preview-wrapper">
      <div className="preview-card-wrapper" onClick={copyImageUrl}>
        <Card {...config} />
        <img
          className="preview-image-wrapper"
          alt="Card"
          src={screenshotImageUrl}
        />
      </div>
      <div className="preview-download-wrapper">
        <Space>
          <Button
            className="preview-download-button"
            icon={<DownloadOutlined />}
            type="primary"
            href={screenshotImageUrl}
            download={`${window.location.pathname
              .replace(/\//g, ' ')
              .trim()
              .replace(/\s/g, '-')}.${fileType}`}>
            Download
          </Button>
          <Button
            className="preview-copy-url-button"
            icon={<CopyOutlined />}
            type="default"
            onClick={copyImageUrl}>
            Image url
          </Button>
          <Button
            className="preview-copy-markdown-button"
            icon={<CopyOutlined />}
            type="default"
            onClick={copyMarkdown}>
            Markdown
          </Button>
          <Button
            className="preview-copy-tag-button"
            icon={<CopyOutlined />}
            type="default"
            onClick={copyOpenGraphTag}>
            Meta tag
          </Button>
        </Space>
      </div>
    </section>
  )
}

export default Preview
