/* eslint-disable jest/no-conditional-expect */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Card from './card'

import Configuration, {
  FileType,
  Font,
  Pattern,
  Theme
} from '../../../common/types/configType'

test('Card #1 renders', () => {
  const config: Configuration = {
    fileType: FileType.svg,
    font: Font.inter,
    logo: '',
    name: 'project_name',
    pattern: Pattern.brickWall,
    theme: Theme.light
  }

  const card = shallow(<Card {...config} />)
  expect(toJson(card)).toMatchSnapshot()
  expect(card.hasClass('card-svg-wrapper')).toBe(true)
  const cardWrapper = card.find('.card-wrapper')
  expect(cardWrapper).toBeTruthy()
  expect(cardWrapper.hasClass('card-wrapper')).toBe(true)
  expect((cardWrapper.prop('style') || {}).fontFamily).toStrictEqual(
    config.font
  )
  expect(cardWrapper.hasClass(`theme-${config.theme.toLowerCase()}`)).toBe(true)
  expect(cardWrapper.find('.card-logo-wrapper i').length).toBe(1)
  expect(
    cardWrapper
      .find('.card-logo-wrapper i')
      .at(0)
      .hasClass('devicon-github-original')
  ).toBe(true)
  expect(cardWrapper.find('.card-logo-wrapper img').exists()).toBe(false)
  expect(
    cardWrapper.find('.card-logo-wrapper i').at(0).hasClass('colored')
  ).toBe(true)
  expect(cardWrapper.find('.card-logo-divider').length).toBe(0)
  expect(cardWrapper.find('.card-name-name').text()).toStrictEqual(config.name)
  expect(cardWrapper.find('.card-description-wrapper').exists()).toBe(false)
  expect(cardWrapper.find('.card-badges-wrapper').length).toBe(0)
})

test('Card #2 renders', () => {
  const config: Configuration = {
    fileType: FileType.jpg,
    font: Font.koho,
    logo: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
    name: 'project_name',
    pattern: Pattern.brickWall,
    theme: Theme.dark,
    description: {
      value: 'TEST DESCRIPTION',
      state: true
    },
    owner: {
      value: 'owner',
      state: true
    },
    language: {
      value: 'JavaScript',
      state: true
    },
    stargazers: {
      value: 1,
      state: true
    },
    forks: {
      value: 2,
      state: true
    },
    issues: {
      value: 3,
      state: true
    },
    pulls: {
      value: 4,
      state: true
    }
  }

  const card = shallow(<Card {...config} />)
  expect(toJson(card)).toMatchSnapshot()
  expect(card.hasClass('card-svg-wrapper')).toBe(true)
  const cardWrapper = card.find('.card-wrapper')
  expect(cardWrapper).toBeTruthy()
  expect(cardWrapper.hasClass('card-wrapper')).toBe(true)
  expect((cardWrapper.prop('style') || {}).fontFamily).toStrictEqual(
    config.font
  )
  expect(cardWrapper.hasClass(`theme-${config.theme.toLowerCase()}`)).toBe(true)
  expect(cardWrapper.find('.card-name-name').text()).toStrictEqual(config.name)
  expect(cardWrapper.find('.card-logo-wrapper img').length).toBe(1)
  expect(cardWrapper.find('.card-logo-wrapper img').prop('src')).toBe(
    config.logo
  )
  expect(cardWrapper.find('.card-logo-wrapper i').length).toBe(1)
  expect(cardWrapper.find('.card-logo-divider').length).toBe(1)
  expect(cardWrapper.find('.card-description-wrapper').text()).toStrictEqual(
    config.description?.value
  )
  expect(cardWrapper.find('.card-badges-wrapper').length).toBe(1)
  expect(cardWrapper.find('.card-badges-wrapper > *').length).toBe(4)
  expect(
    cardWrapper.find('.card-badges-wrapper > *').at(0).prop('name')
  ).toStrictEqual('stars')
  expect(
    cardWrapper.find('.card-badges-wrapper > *').at(0).prop('value')
  ).toStrictEqual(`${config.stargazers?.value}`)
  expect(
    cardWrapper.find('.card-badges-wrapper > *').at(1).prop('name')
  ).toStrictEqual('forks')
  expect(
    cardWrapper.find('.card-badges-wrapper > *').at(1).prop('value')
  ).toStrictEqual(`${config.forks?.value}`)
  expect(
    cardWrapper.find('.card-badges-wrapper > *').at(2).prop('name')
  ).toStrictEqual('issues')
  expect(
    cardWrapper.find('.card-badges-wrapper > *').at(2).prop('value')
  ).toStrictEqual(`${config.issues?.value}`)
  expect(
    cardWrapper.find('.card-badges-wrapper > *').at(3).prop('name')
  ).toStrictEqual('pulls')
  expect(
    cardWrapper.find('.card-badges-wrapper > *').at(3).prop('value')
  ).toStrictEqual(`${config.pulls?.value}`)
})
