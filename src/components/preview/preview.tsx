import React, { useContext } from 'react'
import { toClipboard } from 'copee'
import { Button, notification } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

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
        description: 'Copied Image URI to clipboard'
      })
    } else {
      window.open(screenshotImageUrl, '_blank')
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
        <Button
          className="preview-download"
          icon={<DownloadOutlined />}
          type="primary"
          href={screenshotImageUrl}
          download={`${window.location.pathname
            .replace(/\//g, ' ')
            .trim()
            .replace(/\s/g, '-')}.${fileType}`}>
          Download
        </Button>
      </div>
    </section>
  )
}

export default Preview
