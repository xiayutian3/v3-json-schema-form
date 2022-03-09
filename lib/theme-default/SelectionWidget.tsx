// 多选的表单组件

import { defineComponent, PropType, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine, SelectionWidgetDefine } from '../types'

const Selection:SelectionWidgetDefine = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup (props) {
    const currentValue = ref(props.value)

    // currentValue变化的时候，改变props.value 变化的时候
    watch(currentValue, (newv, oldv) => {
      if (newv !== props.value) {
        props.onChange(newv)
      }
    })
    // props.value 变化的时候，改变currentValue的值
    watch(() => props.value, (v) => {
      if (v !== currentValue.value) {
        currentValue.value = v
      }
    })

    return () => {
      const options = props.options
      // console.log('options: ', options)
      return <select multiple={true} v-model={currentValue.value}>
        {
          options.map((op) => <option value={op.value}>{op.key}</option>)
        }
      </select>
    }
  }
}) as SelectionWidgetDefine

export default Selection
