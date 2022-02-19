
import { defineComponent, PropType, provide, reactive } from 'vue'
import SchemaItem from './SchemaItem'

import { Schema, SchemaTypes } from './types'
import { SchemaFormContextKey } from './context'

// jsx的形式写组件
export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(val: any)=> void>,
      required: true
    }
  },
  setup (props, { slots, emit, attrs }) {
    // 再做一层数据转化
    const handleChange = (v: any) => {
      // console.log('v', v)
      props.onChange(v)
    }

    // 提供传递的内容,传递schemaItem组件,需要动态数据的话，就要用ractive定义数据
    const context: any = {
      SchemaItem
    }
    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return <SchemaItem schema={schema} rootSchema={schema} value={value} onChange={handleChange}/>
    }
  }
})
