/** @jest-environment jsdom */
import { screen } from '@testing-library/react'

import { financeCategories } from '#mocks/constants'
import render from '#mocks/render'
import Settings from '#views/settings'

test('<Settings />', async () => {
  render(<Settings />)

  expect(await screen.findByText(financeCategories[0].name)).toBeInTheDocument()
  expect(await screen.findByText(financeCategories[1].name)).toBeInTheDocument()
  expect(await screen.findByText(financeCategories[2].name)).toBeInTheDocument()
})
