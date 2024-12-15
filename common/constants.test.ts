import * as constants from '@/common/constants'

describe('constants', () => {
  test('matches snapshot', () => {
    expect(constants).toMatchSnapshot()
  })
})
