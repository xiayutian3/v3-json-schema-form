import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import JsonSchemaForm, { NumberField } from '../../lib'

describe('JsonSchemaForm', () => {
  it('should render correct number field', () => {
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number'
        },
        value: value,
        onChange: (v:any) => { value = v }
      }
    })

    const numberFiled = wrapper.findComponent(NumberField)
    // 断言 NumberField 确定会被渲染
    expect(numberFiled.exists()).toBeTruthy()
  })
})
