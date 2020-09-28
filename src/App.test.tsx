import React from 'react'
import { shallow } from 'enzyme'
// import App from './App'

test('placeholder', () => {
  const placeholder = shallow(<span>placeholder</span>)
  expect(placeholder.text()).toEqual('placeholder')
})
