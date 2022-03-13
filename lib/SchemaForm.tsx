
import { defineComponent, PropType, provide, reactive, ref, Ref, shallowRef, watch, watchEffect } from 'vue'
import SchemaItem from './SchemaItem'

import { Schema, SchemaTypes, Theme, UISchema } from './types'
import { SchemaFormContextKey } from './context'
import Ajv, { Options } from 'ajv'
import { validateFormData, ErrorSchema } from './validator' // 错误消息转换函数

interface ContextRef {
  doValidate:()=> Promise<{
    errors:any[],
    valid:boolean
  }>
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
    },
    uiSchema: { // 自定义组件渲染
      type: Object as PropType<UISchema>
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

    // 保存异步校验结果的方式
    const validateResolveRef = ref()
    // 记录validateFormData 校验方法调用的次数
    const validateIndex = ref(0)

    // 数据变化重新调用校验方法
    watch(() => props.value, () => {
      if (validateResolveRef.value) {
        doValidate()
      }
    }, { // 深度监听
      deep: true
    })

    // 返回错误的方法
    async function doValidate () {
      console.log('start validate ----------')
      const index = validateIndex.value += 1
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate
      )

      // 记录校验的次数，本次异步校验的上下文的 index 和 validateIndex.value不一致，说明中间又发生了几次校验
      if (index !== validateIndex.value) return
      console.log('end validate ----------')

      // 赋值错误的shcema
      errorSchemaRef.value = result.errorSchema

      // resolve 结果
      validateResolveRef.value(result)
      // 结束后清空
      validateResolveRef.value = ''

      // return result
    }

    // 用来做schema的校验
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          // eslint-disable-next-line vue/no-mutating-props
          props.contextRef.value = {
            doValidate () {
              // console.log('------')

              // 表单校验  1
              // const valid = validatorRef.value.validate(props.schema, props.value)

              // return {
              //   valid: valid,
              //   errors: validatorRef.value.errors || []
              // }

              // 表单校验  2(异步)
              // const result = await validateFormData(
              //   validatorRef.value,
              //   props.value,
              //   props.schema,
              //   props.locale,
              //   props.customValidate
              // )
              // // 赋值错误的shcema
              // errorSchemaRef.value = result.errorSchema
              // return result

              // 表单校验  3(异步)
              // 异步校验，数值变化后应该重新校验，而不是返回上一次校验的结果
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                // 返回校验结果
                doValidate()
              })
            }
          }
        }
      },
      {
        immediate: true
      }

    )

    return () => {
      const { schema, value, uiSchema } = props
      return <SchemaItem
        schema={schema}
        rootSchema={schema}
        value={value}
        onChange={handleChange}
        uiSchema={uiSchema || {}}
        errorSchema={errorSchemaRef.value || {}}
      />
    }
  }
})
