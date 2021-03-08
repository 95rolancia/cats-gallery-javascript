// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    "no-unused-vars": 1,
    "no-use-before-define": 1,
    "no-redeclare": 1,
    "no-console": 0,
  },
};
