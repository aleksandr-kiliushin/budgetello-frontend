import { financeReducer, initialState } from '#models/finance'

describe('financeReducer', () => {
  test('Should return the initial state when an action with unknown type is dispatched.', () => {
    expect(financeReducer(undefined, { type: 'nonExistingType!!!' })).toBe(initialState)
  })
})
