import * as constants from './constants'

describe('constants', () => {
  test('matches snapshot', () => {
    expect(constants).toMatchSnapshot()
  })
})
