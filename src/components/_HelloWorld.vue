<template>
  <div class="hello">
    <div>{{ msg }}</div>
    <div>{{ age }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

// 类型提取出来，共多个模块复用
const PropsTypes = {
  msg: String,
  age: {
    type: Number,
    required: true
  }
} as const // 定义为props的只读属性，把props提出来后，用在defineComponent的props属性里，
// 因为是变量，不能断定为只读，所以加上  as const  告诉ts，是只读属性，age的类型才会正确

export default defineComponent({
  name: 'HelloWorld',
  // props: {
  //   fg: {
  //     type: Number as PropType<number> // 定义为ts的类型
  //   }
  // },
  props: PropsTypes,
  mounted () {
    console.log(this.age)
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
