import faker from 'faker'
import { rest } from 'msw'

import { financeCategories, financeCategoryTypes } from '#mocks/constants/finance'
import { FinanceCategory } from '#src/types/finance'
import Http from '#src/utils/Http'

import { CreateNewFinanceCategoryRequestBody, EditFinanceCategoryRequestBody } from './types'

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

  rest.patch<EditFinanceCategoryRequestBody>(
    Http.createFullUrl('/api/finance-category/:categoryId'),
    (req, res, ctx) => {
      const { name, typeId } = req.body
      const { categoryId } = req.params

      const type = financeCategoryTypes.find(({ id }) => id === typeId)

      if (type === undefined) {
        throw new Error(`A category with the specified ID was not found (${typeId}).`)
      }

      if (isNaN(Number(categoryId))) throw Error('Invalid category ID.')

      const editedCategory: FinanceCategory = {
        id: Number(categoryId),
        name,
        type,
      }

      return res(ctx.status(200), ctx.json(editedCategory))
    },
  ),

  rest.delete(Http.createFullUrl('/api/finance-category/:categoryId'), (req, res, ctx) => {
    const { categoryId } = req.params

    if (isNaN(Number(categoryId))) throw Error('Invalid category ID.')

    const category = financeCategories.find(({ id }) => id === Number(categoryId))

    if (category === undefined) {
      throw new Error(`A category with the specified ID was not found (${categoryId}).`)
    }

    const deletedCategory: FinanceCategory = category

    return res(ctx.status(200), ctx.json(deletedCategory))
  }),
]

export default financeHandlers
