<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :age="18" />
  <p>{{ name }}</p>
  <p>{{ computedRef }}</p>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  mounted () {
    console.log(this.name, '--------')
  },
  setup (props, { slots, attrs, emit }) {
    const state = reactive({
      name: 'heelo'
    })
    // setTimeout(() => {
    //   state.name += '1'
    // }, 1000)

    // ref {value:xxx}
    const name = ref('heelo')

    // computed

    const computedRef = computed(() => {
      return name.value + '2'
    })
    // watchEffect
    watchEffect(() => {
      console.log('watch', name.value)
    })
    return {
      name,
      computedRef
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
