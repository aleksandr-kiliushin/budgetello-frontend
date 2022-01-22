import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: State = {
  redirectPath: null,
}

const slice = createSlice({
  initialState,
  name: 'common',
  reducers: {
    setRedirectPath: (state, action: PayloadAction<State['redirectPath']>) => {
      state.redirectPath = action.payload
    },
  },
})

export const { setRedirectPath } = slice.actions
export const commonReducer = slice.reducer

interface State {
  redirectPath: null | string
}
