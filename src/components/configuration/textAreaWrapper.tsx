import React, { useEffect, useState } from 'react'

import { Input, Col } from 'antd'

import { useDebouncedCallback } from 'use-debounce'

import ConfigType from '../../../common/types/configType'

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
  keyName,
  value,
  handleChange,
  disabled
}: TextAreaProps) => {
  const [internalValue, setInternalValue] = useState(value)

  const debounced = useDebouncedCallback((value) => {
    handleChange({ value: value, editable: true, state: true }, keyName)
  }, 500)

  const processChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value)
    debounced(e.target.value)
  }

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  return (
    <Col span={10}>
      <TextArea
        defaultValue={defaultValue}
        value={internalValue}
        onChange={processChange}
        disabled={disabled}></TextArea>
    </Col>
  )
}
export default TextAreaWrapper
