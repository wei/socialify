import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Repo from './repo'

test('Repo renders', () => {
  const repo = shallow(<Repo />)

  expect(toJson(repo)).toMatchSnapshot()
})
