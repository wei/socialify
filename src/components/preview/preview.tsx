import React, { useContext } from 'react'
import { Button } from 'antd'

import ConfigContext from '../../contexts/ConfigContext'

import Card from './card'

const Preview: React.FC = () => {
  const { config } = useContext(ConfigContext)

  return (
    <section className="preview-wrapper">
      <Card {...config} />
      <div className="preview-download-wrapper">
        <Button className="preview-download" type="primary">
          Download
        </Button>
      </div>
    </section>
  )
}

export default Preview
