import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '#models/store'
import { LoadingStatus } from '#src/constants/shared'
import { FinanceCategory, FinanceCategoryType, FinanceRecord } from '#types/finance'
import Http from '#utils/Http'

interface State {
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

export const initialState: State = {
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

export const createRecordTc = createAsyncThunk(
  'finance/createRecordTc',
  async ({
    amount,
    categoryId,
    date,
  }: {
    amount: FinanceRecord['amount']
    categoryId: FinanceCategory['id']
    date: FinanceRecord['date']
  }) =>
    await Http.post<FinanceRecord>({
      payload: { amount, categoryId, date },
      url: '/api/finance-record',
    }),
)

export const createCategoryTc = createAsyncThunk(
  'finance/createCategoryTc',
  async ({ name, typeId }: { name: FinanceCategory['name']; typeId: FinanceCategoryType['id'] }) =>
    await Http.post<FinanceCategory>({
      payload: { name, typeId },
      url: '/api/finance-category',
    }),
)

export const deleteCategoryTc = createAsyncThunk(
  'finance/deleteCategoryTc',
  async ({ categoryId }: { categoryId: FinanceCategory['id'] }) => {
    const { id } = await Http.delete<FinanceCategory>({
      url: `/api/finance-category/${categoryId}`,
    })
    return id
  },
)

export const deleteRecordTc = createAsyncThunk(
  'finance/deleteRecordTc',
  async ({ id, isTrashed }: FinanceRecord) => {
    const record = isTrashed
      ? await Http.delete<FinanceRecord>({ url: `/api/finance-record/${id}` })
      : await Http.patch<FinanceRecord>({
          payload: { isTrashed: true },
          url: `/api/finance-record/${id}`,
        })

    return { isPermanentDeletion: isTrashed, record }
  },
)

export const getCategoriesTc = createAsyncThunk<FinanceCategory[], void, { state: RootState }>(
  'finance/getCategoriesTc',
  async (_, { getState }) => {
    if (getState().finance.categories.status !== LoadingStatus.Idle) return []

    return await Http.get<FinanceCategory[]>({ url: '/api/finance-category' })
  },
)

export const getCategoryTypesTc = createAsyncThunk<
  FinanceCategoryType[],
  void,
  { state: RootState }
>('finance/getCategoryTypesTc', async (_, { getState }) => {
  if (getState().finance.categoryTypes.status !== LoadingStatus.Idle) return []

  return await Http.get<FinanceCategoryType[]>({ url: '/api/finance-category-type' })
})

export const getChartDataTc = createAsyncThunk<FinanceRecord[], void, { state: RootState }>(
  'finance/getChartDataTc',
  async (_, { getState }) => {
    if (getState().finance.chartData.status !== LoadingStatus.Idle) return []

    return await Http.get<FinanceRecord[]>({
      url: '/api/finance-record?isTrashed=false&orderingByDate=ASC&orderingById=ASC',
    })
  },
)

export const getRecordsTc = createAsyncThunk<void, { isTrash: boolean }, { state: RootState }>(
  'finance/getRecordsTc',
  async ({ isTrash }, { getState, dispatch }) => {
    const existingRecords = getState().finance.records[isTrash ? 'trashed' : 'notTrashed']

    if (existingRecords.status === LoadingStatus.Completed) return
    if (existingRecords.status === LoadingStatus.Loading) return

    dispatch(setRecordsStatus({ isTrash, status: LoadingStatus.Loading }))

    const records = await Http.get<FinanceRecord[]>({
      url: `/api/finance-record?isTrashed=${isTrash}&orderingByDate=DESC&orderingById=DESC&skip=${existingRecords.items.length}&take=50`,
    })

    dispatch(addRecordsItems({ isTrash, items: records }))

    dispatch(
      setRecordsStatus({
        isTrash,
        status: records.length === 0 ? LoadingStatus.Completed : LoadingStatus.Success,
      }),
    )
  },
)

export const restoreRecordTc = createAsyncThunk(
  'finance/restoreRecordTc',
  async ({ recordId }: { recordId: FinanceRecord['id'] }) =>
    await Http.patch<FinanceRecord>({
      payload: { isTrashed: false },
      url: `/api/finance-record/${recordId}`,
    }),
)

export const updateCategoryTc = createAsyncThunk(
  'finance/updateCategoryTc',
  async ({
    categoryId,
    name,
    typeId,
  }: {
    categoryId: FinanceCategory['id']
    name: FinanceCategory['name']
    typeId: FinanceCategoryType['id']
  }) =>
    await Http.patch<FinanceCategory>({
      payload: {
        name,
        typeId,
      },
      url: `/api/finance-category/${categoryId}`,
    }),
)

export const updateRecordTc = createAsyncThunk(
  'finance/updateRecordTc',
  async ({
    amount,
    categoryId,
    date,
    id,
  }: {
    amount: FinanceRecord['amount']
    categoryId: FinanceCategory['id']
    date: FinanceRecord['date']
    id: FinanceRecord['id']
  }) =>
    await Http.patch<FinanceRecord>({
      payload: {
        amount,
        categoryId,
        date,
      },
      url: '/api/finance-record/' + id,
    }),
)

const slice = createSlice({
  extraReducers: (builder) => {
    // To do: try addRecordsTc.PENDING,
    builder.addCase(createCategoryTc.fulfilled, (state, action: PayloadAction<FinanceCategory>) => {
      state.categories.items.unshift(action.payload)
    })

    builder.addCase(createRecordTc.fulfilled, (state, action: PayloadAction<FinanceRecord>) => {
      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(
      deleteCategoryTc.fulfilled,
      (state, action: PayloadAction<FinanceCategory['id']>) => {
        state.categories.items = state.categories.items.filter(
          (category) => category.id !== action.payload,
        )
      },
    )

    builder.addCase(
      deleteRecordTc.fulfilled,
      (
        state,
        action: PayloadAction<{
          isPermanentDeletion: boolean
          record: FinanceRecord
        }>,
      ) => {
        const { isPermanentDeletion, record } = action.payload
        const { id } = record

        const recordsArrayType = isPermanentDeletion ? 'trashed' : 'notTrashed'

        state.records[recordsArrayType].items = state.records[recordsArrayType].items.filter(
          (record) => record.id !== id,
        )

        if (isPermanentDeletion) return

        state.records.trashed.items.unshift(record)
      },
    )

    builder.addCase(
      getCategoriesTc.fulfilled,
      (state, action: PayloadAction<FinanceCategory[]>) => {
        if (action.payload.length === 0) return

        state.categories = { items: action.payload, status: LoadingStatus.Success }
      },
    )

    builder.addCase(
      getCategoryTypesTc.fulfilled,
      (state, action: PayloadAction<FinanceCategoryType[]>) => {
        if (action.payload.length === 0) return

        state.categoryTypes = { items: action.payload, status: LoadingStatus.Success }
      },
    )

    builder.addCase(getChartDataTc.fulfilled, (state, action: PayloadAction<FinanceRecord[]>) => {
      if (action.payload.length === 0) return

      state.chartData = { items: action.payload, status: LoadingStatus.Success }
    })

    builder.addCase(restoreRecordTc.fulfilled, (state, action: PayloadAction<FinanceRecord>) => {
      state.records.trashed.items = state.records.trashed.items.filter(
        (record) => record.id !== action.payload.id,
      )

      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(updateCategoryTc.fulfilled, (state, action: PayloadAction<FinanceCategory>) => {
      const categoryIndex = state.categories.items.findIndex(
        (category) => category.id === action.payload.id,
      )

      state.categories.items[categoryIndex] = action.payload
    })

    builder.addCase(updateRecordTc.fulfilled, (state, action: PayloadAction<FinanceRecord>) => {
      const recordIndex = state.records.notTrashed.items.findIndex(
        (record) => record.id === action.payload.id,
      )

      state.records.notTrashed.items[recordIndex] = action.payload
    })
  },
  initialState,
  name: 'finance',
  reducers: {
    addRecordsItems: (
      state,
      action: PayloadAction<{
        isTrash: boolean
        items: FinanceRecord[]
      }>,
    ) => {
      const { isTrash, items } = action.payload

      state.records[isTrash ? 'trashed' : 'notTrashed'].items.push(...items)
    },

    setRecordsStatus: (
      state,
      action: PayloadAction<{ isTrash: boolean; status: LoadingStatus }>,
    ) => {
      const { isTrash, status } = action.payload

      state.records[isTrash ? 'trashed' : 'notTrashed'].status = status
    },
  },
})

export const { addRecordsItems, setRecordsStatus } = slice.actions
export const financeReducer = slice.reducer
