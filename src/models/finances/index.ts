import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "#models/store"
import { LoadingStatus } from "#src/constants/shared"
import { FinanceCategory, FinanceCategoryType, FinanceRecord } from "#types/finance"
import Http from "#utils/Http"

interface IState {
  categories: {
    items: FinanceCategory[]
    status: LoadingStatus
  }
  categoryTypes: {
    items: FinanceCategoryType[]
    status: LoadingStatus
  }
  chartData: {
    items: FinanceRecord[]
    status: LoadingStatus
  }
  records: {
    notTrashed: {
      items: FinanceRecord[]
      status: LoadingStatus
    }
    trashed: {
      items: FinanceRecord[]
      status: LoadingStatus
    }
  }
}

export const initialState: IState = {
  categories: {
    items: [],
    status: LoadingStatus.Idle,
  },
  categoryTypes: {
    items: [],
    status: LoadingStatus.Idle,
  },
  chartData: {
    items: [],
    status: LoadingStatus.Idle,
  },
  records: {
    notTrashed: {
      items: [],
      status: LoadingStatus.Idle,
    },
    trashed: {
      items: [],
      status: LoadingStatus.Idle,
    },
  },
}

const financesSlice = createSlice({
  extraReducers: (builder) => {
    // To do: try addRecordsTc.PENDING,
    builder.addCase(createCategoryTc.fulfilled, (state, action: PayloadAction<FinanceCategory>) => {
      state.categories.items.unshift(action.payload)
    })

    builder.addCase(createRecordTc.fulfilled, (state, action: PayloadAction<FinanceRecord>) => {
      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(deleteCategoryTc.fulfilled, (state, action: PayloadAction<FinanceCategory>) => {
      state.categories.items = state.categories.items.filter((category) => category.id !== action.payload.id)
    })

    builder.addCase(
      deleteRecordTc.fulfilled,
      (state, action: PayloadAction<{ isPermanentDeletion: boolean; record: FinanceRecord }>) => {
        const { isPermanentDeletion, record } = action.payload
        const { id } = record

        const recordsArrayType = isPermanentDeletion ? "trashed" : "notTrashed"

        state.records[recordsArrayType].items = state.records[recordsArrayType].items.filter(
          (record) => record.id !== id
        )

        if (isPermanentDeletion) return

        state.records.trashed.items.unshift(record)
      }
    )

    builder.addCase(getCategoriesTc.fulfilled, (state, action: PayloadAction<FinanceCategory[]>) => {
      if (action.payload.length === 0) return

      state.categories = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(getCategoryTypesTc.fulfilled, (state, action: PayloadAction<FinanceCategoryType[]>) => {
      if (action.payload.length === 0) return

      state.categoryTypes = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(getChartDataTc.fulfilled, (state, action: PayloadAction<FinanceRecord[]>) => {
      if (action.payload.length === 0) return

      state.chartData = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(restoreRecordTc.fulfilled, (state, action: PayloadAction<FinanceRecord>) => {
      state.records.trashed.items = state.records.trashed.items.filter((record) => record.id !== action.payload.id)

      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(updateCategoryTc.fulfilled, (state, action: PayloadAction<FinanceCategory>) => {
      const categoryIndex = state.categories.items.findIndex((category) => category.id === action.payload.id)

      state.categories.items[categoryIndex] = action.payload
    })

    builder.addCase(updateRecordTc.fulfilled, (state, action: PayloadAction<FinanceRecord>) => {
      const recordIndex = state.records.notTrashed.items.findIndex((record) => record.id === action.payload.id)

      state.records.notTrashed.items[recordIndex] = action.payload
    })
  },
  initialState,
  name: "finance",
  reducers: {
    addRecordsItems: (
      state,
      action: PayloadAction<{
        isTrash: boolean
        items: FinanceRecord[]
      }>
    ) => {
      const { isTrash, items } = action.payload

      state.records[isTrash ? "trashed" : "notTrashed"].items.push(...items)
    },

    setRecordsStatus: (state, action: PayloadAction<{ isTrash: boolean; status: LoadingStatus }>) => {
      const { isTrash, status } = action.payload

      state.records[isTrash ? "trashed" : "notTrashed"].status = status
    },
  },
})

export const financeActions = financesSlice.actions
export const financesReducer = financesSlice.reducer

export const createRecordTc = createAsyncThunk(
  "finance/createRecordTc",
  async ({
    amount,
    categoryId,
    date,
  }: {
    amount: FinanceRecord["amount"]
    categoryId: FinanceCategory["id"]
    date: FinanceRecord["date"]
  }) => {
    const response = await Http.post({
      payload: { amount, categoryId, date },
      url: "/api/finances/records",
    })
    return await response.json()
  }
)

export const createCategoryTc = createAsyncThunk(
  "finance/createCategoryTc",
  async ({ name, typeId }: { name: FinanceCategory["name"]; typeId: FinanceCategoryType["id"] }) => {
    const response = await Http.post({
      payload: { name, typeId },
      url: "/api/finances/categories",
    })
    return await response.json()
  }
)

export const deleteCategoryTc = createAsyncThunk(
  "finance/deleteCategoryTc",
  async ({ categoryId }: { categoryId: FinanceCategory["id"] }) => {
    const response = await Http.delete({ url: `/api/finances/categories/${categoryId}` })
    return await response.json()
  }
)

export const deleteRecordTc = createAsyncThunk("finance/deleteRecordTc", async ({ id, isTrashed }: FinanceRecord) => {
  const response = isTrashed
    ? await Http.delete({ url: `/api/finances/records/${id}` })
    : await Http.patch({ payload: { isTrashed: true }, url: `/api/finances/records/${id}` })

  return { isPermanentDeletion: isTrashed, record: await response.json() }
})

export const getCategoriesTc = createAsyncThunk<FinanceCategory[], void, { state: RootState }>(
  "finance/getCategoriesTc",
  async (_, { getState }) => {
    if (getState().finances.categories.status !== LoadingStatus.Idle) return []
    if (!getState().user.isLoggedIn) return []
    const response = await Http.get({ url: "/api/finances/categories/search" })
    return await response.json()
  }
)

export const getCategoryTypesTc = createAsyncThunk<FinanceCategoryType[], void, { state: RootState }>(
  "finance/getCategoryTypesTc",
  async (_, { getState }) => {
    if (getState().finances.categoryTypes.status !== LoadingStatus.Idle) return []
    if (!getState().user.isLoggedIn) return []
    const response = await Http.get({ url: "/api/finances/category-types" })
    return await response.json()
  }
)

export const getChartDataTc = createAsyncThunk<FinanceRecord[], void, { state: RootState }>(
  "finance/getChartDataTc",
  async (_, { getState }) => {
    if (getState().finances.chartData.status !== LoadingStatus.Idle) return []
    const response = await Http.get({
      url: "/api/finances/records/search?isTrashed=false&orderingByDate=ASC&orderingById=ASC",
    })
    return await response.json()
  }
)

export const getRecordsTc = createAsyncThunk<void, { isTrash: boolean }, { state: RootState }>(
  "finance/getRecordsTc",
  async ({ isTrash }, { getState, dispatch }) => {
    const existingRecords = getState().finances.records[isTrash ? "trashed" : "notTrashed"]

    if (existingRecords.status === LoadingStatus.Completed) return
    if (existingRecords.status === LoadingStatus.Loading) return

    dispatch(financeActions.setRecordsStatus({ isTrash, status: LoadingStatus.Loading }))

    const response = await Http.get({
      url: `/api/finances/records/search?isTrashed=${isTrash}&orderingByDate=DESC&orderingById=DESC&skip=${existingRecords.items.length}&take=50`,
    })
    const records = await response.json()

    dispatch(financeActions.addRecordsItems({ isTrash, items: records }))

    dispatch(
      financeActions.setRecordsStatus({
        isTrash,
        status: records.length === 0 ? LoadingStatus.Completed : LoadingStatus.Success,
      })
    )
  }
)

export const restoreRecordTc = createAsyncThunk(
  "finance/restoreRecordTc",
  async ({ recordId }: { recordId: FinanceRecord["id"] }) => {
    const response = await Http.patch({
      payload: { isTrashed: false },
      url: `/api/finances/records/${recordId}`,
    })
    return await response.json()
  }
)

export const updateCategoryTc = createAsyncThunk(
  "finance/updateCategoryTc",
  async ({
    categoryId,
    name,
    typeId,
  }: {
    categoryId: FinanceCategory["id"]
    name: FinanceCategory["name"]
    typeId: FinanceCategoryType["id"]
  }) => {
    const response = await Http.patch({
      payload: { name, typeId },
      url: `/api/finances/categories/${categoryId}`,
    })
    return await response.json()
  }
)

export const updateRecordTc = createAsyncThunk(
  "finance/updateRecordTc",
  async ({
    amount,
    categoryId,
    date,
    id,
  }: {
    amount: FinanceRecord["amount"]
    categoryId: FinanceCategory["id"]
    date: FinanceRecord["date"]
    id: FinanceRecord["id"]
  }) => {
    const response = await Http.patch({
      payload: { amount, categoryId, date },
      url: "/api/finances/records/" + id,
    })
    return await response.json()
  }
)
