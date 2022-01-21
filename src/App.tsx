
import { createApp, defineComponent, h, createVNode, reactive, ref } from 'vue'

// import HelloWorld from './components/HelloWorld.vue'
// 编辑器校验  ---  引入tsx组件能校验组件传参报错问题（比如有必填参数的时候，类型传错等），.vue的组件就不识别，编译才能识别
import HelloWorld from './components/HelloWorld'

function renderHelloWorld (num: number) {
  return <HelloWorld age={num} />
}

// jsx的形式写组件
const img = require('./assets/logo.png')
export default defineComponent({
  setup () { // 典型的闭包
    // 相应数据
    const state = reactive({
      name: 'heelo'
    })
    const numberRef = ref(1)

    // // 也能正常响应
    // setInterval(() => {
    //   state.name += '1'
    //   numberRef.value += 1
    // }, 1000)

    return () => {
      // 放在return后的函数才能正确的响应式.放在return外 只能执行一次
      const number = numberRef.value
      console.log(state.name)
      // return h('div', { id: 'app' }, [
      //   h('img', {
      //     alt: 'Vue logo',
      //     src: img
      //   }),
      //   h('p', state.name + number)
      // ])

      // 用jsx的方式替代 h 函数
      return (
        <div id="app">
          <img src={img} alt="logo"/>
          <p>{state.name + number}</p>
          <input type="text" v-model={state.name} />
          {/* <HelloWorld age={8}/> */}
          {renderHelloWorld(20)}
        </div>
      )
    }
  }
})
