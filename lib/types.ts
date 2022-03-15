import type { PropType, DefineComponent } from 'vue'
// import type { ErrorSchema } from './validator'

import type { FormatDefinition } from 'ajv'
import { ErrorSchema } from './validator'

// 会把一些通用的类型统一放在这个 ts 文件里面
export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

// 这里的 schema 可以做一些预先定义，通过 $ref 来去引用这个部分的 schema
type SchemaRef = { $ref: string }

export interface Schema {
  // 这里加 string 类型的原因是因为后面再写的时候，除了写成 SchemaTypes.NUMBER 还可以直接写 string
  type?: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any

  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimun?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

export const FiledPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  rootSchema: { // utils 的retrieveSchema 需要rootschema去处理
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  uiSchema: { // 自定义渲染组件
    type: Object as PropType<UISchema>,
    required: true
  },
  errorSchema: { // 自定义错误shcema
    type: Object as PropType<ErrorSchema>,
    required: true
  }
} as const

// // 声明SchemaItem组件的类型，FiledPropsDefine只是我们声明的对象， ExtractPropTypes帮助我们拿到props类型
// // type SchemaItemDefine = DefineComponent< ExtractPropTypes<typeof FiledPropsDefine>> //也可以，默认vue里边会帮我们转化
// export type SchemaItemDefine = DefineComponent< typeof FiledPropsDefine>

// // 或者 这样定义组件的类型
// // const TypeHelperComponent = defineComponent({
// //   props: FiledPropsDefine
// // })
// // type SchemaItemDefine = typeof TypeHelperComponent

export type CommonFieldType = DefineComponent<typeof FiledPropsDefine>

export enum SelectionWidgetNames {
  SelectionWidget = 'SelectionWidget',
}

// 作为props定义
export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true
  },
  errors: {
    type: Array as PropType<string[]>
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  options: { // 可以传任何自定义的参数
    type: Object as PropType<{ [key: string]: any }>
  }
} as const

export const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<
      {
        key: string
        value: any
      }[]
    >,
    required: true
  }
} as const

// 组件类型定义
export type CommonWidgetDefine = DefineComponent<typeof CommonWidgetPropsDefine>
export type SelectionWidgetDefine = DefineComponent<
  typeof SelectionWidgetPropsDefine
>

export enum SelectionWidgetName {
  SelectionWidget = 'SelectionWidget',
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
}

export interface Theme {
  widgets: {
    [SelectionWidgetName.SelectionWidget]: SelectionWidgetDefine
    [CommonWidgetNames.TextWidget]: CommonWidgetDefine
    [CommonWidgetNames.NumberWidget]: CommonWidgetDefine
  }
}

export type UISchema = {
  widget?: string | CommonWidgetDefine // string 是 组件名字 ,要么是传一个组件，组件的类型
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[] // 单类型，多类型就要传一个数组
} & {
  [key: string]: any // w: 开头
}

export interface CustomFormat {
  name: string
  definition: FormatDefinition<any>
  component: CommonWidgetDefine
}

interface VjsfKeywordDefinition {
  type?: string | Array<string>
  async?: boolean
  $data?: boolean
  errors?: boolean | string
  metaSchema?: any
  // schema: false makes validate not to expect schema (ValidateFunction)
  schema?: boolean
  statements?: boolean
  dependencies?: Array<string>
  modifying?: boolean
  valid?: boolean
  // one and only one of the following properties should be present
  macro: (schema: any, parentSchema: any, it: any) => any | boolean
}

// 扩展  自定义ajv关键字，检验
export interface CustomKeyword {
  name: string
  deinition: VjsfKeywordDefinition // 定义类型
  transformSchema: (originSchema: Schema) => Schema // 转化成真正要渲染的shema
}
