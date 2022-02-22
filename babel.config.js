module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // mergeProps 关掉vue处理两个相同props的处理，因为传相同key，vue会帮我们合成个数组，里面有两个元素，
  // 关掉后，,就会变成一个，后边的相同props会覆盖前面的props
  plugins: [['@vue/babel-plugin-jsx', { mergeProps: false }]]
}
