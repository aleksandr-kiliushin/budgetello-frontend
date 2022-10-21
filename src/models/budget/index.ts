import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import {
  CreateBudgetRecordDocument,
  DeleteBudgetRecordDocument,
  GetBudgetRecordsDocument,
  UpdateBudgetRecordDocument,
} from "#api/budget"
import { Board, BudgetRecord } from "#api/types"
import { RootState } from "#models/store"
import { LoadingStatus } from "#src/constants/shared"
import { apolloClient } from "#utils/apolloClient"

interface IState {
  records: {
    notTrashed: {
      items: BudgetRecord[]
      status: LoadingStatus
    }
    trashed: {
      items: BudgetRecord[]
      status: LoadingStatus
    }
  }
}

export const initialState: IState = {
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
    builder.addCase(createRecordTc.fulfilled, (state, action: PayloadAction<BudgetRecord>) => {
      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(
      deleteRecordTc.fulfilled,
      (state, action: PayloadAction<{ isPermanentDeletion: boolean; record: BudgetRecord }>) => {
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

    builder.addCase(restoreRecordTc.fulfilled, (state, action: PayloadAction<BudgetRecord>) => {
      state.records.trashed.items = state.records.trashed.items.filter((record) => record.id !== action.payload.id)

      state.records.notTrashed.items.unshift(action.payload)
    })

    builder.addCase(updateRecordTc.fulfilled, (state, action: PayloadAction<BudgetRecord>) => {
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
        items: BudgetRecord[]
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
    amount: BudgetRecord["amount"]
    categoryId: BudgetRecord["category"]["id"]
    date: BudgetRecord["date"]
  }) => {
    const response = await apolloClient.mutate({
      mutation: CreateBudgetRecordDocument,
      variables: { amount, categoryId, date },
    })
    return response.data.createBudgetRecord
  }
)

export const deleteRecordTc = createAsyncThunk("budget/deleteRecordTc", async ({ id, isTrashed }: BudgetRecord) => {
  let record: BudgetRecord | undefined

  if (isTrashed) {
    record = await apolloClient
      .mutate({
        mutation: DeleteBudgetRecordDocument,
        variables: { recordId: id },
      })
      .then((response) => response.data.deleteBudgetRecord)
  }

  if (!isTrashed) {
    const response = await apolloClient.mutate({
      mutation: UpdateBudgetRecordDocument,
      variables: { id, isTrashed: true },
    })
    console.log("response >>", response)
    record = response.data.updateBudgetRecord
  }

  if (record === undefined) {
    throw new Error("Record is undefined.")
  }

  return { isPermanentDeletion: isTrashed, record }
})

export const getRecordsTc = createAsyncThunk<void, { boardId: Board["id"]; isTrash: boolean }, { state: RootState }>(
  "budget/getRecordsTc",
  async ({ boardId, isTrash }, { getState, dispatch }) => {
    const existingRecords = getState().budget.records[isTrash ? "trashed" : "notTrashed"]

    if (existingRecords.status === LoadingStatus.Completed) return
    if (existingRecords.status === LoadingStatus.Loading) return

    dispatch(budgetActions.setRecordsStatus({ isTrash, status: LoadingStatus.Loading }))

    const response = await apolloClient.query({
      query: GetBudgetRecordsDocument,
      variables: {
        boardsIds: [boardId],
        isTrashed: isTrash,
        orderingByDate: "DESC",
        orderingById: "DESC",
        skip: existingRecords.items.length,
        take: 50,
      },
    })

    dispatch(budgetActions.addRecordsItems({ isTrash, items: response.data.budgetRecords }))

    dispatch(
      budgetActions.setRecordsStatus({
        isTrash,
        status: response.data.budgetRecords.length === 0 ? LoadingStatus.Completed : LoadingStatus.Success,
      })
    )
  }
)

export const restoreRecordTc = createAsyncThunk(
  "budget/restoreRecordTc",
  async ({ recordId }: { recordId: BudgetRecord["id"] }) => {
    const response = await apolloClient.mutate({
      mutation: UpdateBudgetRecordDocument,
      variables: { id: recordId, isTrashed: false },
    })
    return response.data.updateBudgetRecord
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
    amount: BudgetRecord["amount"]
    categoryId: BudgetRecord["category"]["id"]
    date: BudgetRecord["date"]
    id: BudgetRecord["id"]
  }) => {
    const response = await apolloClient.mutate({
      mutation: UpdateBudgetRecordDocument,
      variables: { id, amount, categoryId, date },
    })
    return response.data.updateBudgetRecord
  }
)
