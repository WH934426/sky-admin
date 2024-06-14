module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  // 指定如何解析语法
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript -eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "vue"
  ],
  "rules": {
    // eslint：https://www.eslint.com.cn/docs/rules/
    'no-var': 'error', // 使用let/const
    'no-multiple-empty-lines': ['warn', {max: 1}], //不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typescript： https://typescript-eslint.io/rules/
    '@typescript-eslint/no-unused-vars': 'warn', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用@ts-ingnore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 禁止使用 ! 运算符进行非 null 断言。
    '@typescript-.eslint/no-namespace': 'off', // 禁止 TypeScript 命名空间。
    '@typescript-eslint/semi': 'off', // 要求或禁止使用分号而不是 ASI。

    // vue.js：https://eslint.vuejs.org/rules/
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为多字
    'vue/script-setup-uses-vars': 'error', // 防止 <script setup> 中使用的 <template> 变量被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件props的改变
    'vue/attribute-hyphenation': 'off' // 在模板中的自定义组件上强制实施属性命名样式
  }
}
