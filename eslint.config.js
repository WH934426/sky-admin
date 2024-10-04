import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { readFile } from 'node:fs/promises'

const autoImportFile = new URL('./.eslintrc-auto-import.json', import.meta.url)
const autoImportGlobals = JSON.parse(await readFile(autoImportFile, 'utf8'))

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}']
  },
  {
    languageOptions: {
      globals: [
        globals.browser,
        globals.es2021,
        globals.node,
        autoImportGlobals.globals
      ],
      ecmaVersion: 'latest'
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    rules: {
      // https://eslint.org/docs/latest/rules/
      'no-var': 'error', // 禁止使用 var
      'no-console': 'off', // 允许 console
      'no-unexpected-multiline': 'error', // 允许多行表达式
      'no-useless-escape': 'off', // 允许转义符
      'no-empty-function': 'off', // 允许空函数
      'no-undef': 'warn', // 允许未使用的变量 auto-import
      'no-unused-vars': 'warn', // 允许未使用的变量 auto-import
      'no-prototype-builtins': 'off', // 允许使用 Object.prototype 方法
      // https://typescript-eslint.io/rules/
      '@typescript-eslint/no-unused-vars': 'warn', // 允许未使用的变量 auto-import 的变量
      '@typescript-eslint/no-explicit-any': 'off', // 允许 any
      '@typescript-eslint/no-non-null-assertion': 'off', // 允许非空断言
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      '@typescript-eslint/no-inferrable-types': 'error', // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明。
      '@typescript-eslint/no-empty-object-type': 'error', // 不允许声明空接口。
      // https://eslint.vuejs.org/rules/
      'vue/multi-word-component-names': 'off', // 允许单字组件名
      'vue/no-mutating-props': 'off' // 不允许组件props的改变
    }
  }
]
