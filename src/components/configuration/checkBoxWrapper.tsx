import React from 'react'
import { Col, Checkbox } from 'antd'

import ConfigType from '../../types/configType'

type CheckBoxProps = {
  title: string
  keyName: keyof ConfigType
  checked?: boolean
  checkedValue: string | number
  handleChange: (value: any, key: keyof ConfigType) => void
}

const CheckBoxWrapper = ({
  title,
  keyName,
  checked,
  checkedValue,
  handleChange
}: CheckBoxProps) => {
  return (
    <Col span={12}>
      <Checkbox
        checked={!!checked}
        onChange={e => {
          handleChange(e.target.checked ? checkedValue : undefined, keyName)
        }}>
        <strong>{title}</strong>
      </Checkbox>
    </Col>
  )
}

export default CheckBoxWrapper
