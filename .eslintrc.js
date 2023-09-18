module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        'no-var': 'error',
        'no-alert': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'prettier/prettier': 'error',
    },
}
