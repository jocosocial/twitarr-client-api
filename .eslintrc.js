module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: {
    "browser": true,
    "node": true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/camelcase': false,
    '@typescript-eslint/explicit-function-return-type': false,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': false,
    '@typescript-eslint/no-explicit-any': false,
    '@typescript-eslint/no-triple-slash-reference': false,
    '@typescript-eslint/no-var-requires': false,
  },
};
