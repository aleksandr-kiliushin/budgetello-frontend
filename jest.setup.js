// Extend Jest "expect" functionality with Testing Library assertions.
// import '@testing-library/jest-dom'
import 'whatwg-fetch'

import server from './src/mocks/server.ts'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
