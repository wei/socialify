import { Col, Row, Select, Typography } from 'antd';
import React from 'react';
import ConfigType from '../../types/configType';


const { Option } = Select

const { Title } = Typography;

type SelectWrapperProps = {
  title: string
  keyName: keyof ConfigType
  map: string[]
  defaultValue: string
  handleChange: (value: any, key: keyof ConfigType) => void;
}

const SelectWrapper = ({ title, keyName, map, defaultValue, handleChange }: SelectWrapperProps) => {
  return (
    <Row>
      <Col span={10}><Title level={5}>{title}</Title></Col>
      <Col span={10} offset={2}>
        <Select defaultValue={defaultValue} onChange={(v) => {
          console.log('keyName pre call', keyName)
          handleChange(v, keyName)
        }} style={{ width: '100%' }}>
          {map.map((k) => {
            return (
              <Option value={k}>{k}</Option>
            )
          })}
        </Select>
      </Col>
    </Row>
  )
}

export default SelectWrapper