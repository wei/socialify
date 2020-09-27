import React from 'react'
import { Col, Row, Select, Typography } from 'antd'

import ConfigType from '../../types/configType'

const { Option } = Select
const { Text } = Typography

type SelectWrapperProps = {
  title: string
  keyName: keyof ConfigType
  map: { key: string; label: any }[]
  defaultValue: string
  value: string
  handleChange: (value: any, key: keyof ConfigType) => void
}

const SelectWrapper = ({
  title,
  keyName,
  map,
  defaultValue,
  value,
  handleChange
}: SelectWrapperProps) => {
  return (
    <Row>
      <Col span={10}>
        <Text strong>{title}</Text>
      </Col>
      <Col span={10} offset={2}>
        <Select
          defaultValue={defaultValue}
          onChange={v => {
            handleChange({ val: v, required: true }, keyName)
          }}
          value={value}
          style={{ width: '100%' }}>
          {map.map(({ key, label }) => {
            return (
              <Option key={key} value={label}>
                {label}
              </Option>
            )
          })}
        </Select>
      </Col>
    </Row>
  )
}

export default SelectWrapper
