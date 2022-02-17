import { FiledPropsDefine } from '../types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberField',
  props: FiledPropsDefine,
  setup (props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      const num = Number(value)
      props.onChange(Number.isNaN(num) ? undefined : num)
    }

    return () => {
      const { value } = props
      return (
        // <div>number field</div>
        <input type="number" value={value as any} onInput={handleChange} />
      )
    }
  }
})
