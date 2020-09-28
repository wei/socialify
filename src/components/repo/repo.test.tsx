import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Repo from './repo'

test('Repo renders', () => {
  const repo = shallow(<Repo />)

  expect(toJson(repo)).toMatchSnapshot()
  expect(repo.hasClass('repo-wrapper')).toBe(true)
  expect(repo.find('.repo-input-container').length).toBe(1)
})
