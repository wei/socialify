import { render } from '@testing-library/react'

import type Configuration from '@/common/types/configType'
import { Font, Pattern, Theme } from '@/common/types/configType'
import Card from '@/src/components/preview/cardThemeWrapper'

test('Card #1 renders', () => {
  const config: Configuration = {
    font: Font.inter,
    logo: '',
    name: {
      value: 'project_name',
      state: true,
    },
    pattern: Pattern.brickWall,
    theme: Theme.light,
  }

  const { container } = render(<Card {...config} />)

  const cardWrapper = container.firstElementChild! as HTMLDivElement
  expect(cardWrapper).toMatchSnapshot()

  expect(cardWrapper).toBeTruthy()
  expect(cardWrapper.classList.contains('card-wrapper')).toBe(true)
  expect(cardWrapper.style.fontFamily).toStrictEqual(config.font)
  expect(
    cardWrapper.classList.contains(`theme-${config.theme.toLowerCase()}`)
  ).toBe(true)
  expect(cardWrapper.querySelectorAll('.card-logo-wrapper img').length).toBe(1)
  expect(
    cardWrapper.querySelectorAll<HTMLImageElement>(
      '.card-logo-wrapper img'
    )?.[0]?.alt
  ).toBe('Logo')
  expect(cardWrapper.querySelectorAll('.card-logo-divider').length).toBe(0)
  expect(
    cardWrapper.querySelector('.card-name-name')?.textContent
  ).toStrictEqual(config.name?.value)
  expect(cardWrapper.querySelector('.card-description-wrapper')).toBeFalsy()
  expect(cardWrapper.querySelectorAll('.card-badges-wrapper').length).toBe(0)
})

test('Card #2 renders', () => {
  const config: Configuration = {
    font: Font.koHo,
    logo: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
    name: {
      value: 'project_name',
      state: true,
    },
    pattern: Pattern.brickWall,
    theme: Theme.dark,
    description: {
      value: 'TEST DESCRIPTION',
      state: true,
    },
    owner: {
      value: 'owner',
      state: true,
    },
    language: {
      value: 'JavaScript',
      state: true,
    },
    stargazers: {
      value: 1,
      state: true,
    },
    forks: {
      value: 2,
      state: true,
    },
    issues: {
      value: 3,
      state: true,
    },
    pulls: {
      value: 4,
      state: true,
    },
  }

  const { container } = render(<Card {...config} />)

  const cardWrapper = container.firstElementChild! as HTMLDivElement
  expect(cardWrapper).toMatchSnapshot()

  expect(cardWrapper).toBeTruthy()
  expect(cardWrapper.classList.contains('card-wrapper')).toBe(true)
  expect(cardWrapper.style.fontFamily).toStrictEqual(config.font)
  expect(
    cardWrapper.classList.contains(`theme-${config.theme.toLowerCase()}`)
  ).toBe(true)
  expect(
    cardWrapper.querySelector('.card-name-name')?.textContent
  ).toStrictEqual(config.name?.value)
  expect(cardWrapper.querySelectorAll('.card-logo-wrapper img').length).toBe(2)
  expect(
    cardWrapper.querySelectorAll<HTMLImageElement>(
      '.card-logo-wrapper img'
    )?.[0].src
  ).toBe(config.logo)
  expect(
    cardWrapper.querySelectorAll<HTMLImageElement>(
      '.card-logo-wrapper img'
    )?.[0]?.alt
  ).toBe('Logo')
  expect(cardWrapper.querySelectorAll('.card-logo-divider').length).toBe(1)
  expect(
    cardWrapper.querySelectorAll<HTMLImageElement>(
      '.card-logo-wrapper img'
    )?.[1]?.alt
  ).toBe('JavaScript')
  expect(
    cardWrapper.querySelector('.card-description-wrapper')?.textContent
  ).toStrictEqual(config.description?.value)
  expect(cardWrapper.querySelectorAll('.card-badges-wrapper').length).toBe(1)
  expect(cardWrapper.querySelectorAll('.card-badges-wrapper > *').length).toBe(
    4
  )
  expect(
    cardWrapper.querySelectorAll('.card-badges-wrapper > *')[0]
      ?.firstElementChild?.textContent
  ).toStrictEqual('stars')
  expect(
    cardWrapper.querySelectorAll('.card-badges-wrapper > *')[0]
      ?.lastElementChild?.textContent
  ).toStrictEqual(`${config.stargazers?.value}`)
  expect(
    cardWrapper.querySelectorAll('.card-badges-wrapper > *')[1]
      ?.firstElementChild?.textContent
  ).toStrictEqual('forks')
  expect(
    cardWrapper.querySelectorAll('.card-badges-wrapper > *')[1]
      ?.lastElementChild?.textContent
  ).toStrictEqual(`${config.forks?.value}`)
  expect(
    cardWrapper.querySelectorAll('.card-badges-wrapper > *')[2]
      ?.firstElementChild?.textContent
  ).toStrictEqual('issues')
  expect(
    cardWrapper.querySelectorAll('.card-badges-wrapper > *')[2]
      ?.lastElementChild?.textContent
  ).toStrictEqual(`${config.issues?.value}`)
  expect(
    cardWrapper.querySelectorAll('.card-badges-wrapper > *')[3]
      ?.firstElementChild?.textContent
  ).toStrictEqual('pulls')
  expect(
    cardWrapper.querySelectorAll('.card-badges-wrapper > *')[3]
      ?.lastElementChild?.textContent
  ).toStrictEqual(`${config.pulls?.value}`)
})
