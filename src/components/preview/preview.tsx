import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { toClipboard } from 'copee'
import { Space, Button, notification } from 'antd'
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons'

import ConfigContext from '../../contexts/ConfigContext'

import Card from './card'

import styles from './preview.module.css'

const Preview: React.FC = () => {
  const router = useRouter() || {}
  const { config } = useContext(ConfigContext)
  const fileType = config.fileType.toLowerCase()

  const relativeImageUrl = (router.asPath || '').replace(
    /([?$])/,
    `/${fileType}$1`
  )

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
    <section className={styles['preview-wrapper']}>
      <div className={styles['preview-card-wrapper']} onClick={copyImageUrl}>
        <Card {...config} />
        <img
          className={styles['preview-image-wrapper']}
          alt="Card"
          src={relativeImageUrl}
        />
      </div>
      <div className={styles['preview-download-wrapper']}>
        <Space>
          <Button
            className={styles['preview-download-button']}
            icon={<DownloadOutlined />}
            type="primary"
            href={relativeImageUrl}
            download={`${(router.pathname || '')
              .replace(/\//g, ' ')
              .trim()
              .replace(/\s/g, '-')}.${fileType}`}>
            Download
          </Button>
          <Button
            className={styles['preview-copy-url-button']}
            icon={<CopyOutlined />}
            type="default"
            onClick={copyImageUrl}>
            Image url
          </Button>
          <Button
            className={styles['preview-copy-markdown-button']}
            icon={<CopyOutlined />}
            type="default"
            onClick={copyMarkdown}>
            Markdown
          </Button>
          <Button
            className={styles['preview-copy-tag-button']}
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
