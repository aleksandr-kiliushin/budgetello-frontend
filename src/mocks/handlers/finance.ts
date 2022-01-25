import { rest } from 'msw'

import { financeCategories, financeCategoryTypes } from '#mocks/constants/finance'
import Http from '#src/utils/Http'

const financeHandlers = [
  rest.get(Http.createFullUrl('/api/finance-category'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategories))
  }),

  rest.get(Http.createFullUrl('/api/finance-category-type'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategoryTypes))
  }),
]

export default financeHandlers
