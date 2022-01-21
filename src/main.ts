
// h函数里面最终还是调用createVNode
import { createApp, defineComponent, h, createVNode, reactive, ref } from 'vue'
// import App from './App.vue'
/// 使用jsx写的组件
import App from './App'

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

// // 使用 setup返回一个函数 的情况
// const img = require('./assets/logo.png')
// // render 函数
// const App = defineComponent({
//   setup () { // 典型的闭包
//     // 相应数据
//     const state = reactive({
//       name: 'heelo'
//     })
//     const numberRef = ref(1)

//     // 也能正常响应
//     setInterval(() => {
//       state.name += '1'
//       numberRef.value += 1
//     }, 1000)

//     return () => {
//       // 放在return后的函数才能正确的响应式.放在return外 只能执行一次
//       const number = numberRef.value
//       return h('div', { id: 'app' }, [
//         h('img', {
//           alt: 'Vue logo',
//           src: img
//         }),
//         h('p', state.name + number)
//       ])
//     }
//   }
// })

createApp(App).mount('#app')
