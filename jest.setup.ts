import "@testing-library/jest-dom"
import { execSync } from "child_process"
// TODO: Uninstall and use Node.js fetch instead.
import "whatwg-fetch"

beforeEach(() => {
  execSync('echo "bash /var/app/restore-db-from-testing-template.sh" | docker exec -i personal-app-database bash;')
})

afterEach(() => {
  localStorage.removeItem("authToken")
})

afterAll(() => {
  execSync('echo "bash /var/app/restore-db-from-dev-template.sh" | docker exec -i personal-app-database bash;')
})
