import { defineComponent } from 'vue'

const PropsType = {
  msg: String,
  age: {
    type: Number,
    required: true
  }
} as const // 定义为props的只读属性，把props提出来后，用在defineComponent的props属性里，
// 因为是变量，不能断定为只读，所以加上  as const  告诉ts，是只读属性，age的类型才会正确

export default defineComponent({
  props: PropsType,
  setup (props) { // 典型的闭包
    return () => <div>{props.age}</div>
  }
})
