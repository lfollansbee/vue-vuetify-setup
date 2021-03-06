module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 1,
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': ['warn', { before: false, after: true }],
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    camelCase: 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'warn',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'arrow-parens': ['error', 'as-needed'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
