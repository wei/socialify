import React from 'react'

import { Col, Input, Typography } from 'antd'

import ConfigType from '../../types/configType'

const { Title } = Typography

type InputProps = {
  title: string
  keyName: keyof ConfigType
  value: string
  placeholder: string
  handleChange: (value: any, key: keyof ConfigType) => void
}

const InputWrapper = ({
  title,
  keyName,
  value,
  placeholder,
  handleChange
}: InputProps) => {
  return (
    <>
      <Col span={10}>
        <Title level={5}>{title}</Title>
      </Col>
      <Col span={10} offset={2}>
        <Input
          type="text"
          value={value || ''}
          placeholder={placeholder}
          onChange={e => {
            console.log('Change', e.target.value)
            handleChange({ val: e.target.value, required: true }, keyName)
          }}
        />
      </Col>
    </>
  )
}
export default InputWrapper
