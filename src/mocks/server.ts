import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { financeCategories, financeCategoryTypes } from '#mocks/constants'
import Http from '#src/utils/Http'

const handlers = [
  rest.get(Http.createFullUrl('/api/finance-category'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategories))
  }),

  rest.get(Http.createFullUrl('/api/finance-category-type'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategoryTypes))
  }),
]

const server = setupServer(...handlers)

export default server
