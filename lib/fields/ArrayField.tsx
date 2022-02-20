import { defineComponent, PropType } from 'vue'
import { FiledPropsDefine, Schema, SelectionWidgetName } from '../types'
import { useVJSFContext } from '../context'
import { createUseStyles } from 'vue-jss'

// 会从inject content 中得到渲染组件 theme 里面包含有渲染组件
// import SelectionWidget from '../widgets/Selection'

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
  props: {
    onAdd: {
      type: Function as PropType<(index:number) =>void>,
      required: true
    },
    onDelete: {
      type: Function as PropType<(index:number) =>void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(index:number) =>void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(index:number) =>void>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup (props, { slots }) {
    const classesRef = useStyles()

    // 添加函数
    const handleAdd = () => props.onAdd(props.index)
    const handleDelete = () => props.onDelete(props.index)
    const handleUp = () => props.onUp(props.index)
    const handleDown = () => props.onDown(props.index)

    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>新增</button>
            <button class={classes.action} onClick={handleDelete}>删除</button>
            <button class={classes.action} onClick={handleUp}>上移</button>
            <button class={classes.action} onClick={handleDown}>下移</button>
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
      // console.log('ArrayField', arr)
      props.onChange(arr)
    }

    // 新增，等操作
    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }
    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }

    const handleUp = (index: number) => {
      if (index === 0) return
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, ...item)
      props.onChange(arr)
    }

    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) return
      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, ...item)
      props.onChange(arr)
    }

    return () => {
      // 渲染 SchemaItem 节点
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      // 获取 SelectionWidget组件
      const SelectionWidget = context.theme.widgets[SelectionWidgetName.SelectionWidget]

      // 数组的情况
      const isMultiType = Array.isArray(schema.items)
      // 单种情况
      const isSelect = schema.items && (schema.items as any).enum

      // 数组渲染的情况（第二种情况）simple-> staticArray
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
        // 第一种情况 //simple-> singleTypeArray
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper index={index} onAdd={handleAdd} onDelete={handleDelete} onUp={handleUp} onDown={handleDown}>
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
        // 第三种情况 simple-> multiSelectArray
      } else {
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e:any) => ({
          key: e,
          value: e
        }))
        return <SelectionWidget onChange={props.onChange} value={props.value} options={options}/>
      }

      // return <div>hehe</div>
    }
  }
})
