import React from 'react'

import { Col, Input, Typography } from 'antd'

import ConfigType from '../../../common/types/configType'

const { Text } = Typography

type InputProps = {
  title: string
  keyName: keyof ConfigType
  value: string
  placeholder: string
  disabled?: boolean
  handleChange: (value: any, key: keyof ConfigType) => void
}

const InputWrapper = ({
  title,
  keyName,
  value,
  placeholder,
  disabled,
  handleChange
}: InputProps) => {
  return (
    <>
      <Col span={10}>
        <Text strong>{title}</Text>
      </Col>
      <Col span={10} offset={2}>
        <Input
          type="text"
          value={value || ''}
          disabled={!!disabled}
          placeholder={placeholder}
          onChange={e => {
            handleChange({ val: e.target.value, required: true }, keyName)
          }}
        />
      </Col>
    </>
  )
}
export default InputWrapper
