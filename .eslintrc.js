module.exports = {
  root: true,
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    worker: true,
    webextensions: true,
  },
	"rules": {
    'linebreak-style': ['warn', 'unix'],
    'unicode-bom': ['warn', 'never'],
    'no-trailing-spaces': ['warn'],
    'no-multi-spaces': ['warn'],
    'no-tabs': ['warn'],
    'eol-last': ['warn'],
		'indent': ['warn', 2, { flatTernaryExpressions: true }],
    'semi': ['warn', 'always'],
    'no-extra-semi': ['off'],
    'comma-dangle': ['warn', {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "functions": "never"
    }],

    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'arrow-parens': ['warn', 'as-needed'],
    'quote-props': ['warn', 'as-needed'],
    'dot-notation': ['warn'],

    'arrow-spacing': ['warn'],
    'block-spacing': ['warn'],
    'comma-spacing': ['warn'],
    'semi-spacing': ['warn'],
    'computed-property-spacing': ['warn'],
    'func-call-spacing': ['warn'],
    'key-spacing': ['warn'],
    'switch-colon-spacing': ['warn'],
    'keyword-spacing': ['warn'],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never'],
    'template-tag-spacing': ['warn'],
    'space-unary-ops': ['warn'],
    'rest-spread-spacing': ['warn'],
    'space-infix-ops': ['warn'],
    'operator-linebreak': ['warn', 'after'],
    'implicit-arrow-linebreak': ['warn'],
    'no-whitespace-before-property': ['warn'],
    'space-before-function-paren': ['warn', {anonymous: 'always', named: 'never', asyncArrow: 'always'}],
    'space-in-parens': ['warn'],
    'spaced-comment': ['warn', 'always', {
      line: { markers: ['/', '#region', '#endregion'], exceptions: ['#region', '#endregion'] },
      block: { markers: ['!'], exceptions: ['*'] }
    }],
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
    'id-length': ['warn', { min: 0, max: 40, properties: 'never' }],

    'eqeqeq': ['warn', 'always', {'null': 'ignore'}],
    'wrap-iife': ['warn', 'outside'],
    'yoda': ['warn', 'never', { onlyEquality: true }],
    'no-var': ['warn'],
    'no-constant-condition': ['warn', { checkLoops: false }],
    'no-empty': ['warn'],

    'no-undefined': ['warn'],
    'no-shadow-restricted-names': ['warn'],
    'no-throw-literal': ['warn'],
    'no-eval': ['error'],
    'no-implied-eval': ['error'],
    "no-unused-vars": ["error", {
      "varsIgnorePattern": "^_",
      "vars": "all",
      "args": "none",
      "ignoreRestSiblings": true,
      "caughtErrors": "none"
    }],
    'no-implicit-globals': ['error'],
    'no-new-wrappers': ['warn'],
    'no-proto': ['warn'],
    'no-restricted-globals': ['error', 'browser'],
    'operator-assignment': ['warn', 'always'],

    'no-extra-label': ['warn'],

    'consistent-return': ['warn'],

    'radix': ['warn'],

    'complexity': ['warn'],

    'no-console': ['off'],
    'no-async-promise-executor': ['off'],
    'require-atomic-updates': ['off'],
	}
}
