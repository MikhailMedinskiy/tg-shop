module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:simple-import-sort/recommended",
    "plugin:unused-imports/recommended"
  ],
  overrides: [
    {
      files: ['*.ts', '*.mts', '*.cts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", {"max": 1}],
    "prettier/prettier": "error",
    'no-console': 'error',
    'no-eval': 'error',
    'import/first': 'error',
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'react/prop-types': 'off',
  },
}
