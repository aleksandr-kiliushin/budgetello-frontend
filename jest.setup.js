import { cleanup } from '@testing-library/react'
import 'whatwg-fetch'

import server from './src/mocks/server.ts'

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())
