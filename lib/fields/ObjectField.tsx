
import { defineComponent, inject, watch, watchEffect } from 'vue'
import { FiledPropsDefine } from '../types'
import { SchemaFormContextKey } from '../context'

// 这样会出现循环引用的问题  SchemaItem 引了 ObjectField， ObjectField引了SchemaItem，后续会出现奇奇怪怪的问题，要避免这种情况发生
// import SchemaItem from '../SchemaItem'
// console.log(SchemaItem)

// demo
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    }
  }
}

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup () {
    const context:any = inject(SchemaFormContextKey)
    // console.log('context: ', context)
    // watchEffect(() => { //如果是响应式数据会自动收集依赖，响应，改变界面
    //   console.log(context.SchemaItem)
    // })

    return () => {
      // 渲染 SchemaItem 节点
      const { SchemaItem } = context
      return <div>Object field</div>
    }
  }
})
