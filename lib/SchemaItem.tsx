import { defineComponent, PropType } from 'vue'
// import NumberField from './fields/NumberField'
// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'

import { Schema, SchemaTypes, FiledPropsDefine } from './types'

// jsx的形式写组件
export default defineComponent({
  name: 'Schemaitem',
  props: FiledPropsDefine,
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
