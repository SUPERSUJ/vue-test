// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
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
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    "import/no-extraneous-dependencies": "off",
    "import/no-dynamic-require": "off",
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'linebreak-style': 0,
    'max-len': 0,
    'no-bitwise': 'off',
    'no-const-assign': 'error',
    'prefer-const': 'off',
    'no-mixed-operators': 'off',
    'no-lonely-if': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-tabs': 0,
    'arrow-parens': 'off',
    'no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
    }],
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'error',
    'func-names': 'off',
    'prefer-template': 'off',
    'space-infix-ops': 'error',
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'no-underscore-dangle': 'off',
    'no-prototype-builtins': 'off',
    // 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
    // @off hasOwnProperty 比较常用
    'no-prototype-builtins': 'off',
    // 禁止使用 continue
    // @off continue 很常用
    'no-continue': 'off',
    // 禁止在计算属性中对属性修改
    // @off 太严格了
    'vue/no-side-effects-in-computed-properties': 'off',
    // @fixable 禁止行尾有空格
    'no-trailing-spaces': 'error',
    // 禁止对函数的参数重新赋值
    'no-param-reassign': 0,
    // 禁止变量申明时用逗号一次申明多个
    'one-var': [
      'error',
      'never'
    ],
    // @fixable 变量申明必须每行一个
    'one-var-declaration-per-line': [
      'error',
      'always'
    ],
    // 禁止使用 ++ 或 --
    // @off 没必要限制
    'no-plusplus': 'off',
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    'eqeqeq': [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    // 变量必须先定义后使用
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: false
      }
    ],
    // 禁止变量名与上层作用域内的定义过的变量重复
    // @off 很多时候函数的形参和传参是同名的
    'no-shadow': 'off',
    // 禁止出现没必要的转义
    // @off 转义可以使代码更易懂
    'no-useless-escape': 'off',
    // switch 语句必须有 default
    // @off 太严格了
    'default-case': 'off',
    // @fixable 必须使用箭头函数作为回调
    // @off 没必要强制要求
    'prefer-arrow-callback': 'off',
    // 禁止出现没必要的字符串连接
    'no-useless-concat': 0,
    // require 必须在全局作用域下
    // @off 条件加载很常见
    'global-require': 0,
    // @fixable 箭头函数能够省略 return 的时候，必须省略，比如必须写成 () => 0，禁止写成 () => { return 0 }
    // @off 箭头函数的返回值，应该允许灵活设置
    'arrow-body-style': 'off',
    // 禁止函数在不同分支返回不同类型的值
    // @off 太严格了
    'consistent-return': 'off',
    // @fixable 对象字面量的键名禁止用引号括起来
    // @off 没必要限制
    'quote-props': 'off',
    // @fixable 必须使用 a = {b} 而不是 a = {b: b}
    // @off 没必要强制要求
    'object-shorthand': 'off',
    // 禁止在循环内的函数中出现循环体条件语句中定义的变量，比如：
    // for (var i = 0; i < 10; i++) {
    //     (function () { return i })();
    // }
    'no-loop-func': 0,
    // 禁止变量申明时用逗号一次申明多个
    'one-var': [
      0,
      'never'
    ],
    // @fixable 变量申明必须每行一个
    'one-var-declaration-per-line': [
      0,
      'always'
    ],
    // 变量名必须是 camelcase 风格的
    // @off 很多 api 或文件名都不是 camelcase
    'camelcase': 0,
    // @fixable 禁止行尾有空格
    'no-trailing-spaces': 'error',
    // 禁止连续赋值，比如 a = b = c = 5
    // @off 没必要限制
    'no-multi-assign': 'off',
    "import/prefer-default-export": "off",
    // @fixable 禁止出现没必要的 bind
    'no-extra-bind': 'error',
  }
}