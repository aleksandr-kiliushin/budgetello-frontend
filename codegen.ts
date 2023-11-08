import type { CodegenConfig } from "@graphql-codegen/cli"

const schemaUrlByMode = {
  development: "http://localhost:3080/graphql",
  production: "https://personal-app-backend.onrender.com/graphql"
}

const mode = (process.env.MODE as "development" | "production" | undefined) ?? "development"

const config: CodegenConfig = {
  documents: "./src/api/**/*.graphql",
  generates: {
    "src/api/types.generated.ts": {
      plugins: ["typescript"],
    },
    "src/api": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "types.generated.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
    },
  },
  overwrite: true,
  schema: schemaUrlByMode[mode],
}

// eslint-disable-next-line no-restricted-syntax
export default config
