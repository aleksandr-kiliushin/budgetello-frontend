import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  documents: "./src/api/**/*.graphql",
  generates: {
    "src/api/types.ts": {
      plugins: ["typescript"],
    },
    "src/api": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".ts",
        baseTypesPath: "types.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
    },
  },
  overwrite: true,
  schema: "http://localhost:3080/graphql",
}

// eslint-disable-next-line no-restricted-syntax
export default config
