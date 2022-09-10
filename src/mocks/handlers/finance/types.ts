import { FinanceCategory } from "#src/types/finance"

export interface CreateNewFinanceCategoryRequestBody {
  name: FinanceCategory["name"]
  typeId: FinanceCategory["type"]["id"]
}

export type EditFinanceCategoryRequestBody = CreateNewFinanceCategoryRequestBody
