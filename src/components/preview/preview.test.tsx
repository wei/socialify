import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Preview from './preview'

beforeAll(() => {
  window.HTMLCanvasElement.prototype.toDataURL = () => ''
})

test('Preview renders', () => {
  const preview = shallow(<Preview />)

  expect(toJson(preview)).toMatchSnapshot()
})
