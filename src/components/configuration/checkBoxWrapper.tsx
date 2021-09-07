import React from 'react'
import { Col, Checkbox, Typography } from 'antd'

import ConfigType from '../../../common/types/configType'

const { Text } = Typography

type CheckBoxProps = {
  title: string
  keyName: keyof ConfigType
  checked?: boolean

  handleChange: (value: any, key: keyof ConfigType) => void
}

const CheckBoxWrapper = ({
  title,
  keyName,
  checked,
  handleChange
}: CheckBoxProps) => {
  return (
    <Col span={12}>
      <Checkbox
        checked={!!checked}
        onChange={(e) => {
          handleChange({ state: e.target.checked }, keyName)
        }}>
        <Text strong>{title}</Text>
      </Checkbox>
    </Col>
  )
}

export default CheckBoxWrapper
