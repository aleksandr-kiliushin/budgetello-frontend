import { AnyAction, MiddlewareAPI } from "@reduxjs/toolkit"
import { Middleware } from "redux"

import { AppDispatch, RootState } from "./store"
import { userActions } from "./user"

export const logoutMiddleware: Middleware = (storeApi: MiddlewareAPI<AppDispatch, RootState>) => {
  return (next: AppDispatch) => {
    return (action: AnyAction) => {
      if (action.payload?.statusCode === 401) {
        storeApi.dispatch(userActions.logOut())
        return
      }
      return next(action)
    }
  }
}
