module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleFileExtensions: [ // 覆盖默认配置，后缀名省略的原因，省略后缀名的话，先从第一项开始匹配。。到最后一项，找到就返回
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    // tell Jest to handle *.vue files
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}
