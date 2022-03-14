import { computed, ComputedRef, defineComponent, ExtractPropTypes, inject, PropType, provide, ref } from 'vue'
import { Theme, SelectionWidgetName, CommonWidgetNames, UISchema, CommonWidgetDefine, FiledPropsDefine } from './types'
import { isObject } from './utils'
import { useVJSFContext } from './context'

// 唯一key
const THEME_PROVIDER_KEY = Symbol('')

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup: (props, { slots }) => {
    const context = computed(() => props.theme)
    // 传递 响应的theme，可能后边有需要改变theme
    provide(THEME_PROVIDER_KEY, context)
    // 默认插槽都是函数，必须调用 slots.default()
    return () => slots.default && slots.default()
  }
})

// 获取 传递的theme，有可能用户没传，undefined
// theme widget都做到动态变化
// 泛型 T是来自于 SelectionWidgetName 或者是 CommonWidgetNames 里面所有的key的
export function getWidget<T extends SelectionWidgetName | CommonWidgetNames> (name: T, props?: ExtractPropTypes< typeof FiledPropsDefine>) {
  // 拿到自定义 ajv  的format的 渲染组件
  const formatContext = useVJSFContext()

  if (props) {
    const { uiSchema, schema } = props
    // 使用uiSchema ,自定义渲染组件
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget as CommonWidgetDefine)
    }
    // 拿到自定义 ajv  的format的 渲染组件
    if (schema.format) {
      if (formatContext.formatMapRef.value[schema.format]) {
        return ref(formatContext.formatMapRef.value[schema.format])
      }
    }
  }

  const context:ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)

  if (!context) {
    throw new Error('vjsf theme required')
  }
  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })
  return widgetRef
}

// 外层使用了 ThemeProvider 包裹组件，最后返回出来的也是 ThemeProvider ，组件化的思想，可以多层套用
export default ThemeProvider
