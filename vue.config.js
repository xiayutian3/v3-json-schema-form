// vue.config.js
// MonacoWebpackPluginde 的报错问题
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// 循环引用问题提示
const CircularDependencyPlugin = require('circular-dependency-plugin')

// 环境变量 type，这个是我们自己加上去的 在package 命令那里
const isLib = process.env.TYPE === 'lib'

// git actions 配置 CI 自动化构建的时候添加的配置   .yml
// const isCI = process.env.CI

module.exports = {
  chainWebpack (config) {
    // 库的模式下不需要 monaco 这个编辑器，只是demo演示的时候用而已
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    // 起名 ：circularDependency
    config.plugin('circularDependency').use(new CircularDependencyPlugin())
  }
}
