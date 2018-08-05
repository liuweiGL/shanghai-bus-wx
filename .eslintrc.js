// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['standard', 'plugin:vue/strongly-recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'semi': 0,
    'indent': 0,
    'no-var': 2,
    'no-tabs': 0,
    'import/first': 0,
    'import/no-duplicates': 0,
    'vue/max-attributes-per-line': 0,
    'space-before-function-paren': [0, 'always'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    'WE': true,
    'AMap': true,
    'AMapUI': true
  }
}
