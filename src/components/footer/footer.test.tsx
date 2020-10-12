import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Footer from './footer'

test('Footer renders', () => {
  const footer = shallow(<Footer />)

  expect(toJson(footer)).toMatchSnapshot()
})
