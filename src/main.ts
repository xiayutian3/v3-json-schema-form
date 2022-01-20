
// h函数里面最终还是调用createVNode
import { createApp, defineComponent, h, createVNode } from 'vue'
import App from './App.vue'

// import HelloWorld from './components/HelloWorld.vue'

// // 引入图片模块（在template中vue-loder先出里，在配和file-loader或者url-loader，生成真正的图片地址）
// const img = require('./assets/logo.png')
// // render 函数
// const App = defineComponent({
//   render () {
//     return createVNode('div', { id: 'app' }, [
//       createVNode('img', {
//         alt: 'Vue logo',
//         src: img
//       }),
//       createVNode(HelloWorld, {
//         msg: 'Welcome to Your Vue.js + TypeScript App',
//         age: 18
//       })
//     ])
//   }
// })

createApp(App).mount('#app')
