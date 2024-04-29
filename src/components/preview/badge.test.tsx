import { expect, test } from '@jest/globals'
import { render } from '@testing-library/react'

import Badge from './badge'

test('Badge renders', () => {
  const { container } = render(
    <Badge color="black" name="name1" value="value1" />
  )
  const badge = container.firstElementChild

  // Added so expect is not called with null.
  if (!badge) {
    throw new Error('Element not found')
  }

  expect(badge).toMatchSnapshot()
  expect(badge.classList.contains('badge-wrapper')).toBe(true)
  expect(
    badge.querySelector<HTMLElement>('.badge-label')?.textContent
  ).toStrictEqual('name1')
  expect(
    badge.querySelector<HTMLElement>('.badge-value')?.textContent
  ).toStrictEqual('value1')
  expect(
    badge.querySelector<HTMLElement>('.badge-value')?.style.backgroundColor
  ).toStrictEqual('black')
})
