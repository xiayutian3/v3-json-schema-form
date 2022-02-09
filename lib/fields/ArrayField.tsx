import { defineComponent } from 'vue'
import { FiledPropsDefine, Schema } from '../types'
import { useVJSFContext } from '../context'
import { createUseStyles } from 'vue-jss'

// css in js 样式生成
// 用 jss 调写样式
const useStyles = createUseStyles({
  container: {
    border: '1px soild #eee'
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right'
  },
  action: {
    '& + &': { // 相邻一样的class，选择性的class
      marginLeft: 10
    }
  },
  content: {
    padding: 10
  }
})

// 可排序的单类型的多个节点（排序功能），包含 schema.item组件
const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  // props: {},
  setup (props, { slots }) {
    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action}>新增</button>
            <button class={classes.action}>删除</button>
            <button class={classes.action}>上移</button>
            <button class={classes.action}>下移</button>
          </div>
          {/* // vue3中的slots。default 是函数 */}
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  }
})

// 数组节点的展现情况 3种形式
/**
 * {
 *  items: { type: string},
 * }
 *
 * 该数组有两项，第一项是 字符串类型 第二种是 数字类型
 * {
 * items: [
 *   { type: string, }
 *   { type: number, }
 * ]
 * }
 *
 * 这也是个数组，只是每个数组的选项都是可选的(要么是1， 要么是2)
 * {
 *  items: { type: string, enum: ['1', '2']},
 * }
 */

export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,
  setup (props) {
    // 已经封装了 hook  // 获取传递的 schemaItem组件
    const context = useVJSFContext()

    // 当时items的时候(第二种情况)
    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    return () => {
      // 渲染 SchemaItem 节点
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      // 数组的情况
      const isMultiType = Array.isArray(schema.items)
      // 单种情况
      const isSelect = schema.items && (schema.items as any).enum

      // 数组渲染的情况
      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => {
          return (
            <SchemaItem
              schema={s}
              rootSchema={rootSchema}
              value={arr[index]}
              onChange={(v: any) => handleArrayItemChange(v, index)}
              key={index}
            />
          )
        })
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper>
              <SchemaItem
                schema={schema.items as Schema}
                rootSchema={rootSchema}
                value={v}
                onChange={(v: any) => handleArrayItemChange(v, index)}
                key={index}
              />
            </ArrayItemWrapper>
          )
        })
      }

      return <div>hehe</div>
    }
  }
})
