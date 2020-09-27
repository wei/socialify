import React, { useState } from 'react'
import { Row, Col, notification } from 'antd'
import { Redirect } from 'react-router-dom'

import ConfigType, { Font, Theme, Pattern, FileType } from '../types/configType'
import ConfigContext from '../contexts/ConfigContext'
import { mainRendererQueryResponse } from './__generated__/mainRendererQuery.graphql'

import Config from './configuration/config'
import Preview from './preview/preview'

import './mainWrapper.css'

type MainWrapperProps = {
  response: mainRendererQueryResponse | null
  owner: string
}

const MainWrapper = ({ response, owner }: MainWrapperProps) => {
  const [config, setConfig] = useState<ConfigType>({
    name: '',
    logo: '',
    font: Font.inter,
    theme: Theme.dark,
    pattern: Pattern.plus,
    fileType: FileType.png
  })

  const setConfigHelper = (config: ConfigType) => {
    setConfig(config)
  }

  if (response && response.repository) {
    const { repository } = response

    return (
      <ConfigContext.Provider value={{ config, setConfig: setConfigHelper }}>
        <Row className="main-wrapper">
          <Col span={24} order={2} xl={{ span: 12, order: 1 }}>
            <Config owner={owner} repository={repository} />
          </Col>
          <Col span={24} order={1} xl={{ span: 12, order: 2 }}>
            <Preview />
          </Col>
        </Row>
      </ConfigContext.Provider>
    )
  } else {
    notification.error({
      message: 'Error',
      description: 'GitHub repository is not found.'
    })
    return <Redirect to="/" />
  }
}
export default MainWrapper
