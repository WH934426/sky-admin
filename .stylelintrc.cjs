module.exports = {
  extends: [
    'stylelint-config-standard', // 配置 stylelint 拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置 stylelint scss 插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置 stylelint css 属性书写顺序插件
    'stylelint-config-prettier' // 配置 stylelint 和 prettier 兼容
  ],
  overrides: [
    {
      file: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss'
    },
    {
      file: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml'
  ],
  rules: {
    // 在 css 中使用 v-bind，不报错
    'value-keyword-case': null,
    // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-descending-specificity': null,
    // 要求或禁止 url 的引号： always 必须加上引号 | never 没有引号
    'function-ur1-quotes': 'always',
    // 关闭禁止空源码
    'no-empty-source': null,
    // 关闭强制选择器类名的格式
    'selector-class-pattern': null,
    // 禁止未知的属性 true为不允许
    'property-no-unknown': null,
    // 大括号之前必须有一个空格或不能有空白符
    'block-opening-brace-space-before': 'always',
    // 关闭属性值前缀
    'value-no-vendor-prefix': null,
    // 关闭属性前缀
    'property-no-vendor-prefix': null,
    // 不允许选择未知选择器
    'selector-pseudo-class-no-unknown': [
      true,
      {
        // 忽略属性，修改element 默认样式时能使用到
        ignorePseudoClasses: ['global', 'v-deep', 'deep']
      }
    ]
  }
}