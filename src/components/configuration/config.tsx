import React, { useContext, useEffect } from 'react'
import { Col, Form, Row, Space } from 'antd'

import { useHistory, useLocation } from 'react-router-dom'

import ConfigContext from '../../contexts/ConfigContext'

import ConfigType, {
  Theme,
  Pattern,
  Font,
  FileType,
  RequiredConfigsKeys,
  OptionalConfigs
} from '../../types/configType'

import { mainRendererQueryResponse } from '../__generated__/mainRendererQuery.graphql'

import './config.css'
import SelectWrapper from './selectWrapper'
import CheckBoxWrapper from './checkBoxWrapper'
import TextAreaWrapper from './textAreaWrapper'

import InputWrapper from './inputWrapper'

type ConfigProp = {
  repository: mainRendererQueryResponse['repository']
  owner: string
}

const Config = ({ repository, owner }: ConfigProp) => {
  const history = useHistory()
  const location = useLocation()
  const { config, setConfig } = useContext(ConfigContext)

  const handleChanges = (changes: { value: any; key: keyof ConfigType }[]) => {
    let newConfig: ConfigType = { ...config }
    const urlParams = new URLSearchParams(location.search)
    changes.forEach(({ value, key }) => {
      const currentValue = newConfig[key] ? newConfig[key] : {}
      if (value.required === true) {
        newConfig = { ...newConfig, [key]: value.val }
      } else {
        newConfig = { ...newConfig, [key]: { ...currentValue, ...value } }
      }

      if (value && value.state === true && value.editable) {
        urlParams.set(key, '1')
        urlParams.set(`${key}Editable`, value.value)
      } else if (value && value.state === true) {
        urlParams.set(key, '1')
      } else if (value && value.required === true) {
        urlParams.set(key, value.val)
      } else {
        urlParams.set(key, '0')
      }
    })
    // setConfig(newConfig)
    urlParams.sort()

    history.push(`?${urlParams.toString()}`)
  }

  const handleChange = (value: any, key: keyof ConfigType) => {
    handleChanges([{ value, key }])
  }

  useEffect(() => {
    if (repository) {
      const languages = repository.languages?.nodes || []
      const language =
        languages.length > 0 ? languages[0]?.name || 'unknown' : 'unknown'

      const newConfig: OptionalConfigs = {
        owner: { state: true, value: owner },
        description: {
          state: false,
          editable: true,
          value: repository.description || ''
        },
        language: { state: true, value: language },
        stargazers: { state: true, value: repository.stargazerCount },
        forks: { state: false, value: repository.forkCount },
        pulls: { state: false, value: repository.pullRequests.totalCount },
        issues: { state: false, value: repository.issues.totalCount }
      }

      const params = new URLSearchParams(location.search)

      Array.from(params.keys()).forEach(stringKey => {
        const key = stringKey as keyof ConfigType
        console.log('Key', key)
        if (key in newConfig) {
          const query = params.get(key)
          const currentConfig = newConfig[key as keyof typeof newConfig]
          const newChange = {
            state: query === '1'
          }
          if (currentConfig?.editable) {
            const editableValue = params.get(`${key}Editable`)
            if (editableValue != null) {
              Object.assign(newChange, {
                value: editableValue
              })
            }
            console.log(newChange)
          }

          Object.assign(newConfig[key as keyof typeof newConfig], newChange)
        } else if (key in RequiredConfigsKeys) {
          const query = params.get(key)
          if (query != null) {
            const newChange = {
              [key]: query
            }

            Object.assign(newConfig, newChange)
          }
        }
      })
      console.log('Updated Config', newConfig)
      setConfig({ ...config, ...newConfig, name: repository.name })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

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
                value={config.theme}
                defaultValue={Theme.light}
                handleChange={handleChange}></SelectWrapper>
              <SelectWrapper
                title="File Type"
                keyName="fileType"
                map={Object.keys(FileType).map(key => ({
                  key,
                  label: (FileType as any)[key]
                }))}
                value={config.fileType}
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
                value={config.font}
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
                value={config.pattern}
                defaultValue={Pattern.plus}
                handleChange={handleChange}
              />
              <Row>
                <InputWrapper
                  title="Logo"
                  keyName="logo"
                  placeholder={'Enter logo url here'}
                  value={config.logo}
                  handleChange={handleChange}
                />
              </Row>
              <Row gutter={[24, 24]}>
                <CheckBoxWrapper
                  title="Owner"
                  keyName="owner"
                  checked={config.owner?.state}
                  handleChange={handleChange}></CheckBoxWrapper>

                {language && (
                  <CheckBoxWrapper
                    title="Language"
                    keyName="language"
                    checked={config.language?.state}
                    handleChange={handleChange}
                  />
                )}
                <CheckBoxWrapper
                  title="Stars"
                  keyName="stargazers"
                  checked={config.stargazers?.state}
                  handleChange={handleChange}
                />
                <CheckBoxWrapper
                  title="Forks"
                  keyName="forks"
                  checked={config.forks?.state}
                  handleChange={handleChange}
                />
                <CheckBoxWrapper
                  title="Issues"
                  keyName="issues"
                  checked={config.issues?.state}
                  handleChange={handleChange}
                />
                <CheckBoxWrapper
                  title="Pull Requests"
                  keyName="pulls"
                  checked={config.pulls?.state}
                  handleChange={handleChange}
                />
              </Row>
              <Row>
                <div className="text-area-wrapper">
                  <CheckBoxWrapper
                    title="Description"
                    keyName="description"
                    checked={config.description?.state}
                    handleChange={handleChange}
                  />
                  <TextAreaWrapper
                    keyName="description"
                    value={config.description?.value || ''}
                    defaultValue={repository.description || ''}
                    handleChange={handleChange}
                    disabled={!config.description?.state}
                  />
                </div>
              </Row>
            </Space>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Config
