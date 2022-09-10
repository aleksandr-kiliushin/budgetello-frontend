import { rest } from "msw"

import authConstants from "#mocks/constants/auth"
import userConstants from "#mocks/constants/user"
import User from "#types/user"
import Http from "#utils/Http"

const authHandlers = [
  rest.post<{ authToken: string }>(Http.createFullUrl("/api/login"), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ authToken: authConstants.validAuthToken }))
  }),

  rest.get<User>(Http.createFullUrl("/api/user/me"), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: userConstants.id,
        password: userConstants.password,
        username: userConstants.username,
      })
    )
  }),
]

export default authHandlers
