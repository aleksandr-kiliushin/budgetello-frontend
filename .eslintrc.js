module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error'],
    'arrow-parens': 2,
    camelcase: 2,
    'no-console': 2,
    'no-duplicate-imports': 2,
    'no-tabs': 2,
    'sort-keys': [
      'warn',
      'asc',
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false,
      },
    ],
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
}
