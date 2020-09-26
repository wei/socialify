import React, { useContext, useEffect } from 'react'
import { Col, Form, Row, Space } from 'antd'

import { useHistory } from 'react-router-dom'

import ConfigContext from '../../contexts/ConfigContext'

import ConfigType, {
  Theme,
  Pattern,
  Font,
  FileType
} from '../../types/configType'

import { mainRendererQueryResponse } from '../__generated__/mainRendererQuery.graphql'

import './config.css'
import SelectWrapper from './selectWrapper'
import CheckBoxWrapper from './checkBoxWrapper'

type ConfigProp = {
  repository: mainRendererQueryResponse['repository']
}

const Config = ({ repository }: ConfigProp) => {
  const history = useHistory()
  const { config, setConfig } = useContext(ConfigContext)

  const handleChanges = (changes: { value: any; key: keyof ConfigType }[]) => {
    let newConfig: ConfigType = { ...config }
    changes.forEach(({ value, key }) => {
      const currentValue = newConfig[key] ? newConfig[key] : {}
      newConfig = { ...newConfig, [key]: { ...currentValue, ...value } }
      const urlParams = new URLSearchParams(window.location.search)
      if (value && value.state === true) {
        urlParams.set(key, '1')
      } else {
        urlParams.set(key, '0')
      }
      history.push(`?${urlParams.toString()}`)
    })
    setConfig(newConfig)
  }

  const handleChange = (value: any, key: keyof ConfigType) => {
    handleChanges([{ value, key }])
  }

  useEffect(() => {
    if (repository) {
      const params = new URLSearchParams(window.location.search)

      // const defaultChanges: { value: any; key: keyof ConfigType }[] = []
      // defaultChanges.push({ value: repository.name, key: 'name' })
      // if (repository.stargazerCount) {
      //   defaultChanges.push({
      //     value: repository.stargazerCount,
      //     key: 'stargazers'
      //   })
      // }
      // if (repository.forkCount) {
      //   defaultChanges.push({ value: repository.forkCount, key: 'forks' })
      // }
      // Array.from(params.keys()).forEach(key => {
      //   console.log('Key in params', key)
      //   if (key in config) {
      //     const query = params.get(key as keyof typeof repository)
      //     defaultChanges.push({
      //       // @ts-ignore
      //       key,
      //       // @ts-ignore
      //       value: query === '1' ? 'dummy' : undefined
      //     })
      //   }
      // })
      // console.log(defaultChanges)
      // handleChanges(defaultChanges)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!repository) {
    return null
  }

  const languages = repository.languages?.nodes || []
  const language = languages.length > 0 ? languages[0] : null

  return (
    <div className="config-wrapper">
      <Row align="middle">
        <Col span={20} offset={4}>
          <Form>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <SelectWrapper
                title="Theme"
                keyName="theme"
                map={Object.keys(Theme).map(key => ({
                  key,
                  label: (Theme as any)[key]
                }))}
                defaultValue={Theme.light}
                handleChange={handleChange}></SelectWrapper>
              <SelectWrapper
                title="File Type"
                keyName="fileType"
                map={Object.keys(FileType).map(key => ({
                  key,
                  label: (FileType as any)[key]
                }))}
                defaultValue={FileType.png}
                handleChange={handleChange}
              />
              <SelectWrapper
                title="Font"
                keyName="font"
                map={Object.keys(Font).map(key => ({
                  key,
                  label: (Font as any)[key]
                }))}
                defaultValue={Font.inter}
                handleChange={handleChange}
              />
              <SelectWrapper
                title="Background Pattern"
                keyName="pattern"
                map={Object.keys(Pattern).map(key => ({
                  key,
                  label: (Pattern as any)[key]
                }))}
                defaultValue={Pattern.circuitBoard}
                handleChange={handleChange}
              />
              <Row gutter={[24, 24]}>
                {repository.description && (
                  <CheckBoxWrapper
                    title="Description"
                    keyName="description"
                    checked={config.description?.state}
                    checkedValue={repository.description}
                    handleChange={handleChange}
                  />
                )}
                {language && (
                  <CheckBoxWrapper
                    title="Language"
                    keyName="language"
                    checked={config.language?.state}
                    checkedValue={language.name}
                    handleChange={handleChange}
                  />
                )}
                {repository.stargazerCount > 0 && (
                  <CheckBoxWrapper
                    title="Stars"
                    keyName="stargazers"
                    checked={config.stargazers?.state}
                    checkedValue={repository.stargazerCount}
                    handleChange={handleChange}
                  />
                )}
                {repository.forkCount > 0 && (
                  <CheckBoxWrapper
                    title="Forks"
                    keyName="forks"
                    checked={config.forks?.state}
                    checkedValue={repository.forkCount}
                    handleChange={handleChange}
                  />
                )}
                {repository.issues.totalCount > 0 && (
                  <CheckBoxWrapper
                    title="Issues"
                    keyName="issues"
                    checked={config.issues?.state}
                    checkedValue={repository.issues.totalCount}
                    handleChange={handleChange}
                  />
                )}
                {repository.pullRequests.totalCount > 0 && (
                  <CheckBoxWrapper
                    title="Pull Requests"
                    keyName="pulls"
                    checked={config.pulls?.state}
                    checkedValue={repository.pullRequests.totalCount}
                    handleChange={handleChange}
                  />
                )}
              </Row>
            </Space>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Config
