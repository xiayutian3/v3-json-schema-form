<template>
  <div>
    <input type="text" :value="value" @input="handleChange" >
  </div>
</template>

<script lang="ts" setup>
import { FiledPropsDefine } from '../types'
// eslint-disable-next-line no-undef
const props = defineProps(FiledPropsDefine)
const handleChange = (e:any) => {
  console.log(e)
  props.onChange(e.target.value)
}
</script>

<style lang="scss">

</style>
