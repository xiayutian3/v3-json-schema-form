
import { defineComponent, inject, watch, watchEffect, DefineComponent, ExtractPropTypes } from 'vue'
import { FiledPropsDefine } from '../types'
import { SchemaFormContextKey } from '../context'
import { isObject } from '../utils'

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

// 声明SchemaItem组件的类型，FiledPropsDefine只是我们声明的对象， ExtractPropTypes帮助我们拿到props类型
// type SchemaItemDefine = DefineComponent< ExtractPropTypes<typeof FiledPropsDefine>> //也可以，默认vue里边会帮我们转化
type SchemaItemDefine = DefineComponent< typeof FiledPropsDefine>

// 或者 这样定义组件的类型
// const TypeHelperComponent = defineComponent({
//   props: FiledPropsDefine
// })
// type SchemaItemDefine = typeof TypeHelperComponent

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup (props) {
    // 获取传递的 schemaItem组件
    const context:{SchemaItem:SchemaItemDefine}|undefined = inject(SchemaFormContextKey)
    // console.log('context: ', context)
    // watchEffect(() => { //如果是响应式数据会自动收集依赖，响应，改变界面
    //   console.log(context.SchemaItem)
    // })

    // 条件判断
    if (!context) {
      throw Error('SchemaItem should be used')
    }

    const handleObjectFieldChange = (key: string, v: any) => {
      // console.log('v: ', v, props.value)
      // console.log('key: ', key)
      const value:any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      // 向上触发更新
      props.onChange(value)
    }

    return () => {
      // 渲染 SchemaItem 节点
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((key: string, index:number) => (
        <SchemaItem
          schema={properties[key]}
          rootSchema={rootSchema}
          value={currentValue[key]}
          onChange={(v: any) => handleObjectFieldChange(key, v)}
          key={index} />
      ))
    }
  }
})
