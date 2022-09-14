import "@testing-library/jest-dom"
import { execSync } from "child_process"
import "whatwg-fetch"

beforeEach(() => {
  execSync('echo "bash /var/app/restore-db-from-testing-template.sh" | docker exec -i personal-app-database bash;')
})

afterEach(() => {
  localStorage.clear()
})

afterAll(() => {
  execSync('echo "bash /var/app/restore-db-from-dev-template.sh" | docker exec -i personal-app-database bash;')
})
