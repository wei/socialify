import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Header from './header'

test('Header renders', () => {
  const header = shallow(<Header />)

  expect(toJson(header)).toMatchSnapshot()
})
