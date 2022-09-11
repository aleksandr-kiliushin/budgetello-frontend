import { createSlice } from "@reduxjs/toolkit"

interface IState {
  something: number
}

const initialState: IState = {
  something: 123,
}

const commonSlice = createSlice({
  initialState,
  name: "common",
  reducers: {},
})

export const commonActions = commonSlice.actions
export const commonReducer = commonSlice.reducer
