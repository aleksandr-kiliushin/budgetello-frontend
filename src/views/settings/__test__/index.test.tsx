/** @jest-environment jsdom */
import { render, screen } from '#utils/test-utils'
import Settings from '#views/settings'

import { categories, categoryTypes } from './constants'

test('<Settings />', async () => {
  fetchMock
    .mockResponseOnce(JSON.stringify(categories))
    .mockResponseOnce(JSON.stringify(categoryTypes))

  render(<Settings />)

  expect(await screen.findByText(categories[0].name)).toBeInTheDocument()
  expect(await screen.findByText(categories[1].name)).toBeInTheDocument()
  expect(await screen.findByText(categories[2].name)).toBeInTheDocument()
})
