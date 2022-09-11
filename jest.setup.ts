import "@testing-library/jest-dom"
import { exec } from "child_process"
import util from "util"
// TODO: Uninstall and use Node.js fetch instead.
import "whatwg-fetch"

const execAsync = util.promisify(exec)

beforeEach(async () => {
  await execAsync(
    'echo "bash /var/app/restore-db-from-testing-template.sh" | docker exec -i personal-app-database bash;'
  )
})

afterEach(() => {
  localStorage.removeItem("authToken")
})

afterAll(async () => {
  await execAsync('echo "bash /var/app/restore-db-from-dev-template.sh" | docker exec -i personal-app-database bash;')
})
