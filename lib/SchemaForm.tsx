
import { defineComponent, PropType, provide, reactive, Ref, shallowRef, watch, watchEffect } from 'vue'
import SchemaItem from './SchemaItem'

import { Schema, SchemaTypes, Theme } from './types'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { validateFormData, ErrorSchema } from './validator' // 错误消息转换函数

interface ContextRef {
  doValidate:()=>({
    errors:any[],
    valid:boolean
  })
}

// 使用 ajvErrors 必须要使用的配置
const defaultAjvOptions:Options = {
  allErrors: true
}

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
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>
    },
    ajvOptions: { // ajv 配置对象
      type: Object as PropType<Options>
    },
    locale: {
      type: String,
      default: 'zh'
    },
    customValidate: { // 自定义错误类型
      type: Function as PropType<(data:any, errors:any)=>void>
    }
    // theme: { // 里边是每一个渲染组件，所有的渲染组件都在里边
    //   type: Object as PropType<Theme>,
    //   required: true
    // }
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
      // theme: props.theme // 所有的渲染组件都在里边
    }
    provide(SchemaFormContextKey, context)

    const errorSchemaRef:Ref<ErrorSchema> = shallowRef({})

    // 创建ajv实例
    const validatorRef:Ref<Ajv> = shallowRef() as any
    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
      })
    })

    // 用来做schema的校验
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          // eslint-disable-next-line vue/no-mutating-props
          props.contextRef.value = {
            doValidate () {
              // console.log('------')
              // 表单校验
              // const valid = validatorRef.value.validate(props.schema, props.value)

              const result = validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.locale,
                props.customValidate
              )
              // 赋值错误的shcema
              errorSchemaRef.value = result.errorSchema

              // return {
              //   valid: valid,
              //   errors: validatorRef.value.errors || []
              // }

              return result
            }
          }
        }
      },
      {
        immediate: true
      }

    )

    return () => {
      const { schema, value } = props
      return <SchemaItem
        schema={schema}
        rootSchema={schema}
        value={value}
        onChange={handleChange}
        errorSchema={errorSchemaRef.value || {}}
      />
    }
  }
})
