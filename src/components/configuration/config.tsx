import { Col, Form, Row, Space } from 'antd'


import React, { useContext, useEffect } from 'react'

import ConfigContext from '../../contexts/ConfigContext'

import ConfigType, { Theme, Pattern, Font, FileType } from "../../types/configType"


import { mainRendererQueryResponse } from '../__generated__/mainRendererQuery.graphql'

import "./config.css"
import SelectWrapper from './selectWrapper'
import CheckBoxWrapper from './checkBoxWrapper'




type ConfigProp = {
  repository: mainRendererQueryResponse['repository']
}


const Config = ({ repository }: ConfigProp) => {


  const { config, setConfig } = useContext(ConfigContext)


  const handleChange = (value: any, key: keyof ConfigType) => {

    const newConfig: ConfigType = { ...config, [key]: value }
    console.log('Setting new config for ', key, 'with', newConfig)
    setConfig(newConfig)

  }

  useEffect(() => {
    handleChange(repository?.name, 'name')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="config-wrapper">
      <Row align="middle">
        <Col span={20} offset={4}>
          <Form>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <SelectWrapper
                title="Theme"
                keyName="theme"
                map={Object.keys(Theme)}
                defaultValue={Theme.Light}
                handleChange={handleChange}
              ></SelectWrapper>
              <SelectWrapper
                title="File Type"
                keyName="fileType"
                map={Object.keys(FileType)}
                defaultValue={FileType.PNG}
                handleChange={handleChange}
              />
              <SelectWrapper
                title="Font"
                keyName="font"
                map={Object.keys(Font)}
                defaultValue={Font.Inter}
                handleChange={handleChange}
              />
              <SelectWrapper
                title="Background Pattern"
                keyName="pattern"
                map={Object.keys(Pattern)}
                defaultValue={Pattern.Circuit_Board}
                handleChange={handleChange}
              />
              <Row>
                <CheckBoxWrapper
                  title="Stars"
                  keyName='stargazers'
                  handleChange={handleChange}
                ></CheckBoxWrapper>
                <CheckBoxWrapper
                  title="Forks"
                  keyName='forks'
                  handleChange={handleChange}
                ></CheckBoxWrapper>
              </Row>
              <Row>
                <CheckBoxWrapper
                  title="Language"
                  keyName='language'
                  handleChange={handleChange}
                ></CheckBoxWrapper>
                <CheckBoxWrapper
                  title="Issues"
                  keyName='issues'
                  handleChange={handleChange}
                ></CheckBoxWrapper>
              </Row>
              <Row>
                <CheckBoxWrapper
                  title="Pull Requests"
                  keyName='pulls'
                  handleChange={handleChange}
                ></CheckBoxWrapper>
              </Row>
            </Space>

          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Config
