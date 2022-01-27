import { defineComponent, PropType } from 'vue'
import NumberField from './fields/NumberField'
import StringField from './fields/StringField'

import { Schema, SchemaTypes } from './types'

// jsx的形式写组件
export default defineComponent({
  name: 'Schemaitem',
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
  setup (props) {
    return () => {
      const { schema } = props
      // 如果用户没有制定type  我们可以帮用户去猜测type的值
      const type = schema?.type
      let Component:any
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.warn(`${type} is not support`)
        }
      }
      return (
        <Component {...props}/>
      )
    }
  }
})
