
import { defineComponent, PropType } from 'vue'
import SchemaItem from './SchemaItem'

import { Schema, SchemaTypes } from './types'

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
      // console.log('v', typeof v)
      props.onChange(v)
    }
    return () => {
      const { schema, value } = props
      return <SchemaItem schema={schema} rootSchema={schema} value={value} onChange={handleChange}/>
    }
  }
})
