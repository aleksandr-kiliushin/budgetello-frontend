module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", "node_modules"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    project: "tsconfig.eslint.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "@typescript-eslint", "@typescript-eslint/eslint-plugin"],
  root: true,
  rules: {
    "arrow-parens": 1,
    camelcase: 1,
    "max-params": ["error", 2],
    "no-duplicate-imports": 1,
    "no-restricted-syntax": [
      1,
      {
        selector: "ExportDefaultDeclaration",
        message: "Prefer named exports.",
      },
    ],
    "no-tabs": 1,
    "react/jsx-sort-props": ["warn", { ignoreCase: true }],
    "react/prop-types": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-extra-semi": 1,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/naming-convention": [
      1,
      {
        format: ["StrictPascalCase"],
        prefix: ["I"],
        selector: "interface",
      },
      {
        format: ["StrictPascalCase"],
        prefix: ["can", "did", "has", "is", "should", "will"],
        selector: "variable",
        types: ["boolean"],
      },
    ],
    // "sort-keys": [
    //   "warn",
    //   "asc",
    //   {
    //     caseSensitive: true,
    //     minKeys: 2,
    //     natural: false,
    //   },
    // ],
    // 'sort-imports': [
    //   'error',
    //   {
    //     allowSeparatedGroups: true,
    //     ignoreCase: false,
    //     ignoreDeclarationSort: false,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    //   },
    // ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
