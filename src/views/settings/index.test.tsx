/** @jest-environment jsdom */
import { screen } from '@testing-library/react'

import { financeCategories } from '#mocks/constants/finance'
import render from '#mocks/render'
import Settings from '#views/settings'

describe('Finance categories service.', () => {
  test('Finance categories come from backend and render correctly.', async () => {
    render(<Settings />)

    financeCategories.forEach(async ({ name }) => {
      expect(await screen.findByText(name)).toBeInTheDocument()
    })
  })
})
