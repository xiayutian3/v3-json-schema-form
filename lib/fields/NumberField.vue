<template>
  <div>
    <input type="number" :value="value" @input="handleChange" >
  </div>
</template>

<script lang="ts" setup>
import { FiledPropsDefine } from '../types'
// eslint-disable-next-line no-undef
const props = defineProps(FiledPropsDefine)
const handleChange = (e:any) => {
  const value = e.target.value
  const num = Number(value)
  if (Number.isNaN(num)) {
    props.onChange(undefined)
  } else {
    props.onChange(num)
  }
}
</script>

<style lang="scss">

</style>
