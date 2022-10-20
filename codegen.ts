import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  documents: "./src/api/index.graphql",
  generates: {
    "src/api/index.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
  overwrite: true,
  schema: "http://localhost:3080/graphql",
}

// eslint-disable-next-line no-restricted-syntax
export default config
