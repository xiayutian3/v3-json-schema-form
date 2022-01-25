
import { createApp, defineComponent, h, createVNode, reactive, ref, Ref } from 'vue'
import { createUseStyles } from 'vue-jss'
import MonacoEditor from './components/MonacoEditor'

function tojson (data: any) {
  return JSON.stringify(data, null, 2)
}
const schema = {
  type: 'string'
}
// 生成样式 css in js
const useStyles = createUseStyles({
  editor: {
    minHeight: 400
  }
})

// jsx的形式写组件
export default defineComponent({
  setup () { // 典型的闭包
    // // 相应数据
    // const state = reactive({
    //   name: 'heelo'
    // })
    // const numberRef = ref(1)

    // 编辑器内容变化
    const schemaRef:Ref<any> = ref(schema)
    const handleCodeChange = (code: string) => {
      let schema :any
      try {
        schema = JSON.parse(code)
      } catch (err) {}
      schemaRef.value = schema
    }
    // 样式生成  css in js
    const classesRef = useStyles()

    return () => {
      const code = tojson(schemaRef.value)
      const classes = classesRef.value
      return (
        <div>
          <MonacoEditor class={classes.editor} code={code} onChange={handleCodeChange} title="Schema" />
        </div>
      )
    }
  }
})
