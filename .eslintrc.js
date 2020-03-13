module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react-native', '@typescript-eslint'],
  // plugins: ['react-native', '@typescript-eslint', 'react-hooks'],
  // decorator等、Babel独自の記法を許可する
  parser: '@typescript-eslint/parser',
  // __DEV__をGlobal関数とみなす
  globals: {
    __DEV__: true,
  },
  // fetchを有効化する
  env: {
    browser: true,
    'react-native/react-native': true,
  },
  rules: {
    // @envのimportは許可する
    'import/no-unresolved': [2, {ignore: ['@env', './images']}],
    'import/prefer-default-export': [0],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // .js ファイルで jsx 記法を許可する ( ReactNative なら必須 )
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.tsx']}],
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    '@typescript-eslint/explicit-function-return-type': [
      1,
      {
        allowTypedFunctionExpressions: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  settings: {
    'import/resolver': {
      node: {extensions: ['.js', '.ts', '.tsx']},
    },
  },
  overrides: [
    {
      files: ['**.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
};
