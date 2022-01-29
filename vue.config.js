// vue.config.js
// MonacoWebpackPluginde 的报错问题
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// 循环引用问题提示
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  chainWebpack (config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
    // 起名 ：circularDependency
    config.plugin('circularDependency').use(new CircularDependencyPlugin())
  }
}
