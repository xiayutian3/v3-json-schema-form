import { CommonWidgetPropsDefine, SelectionWidgetName, CommonWidgetNames, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'

// 组件定义
const TextWidget:CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup (props) {
    const handleChange = (v: any) => {
      props.onChange(v.target.value)
    }
    return () => {
      const { value } = props
      return (
        <input type="text" value={value as any} onInput={handleChange} />
      )
    }
  }
}) as unknown as CommonWidgetDefine

export default TextWidget
