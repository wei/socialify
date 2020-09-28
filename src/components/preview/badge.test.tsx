import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Badge from './badge'

test('Badge renders', () => {
  const badge = shallow(<Badge color="black" name="name1" value="value1" />)

  expect(toJson(badge)).toMatchSnapshot()
  expect(badge.hasClass('badge-wrapper')).toBe(true)
  expect(badge.find('.badge-label').text()).toStrictEqual('name1')
  expect(badge.find('.badge-value').text()).toStrictEqual('value1')
  expect(badge.find('.badge-value').prop('style')).toStrictEqual({
    backgroundColor: 'black'
  })
})
