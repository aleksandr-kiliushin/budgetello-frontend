import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { financeCategories, financeCategoryTypes } from '#utils/test-utils/mocks/constants'

const handlers = [
  rest.get('/api/finance-category', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategories))
  }),

  rest.get('/api/finance-category-type', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategoryTypes))
  }),
]

const server = setupServer(...handlers)

export default server
