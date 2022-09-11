export const passwordByUsername = {
  "john-doe": "john-doe-password",
  "jessica-stark": "jessica-stark-password",
}

export type ITestUserUsername = keyof typeof passwordByUsername
