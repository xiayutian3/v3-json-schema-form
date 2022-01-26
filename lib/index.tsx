
import { defineComponent } from 'vue'

// jsx的形式写组件
export default defineComponent({
  setup () { // 典型的闭包
    return () => {
      return (
        <div>this is form</div>
      )
    }
  }
})
