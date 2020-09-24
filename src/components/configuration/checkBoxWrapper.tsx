import { Col, Typography, Checkbox } from 'antd';
import React from 'react';

import ConfigType from '../../types/configType';

const { Title } = Typography;


type CheckBoxProps = {
  title: string
  keyName: keyof ConfigType
  handleChange: (value: any, key: keyof ConfigType) => void;
}

const CheckBoxWrapper = ({ title, keyName, handleChange }: CheckBoxProps) => {
  return (

    <>
      <Col span={1}>
        <Checkbox onChange={(e) => { handleChange(e.target.checked, keyName) }}></Checkbox>
      </Col>
      <Col span={10}><Title level={5}>{title}</Title></Col>
      <Col span={1} />
    </>
  )

}

export default CheckBoxWrapper;