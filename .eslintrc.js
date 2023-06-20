module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  // 0 = off, 1 = warn, 2 = error
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
  },
};
