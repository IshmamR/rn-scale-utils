/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "react",
    "react-native",
    "react-hooks",
    "@typescript-eslint",
    "import",
    "jest",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
    "plugin:jest/recommended",
  ],
  env: {
    es6: true,
    node: true,
    jest: true,
    "react-native/react-native": true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off", // not needed in React 17+
    "import/order": ["warn", { alphabetize: { order: "asc" } }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  ignorePatterns: ["dist", "node_modules"],
};
