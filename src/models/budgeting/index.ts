import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "#models/store"
import { LoadingStatus } from "#src/constants/shared"
import { IBoard } from "#types/boards"
import { IBudgetingCategory, IBudgetingCategoryType, IBudgetingRecord } from "#types/budgeting"
import { Http } from "#utils/Http"

interface IState {
  categories: {
    items: IBudgetingCategory[]
    status: LoadingStatus
  }
  categoryTypes: {
    items: IBudgetingCategoryType[]
    status: LoadingStatus
  }
  chartData: {
    items: IBudgetingRecord[]
    status: LoadingStatus
  }
  records: {
    notTrashed: {
      items: IBudgetingRecord[]
      status: LoadingStatus
    }
    trashed: {
      items: IBudgetingRecord[]
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

const budgetingSlice = createSlice({
  extraReducers: (builder) => {
    // To do: try addRecordsTc.PENDING,
    builder.addCase(createCategoryTc.fulfilled, (state, action: PayloadAction<IBudgetingCategory>) => {
      state.categories.items.unshift(action.payload)
    })

    builder.addCase(createRecordTc.fulfilled, (state, action: PayloadAction<IBudgetingRecord>) => {
      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(deleteCategoryTc.fulfilled, (state, action: PayloadAction<IBudgetingCategory>) => {
      state.categories.items = state.categories.items.filter((category) => category.id !== action.payload.id)
    })

    builder.addCase(
      deleteRecordTc.fulfilled,
      (state, action: PayloadAction<{ isPermanentDeletion: boolean; record: IBudgetingRecord }>) => {
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

    builder.addCase(getCategoriesTc.fulfilled, (state, action: PayloadAction<IBudgetingCategory[]>) => {
      if (action.payload.length === 0) return

      state.categories = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(getCategoryTypesTc.fulfilled, (state, action: PayloadAction<IBudgetingCategoryType[]>) => {
      if (action.payload.length === 0) return

      state.categoryTypes = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(getChartDataTc.fulfilled, (state, action: PayloadAction<IBudgetingRecord[]>) => {
      if (action.payload.length === 0) return

      state.chartData = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(restoreRecordTc.fulfilled, (state, action: PayloadAction<IBudgetingRecord>) => {
      state.records.trashed.items = state.records.trashed.items.filter((record) => record.id !== action.payload.id)

      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(updateCategoryTc.fulfilled, (state, action: PayloadAction<IBudgetingCategory>) => {
      const categoryIndex = state.categories.items.findIndex((category) => category.id === action.payload.id)

      state.categories.items[categoryIndex] = action.payload
    })

    builder.addCase(updateRecordTc.fulfilled, (state, action: PayloadAction<IBudgetingRecord>) => {
      const recordIndex = state.records.notTrashed.items.findIndex((record) => record.id === action.payload.id)

      state.records.notTrashed.items[recordIndex] = action.payload
    })
  },
  initialState,
  name: "budgeting",
  reducers: {
    addRecordsItems: (
      state,
      action: PayloadAction<{
        isTrash: boolean
        items: IBudgetingRecord[]
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

export const budgetingActions = budgetingSlice.actions
export const budgetingReducer = budgetingSlice.reducer

export const createRecordTc = createAsyncThunk(
  "budgeting/createRecordTc",
  async ({
    amount,
    categoryId,
    date,
  }: {
    amount: IBudgetingRecord["amount"]
    categoryId: IBudgetingCategory["id"]
    date: IBudgetingRecord["date"]
  }) => {
    const response = await Http.post({
      payload: { amount, categoryId, date },
      url: "/api/budgeting/records",
    })
    return await response.json()
  }
)

export const createCategoryTc = createAsyncThunk(
  "budgeting/createCategoryTc",
  async (
    {
      boardId,
      name,
      typeId,
    }: { boardId: IBoard["id"]; name: IBudgetingCategory["name"]; typeId: IBudgetingCategoryType["id"] },
    thunkApi
  ) => {
    try {
      const response = await Http.post({
        payload: { boardId, name, typeId },
        url: "/api/budgeting/categories",
      })
      return await response.json()
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteCategoryTc = createAsyncThunk(
  "budgeting/deleteCategoryTc",
  async ({ categoryId }: { categoryId: IBudgetingCategory["id"] }) => {
    const response = await Http.delete({ url: `/api/budgeting/categories/${categoryId}` })
    return await response.json()
  }
)

export const deleteRecordTc = createAsyncThunk(
  "budgeting/deleteRecordTc",
  async ({ id, isTrashed }: IBudgetingRecord) => {
    const response = isTrashed
      ? await Http.delete({ url: `/api/budgeting/records/${id}` })
      : await Http.patch({ payload: { isTrashed: true }, url: `/api/budgeting/records/${id}` })

    return { isPermanentDeletion: isTrashed, record: await response.json() }
  }
)

export const getCategoriesTc = createAsyncThunk<IBudgetingCategory[], { boardId: IBoard["id"] }, { state: RootState }>(
  "budgeting/getCategoriesTc",
  async ({ boardId }, { getState }) => {
    if (getState().budgeting.categories.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({ url: "/api/budgeting/categories/search?boardId=" + boardId })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getCategoryTypesTc = createAsyncThunk<IBudgetingCategoryType[], void, { state: RootState }>(
  "budgeting/getCategoryTypesTc",
  async (_, { getState }) => {
    if (getState().budgeting.categoryTypes.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({ url: "/api/budgeting/category-types" })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getChartDataTc = createAsyncThunk<IBudgetingRecord[], void, { state: RootState }>(
  "budgeting/getChartDataTc",
  async (_, { getState }) => {
    if (getState().budgeting.chartData.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({
        url: "/api/budgeting/records/search?isTrashed=false&orderingByDate=ASC&orderingById=ASC",
      })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getRecordsTc = createAsyncThunk<void, { boardId: IBoard["id"]; isTrash: boolean }, { state: RootState }>(
  "budgeting/getRecordsTc",
  async ({ boardId, isTrash }, { getState, dispatch }) => {
    const existingRecords = getState().budgeting.records[isTrash ? "trashed" : "notTrashed"]

    if (existingRecords.status === LoadingStatus.Completed) return
    if (existingRecords.status === LoadingStatus.Loading) return

    dispatch(budgetingActions.setRecordsStatus({ isTrash, status: LoadingStatus.Loading }))

    const response = await Http.get({
      url: `/api/budgeting/records/search?boardId=${boardId}&isTrashed=${isTrash}&orderingByDate=DESC&orderingById=DESC&skip=${existingRecords.items.length}&take=50`,
    })
    const records = await response.json()

    dispatch(budgetingActions.addRecordsItems({ isTrash, items: records }))

    dispatch(
      budgetingActions.setRecordsStatus({
        isTrash,
        status: records.length === 0 ? LoadingStatus.Completed : LoadingStatus.Success,
      })
    )
  }
)

export const restoreRecordTc = createAsyncThunk(
  "budgeting/restoreRecordTc",
  async ({ recordId }: { recordId: IBudgetingRecord["id"] }) => {
    const response = await Http.patch({
      payload: { isTrashed: false },
      url: `/api/budgeting/records/${recordId}`,
    })
    return await response.json()
  }
)

export const updateCategoryTc = createAsyncThunk(
  "budgeting/updateCategoryTc",
  async (
    {
      categoryId,
      name,
      typeId,
    }: {
      categoryId: IBudgetingCategory["id"]
      name: IBudgetingCategory["name"]
      typeId: IBudgetingCategoryType["id"]
    },
    thunkApi
  ) => {
    try {
      const response = await Http.patch({
        payload: { name, typeId },
        url: `/api/budgeting/categories/${categoryId}`,
      })
      return await response.json()
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const updateRecordTc = createAsyncThunk(
  "budgeting/updateRecordTc",
  async ({
    amount,
    categoryId,
    date,
    id,
  }: {
    amount: IBudgetingRecord["amount"]
    categoryId: IBudgetingCategory["id"]
    date: IBudgetingRecord["date"]
    id: IBudgetingRecord["id"]
  }) => {
    const response = await Http.patch({
      payload: { amount, categoryId, date },
      url: "/api/budgeting/records/" + id,
    })
    return await response.json()
  }
)
