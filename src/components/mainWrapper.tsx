import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'

import ConfigType, { Font, Theme, Pattern, FileType } from '../types/configType'
import ConfigContext from '../contexts/ConfigContext'

import Config from './configuration/config'
import Preview from './preview/preview'

import { mainRendererQueryResponse } from './__generated__/mainRendererQuery.graphql'

type MainWrapperProps = {
  response: mainRendererQueryResponse | null
  owner: string
}

const MainWrapper = ({ response, owner }: MainWrapperProps) => {
  const [config, setConfig] = useState<ConfigType>({
    name: '',
    font: Font.inter,
    theme: Theme.light,
    pattern: Pattern.plus,
    fileType: FileType.png
  })

  const setConfigHelper = (config: ConfigType) => {
    setConfig(config)
  }

  useEffect(() => {



    setConfig(c => {
      return {
        ...c,
        owner: { state: false, value: owner },
      }
    })

  }, [owner])

  if (response && response.repository) {
    const { repository } = response

    return (
      <ConfigContext.Provider value={{ config, setConfig: setConfigHelper }}>
        <Row className="main-wrapper">
          <Col span={24} xl={12}>
            <Config repository={repository} />
          </Col>
          <Col span={24} xl={12}>
            <Preview />
          </Col>
        </Row>
      </ConfigContext.Provider>
    )
  } else {
    return <div>Error fetching github repository details</div>
  }
}
export default MainWrapper
