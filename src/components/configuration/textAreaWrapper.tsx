import React from 'react'

import { Input, Col } from 'antd'

import ConfigType from '../../types/configType'

const { TextArea } = Input

type TextAreaProps = {
  defaultValue: string
  value: string
  keyName: keyof ConfigType
  handleChange: (value: any, key: keyof ConfigType) => void
  disabled?: boolean
}

const TextAreaWrapper = ({
  defaultValue,
  value,
  keyName,
  handleChange,
  disabled
}: TextAreaProps) => {
  return (
    <Col span={10}>
      <TextArea
        defaultValue={defaultValue}
        value={value}
        onChange={e => {
          handleChange({ value: e.target.value }, keyName)
        }}
        disabled={disabled}></TextArea>
    </Col>
  )
}
export default TextAreaWrapper
