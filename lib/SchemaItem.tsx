import { computed, defineComponent, PropType } from 'vue'
// import NumberField from './fields/NumberField'
// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField'

import { Schema, SchemaTypes, FiledPropsDefine } from './types'
// 处理shcemaitem 节点
import { retrieveSchema } from './utils'

// jsx的形式写组件
export default defineComponent({
  name: 'Schemaitem',
  props: FiledPropsDefine,
  setup (props) {
    /// / 处理过后的schema
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })

    return () => {
      const { schema } = props
      const retrievedSchema = retrievedSchemaRef.value

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
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        default: {
          console.warn(`${type} is not support`)
        }
      }
      return (
        <Component {...props} schema={retrievedSchema} />
      )
    }
  }
})
