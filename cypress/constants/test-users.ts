export const testUsers = {
  johnDoe: {
    id: 1,
    username: "john-doe",
    password: "john-doe-password",
  },
  jessicaStark: {
    id: 2,
    username: "jessica-stark",
    password: "jessica-stark-password",
  },
} as const

export type TTestUser = (typeof testUsers)[keyof typeof testUsers]

export const credentialsByTestUserId: Record<TTestUser["id"], { password: string; username: TTestUser["username"] }> = {
  "1": {
    username: testUsers.johnDoe.username,
    password: testUsers.johnDoe.password,
  },
  "2": {
    username: testUsers.jessicaStark.username,
    password: testUsers.jessicaStark.password,
  },
}
