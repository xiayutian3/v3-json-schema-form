import { computed, defineComponent } from 'vue'
import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup (props) {
    // 有时候我们可能会作二次处理
    const handleChange = (v: string) => {
      props.onChange(v)
    }

    const TextWidgetRef = computed(() => {
      const widget = getWidget(CommonWidgetNames.TextWidget, props)
      return widget.value
    })

    // 传递的options uiShema
    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })

    return () => {
      // const { value } = props
      const TextWidget = TextWidgetRef.value
      // 将剩余参数拿到 rest，   schema rootSchema是我们不要的
      const { rootSchema, errorSchema, ...rest } = props
      return (
        // <div>string field</div>
        // <input type="text" value={value as any} onInput={handleChange} />
        // 已经换成widget了
        // 如果传两个相同key 的props vue在处理的时候 会默认帮我们mergeProps，变成一个数组，长度为2，如果想是使用我们指定的props，就需要在babelconfig那里设置
        <TextWidget options={widgetOptionsRef.value} {...rest} errors={errorSchema.__errors} onChange={handleChange}/>
      )
    }
  }
})
