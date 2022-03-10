import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { createUseStyles } from 'vue-jss'
const useStyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#777'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    padding: 0,
    paddingLeft: 20
  }
})

const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup (props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const { schema, errors } = props
      const classes = classesRef.value

      return <div class={classes.container}>
        <label class={classes.label}>{schema.title}</label>
        {/* //默认的插槽 vue3中是函数要调用 */}
        {slots.default && slots.default()}
        {/* 显示错误消息 */}
        <ul class={classes.errorText}>
          {errors?.map(err => <li>{err}</li>)}
        </ul>
      </div>
    }
  }
})

export default FormItem

// 组件解耦(高阶组件)   HOC：higher order Component
export function withFormItem (Widget: any) {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup (props, { attrs, slots }) {
      return () => {
        return (
          <FormItem {...props}>
            {/* //如果有插槽内容  */}
            <Widget {...props} {...attrs} {...slots}></Widget>
          </FormItem>
        )
      }
    }
  }) as any
}
