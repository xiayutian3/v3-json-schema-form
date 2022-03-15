import { computed, defineComponent, PropType, ref } from 'vue'
import NumberField from './fields/NumberField'
import StringField from './fields/StringField'
// import StringField from './fields/StringField.vue'
// import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'

import { Schema, SchemaTypes, FiledPropsDefine } from './types'
// 处理shcemaitem 节点
import { retrieveSchema } from './utils'
import { useVJSFContext } from './context'

// jsx的形式写组件
export default defineComponent({
  name: 'Schemaitem',
  props: FiledPropsDefine,
  setup (props) {
    const formContext = useVJSFContext()

    /// / 处理过后的schema
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props

      // formContext transformSchemaRef 扩展 ajv keyword的处理函数
      return formContext.transformSchemaRef.value(
        retrieveSchema(schema, rootSchema, value)
      )
    })
    // console.log('retrievedSchemaRef: ', retrievedSchemaRef.value)

    return () => {
      const { schema } = props
      // console.log('schemaItem: ', props.value)

      const retrievedSchema = retrievedSchemaRef.value

      // 如果用户没有制定type  我们可以帮用户去猜测type的值
      const type = schema?.type
      let Component: any
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
        case SchemaTypes.ARRAY: {
          Component = ArrayField
          break
        }
        default: {
          console.warn(`${type} is not support`)
        }
      }
      return <Component {...props} schema={retrievedSchema} />
    }
  }
})
