import { Action, MiddlewareAPI } from "@reduxjs/toolkit"
import { Middleware } from "redux"

import { AppDispatch, RootState } from "./store"

export const logoutMiddleware: Middleware = (api: MiddlewareAPI<AppDispatch, RootState>) => {
  return (next: AppDispatch) => {
    return <A extends Action>(action: A) => {
      return next(action)
    }
  }
}
