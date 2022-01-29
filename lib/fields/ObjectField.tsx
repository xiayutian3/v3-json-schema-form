
import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'

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
    return () => {
      return <div>Object field</div>
    }
  }
})
