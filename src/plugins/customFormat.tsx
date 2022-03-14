// 扩展 ajv 自定义format  color 组件

import { computed, defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CustomFormat } from '../../lib/types'
import { withFormItem } from '../../lib/theme-default/FormItem'

// 自定义format color 组件
const format: CustomFormat = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Fa-f]{6}$/
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
      props: CommonWidgetPropsDefine,
      setup (props) {
        const handleChange = (v: any) => {
          const value = v.target.value
          v.target.value = props.value
          props.onChange(value)
        }

        const styleRef = computed(() => {
          return {
            color: (props.options && props.options.color) || 'black'
          }
        })

        return () => {
          const { value } = props
          return (
            <input
              style={styleRef.value}
              type="color"
              value={value as any}
              onInput={handleChange}
            />
          )
        }
      }
    })
  )
}

export default format
