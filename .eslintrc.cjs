module.exports = {
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules/'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
