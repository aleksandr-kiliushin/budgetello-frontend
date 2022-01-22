/** @jest-environment jsdom */
import { screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { financeCategories, financeCategoryTypes } from '#mocks/constants'
import render from '#mocks/render'
import Settings from '#views/settings'

const server = setupServer(
  rest.get('/api/finance-category', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategories))
  }),

  rest.get('/api/finance-category-type', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategoryTypes))
  }),
)
beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

test('<Settings />', async () => {
  render(<Settings />)

  expect(await screen.findByText(financeCategories[0].name)).toBeInTheDocument()
  expect(await screen.findByText(financeCategories[1].name)).toBeInTheDocument()
  expect(await screen.findByText(financeCategories[2].name)).toBeInTheDocument()
})
