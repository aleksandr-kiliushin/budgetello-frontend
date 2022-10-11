import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "#models/store"
import { LoadingStatus } from "#src/constants/shared"
import { IBoard } from "#types/boards"
import { IBudgetCategory, IBudgetCategoryType, IBudgetRecord } from "#types/budget"
import { Http } from "#utils/Http"

interface IState {
  categories: {
    items: IBudgetCategory[]
    status: LoadingStatus
  }
  categoryTypes: {
    items: IBudgetCategoryType[]
    status: LoadingStatus
  }
  chartData: {
    items: IBudgetRecord[]
    status: LoadingStatus
  }
  records: {
    notTrashed: {
      items: IBudgetRecord[]
      status: LoadingStatus
    }
    trashed: {
      items: IBudgetRecord[]
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

const budgetSlice = createSlice({
  extraReducers: (builder) => {
    // To do: try addRecordsTc.PENDING,
    builder.addCase(createCategoryTc.fulfilled, (state, action: PayloadAction<IBudgetCategory>) => {
      state.categories.items.unshift(action.payload)
    })

    builder.addCase(createRecordTc.fulfilled, (state, action: PayloadAction<IBudgetRecord>) => {
      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(deleteCategoryTc.fulfilled, (state, action: PayloadAction<IBudgetCategory>) => {
      state.categories.items = state.categories.items.filter((category) => category.id !== action.payload.id)
    })

    builder.addCase(
      deleteRecordTc.fulfilled,
      (state, action: PayloadAction<{ isPermanentDeletion: boolean; record: IBudgetRecord }>) => {
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

    builder.addCase(getCategoriesTc.fulfilled, (state, action: PayloadAction<IBudgetCategory[]>) => {
      if (action.payload.length === 0) return

      state.categories = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(getCategoryTypesTc.fulfilled, (state, action: PayloadAction<IBudgetCategoryType[]>) => {
      if (action.payload.length === 0) return

      state.categoryTypes = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(getChartDataTc.fulfilled, (state, action: PayloadAction<IBudgetRecord[]>) => {
      if (action.payload.length === 0) return

      state.chartData = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(restoreRecordTc.fulfilled, (state, action: PayloadAction<IBudgetRecord>) => {
      state.records.trashed.items = state.records.trashed.items.filter((record) => record.id !== action.payload.id)

      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(updateCategoryTc.fulfilled, (state, action: PayloadAction<IBudgetCategory>) => {
      const categoryIndex = state.categories.items.findIndex((category) => category.id === action.payload.id)

      state.categories.items[categoryIndex] = action.payload
    })

    builder.addCase(updateRecordTc.fulfilled, (state, action: PayloadAction<IBudgetRecord>) => {
      const recordIndex = state.records.notTrashed.items.findIndex((record) => record.id === action.payload.id)

      state.records.notTrashed.items[recordIndex] = action.payload
    })
  },
  initialState,
  name: "budget",
  reducers: {
    addRecordsItems: (
      state,
      action: PayloadAction<{
        isTrash: boolean
        items: IBudgetRecord[]
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

export const budgetActions = budgetSlice.actions
export const budgetReducer = budgetSlice.reducer

export const createRecordTc = createAsyncThunk(
  "budget/createRecordTc",
  async ({
    amount,
    categoryId,
    date,
  }: {
    amount: IBudgetRecord["amount"]
    categoryId: IBudgetCategory["id"]
    date: IBudgetRecord["date"]
  }) => {
    const response = await Http.post({
      payload: { amount, categoryId, date },
      url: "/api/budget/records",
    })
    return await response.json()
  }
)

export const createCategoryTc = createAsyncThunk(
  "budget/createCategoryTc",
  async (
    {
      boardId,
      name,
      typeId,
    }: { boardId: IBoard["id"]; name: IBudgetCategory["name"]; typeId: IBudgetCategoryType["id"] },
    thunkApi
  ) => {
    try {
      const response = await Http.post({
        payload: { boardId, name, typeId },
        url: "/api/budget/categories",
      })
      return await response.json()
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteCategoryTc = createAsyncThunk(
  "budget/deleteCategoryTc",
  async ({ categoryId }: { categoryId: IBudgetCategory["id"] }) => {
    const response = await Http.delete({ url: `/api/budget/categories/${categoryId}` })
    return await response.json()
  }
)

export const deleteRecordTc = createAsyncThunk("budget/deleteRecordTc", async ({ id, isTrashed }: IBudgetRecord) => {
  const response = isTrashed
    ? await Http.delete({ url: `/api/budget/records/${id}` })
    : await Http.patch({ payload: { isTrashed: true }, url: `/api/budget/records/${id}` })

  return { isPermanentDeletion: isTrashed, record: await response.json() }
})

export const getCategoriesTc = createAsyncThunk<IBudgetCategory[], { boardId: IBoard["id"] }, { state: RootState }>(
  "budget/getCategoriesTc",
  async ({ boardId }, { getState }) => {
    if (getState().budget.categories.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({ url: "/api/budget/categories/search?boardId=" + boardId })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getCategoryTypesTc = createAsyncThunk<IBudgetCategoryType[], void, { state: RootState }>(
  "budget/getCategoryTypesTc",
  async (_, { getState }) => {
    if (getState().budget.categoryTypes.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({ url: "/api/budget/category-types" })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getChartDataTc = createAsyncThunk<IBudgetRecord[], void, { state: RootState }>(
  "budget/getChartDataTc",
  async (_, { getState }) => {
    if (getState().budget.chartData.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({
        url: "/api/budget/records/search?isTrashed=false&orderingByDate=ASC&orderingById=ASC",
      })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getRecordsTc = createAsyncThunk<void, { boardId: IBoard["id"]; isTrash: boolean }, { state: RootState }>(
  "budget/getRecordsTc",
  async ({ boardId, isTrash }, { getState, dispatch }) => {
    const existingRecords = getState().budget.records[isTrash ? "trashed" : "notTrashed"]

    if (existingRecords.status === LoadingStatus.Completed) return
    if (existingRecords.status === LoadingStatus.Loading) return

    dispatch(budgetActions.setRecordsStatus({ isTrash, status: LoadingStatus.Loading }))

    const response = await Http.get({
      url: `/api/budget/records/search?boardId=${boardId}&isTrashed=${isTrash}&orderingByDate=DESC&orderingById=DESC&skip=${existingRecords.items.length}&take=50`,
    })
    const records = await response.json()

    dispatch(budgetActions.addRecordsItems({ isTrash, items: records }))

    dispatch(
      budgetActions.setRecordsStatus({
        isTrash,
        status: records.length === 0 ? LoadingStatus.Completed : LoadingStatus.Success,
      })
    )
  }
)

export const restoreRecordTc = createAsyncThunk(
  "budget/restoreRecordTc",
  async ({ recordId }: { recordId: IBudgetRecord["id"] }) => {
    const response = await Http.patch({
      payload: { isTrashed: false },
      url: `/api/budget/records/${recordId}`,
    })
    return await response.json()
  }
)

export const updateCategoryTc = createAsyncThunk(
  "budget/updateCategoryTc",
  async (
    {
      categoryId,
      name,
      typeId,
    }: {
      categoryId: IBudgetCategory["id"]
      name: IBudgetCategory["name"]
      typeId: IBudgetCategoryType["id"]
    },
    thunkApi
  ) => {
    try {
      const response = await Http.patch({
        payload: { name, typeId },
        url: `/api/budget/categories/${categoryId}`,
      })
      return await response.json()
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const updateRecordTc = createAsyncThunk(
  "budget/updateRecordTc",
  async ({
    amount,
    categoryId,
    date,
    id,
  }: {
    amount: IBudgetRecord["amount"]
    categoryId: IBudgetCategory["id"]
    date: IBudgetRecord["date"]
    id: IBudgetRecord["id"]
  }) => {
    const response = await Http.patch({
      payload: { amount, categoryId, date },
      url: "/api/budget/records/" + id,
    })
    return await response.json()
  }
)
