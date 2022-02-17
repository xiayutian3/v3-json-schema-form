import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup (props) {
    const handleChange = (v: any) => {
      props.onChange(v.target.value)
    }

    return () => {
      const { value } = props
      return (
        // <div>string field</div>
        <input type="text" value={value as any} onInput={handleChange} />
      )
    }
  }
})
