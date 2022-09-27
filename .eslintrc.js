module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'solid'],
  extends: [
    'eslint:recommended',
    'plugin:solid/typescript',

    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "solid/reactivity": "warn",
    "solid/no-destructure": "warn",
    "solid/jsx-no-undef": "error",
    "import/no-unresolved": "off",
    "import/named": "off",
    "@typescript-eslint/no-explicit-any":"off",
    "@typescript-eslint/ban-ts-comment":"off"
  }
};
