import { inject, Ref } from 'vue'
import { CommonFieldType, CommonWidgetDefine, Schema, Theme } from './types'

// 维护所有的provide inject所用的key ,保证唯一性
export const SchemaFormContextKey = Symbol('')

// 获取传递的 schemaItem组件
export function useVJSFContext () {
  const context:
    | {
        SchemaItem: CommonFieldType;
        formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>;
        transformSchemaRef: Ref<(schema: Schema) => Schema>;
      }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }

  // console.log('context', context)
  return context
}
