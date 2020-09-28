import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Preview from './preview'

test('Preview renders', () => {
  const preview = shallow(<Preview />)

  expect(toJson(preview)).toMatchSnapshot()
  expect(preview.hasClass('preview-wrapper')).toBe(true)
})
