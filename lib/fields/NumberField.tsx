import { FiledPropsDefine, CommonWidgetNames } from '../types'
import { defineComponent } from 'vue'
// 引入numberwiget
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup (props) {
    const handleChange = (v: string) => {
      // const value = e.target.value
      const num = Number(v)
      props.onChange(Number.isNaN(num) ? undefined : num)
    }

    // 引入numberwiget
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)

    return () => {
      // const { value } = props

      // 将剩余参数拿到 rest，   schema rootSchema是我们不要的
      const { schema, rootSchema, errorSchema, ...rest } = props
      const NumberWidget = NumberWidgetRef.value
      return (
      // <div>number field</div>
      // <input type="number" value={value as any} onInput={handleChange} />

        // 已经换成widget了
      // 如果传两个相同key 的props vue在处理的时候 会默认帮我们mergeProps，变成一个数组，长度为2，如果想是使用我们指定的props，就需要在babelconfig那里设置
        <NumberWidget {...rest} errors={errorSchema.__errors} onChange={handleChange} />
      )
    }
  }
})
