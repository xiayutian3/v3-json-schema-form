import { defineComponent, markRaw } from 'vue'
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
  // 如题，这句提示是自己使用 动态组件component 时控制台打印的 warning，解决方式是将 is 传入的组件使用 markRaw函数标记，让其永远不会转换为 proxy 。返回对象本身。
  // https://www.xianh5.com/archives/60/
  return markRaw(defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup (props, { attrs, slots }) {
      return () => {
        return (
          <FormItem {...props}>
            {/* //如果有插槽内容  所有的属性  */}
            <Widget {...props} {...attrs} {...slots}></Widget>
          </FormItem>
        )
      }
    }
  })) as any
}
