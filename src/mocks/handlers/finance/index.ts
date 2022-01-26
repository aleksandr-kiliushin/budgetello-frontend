import faker from 'faker'
import { rest } from 'msw'

import { financeCategories, financeCategoryTypes } from '#mocks/constants/finance'
import { FinanceCategory } from '#src/types/finance'
import Http from '#src/utils/Http'

import { CreateNewFinanceCategoryRequestBody } from './types'

const financeHandlers = [
  rest.get(Http.createFullUrl('/api/finance-category'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategories))
  }),

  rest.get(Http.createFullUrl('/api/finance-category-type'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(financeCategoryTypes))
  }),

  rest.post<CreateNewFinanceCategoryRequestBody>(
    Http.createFullUrl('/api/finance-category'),
    (req, res, ctx) => {
      const { name, typeId } = req.body

      const type = financeCategoryTypes.find(({ id }) => id === typeId)

      if (type === undefined) {
        throw new Error(`A category with the specified ID was not found (${typeId}).`)
      }

      const newCategory: FinanceCategory = {
        id: faker.datatype.number(),
        name,
        type,
      }

      return res(ctx.status(201), ctx.json(newCategory))
    },
  ),
]

export default financeHandlers
