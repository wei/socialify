import React, { useContext } from 'react'
import { Button } from 'antd'

import ConfigContext from '../../contexts/ConfigContext'

import Card from './card'

const Preview: React.FC = () => {
  const { config } = useContext(ConfigContext)

  return (
    <section className="preview-wrapper">
      <Card {...config} />
      <Button type="primary">Download</Button>
    </section>
  )
}

export default Preview
