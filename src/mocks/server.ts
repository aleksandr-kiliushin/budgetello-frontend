import { setupServer } from 'msw/node'

import authHandlers from './handlers/auth'
import financeHandlers from './handlers/finance'

const server = setupServer(...authHandlers, ...financeHandlers)

export default server
