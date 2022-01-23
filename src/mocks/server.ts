import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
  correctAuthToken,
  financeCategories,
  financeCategoryTypes,
  userData,
} from '#mocks/constants'
import Http from '#src/utils/Http'

const handlers = [
  rest.post(Http.createFullUrl('/api/login'), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ authToken: correctAuthToken }))
  }),

  rest.get(Http.createFullUrl('/api/user/me'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData))
  }),

  rest.get(Http.createFullUrl('/api/finance-category'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategories))
  }),

  rest.get(Http.createFullUrl('/api/finance-category-type'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategoryTypes))
  }),
]

const server = setupServer(...handlers)

export default server
