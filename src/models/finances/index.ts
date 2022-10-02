import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { RootState } from "#models/store"
import { LoadingStatus } from "#src/constants/shared"
import { IBoard } from "#types/boards"
import { IFinanceCategory, IFinanceCategoryType, IFinanceRecord } from "#types/finance"
import { Http } from "#utils/Http"

interface IState {
  categories: {
    items: IFinanceCategory[]
    status: LoadingStatus
  }
  categoryTypes: {
    items: IFinanceCategoryType[]
    status: LoadingStatus
  }
  chartData: {
    items: IFinanceRecord[]
    status: LoadingStatus
  }
  records: {
    notTrashed: {
      items: IFinanceRecord[]
      status: LoadingStatus
    }
    trashed: {
      items: IFinanceRecord[]
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
    builder.addCase(createCategoryTc.fulfilled, (state, action: PayloadAction<IFinanceCategory>) => {
      state.categories.items.unshift(action.payload)
    })

    builder.addCase(createRecordTc.fulfilled, (state, action: PayloadAction<IFinanceRecord>) => {
      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(deleteCategoryTc.fulfilled, (state, action: PayloadAction<IFinanceCategory>) => {
      state.categories.items = state.categories.items.filter((category) => category.id !== action.payload.id)
    })

    builder.addCase(
      deleteRecordTc.fulfilled,
      (state, action: PayloadAction<{ isPermanentDeletion: boolean; record: IFinanceRecord }>) => {
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

    builder.addCase(getCategoriesTc.fulfilled, (state, action: PayloadAction<IFinanceCategory[]>) => {
      if (action.payload.length === 0) return

      state.categories = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(getCategoryTypesTc.fulfilled, (state, action: PayloadAction<IFinanceCategoryType[]>) => {
      if (action.payload.length === 0) return

      state.categoryTypes = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(getChartDataTc.fulfilled, (state, action: PayloadAction<IFinanceRecord[]>) => {
      if (action.payload.length === 0) return

      state.chartData = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(restoreRecordTc.fulfilled, (state, action: PayloadAction<IFinanceRecord>) => {
      state.records.trashed.items = state.records.trashed.items.filter((record) => record.id !== action.payload.id)

      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(updateCategoryTc.fulfilled, (state, action: PayloadAction<IFinanceCategory>) => {
      const categoryIndex = state.categories.items.findIndex((category) => category.id === action.payload.id)

      state.categories.items[categoryIndex] = action.payload
    })

    builder.addCase(updateRecordTc.fulfilled, (state, action: PayloadAction<IFinanceRecord>) => {
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
        items: IFinanceRecord[]
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
    amount: IFinanceRecord["amount"]
    categoryId: IFinanceCategory["id"]
    date: IFinanceRecord["date"]
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
  async (
    {
      boardId,
      name,
      typeId,
    }: { boardId: IBoard["id"]; name: IFinanceCategory["name"]; typeId: IFinanceCategoryType["id"] },
    thunkApi
  ) => {
    try {
      const response = await Http.post({
        payload: { boardId, name, typeId },
        url: "/api/finances/categories",
      })
      return await response.json()
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteCategoryTc = createAsyncThunk(
  "finance/deleteCategoryTc",
  async ({ categoryId }: { categoryId: IFinanceCategory["id"] }) => {
    const response = await Http.delete({ url: `/api/finances/categories/${categoryId}` })
    return await response.json()
  }
)

export const deleteRecordTc = createAsyncThunk("finance/deleteRecordTc", async ({ id, isTrashed }: IFinanceRecord) => {
  const response = isTrashed
    ? await Http.delete({ url: `/api/finances/records/${id}` })
    : await Http.patch({ payload: { isTrashed: true }, url: `/api/finances/records/${id}` })

  return { isPermanentDeletion: isTrashed, record: await response.json() }
})

export const getCategoriesTc = createAsyncThunk<IFinanceCategory[], { boardId: IBoard["id"] }, { state: RootState }>(
  "finance/getCategoriesTc",
  async ({ boardId }, { getState }) => {
    if (getState().finances.categories.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({ url: "/api/finances/categories/search?boardId=" + boardId })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getCategoryTypesTc = createAsyncThunk<IFinanceCategoryType[], void, { state: RootState }>(
  "finance/getCategoryTypesTc",
  async (_, { getState }) => {
    if (getState().finances.categoryTypes.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({ url: "/api/finances/category-types" })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getChartDataTc = createAsyncThunk<IFinanceRecord[], void, { state: RootState }>(
  "finance/getChartDataTc",
  async (_, { getState }) => {
    if (getState().finances.chartData.status !== LoadingStatus.Idle) return []
    try {
      const response = await Http.get({
        url: "/api/finances/records/search?isTrashed=false&orderingByDate=ASC&orderingById=ASC",
      })
      return await response.json()
    } catch {
      return []
    }
  }
)

export const getRecordsTc = createAsyncThunk<void, { boardId: IBoard["id"]; isTrash: boolean }, { state: RootState }>(
  "finance/getRecordsTc",
  async ({ boardId, isTrash }, { getState, dispatch }) => {
    const existingRecords = getState().finances.records[isTrash ? "trashed" : "notTrashed"]

    if (existingRecords.status === LoadingStatus.Completed) return
    if (existingRecords.status === LoadingStatus.Loading) return

    dispatch(financeActions.setRecordsStatus({ isTrash, status: LoadingStatus.Loading }))

    const response = await Http.get({
      url: `/api/finances/records/search?boardId=${boardId}&isTrashed=${isTrash}&orderingByDate=DESC&orderingById=DESC&skip=${existingRecords.items.length}&take=50`,
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
  async ({ recordId }: { recordId: IFinanceRecord["id"] }) => {
    const response = await Http.patch({
      payload: { isTrashed: false },
      url: `/api/finances/records/${recordId}`,
    })
    return await response.json()
  }
)

export const updateCategoryTc = createAsyncThunk(
  "finance/updateCategoryTc",
  async (
    {
      categoryId,
      name,
      typeId,
    }: {
      categoryId: IFinanceCategory["id"]
      name: IFinanceCategory["name"]
      typeId: IFinanceCategoryType["id"]
    },
    thunkApi
  ) => {
    try {
      const response = await Http.patch({
        payload: { name, typeId },
        url: `/api/finances/categories/${categoryId}`,
      })
      return await response.json()
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
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
    amount: IFinanceRecord["amount"]
    categoryId: IFinanceCategory["id"]
    date: IFinanceRecord["date"]
    id: IFinanceRecord["id"]
  }) => {
    const response = await Http.patch({
      payload: { amount, categoryId, date },
      url: "/api/finances/records/" + id,
    })
    return await response.json()
  }
)
