module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["nuxt", "prettier", "@typescript-eslint"],
  extends: ["plugin:prettier/recommended", "plugin:nuxt/recommended"],
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "arrow-body-style": ["error", "always"],
    "spaced-comment": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "jsx-quotes": ["error", "prefer-single"],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "line-comment-position": [
      "error",
      {
        "position": "above"
      }
    ],
    "space-in-parens": ["error", "never"],
    "default-case": "error",
    "default-case-last": "error",
    "eqeqeq": "error",
    "block-scoped-var": "error",
    "no-else-return": "error",
    "no-empty": "error",
    "no-inline-comments": "error",
    "no-invalid-this": "error",
    "no-lone-blocks": "error",
    "no-undef-init": "error",
    "no-useless-catch": 2,
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "require-await": "error",
    "arrow-spacing": "error",
    "brace-style": "error",
    "no-whitespace-before-property": "error",
    "switch-colon-spacing": "error",
    "no-case-declarations": "off"
  }
};
