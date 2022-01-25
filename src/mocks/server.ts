import { rest } from 'msw'
import { setupServer } from 'msw/node'

import authConstants from '#mocks/constants/auth'
import { financeCategories, financeCategoryTypes } from '#mocks/constants/finance'
import userConstants from '#mocks/constants/user'
import Http from '#src/utils/Http'
import User from '#types/user'

const handlers = [
  rest.post<{ authToken: string }>(Http.createFullUrl('/api/login'), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ authToken: authConstants.validAuthToken }))
  }),

  rest.get<User>(Http.createFullUrl('/api/user/me'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: userConstants.id,
        password: userConstants.password,
        username: userConstants.username,
      }),
    )
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
